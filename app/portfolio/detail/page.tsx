"use client";

import { useSearchParams } from "next/navigation";
import { portfolioData } from "../../data/portfolioData";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useRef } from "react";

function DetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const project = portfolioData.find((item) => item.id === id);

  // Reference untuk elemen scroll galeri
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (scrollContainerRef.current) {
      startX = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4 md:px-8 py-20 text-center">
          <h1 className="text-2xl font-light tracking-[0.2em] uppercase mb-4 text-white">
            Proyek tidak ditemukan
          </h1>
        </main>
      </div>
    );
  }

  const projectImages = [
    project.image,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Padding container utama disamakan dengan navbar: px-4 md:px-8 */}
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

          {/* Galeri Foto dengan Smooth Scroll & Drag-to-Scroll */}
          <div className="mb-10">
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-zinc-700 cursor-grab active:cursor-grabbing select-none"
            >
              {projectImages.map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[45%] aspect-[16/10] overflow-hidden border border-zinc-800 bg-zinc-900 snap-center pointer-events-none sm:pointer-events-auto"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} - Photo ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-[11px] uppercase tracking-[0.2em] font-light mt-2 text-center md:text-left">
              ← Drag or scroll to view more photos →
            </p>
          </div>

          {/* Deskripsi / Project Overview */}
          <div className="space-y-4 text-zinc-300 leading-relaxed max-w-4xl">
            <h3 className="text-xl font-light text-white uppercase tracking-[0.2em]">
              Project Overview
            </h3>
            <p className="font-light tracking-[0.05em] text-zinc-300">
              {project.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PortfolioDetail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-light tracking-[0.2em] uppercase text-xs">
          Loading...
        </div>
      }
    >
      <DetailContent />
    </Suspense>
  );
}
