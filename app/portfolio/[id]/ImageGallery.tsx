"use client";

import Image from "next/image";
import { useRef } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
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

  return (
    <div className="mb-10">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-zinc-700 cursor-grab active:cursor-grabbing select-none"
      >
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[45%] aspect-[16/10] overflow-hidden border border-zinc-800 bg-zinc-900 snap-center pointer-events-none sm:pointer-events-auto"
          >
            <Image
              src={imgSrc}
              alt={`${title} - Photo ${index + 1}`}
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
  );
}
