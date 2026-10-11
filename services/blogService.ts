import { z } from "zod";
import { unstable_cache } from "next/cache";

// =====================================================================
// SCHEMA VALIDASI - kolom sheet BLOG: id, title, category, image, date, description
// =====================================================================
const BlogPostSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().max(300).default(""),
  category: z.string().max(100).default(""),

  // Hanya terima URL https. Selain itu diubah jadi string kosong.
  image: z
    .any()
    .transform((val) => {
      const str = String(val || "").trim();
      return str.startsWith("https://") ? str : "";
    })
    .default(""),

  // Tanggal dibiarkan string/number apa adanya ("March 18, 2026" atau "2026-03-18").
  // Parsing untuk tampilan & sorting dilakukan lewat helper di bawah.
  date: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim())
    .default(""),

  description: z.string().max(15000).default(""),
});

const BlogArraySchema = z.array(BlogPostSchema).max(500);

export type BlogPost = z.infer<typeof BlogPostSchema>;

// =====================================================================
// HELPER TANGGAL (aman dipakai di server maupun client component)
// =====================================================================
export function parseBlogDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatBlogDate(value: string): string {
  const d = parseBlogDate(value);
  if (!d) return value; // tampilkan apa adanya kalau format tidak dikenali
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// =====================================================================
// SAFE LOGGER
// =====================================================================
function safeLog(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(`[blogService] ${message}`, meta ?? "");
  } else {
    // eslint-disable-next-line no-console
    console.error(`[blogService] ${message}`);
  }
}

function sanitizeForLog(value: unknown): string {
  return String(value)
    .replace(/[\r\n]/g, " ")
    .slice(0, 100);
}

const FETCH_TIMEOUT_MS = 12000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 700;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Data valid terakhir (fallback selama instance server masih warm)
let lastGoodData: BlogPost[] | null = null;

// =====================================================================
// Membuat URL blog dari APPS_SCRIPT_URL yang sama dengan portfolio
// -> tidak perlu environment variable baru.
// =====================================================================
function buildBlogUrl(baseUrl: string): string {
  try {
    const u = new URL(baseUrl);
    u.searchParams.set("sheet", "BLOG");
    return u.toString();
  } catch {
    return "";
  }
}

async function fetchOnce(url: string): Promise<BlogPost[] | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      safeLog("Data source returned non-OK status", { status: res.status });
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      safeLog("Data source returned unexpected content-type");
      return null;
    }

    const rawData = await res.json();
    const parsed = BlogArraySchema.safeParse(rawData);

    if (!parsed.success) {
      safeLog("Data source payload failed schema validation", {
        issueCount: parsed.error.issues.length,
      });
      return null;
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      safeLog("Data source request timed out");
    } else {
      safeLog("Failed to fetch blog data");
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchWithRetry(url: string): Promise<BlogPost[] | null> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const result = await fetchOnce(url);
    if (result !== null) return result;
    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * (attempt + 1));
    }
  }
  return null;
}

// =====================================================================
// Yang di-cache adalah HASIL YANG SUDAH TERVALIDASI (bukan respons mentah).
// Kalau semua gagal dan tidak ada fallback -> throw, supaya error tidak
// tersimpan di cache sebagai "hasil sukses".
// =====================================================================
const getCachedBlogData = unstable_cache(
  async (url: string): Promise<BlogPost[]> => {
    const data = await fetchWithRetry(url);

    if (data !== null) {
      lastGoodData = data;
      return data;
    }

    if (lastGoodData !== null) {
      safeLog("Using last known good data after all retries failed");
      return lastGoodData;
    }

    throw new Error("Blog data unavailable and no fallback exists");
  },
  ["blog-data"],
  {
    revalidate: 3600, // jaring pengaman kalau on-demand revalidation gagal terpicu
    tags: ["blog"], // dipakai revalidateTag("blog") di /api/revalidate
  }
);

export async function getBlogData(): Promise<BlogPost[]> {
  const baseUrl = process.env.APPS_SCRIPT_URL;

  if (!baseUrl) {
    safeLog("Data source URL is not configured");
    return lastGoodData ?? [];
  }

  const url = buildBlogUrl(baseUrl);
  if (!url) {
    safeLog("Data source URL is invalid");
    return lastGoodData ?? [];
  }

  try {
    return await getCachedBlogData(url);
  } catch {
    safeLog("Unexpected error while retrieving cached blog data");
    return lastGoodData ?? [];
  }
}

export async function getBlogById(
  id: string | number
): Promise<BlogPost | null> {
  try {
    const data = await getBlogData();
    if (!data || data.length === 0) return null;

    const item = data.find((p) => String(p.id) === String(id));
    return item || null;
  } catch {
    safeLog("Failed to look up blog post by id", { id: sanitizeForLog(id) });
    return null;
  }
}
