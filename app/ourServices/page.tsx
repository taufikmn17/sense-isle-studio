// app/ourServices/page.tsx
"use client";

import React, { useState } from "react";
import { Compass, Armchair, Wrench, Hammer, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
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
    ],
    icon: <Compass size={26} strokeWidth={1} />,
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
    ],
    icon: <Armchair size={26} strokeWidth={1} />,
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
        <div className="text-left w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className={`group relative border-b border-white/10 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start transition-all duration-500 cursor-pointer select-none ${
                  isActive ? "pl-4 md:pl-8" : "pl-0"
                }`}
              >
                {/* Kolom nomor + icon */}
                <div className="md:col-span-2 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-4">
                  <span
                    className={`text-5xl md:text-6xl font-extralight tracking-widest transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {service.id}
                  </span>
                  <div className="text-white transition-colors duration-500">
                    {service.icon}
                  </div>
                </div>

                {/* Kolom judul + subtitle */}
                <div className="md:col-span-4">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-white/80 font-light mb-2">
                    {service.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-light tracking-[0.05em] text-white leading-snug">
                    {service.title}
                  </h2>
                </div>

                {/* Kolom deskripsi + fitur */}
                <div className="md:col-span-5">
                  <p className="text-sm md:text-base font-light leading-relaxed text-white mb-5">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`text-xs font-light transition-colors duration-500 flex items-center gap-2 ${
                          isActive ? "text-white" : "text-white/80"
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-white shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Kolom arrow */}
                <div className="md:col-span-1 flex md:justify-end">
                  <a
                    href="#contact"
                    aria-label={`Consult ${service.title}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full border text-white transition-all duration-500 ${
                      isActive
                        ? "border-white rotate-45"
                        : "border-white/40 rotate-0"
                    }`}
                  >
                    <ArrowUpRight size={16} strokeWidth={1.25} />
                  </a>
                </div>

                {/* Garis aksen kiri saat aktif */}
                <span
                  className={`absolute left-0 top-0 h-full w-[2px] bg-white origin-top transition-transform duration-500 ${
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
