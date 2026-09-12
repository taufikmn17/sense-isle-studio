import Image from "next/image";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery"; // Komponen interaktif untuk galeri

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  image2?: string;
  image3?: string;
  location: string;
  year: string | number;
  description: string;
  purpose: string;
}

async function getPortfolioDetail(id: string): Promise<PortfolioItem | null> {
  const WEB_APP_URL = process.env.APPS_SCRIPT_URL;

  if (!WEB_APP_URL) {
    console.error("URL Apps Script belum disetel di environment variable!");
    return null;
  }

  try {
    const res = await fetch(WEB_APP_URL, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil data portfolio dari Google Sheets");
    }

    const data: PortfolioItem[] = await res.json();
    const found = data.find((item) => String(item.id) === String(id));

    return found || null;
  } catch (error) {
    console.error("Error fetching portfolio detail:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PortfolioDetailServer({ params }: PageProps) {
  const resolvedParams = await params;
  const project = await getPortfolioDetail(resolvedParams.id);

  if (!project) {
    notFound();
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
              {project.description ? (
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
