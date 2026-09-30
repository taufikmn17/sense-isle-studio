import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// =====================================================================
// Dipanggil Apps Script setiap kali sheet PORTFOLIO atau BLOG diedit.
// Parameter ?tag= menentukan cache mana yang diperbarui.
// Tanpa parameter tag -> default "portfolio" (kompatibel dengan trigger lama).
// =====================================================================

// Whitelist: hanya tag ini yang boleh di-revalidate lewat endpoint ini
const ALLOWED_TAGS = ["portfolio", "blog"] as const;
type AllowedTag = (typeof ALLOWED_TAGS)[number];

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Revalidate endpoint not configured" },
      { status: 500 }
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid or missing secret" },
      { status: 401 }
    );
  }

  const tagParam = request.nextUrl.searchParams.get("tag") ?? "portfolio";

  if (!(ALLOWED_TAGS as readonly string[]).includes(tagParam)) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid tag" },
      { status: 400 }
    );
  }

  const tag = tagParam as AllowedTag;

  try {
    // Cast 1 argumen: menghindari mismatch tipe di versi Next.js tertentu
    (revalidateTag as (tag: string) => void)(tag);
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { revalidated: false, message: "Method not allowed" },
    { status: 405 }
  );
}
