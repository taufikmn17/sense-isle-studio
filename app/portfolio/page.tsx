"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../data/portfolioData";
import Statistik from "./statistik/statistik"; // Sesuaikan jalur impor jika diperlukan

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "residential" | "commercial"
  >("all");

  const filteredProjects =
    activeTab === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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

            {/* Komponen Statistik Terpisah dengan Efek Hitung */}
            <Statistik />

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {["all", "residential", "commercial"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
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

          {/* Grid Portofolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/detail?id=${project.id}`}
                className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
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
        </div>
      </main>
    </div>
  );
}
