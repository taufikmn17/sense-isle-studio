/**
 * File pelengkap - WAJIB diterapkan di next.config.js proyek Anda.
 * Tanpa ini, validasi `startsWith("https://")` di portfolioService.ts saja
 * TIDAK CUKUP untuk mencegah Next.js Image Optimizer memuat gambar dari
 * domain arbitrer (potensi SSRF / resource exhaustion).
 *
 * Ganti daftar hostname di bawah dengan domain tempat gambar portofolio
 * Anda benar-benar disimpan (mis. Google Drive, Google Photos, atau CDN
 * gambar milik Anda sendiri).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // contoh: Google Photos/Drive thumbnail
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      // Tambahkan hanya domain yang benar-benar Anda percaya.
      // JANGAN gunakan wildcard seperti { hostname: "**" }.
    ],
    // Opsional: batasi ukuran output gambar untuk mengurangi beban optimizer
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;
