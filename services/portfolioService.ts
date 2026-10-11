import { z } from "zod";
import { unstable_cache } from "next/cache";

// =====================================================================
// SCHEMA VALIDASI (per-item, bukan per-array)
// =====================================================================
const PortfolioItemSchema = z.object({
  // ✅ id: wajib string/number, max 50 karakter, tidak boleh kosong
  id: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim())
    .pipe(
      z
        .string()
        .min(1, "ID is required")
        .max(50, "ID is too long (max 50 characters)")
    ),

  title: z.string().max(200).default(""),
  category: z.string().max(100).default(""),

  image: z
    .any()
    .transform((val) => {
      const str = String(val || "").trim();
      return str.startsWith("https://") ? str : "";
    })
    .default(""),

  image2: z
    .any()
    .transform((val) => {
      const str = String(val || "").trim();
      return str.startsWith("https://") ? str : "";
    })
    .default(""),

  image3: z
    .any()
    .transform((val) => {
      const str = String(val || "").trim();
      return str.startsWith("https://") ? str : "";
    })
    .default(""),

  location: z.string().max(200).default(""),

  year: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim())
    .pipe(z.string().max(10))
    .default(""),

  description: z.string().max(5000).default(""),
  purpose: z.string().max(200).default(""),
});

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

// Batas maksimum array (mencegah payload raksasa / DoS)
const MAX_ARRAY_SIZE = 500;

// =====================================================================
// HASIL VALIDASI: bedakan antara "kosong" vs "over-limit"
// =====================================================================
export interface PortfolioValidationResult {
  data: PortfolioItem[];
  overflow: boolean; // true jika ADA item yang melampaui MAX
}

function validatePortfolioPayload(rawData: unknown): PortfolioValidationResult {
  if (!Array.isArray(rawData)) {
    return { data: [], overflow: false };
  }

  // Jika JUMLAH item melampaui MAX_ARRAY_SIZE → overflow
  if (rawData.length > MAX_ARRAY_SIZE) {
    return { data: [], overflow: true };
  }

  const validItems: PortfolioItem[] = [];
  let hasOverflow = false;

  for (const item of rawData) {
    // ✅ Baris tanpa ID / bukan object → skip, JANGAN tandai overflow
    if (
      !item ||
      typeof item !== "object" ||
      !("id" in item) ||
      String((item as Record<string, unknown>).id ?? "").trim() === ""
    ) {
      continue;
    }

    const parsed = PortfolioItemSchema.safeParse(item);
    if (parsed.success) {
      validItems.push(parsed.data);
    } else {
      // ✅ Baris dengan ID valid tapi ada field over-limit → overflow (404)
      hasOverflow = true;
    }
  }

  return { data: validItems, overflow: hasOverflow };
}

// =====================================================================
// SAFE LOGGER
// =====================================================================
function safeLog(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(`[portfolioService] ${message}`, meta ?? "");
  } else {
    // eslint-disable-next-line no-console
    console.error(`[portfolioService] ${message}`);
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

let lastGoodData: PortfolioItem[] | null = null;

// =====================================================================
// Satu kali percobaan fetch + validasi per-item
// =====================================================================
async function fetchOnce(
  url: string
): Promise<PortfolioValidationResult | null> {
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
    return validatePortfolioPayload(rawData);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      safeLog("Data source request timed out");
    } else {
      safeLog("Failed to fetch portfolio data");
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// =====================================================================
// Fetch dengan retry
// =====================================================================
async function fetchWithRetry(
  url: string
): Promise<PortfolioValidationResult | null> {
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
// Fungsi inti yang di-cache Next.js
// =====================================================================
const getCachedPortfolioData = unstable_cache(
  async (url: string): Promise<PortfolioValidationResult> => {
    const result = await fetchWithRetry(url);

    if (result !== null) {
      // Jika overflow, JANGAN simpan sebagai lastGoodData (data tidak layak)
      if (!result.overflow) {
        lastGoodData = result.data;
      }
      return result;
    }

    // Semua percobaan gagal - pakai data valid terakhir kalau ada
    if (lastGoodData !== null) {
      safeLog("Using last known good data after all retries failed");
      return { data: lastGoodData, overflow: false };
    }

    // Tidak ada fallback → lempar error agar TIDAK tersimpan ke cache
    throw new Error("Portfolio data unavailable and no fallback exists");
  },
  ["portfolio-data"],
  {
    revalidate: 3600,
    tags: ["portfolio"],
  }
);

export async function getPortfolioData(): Promise<PortfolioValidationResult> {
  const WEB_APP_URL = process.env.APPS_SCRIPT_URL;

  if (!WEB_APP_URL) {
    safeLog("Data source URL is not configured");
    return { data: lastGoodData ?? [], overflow: false };
  }

  try {
    return await getCachedPortfolioData(WEB_APP_URL);
  } catch {
    safeLog("Unexpected error while retrieving cached portfolio data");
    return { data: lastGoodData ?? [], overflow: false };
  }
}

// =====================================================================
// GET PORTFOLIO BY ID — return { item, overflow } agar bisa deteksi over-limit
// =====================================================================
export interface PortfolioByIdResult {
  item: PortfolioItem | null;
  overflow: boolean;
}

export async function getPortfolioById(
  id: string | number
): Promise<PortfolioByIdResult> {
  try {
    const { data, overflow } = await getPortfolioData();

    // ✅ Kalau ada data over-limit → return overflow = true
    if (overflow) {
      return { item: null, overflow: true };
    }

    if (!data || data.length === 0) {
      return { item: null, overflow: false };
    }

    const item = data.find((p) => String(p.id) === String(id)) || null;
    return { item, overflow: false };
  } catch {
    safeLog("Failed to look up portfolio by id", { id: sanitizeForLog(id) });
    return { item: null, overflow: false };
  }
}
