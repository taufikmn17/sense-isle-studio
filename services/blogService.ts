import { z } from "zod";
import { unstable_cache } from "next/cache";

// =====================================================================
// SCHEMA VALIDASI (per-item)
// =====================================================================
const BlogPostSchema = z.object({
  id: z
    .union([z.string(), z.number()])
    .refine(
      (val) => val !== undefined && val !== null && String(val).trim() !== "",
      { message: "Blog ID is required" }
    ),
  title: z.string().max(300).default(""),
  category: z.string().max(100).default(""),

  image: z
    .any()
    .transform((val) => {
      const str = String(val || "").trim();
      return str.startsWith("https://") ? str : "";
    })
    .default(""),

  date: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim())
    .pipe(z.string().max(50))
    .default(""),

  description: z.string().max(15000).default(""),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

const MAX_ARRAY_SIZE = 500;

// =====================================================================
// HASIL VALIDASI: bedakan antara "kosong" vs "over-limit"
// =====================================================================
export interface BlogValidationResult {
  data: BlogPost[];
  overflow: boolean;
}

function validateBlogPayload(rawData: unknown): BlogValidationResult {
  if (!Array.isArray(rawData)) {
    return { data: [], overflow: false };
  }

  if (rawData.length > MAX_ARRAY_SIZE) {
    return { data: [], overflow: true };
  }

  const validItems: BlogPost[] = [];
  let hasOverflow = false;

  for (const item of rawData) {
    const parsed = BlogPostSchema.safeParse(item);
    if (parsed.success) {
      validItems.push(parsed.data);
    } else {
      hasOverflow = true;
    }
  }

  // Filter ID duplikat
  const seenIds = new Set<string>();
  const uniqueData = validItems.filter((item) => {
    const idStr = String(item.id).trim();
    if (seenIds.has(idStr)) return false;
    seenIds.add(idStr);
    return true;
  });

  return { data: uniqueData, overflow: hasOverflow };
}

// =====================================================================
// HELPER TANGGAL
// =====================================================================
export function parseBlogDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatBlogDate(value: string): string {
  const d = parseBlogDate(value);
  if (!d) return value;
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

let lastGoodData: BlogPost[] | null = null;

function buildBlogUrl(baseUrl: string): string {
  try {
    const u = new URL(baseUrl);
    u.searchParams.set("sheet", "BLOG");
    return u.toString();
  } catch {
    return "";
  }
}

// =====================================================================
// Fetch + validasi per-item
// =====================================================================
async function fetchOnce(url: string): Promise<BlogValidationResult | null> {
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
    return validateBlogPayload(rawData);
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

async function fetchWithRetry(
  url: string
): Promise<BlogValidationResult | null> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const result = await fetchOnce(url);
    if (result !== null) return result;
    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * (attempt + 1));
    }
  }
  return null;
}

const getCachedBlogData = unstable_cache(
  async (url: string): Promise<BlogValidationResult> => {
    const result = await fetchWithRetry(url);

    if (result !== null) {
      if (!result.overflow) {
        lastGoodData = result.data;
      }
      return result;
    }

    if (lastGoodData !== null) {
      safeLog("Using last known good data after all retries failed");
      return { data: lastGoodData, overflow: false };
    }

    throw new Error("Blog data unavailable and no fallback exists");
  },
  ["blog-data"],
  {
    revalidate: 3600,
    tags: ["blog"],
  }
);

export async function getBlogData(): Promise<BlogValidationResult> {
  const baseUrl = process.env.APPS_SCRIPT_URL;

  if (!baseUrl) {
    safeLog("Data source URL is not configured");
    return { data: lastGoodData ?? [], overflow: false };
  }

  const url = buildBlogUrl(baseUrl);
  if (!url) {
    safeLog("Data source URL is invalid");
    return { data: lastGoodData ?? [], overflow: false };
  }

  try {
    return await getCachedBlogData(url);
  } catch {
    safeLog("Unexpected error while retrieving cached blog data");
    return { data: lastGoodData ?? [], overflow: false };
  }
}

// =====================================================================
// GET BLOG BY ID — return { post, overflow } agar bisa deteksi over-limit
// =====================================================================
export interface BlogByIdResult {
  post: BlogPost | null;
  overflow: boolean;
}

export async function getBlogById(
  id: string | number
): Promise<BlogByIdResult> {
  try {
    if (!id || String(id).trim() === "") {
      return { post: null, overflow: false };
    }

    const { data, overflow } = await getBlogData();

    // ✅ Kalau ada data over-limit → return overflow = true
    if (overflow) {
      return { post: null, overflow: true };
    }

    if (!data || data.length === 0) {
      return { post: null, overflow: false };
    }

    const post = data.find((p) => String(p.id) === String(id)) || null;
    return { post, overflow: false };
  } catch {
    safeLog("Failed to look up blog post by id", { id: sanitizeForLog(id) });
    return { post: null, overflow: false };
  }
}
