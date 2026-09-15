import { z } from "zod";
import { unstable_cache } from "next/cache";

// =====================================================================
// SCHEMA VALIDASI (mitigasi: Insecure Deserialization, Type Confusion,
// data cacat yang bisa merusak render / memicu DoS sisi klien)
// =====================================================================
const PortfolioItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().max(200).default(""),
  category: z.string().max(100).default(""),
  // Hanya izinkan URL https - mencegah javascript:, data:, dan skema berbahaya
  // lain masuk ke next/image (mitigasi SSRF via Image Optimizer)
  image: z.string().url().startsWith("https://"),
  image2: z.string().url().startsWith("https://").optional().or(z.literal("")),
  image3: z.string().url().startsWith("https://").optional().or(z.literal("")),
  location: z.string().max(200).default(""),
  year: z.union([z.string(), z.number()]),
  description: z.string().max(5000).default(""),
  purpose: z.string().max(200).default(""),
});

// Batasi ukuran array untuk mencegah payload raksasa membebani SSR (DoS)
const PortfolioArraySchema = z.array(PortfolioItemSchema).max(500);

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

// =====================================================================
// SAFE LOGGER
// Tidak pernah mencetak payload mentah / detail internal ke log produksi.
// Di production, hanya pesan generik + metadata ringkas yang dicatat.
// =====================================================================
function safeLog(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(`[portfolioService] ${message}`, meta ?? "");
  } else {
    // eslint-disable-next-line no-console
    console.error(`[portfolioService] ${message}`);
    // TODO: kirim ke logging service (Sentry/Datadog) dengan meta yang sudah
    // disaring (jangan sertakan payload/URL mentah).
  }
}

// Membatasi panjang string yang boleh masuk ke log (mitigasi log injection /
// log flooding lewat parameter seperti `id`)
function sanitizeForLog(value: unknown): string {
  return String(value)
    .replace(/[\r\n]/g, " ")
    .slice(0, 100);
}

const FETCH_TIMEOUT_MS = 12000; // dinaikkan dari 8000 - Apps Script kadang cold start
const MAX_RETRIES = 2; // total percobaan = 1 awal + 2 retry = 3x
const RETRY_DELAY_MS = 700;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================================================
// FALLBACK MEMORY CACHE
// Menyimpan data valid TERAKHIR yang berhasil didapat, dalam variabel
// module-level. Ini bertahan selama instance server function masih "warm"
// (tidak reset tiap request, tapi bisa reset saat cold start baru di Vercel).
// Tujuannya: kalau semua percobaan fetch gagal, kita tampilkan data lama
// yang masih valid daripada array kosong / UI "Failed to load".
// =====================================================================
let lastGoodData: PortfolioItem[] | null = null;

// =====================================================================
// Satu kali percobaan fetch + validasi. TIDAK pakai Next fetch-cache
// (cache: "no-store") supaya setiap retry benar-benar hit jaringan,
// bukan kena cache dari percobaan sebelumnya.
// =====================================================================
async function fetchOnce(url: string): Promise<PortfolioItem[] | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
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

    const parsed = PortfolioArraySchema.safeParse(rawData);

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
      safeLog("Failed to fetch portfolio data");
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// =====================================================================
// Fetch dengan retry. Mencoba beberapa kali sebelum benar-benar menyerah -
// mengatasi kegagalan sesaat (cold start Apps Script, limit eksekusi
// simultan, dsb) yang sifatnya sementara.
// =====================================================================
async function fetchWithRetry(url: string): Promise<PortfolioItem[] | null> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const result = await fetchOnce(url);
    if (result !== null) {
      return result;
    }
    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * (attempt + 1)); // backoff bertahap
    }
  }
  return null;
}

// =====================================================================
// Fungsi inti yang di-cache oleh Next.js (unstable_cache) - BUKAN fetch
// mentahnya. Ini memastikan yang tersimpan di cache bersama (dipakai semua
// user) adalah HASIL YANG SUDAH TERVALIDASI, bukan respons mentah yang bisa
// jadi HTML error ber-status 200 dari Apps Script.
// =====================================================================
const getCachedPortfolioData = unstable_cache(
  async (url: string): Promise<PortfolioItem[]> => {
    const data = await fetchWithRetry(url);

    if (data !== null) {
      lastGoodData = data; // simpan sebagai fallback untuk kegagalan berikutnya
      return data;
    }

    // Semua percobaan gagal - pakai data valid terakhir kalau ada,
    // daripada langsung mengembalikan array kosong ke semua user.
    if (lastGoodData !== null) {
      safeLog("Using last known good data after all retries failed");
      return lastGoodData;
    }

    // PENTING: tidak ada fallback sama sekali (misal baru cold start dan
    // Apps Script juga lagi bermasalah). Lempar error di sini, JANGAN
    // "return []" - kalau return [], unstable_cache akan menyimpan array
    // kosong itu sebagai "hasil sukses" selama 30 menit penuh. Dengan
    // melempar error, Next.js TIDAK menyimpan hasil ini ke cache, sehingga
    // request berikutnya akan langsung mencoba fetch ulang dari awal,
    // bukan menunggu jadwal revalidate berikutnya.
    throw new Error("Portfolio data unavailable and no fallback exists");
  },
  ["portfolio-data"],
  {
    revalidate: 3600, // 1 jam - ini cuma JARING PENGAMAN kalau on-demand revalidation gagal terpicu
    tags: ["portfolio"], // dipakai revalidateTag() di /api/revalidate untuk update instan
  }
);

export async function getPortfolioData(): Promise<PortfolioItem[]> {
  const WEB_APP_URL = process.env.APPS_SCRIPT_URL;

  if (!WEB_APP_URL) {
    safeLog("Data source URL is not configured");
    return lastGoodData ?? [];
  }

  try {
    return await getCachedPortfolioData(WEB_APP_URL);
  } catch (error) {
    safeLog("Unexpected error while retrieving cached portfolio data");
    return lastGoodData ?? [];
  }
}

export async function getPortfolioById(
  id: string | number
): Promise<PortfolioItem | null> {
  try {
    const data = await getPortfolioData();
    if (!data || data.length === 0) return null;

    const item = data.find((p) => String(p.id) === String(id));
    return item || null;
  } catch {
    // `id` disaring dulu sebelum masuk log (mitigasi log injection)
    safeLog("Failed to look up portfolio by id", { id: sanitizeForLog(id) });
    return null;
  }
}
