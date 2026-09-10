"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero1.webp",
    alt: "La Reve Villa",
    category: "ARSITEKTUR MODERN TROPIS BALI",
    title: "LA REVE VILLA",
    subtitle: "UMALAS | PRIVATE VILLA",
    buttonText: "VIEW PORTFOLIO",
    buttonLink: "/portfolio",
  },
  {
    image: "/images/hero2.webp",
    alt: "Serenity Resort & Spa",
    category: "HOTEL + RESORT ARCHITECTURE",
    title: "SERENITY RESORT",
    subtitle: "UBUD | LUXURY RESORT",
    buttonText: "VIEW PORTFOLIO",
    buttonLink: "/portfolio",
  },
  {
    image: "/images/hero3.webp",
    alt: "Aura Commercial Tower",
    category: "COMMERCIAL + OFFICE",
    title: "AURA TOWER",
    subtitle: "JAKARTA | MODERN OFFICE",
    buttonText: "VIEW PORTFOLIO",
    buttonLink: "/portfolio",
  },
  {
    image: "/images/hero4.webp",
    alt: "Horizon Developments",
    category: "MASTERPLAN DEVELOPMENTS",
    title: "HORIZON HILLS",
    subtitle: "CANGGU | RESIDENTIAL COMPLEX",
    buttonText: "VIEW PORTFOLIO",
    buttonLink: "/portfolio",
  },
  {
    image: "/images/hero5.webp",
    alt: "The Glass House Private Home",
    category: "PRIVATE HOMES",
    title: "THE GLASS HOUSE",
    subtitle: "SANUR | LUXURY RESIDENCE",
    buttonText: "VIEW PORTFOLIO",
    buttonLink: "/portfolio",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const currentSlide = slides[currentIndex];

  return (
    <header className="relative w-full h-auto min-h-[650px] lg:min-h-[calc(100vh-theme(spacing.16))] flex flex-col justify-center px-4 sm:px-8 md:px-16 py-12 overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover object-center w-full h-full brightness-90"
            />
          </div>
        ))}
        {/* Overlay Gelap Tipis */}
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>

      {/* Konten Utama */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-stretch justify-between gap-10 pt-6 pb-24">
        {/* Sisi Kiri: Judul dan Keterangan */}
        <div className="flex flex-col justify-start lg:justify-between text-left max-w-2xl transition-all duration-500 ease-in-out w-full lg:flex-1 min-w-0 gap-6 lg:gap-0">
          <div>
            <span className="text-[10px] sm:text-xs md:text-sm font-light tracking-[0.1em] sm:tracking-[0.25em] uppercase text-zinc-300 mb-2 sm:mb-3 drop-shadow whitespace-normal block">
              {currentSlide.category}
            </span>
            {/* Ukuran font mobile dinaikkan dari text-xl ke text-2xl / text-3xl agar lebih proporsional */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] sm:tracking-[0.1em] uppercase text-white drop-shadow-lg mb-2 sm:mb-4 leading-tight w-full">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm font-light tracking-[0.1em] sm:tracking-[0.2em] text-zinc-300 uppercase drop-shadow whitespace-normal">
              {currentSlide.subtitle}
            </p>
          </div>
          <div>
            <a
              href={currentSlide.buttonLink}
              className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-white/40 bg-black/20 hover:bg-white hover:text-black text-white text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] backdrop-blur-md transition-all duration-300 whitespace-nowrap"
            >
              {currentSlide.buttonText}
            </a>
          </div>
        </div>

        {/* Sisi Kanan: Judul Our Services & Kategori Vertikal */}
        <div className="flex flex-col justify-start lg:justify-between items-start lg:items-end shrink-0 w-full lg:w-[280px] gap-3 lg:gap-0">
          <h3 className="text-xs sm:text-sm md:text-base font-light uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white mb-2 lg:mb-1 text-left lg:text-right w-full">
            Our Services
          </h3>

          <div className="flex flex-col w-full gap-2.5">
            <div className="w-fit lg:w-full py-2.5 sm:py-3 px-4 rounded-lg border border-zinc-500 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.15em] text-zinc-300 hover:border-white hover:text-white transition cursor-pointer font-light text-left lg:text-right">
              Architecture Services
            </div>
            <div className="w-fit lg:w-full py-2.5 sm:py-3 px-4 rounded-lg border border-zinc-500 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.15em] text-zinc-300 hover:border-white hover:text-white transition cursor-pointer font-light text-left lg:text-right">
              Interior Design
            </div>
            <div className="w-fit lg:w-full py-2.5 sm:py-3 px-4 rounded-lg border border-zinc-500 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.15em] text-zinc-300 hover:border-white hover:text-white transition cursor-pointer font-light text-left lg:text-right">
              Home & Office Renovation
            </div>
            <div className="w-fit lg:w-full py-2.5 sm:py-3 px-4 rounded-lg border border-zinc-500 bg-black/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.15em] text-zinc-300 hover:border-white hover:text-white transition cursor-pointer font-light text-left lg:text-right">
              Custom-Built Furniture
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Tengah: Tombol Geser Kiri, Indikator Progress, & Tombol Geser Kanan */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 sm:gap-6 text-white">
        <button
          onClick={prevSlide}
          className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-zinc-800 transition"
          aria-label="Previous Slide"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 text-[10px] sm:text-xs tracking-widest">
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          <div className="flex gap-1 w-24 sm:w-32">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-[2px] cursor-pointer transition-all duration-500 ${
                  currentIndex === index
                    ? "w-full bg-white"
                    : "w-full bg-white/35"
                }`}
              />
            ))}
          </div>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>

        <button
          onClick={nextSlide}
          className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-zinc-800 transition"
          aria-label="Next Slide"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
