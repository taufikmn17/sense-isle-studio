import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// =====================================================================
// Endpoint ini dipanggil oleh Apps Script setiap kali sheet PORTFOLIO
// selesai diedit, supaya cache di Next.js langsung diperbarui tanpa
// perlu menunggu jadwal revalidate (1 jam).
//
// Dilindungi secret token (bukan lewat login) karena yang manggil adalah
// server-to-server (Apps Script -> Next.js), bukan browser user biasa.
// =====================================================================

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Bandingkan dengan secret yang disimpan di Environment Variables Vercel.
  // JANGAN pernah hardcode secret di kode - selalu dari process.env.
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    // Endpoint ini sengaja dimatikan kalau secret belum di-setup di Vercel,
    // supaya tidak ada endpoint revalidate publik tanpa proteksi.
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

  try {
    // Catatan: beberapa versi Next.js (terutama canary/experimental)
    // punya definisi tipe revalidateTag yang meminta argumen kedua
    // ("profile") untuk fitur cache eksperimental. Secara runtime,
    // memanggilnya dengan 1 argumen tetap valid dan berfungsi normal -
    // ini cuma menghindari TypeScript build error karena mismatch tipe.
    (revalidateTag as (tag: string) => void)("portfolio");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, message: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

// Tolak method selain POST supaya endpoint ini tidak bisa dipicu cuma
// dengan buka URL-nya di browser (GET).
export async function GET() {
  return NextResponse.json(
    { revalidated: false, message: "Method not allowed" },
    { status: 405 }
  );
}
