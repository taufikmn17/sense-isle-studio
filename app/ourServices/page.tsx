// app/ourServices/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Compass, Armchair, Wrench, Hammer, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "ARCHITECTURE SERVICES",
    subtitle: "Conceptual & Technical Design",
    description:
      "We design building structures that blend modern aesthetics, precise spatial functionality, and harmony with the surrounding environment.",
    features: [
      "Master Planning & Concept Design",
      "3D Modeling & Visualization",
      "Detailed Engineering Design (DAD/DED)",
      "Regulatory & Permit Consultation",
      "Site Analysis & Feasibility Study",
      "Construction Supervision & Review",
    ],
    icon: <Compass size={26} strokeWidth={1} />,
    image: "/images/services1.webp",
  },
  {
    id: "02",
    title: "INTERIOR DESIGN",
    subtitle: "Spatial & Atmosphere Curating",
    description:
      "Creating characterful, warm, and personal interiors. Every material, lighting, and layout element is curated for maximum comfort.",
    features: [
      "Residential & Commercial Interior",
      "Lighting & Material Selection",
      "Space Planning & Layout",
      "Custom Interior Styling",
      "3D Realistic Interior Rendering",
      "Furniture & Decor Procurement",
    ],
    icon: <Armchair size={26} strokeWidth={1} />,
    image: "/images/services2.webp",
  },
  {
    id: "03",
    title: "HOME & OFFICE RENOVATION",
    subtitle: "Transformative Reconstruction",
    description:
      "Comprehensive or partial renovation solutions for your home or workspace, executed with discipline according to budget and timeline.",
    features: [
      "Partial & Full-House Renovation",
      "Office Space Makeover",
      "Structural & M&E Upgrades",
      "Quality Control & Budget Management",
    ],
    icon: <Wrench size={26} strokeWidth={1} />,
    image: "/images/services3.webp",
  },
  {
    id: "04",
    title: "CUSTOM-BUILT FURNITURE",
    subtitle: "Tailored Craftsmanship",
    description:
      "Bespoke custom furniture tailored precisely to your dimensions, preferred materials, and design style to stand out from mass-produced items.",
    features: [
      "Built-in Wardrobes & Kitchen Sets",
      "Custom Tables, Credenzas & Sofas",
      "High-grade Material & Finishing",
      "On-site Installation",
    ],
    icon: <Hammer size={26} strokeWidth={1} />,
    image: "/images/services4.webp",
  },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="w-full text-white min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-black py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
            WHAT WE OFFER
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.15em] text-white mb-4">
            Our Services
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light tracking-[0.1em] max-w-xl">
            Delivering bespoke architectural, interior, and craftsmanship
            solutions tailored to elevate your living and working spaces.
          </p>
        </div>
      </div>

      {/* Bagian Bawah: Editorial Rows */}
      <section className="w-full bg-zinc-900 border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicesData.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleActive(service.id)}
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() =>
                  setActiveId((prev) => (prev === service.id ? null : prev))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleActive(service.id);
                  }
                }}
                className="group relative border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 items-stretch transition-all duration-500 cursor-pointer select-none overflow-hidden"
              >
                {/* Sisi Kiri: Background Image dengan Nomor, Icon, Subtitle, dan Title */}
                <div className="lg:col-span-6 relative min-h-[320px] p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                  {/* Background Image - ikut melakukan zoom saat aktif (mobile/desktop) */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />

                  {/* Dark Gradient Overlay - Menjadi lebih transparan (cerah) saat aktif di mobile atau hover di desktop */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-black/30"
                        : "bg-black/50 group-hover:bg-black/30"
                    }`}
                  />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-5xl md:text-6xl font-extralight tracking-widest text-white/90">
                      {service.id}
                    </span>
                    <div className="text-white">{service.icon}</div>
                  </div>

                  <div className="relative z-10 mt-12">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-white/80 font-light mb-2">
                      {service.subtitle}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white leading-snug">
                      {service.title}
                    </h2>
                  </div>
                </div>

                {/* Sisi Kanan: Deskripsi, Fitur, dan Tombol Teks */}
                <div className="lg:col-span-6 bg-zinc-900 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-sm md:text-base font-light leading-relaxed text-zinc-300 mb-6">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-xs font-light text-zinc-300 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-4">
                    <a
                      href="#contact"
                      aria-label={`Explore ${service.title}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white relative py-2 group/btn"
                    >
                      <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">
                        Explore Service
                      </span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover/btn:bg-white transition-colors duration-300" />
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover/btn:w-full" />
                    </a>
                  </div>
                </div>

                {/* Garis aksen kiri saat aktif */}
                <span
                  className={`absolute left-0 top-0 h-full w-[2px] bg-white origin-top transition-transform duration-500 z-20 ${
                    isActive ? "scale-y-100" : "scale-y-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
