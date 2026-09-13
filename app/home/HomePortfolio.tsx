import Image from "next/image";
import Link from "next/link";
import {
  getPortfolioData,
  PortfolioItem,
} from "../../services/portfolioService"; // <-- Import dari service

// Fallback lokal (statis, aman) jika suatu item lolos validasi tapi
// field image kosong/tidak diisi di sheet - mencegah <Image> menerima
// src kosong yang bisa memicu error render.
const FALLBACK_IMAGE = "/images/portfolio-placeholder.jpg";

function safeImageSrc(item: PortfolioItem): string {
  return item.image && item.image.length > 0 ? item.image : FALLBACK_IMAGE;
}

export default async function HomePortfolio() {
  const data = await getPortfolioData(); // <-- Sudah divalidasi skema di service layer

  // Urutkan dari yang terbaru (ID terbesar / Tahun terbaru)
  const sortedData = [...data].sort((a, b) => {
    const idA = Number(a.id) || 0;
    const idB = Number(b.id) || 0;
    if (idA !== idB) return idB - idA;
    return Number(b.year || 0) - Number(a.year || 0);
  });

  // Filter dan batasi jumlah item sesuai permintaan
  const residentialProjects = sortedData
    .filter((item) => item.category?.toLowerCase().trim() === "residential")
    .slice(0, 12); // Maksimal 12 item

  const commercialProjects = sortedData
    .filter((item) => item.category?.toLowerCase().trim() === "commercial")
    .slice(0, 12); // Maksimal 12 item

  const hospitalityProjects = sortedData
    .filter((item) => item.category?.toLowerCase().trim() === "hospitality")
    .slice(0, 2); // Maksimal 2 item

  return (
    <section className="py-16 px-4 md:px-8 w-full bg-black text-white">
      {/* Header Section Utama */}
      <div className="flex justify-between items-end mb-10 px-4">
        <div>
          <span className="text-zinc-300 text-xs uppercase tracking-[0.2em] font-light">
            Selected Works
          </span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-white mt-2">
            Featured Portfolio
          </h2>
        </div>
      </div>

      {/* --- BAGIAN RESIDENTIAL (Maksimal 12) --- */}
      {residentialProjects.length > 0 && (
        <div className="mb-16">
          <div className="px-4 mb-6 border-l-2 border-zinc-500">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
              Residential
            </h3>
            <p className="text-xs text-zinc-300 uppercase tracking-[0.15em] font-light mt-1">
              Private living spaces & retreats
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {residentialProjects.map((project) => (
              <Link
                key={String(project.id)}
                href={`/portfolio/${encodeURIComponent(String(project.id))}`}
                className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
              >
                <Image
                  src={safeImageSrc(project)}
                  alt={project.title || "Portfolio project"}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                    {project.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- BAGIAN COMMERCIAL (Maksimal 12) --- */}
      {commercialProjects.length > 0 && (
        <div className="mb-16">
          <div className="px-4 mb-6 border-l-2 border-zinc-500">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
              Commercial
            </h3>
            <p className="text-xs text-zinc-300 uppercase tracking-[0.15em] font-light mt-1">
              Public spaces, retail & offices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {commercialProjects.map((project) => (
              <Link
                key={String(project.id)}
                href={`/portfolio/${encodeURIComponent(String(project.id))}`}
                className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
              >
                <Image
                  src={safeImageSrc(project)}
                  alt={project.title || "Portfolio project"}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                    {project.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- BAGIAN HOSPITALITY (Maksimal 2) --- */}
      {hospitalityProjects.length > 0 && (
        <div className="mb-12">
          <div className="px-4 mb-6 border-l-2 border-zinc-500">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
              Hospitality
            </h3>
            <p className="text-xs text-zinc-300 uppercase tracking-[0.15em] font-light mt-1">
              Hotels, resorts & leisure spaces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hospitalityProjects.map((project) => (
              <Link
                key={String(project.id)}
                href={`/portfolio/${encodeURIComponent(String(project.id))}`}
                className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
              >
                <Image
                  src={safeImageSrc(project)}
                  alt={project.title || "Portfolio project"}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                    {project.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Jika semua kategori kosong (gagal load / belum ada data) */}
      {residentialProjects.length === 0 &&
        commercialProjects.length === 0 &&
        hospitalityProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-sm tracking-[0.15em] uppercase font-light mb-4">
              Failed to load.
            </p>
            {/* Reload lewat link biasa (tanpa inline onClick di server component) */}
            <Link
              href="/"
              className="inline-block px-4 py-2 text-xs uppercase tracking-[0.2em] border border-white/40 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Reload Page
            </Link>
          </div>
        )}

      {/* Tombol View All di Tengah Bawah */}
      <div className="text-center mt-12">
        <Link
          href="/portfolio"
          className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-white/40 bg-black/20 hover:bg-white hover:text-black text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] backdrop-blur-md transition-all duration-300 whitespace-nowrap"
        >
          View All Portfolio
        </Link>
      </div>
    </section>
  );
}
