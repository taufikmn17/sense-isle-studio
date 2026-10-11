import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery";
import { getPortfolioById } from "@/services/portfolioService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='20' letter-spacing='4'>SENSE ISLE STUDIO</text></svg>";

// =====================================================================
// HELPER FORMAT TEKS
// =====================================================================

// ✅ Title Case: huruf besar di awal tiap kata
function toTitleCase(text: string): string {
  if (!text) return "";
  const smallWords = [
    "a",
    "an",
    "and",
    "the",
    "of",
    "in",
    "on",
    "at",
    "to",
    "for",
    "by",
    "with",
    "&",
  ];
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      if (smallWords.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// ✅ Sentence Case: huruf besar hanya di awal kalimat
function toSentenceCase(text: string): string {
  if (!text) return "";
  const trimmed = text.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

// =====================================================================
// ✅ GENERATE METADATA — untuk title tab browser
// =====================================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { item: project, overflow } = await getPortfolioById(id);

  // ✅ Guard: kalau overflow atau project null → metadata 404
  if (overflow || !project) {
    return {
      title: "Portfolio not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // ✅ Deskripsi dari description (dipotong 160 karakter)
  const description = (project.description ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      images: project.image ? [project.image] : undefined,
    },
  };
}

// =====================================================================
// SERVER COMPONENT
// =====================================================================
export default async function PortfolioDetailServer({ params }: PageProps) {
  const resolvedParams = await params;

  // ✅ SAMA SEPERTI BLOG: destructure { item, overflow }
  const { item: project, overflow } = await getPortfolioById(resolvedParams.id);

  // ✅ SAMA SEPERTI BLOG: cek overflow || !project → 404
  if (overflow || !project) {
    notFound();
  }

  const projectImages = [
    project.image && project.image.trim() !== ""
      ? project.image
      : FALLBACK_IMAGE,
    project.image2 && project.image2.trim() !== ""
      ? project.image2
      : FALLBACK_IMAGE,
    project.image3 && project.image3.trim() !== ""
      ? project.image3
      : FALLBACK_IMAGE,
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 py-16 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Kategori */}
          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block">
              {toTitleCase(project.category)} Project
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
            {/* Location — Title Case */}
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Location
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {toTitleCase(project.location)}
              </span>
            </div>

            {/* Year — Biarkan apa adanya */}
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Year
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {project.year}
              </span>
            </div>

            {/* Purpose — Sentence Case */}
            <div>
              <span className="block text-zinc-400 text-xs uppercase tracking-[0.2em] font-light mb-1">
                Purpose
              </span>
              <span className="font-light tracking-[0.1em] text-zinc-200">
                {toSentenceCase(project.purpose)}
              </span>
            </div>
          </div>

          {/* Galeri Foto */}
          <ImageGallery images={projectImages} title={project.title} />

          {/* Deskripsi / Project Overview — Sentence Case per paragraf */}
          <div className="space-y-4 text-zinc-300 leading-relaxed w-full mt-10">
            <h3 className="text-xl font-light text-white uppercase tracking-[0.2em]">
              Project Overview
            </h3>
            <div className="font-light tracking-[0.05em] text-zinc-300 space-y-4 text-justify">
              {project.description && project.description.trim() !== "" ? (
                project.description
                  .split(/\r?\n+/)
                  .map((paragraph, index) =>
                    paragraph.trim() !== "" ? (
                      <p key={index}>{toSentenceCase(paragraph.trim())}</p>
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
