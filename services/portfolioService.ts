import { z } from "zod";

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

const FETCH_TIMEOUT_MS = 8000;

export async function getPortfolioData(): Promise<PortfolioItem[]> {
  const WEB_APP_URL = process.env.APPS_SCRIPT_URL;

  if (!WEB_APP_URL) {
    // Tidak menyebut nama env var / detail konfigurasi secara eksplisit
    // di log produksi, cukup penanda internal.
    safeLog("Data source URL is not configured");
    return [];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(WEB_APP_URL, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      safeLog("Data source returned non-OK status", { status: res.status });
      return [];
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      safeLog("Data source returned unexpected content-type");
      return [];
    }

    const rawData = await res.json();

    // Validasi skema penuh - menolak seluruh payload jika struktur tidak
    // sesuai, daripada mencoba "menebak" bentuk data yang tidak dipercaya.
    const parsed = PortfolioArraySchema.safeParse(rawData);

    if (!parsed.success) {
      safeLog("Data source payload failed schema validation", {
        issueCount: parsed.error.issues.length,
      });
      return [];
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      safeLog("Data source request timed out");
    } else {
      safeLog("Failed to fetch portfolio data");
    }
    // Tidak pernah melempar error.message mentah ke pemanggil -
    // cukup kembalikan array kosong agar UI menampilkan fallback generik.
    return [];
  } finally {
    clearTimeout(timeoutId);
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
