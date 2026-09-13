import ImageGallery from "./ImageGallery";
import { getPortfolioById } from "@/services/portfolioService"; // <-- Import dari service

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PortfolioDetailServer({ params }: PageProps) {
  const resolvedParams = await params;
  // Langsung panggil fungsi dari service untuk mencari data berdasarkan ID.
  // `getPortfolioById` sudah bekerja di atas data yang telah divalidasi skema
  // (lihat portfolioService.ts), jadi seluruh field di bawah ini dijamin
  // bertipe string sesuai PortfolioItemSchema.
  const project = await getPortfolioById(resolvedParams.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <div className="text-center py-20">
          <p className="text-zinc-400 text-sm tracking-[0.15em] uppercase font-light mb-4">
            Failed to load portfolio detail.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="inline-block px-4 py-2 text-xs uppercase tracking-[0.2em] border border-white/40 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            Reload Page
          </a>
        </div>
      </div>
    );
  }

  const projectImages = [project.image, project.image2, project.image3].filter(
    (img): img is string => Boolean(img)
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 px-4 md:px-8 py-16 w-full">
        <div className="w-full">
          {/* Kategori */}
          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block">
              {project.category} Project
            </span>
          </div>

          {/* Judul Proyek */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <h1 className="text-3xl md:text-5xl font-light tracking-[0.25em] uppercase text-white">
              {project.title}
            </h1>
          </div>

          {/* Detail Informasi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-zinc-800 py-6 mb-10 text-sm">
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Location
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {project.location}
              </span>
            </div>
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Year
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {project.year}
              </span>
            </div>
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Purpose
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {project.purpose}
              </span>
            </div>
          </div>

          {/* Galeri Foto dengan Drag-to-Scroll & Touch Scroll */}
          <ImageGallery images={projectImages} title={project.title} />

          {/* Deskripsi / Project Overview */}
          <div className="space-y-4 text-zinc-300 leading-relaxed w-full">
            <h3 className="text-xl font-light text-white uppercase tracking-[0.2em]">
              Project Overview
            </h3>
            <div className="font-light tracking-[0.05em] text-zinc-300 space-y-4 text-justify">
              {project.description && project.description.trim() !== "" ? (
                project.description
                  .split(/\r?\n+/)
                  .map((paragraph, index) =>
                    paragraph.trim() !== "" ? (
                      <p key={index}>{paragraph.trim()}</p>
                    ) : null
                  )
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
