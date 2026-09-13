"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Statistik from "./statistik/statistik";
import { PortfolioItem } from "@/services/portfolioService"; // <-- Import tipe data dari service

interface PortfolioClientProps {
  data: PortfolioItem[];
}

const FALLBACK_IMAGE = "/images/portfolio-placeholder.jpg";

function safeImageSrc(item: PortfolioItem): string {
  return item.image && item.image.length > 0 ? item.image : FALLBACK_IMAGE;
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  // 1. Urutkan data secara otomatis dari yang terbaru (ID terbesar / Tahun terbaru)
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const idA = Number(a.id) || 0;
      const idB = Number(b.id) || 0;

      if (idA !== idB) {
        return idB - idA;
      }

      return Number(b.year || 0) - Number(a.year || 0);
    });
  }, [data]);

  // 2. Deteksi kategori unik secara dinamis dari data yang sudah diurutkan
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      sortedData
        .map((item) => item.category?.toLowerCase().trim())
        .filter(Boolean)
    );
    return ["all", ...Array.from(uniqueCategories)];
  }, [sortedData]);

  // 3. Filter data berdasarkan tab kategori yang aktif
  const filteredProjects =
    activeTab === "all"
      ? sortedData
      : sortedData.filter(
          (item) => item.category?.toLowerCase().trim() === activeTab
        );

  return (
    <main className="flex-1 py-16 px-4 md:px-8 w-full max-w-7xl mx-auto">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.25em] uppercase mb-4 text-white">
            Our Portfolio
          </h1>
          <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto font-light tracking-[0.15em] mb-12">
            Complete collection of architecture and interior design works by
            Sense Isle Studio.
          </p>

          <Statistik />

          {/* Dynamic Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-all border rounded-lg ${
                  activeTab === tab
                    ? "bg-white border-white text-black font-light"
                    : "border-zinc-500 bg-black/40 backdrop-blur-md text-zinc-300 hover:border-white hover:text-white font-light"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Portofolio (Urut dari terbaru) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
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
                  <h3 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-sm tracking-[0.15em] uppercase font-light mb-4">
              Failed to load.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-white/40 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Reload Page
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
