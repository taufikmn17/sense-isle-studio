"use client";

import { useState, useEffect, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 450, suffix: "+", label: "Proyek" },
  { value: 6, suffix: "", label: "Negara" },
  { value: 16, suffix: "+", label: "Tahun" },
  { value: 4, suffix: "", label: "Penghargaan" },
];

export default function Statistik() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
            const incrementTime = Math.max(Math.floor(duration / end), 20);

            const timer = setInterval(() => {
              start += Math.ceil(end / (duration / incrementTime));
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = start;
                return newCounts;
              });
            }, incrementTime);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 mb-12 rounded-xl border border-zinc-500 bg-zinc-950/60 backdrop-blur-md max-w-4xl mx-auto"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center pb-6 md:pb-0 pt-2 md:pt-0 ${
            // Item 0 (Proyek): Border bawah (mobile) & Border kanan (desktop)
            index === 0
              ? "border-b border-zinc-500 md:border-b-0 md:border-r"
              : // Item 1 (Negara): Border bawah (mobile) & Border kanan (desktop)
              index === 1
              ? "border-b border-zinc-500 md:border-b-0 md:border-r"
              : // Item 2 (Tahun): Hanya border kanan di desktop (di mobile tidak ada bawah karena item 3 di sebelah kanannya)
              index === 2
              ? "md:border-r border-zinc-500"
              : ""
          }`}
        >
          <span className="text-3xl md:text-4xl font-light tracking-[0.15em] text-white mb-1">
            {counts[index]}
            {stat.suffix}
          </span>
          <span className="text-[10px] md:text-xs font-light tracking-[0.25em] uppercase text-zinc-400">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
