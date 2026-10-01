import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  ShieldCheck,
  Sparkles,
  Building2,
  Armchair,
  Hammer,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import Statistik from "../portfolio/statistik/statistik";

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/*  Halaman ini sekarang Server Component, jadi metadata bisa dipakai.        */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: "About Us | Architecture, Interior & Craftsmanship Studio",
  description:
    "Meet our multidisciplinary studio: architecture, interior curation, and bespoke craftsmanship delivered with precision, transparency, and enduring character.",
  openGraph: {
    title: "About Us | Architecture, Interior & Craftsmanship Studio",
    description:
      "A multidisciplinary studio shaping spaces with enduring character.",
    type: "website",
    images: ["/images/services1.webp"],
  },
};

/* -------------------------------------------------------------------------- */
/*  DATA  (GANTI isi di bawah ini dengan data asli studio Anda)               */
/* -------------------------------------------------------------------------- */

interface IconItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
}

const coreValues: IconItem[] = [
  {
    id: "01",
    title: "UNCOMPROMISING CRAFT",
    subtitle: "Precision & Detail",
    description:
      "Every joint, material selection, and structural line is executed with absolute precision, merging aesthetic vision with lasting durability.",
    icon: <Sparkles size={24} strokeWidth={1} />,
  },
  {
    id: "02",
    title: "SPATIAL HARMONY",
    subtitle: "Form Meets Function",
    description:
      "We believe spaces should breathe, function intuitively, and evoke a profound sense of comfort and personal connection for those within them.",
    icon: <Target size={24} strokeWidth={1} />,
  },
  {
    id: "03",
    title: "TRANSPARENT PROCESS",
    subtitle: "Integrity & Timeline",
    description:
      "From initial concept sketch to final handover, we maintain rigorous discipline in budget management, communication, and scheduling.",
    icon: <ShieldCheck size={24} strokeWidth={1} />,
  },
];

const expertise = [
  {
    title: "Architecture",
    description:
      "Residential, commercial, and hospitality design from master planning to detailed construction documents.",
    icon: <Building2 size={28} strokeWidth={1} />,
  },
  {
    title: "Interior Design",
    description:
      "Space planning, material and lighting curation, and complete styling tailored to how you live and work.",
    icon: <Armchair size={28} strokeWidth={1} />,
  },
  {
    title: "Custom Furniture & Millwork",
    description:
      "Bespoke pieces and built-in joinery produced to exact specifications by experienced craftspeople.",
    icon: <Hammer size={28} strokeWidth={1} />,
  },
  {
    title: "Project Management",
    description:
      "On-site supervision, vendor coordination, budget control, and quality assurance through to handover.",
    icon: <ClipboardCheck size={28} strokeWidth={1} />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We listen first: your goals, lifestyle, site conditions, budget, and timeline.",
  },
  {
    step: "02",
    title: "Concept",
    description:
      "Mood boards, sketches, and spatial studies translate ideas into a clear design direction.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Detailed drawings, 3D visuals, material samples, and a defined scope and cost plan.",
  },
  {
    step: "04",
    title: "Execution",
    description:
      "Careful construction and fabrication with regular site reviews and progress reports.",
  },
  {
    step: "05",
    title: "Handover",
    description:
      "Final inspection, styling, documentation, and after-care so everything performs as designed.",
  },
];

// GANTI: nama, jabatan, dan foto. Kosongkan `image` untuk memakai inisial.
const team: { name: string; role: string; image?: string }[] = [
  { name: "Full Name", role: "Founder & Principal Architect" },
  { name: "Full Name", role: "Head of Interior Design" },
  { name: "Full Name", role: "Lead Project Manager" },
  { name: "Full Name", role: "Head of Craftsmanship" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */
export default function AboutPage() {
  return (
    <main className="w-full text-white min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-black py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
            ESTABLISHED DESIGN STUDIO
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.15em] text-white mb-4">
            About Us
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light tracking-[0.1em] max-w-xl">
            Shaping spaces of enduring character through architecture, interior
            curation, and bespoke craftsmanship.
          </p>
        </div>
      </div>

      {/* 2. Story + Stats */}
      <section
        aria-labelledby="story-heading"
        className="w-full bg-zinc-900 border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative h-[380px] md:h-[480px] border border-white/15 overflow-hidden">
              <Image
                src="/images/services1.webp"
                alt="Studio Atmosphere"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-md border border-white/10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                  OUR ROOTS
                </span>
                <p className="text-sm font-light text-zinc-200 tracking-wide">
                  Rooted in material mastery and meticulous spatial planning,
                  bringing sophisticated concepts to reality.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light">
                WHO WE ARE
              </span>
              <h2
                id="story-heading"
                className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white leading-snug"
              >
                Crafting Environments That Tell Your Unique Story
              </h2>
              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                Founded with a passion for architectural purity and interior
                atmosphere, our studio approaches every project as a distinct
                narrative. We bridge the gap between conceptual design and
                tangible execution, ensuring each structure or living space
                resonates with understated elegance.
              </p>
              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                Our in-house team of architects, designers, and master
                craftspeople works under one roof, which means tighter
                coordination, consistent quality, and a single point of
                accountability from first sketch to final detail.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24">
            <Statistik />
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section
        aria-labelledby="mission-heading"
        className="w-full bg-black border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              OUR DIRECTION
            </span>
            <h2
              id="mission-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/15">
            <article className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/15">
              <Target size={24} strokeWidth={1} className="text-white mb-8" />
              <h3 className="text-xl md:text-2xl font-light tracking-[0.05em] text-white mb-4">
                Our Mission
              </h3>
              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                To design and build spaces that improve daily life, delivered
                through honest communication, disciplined project management,
                and uncompromising attention to detail.
              </p>
            </article>

            <article className="p-8 md:p-12">
              <Eye size={24} strokeWidth={1} className="text-white mb-8" />
              <h3 className="text-xl md:text-2xl font-light tracking-[0.05em] text-white mb-4">
                Our Vision
              </h3>
              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                To be a trusted name in architecture and interior design, known
                for timeless work that balances beauty, function, and
                sustainability.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section
        aria-labelledby="values-heading"
        className="w-full bg-zinc-900 border-t border-white/15"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-10 text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              OUR PRINCIPLES
            </span>
            <h2
              id="values-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Core Values
            </h2>
          </div>

          <div className="space-y-0">
            {coreValues.map((value, index) => (
              <div
                key={value.id}
                className={`group relative border-x border-b border-white/15 ${
                  index === 0 ? "border-t" : ""
                } rounded-none grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden bg-zinc-900/50 shadow-xl`}
              >
                <div className="lg:col-span-6 relative p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-900">
                  <div className="flex items-start justify-between">
                    <span className="text-5xl md:text-6xl font-extralight tracking-widest text-white/90">
                      {value.id}
                    </span>
                    <div className="text-white">{value.icon}</div>
                  </div>

                  <div className="mt-12">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-white/80 font-light mb-2">
                      {value.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light tracking-[0.05em] text-white leading-snug">
                      {value.title}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-zinc-900 p-8 md:p-12 flex flex-col justify-between">
                  <p className="text-sm md:text-base font-light leading-relaxed text-zinc-300">
                    {value.description}
                  </p>
                  <div className="flex justify-end pt-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-500 py-2">
                      Standard Excellence
                    </span>
                  </div>
                </div>

                {/* Garis aksen: dikendalikan CSS, tidak perlu state/JS */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px] bg-white origin-top transition-transform duration-500 z-20 scale-y-0 group-hover:scale-y-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Expertise */}
      <section
        aria-labelledby="expertise-heading"
        className="w-full bg-black border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              WHAT WE DO
            </span>
            <h2
              id="expertise-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Our Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/15">
            {expertise.map((item) => (
              <article
                key={item.title}
                className="p-8 border-r border-b border-white/15 bg-black"
              >
                <div className="text-white mb-8">{item.icon}</div>
                <h3 className="text-lg font-light tracking-[0.08em] text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Process */}
      <section
        aria-labelledby="process-heading"
        className="w-full bg-zinc-900 border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              HOW WE WORK
            </span>
            <h2
              id="process-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Our Process
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 border border-white/15">
            {processSteps.map((item, index) => (
              <li
                key={item.step}
                className={`p-8 border-white/15 ${
                  index < processSteps.length - 1
                    ? "border-b md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <span className="text-4xl font-extralight tracking-widest text-white/90 block mb-6">
                  {item.step}
                </span>
                <h3 className="text-lg font-light tracking-[0.08em] text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Team */}
      <section
        aria-labelledby="team-heading"
        className="w-full bg-black border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              THE PEOPLE
            </span>
            <h2
              id="team-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Meet The Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <article key={`${member.name}-${index}`}>
                <div className="relative aspect-[3/4] border border-white/15 bg-zinc-900 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center text-5xl font-extralight tracking-widest text-zinc-600"
                    >
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-base font-light tracking-[0.08em] text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-light">
                  {member.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action */}
      <section
        aria-labelledby="cta-heading"
        className="w-full bg-zinc-900 border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
              LET&apos;S TALK
            </span>
            <h2
              id="cta-heading"
              className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white leading-snug"
            >
              Have a Project in Mind?
            </h2>
            <p className="mt-4 text-sm md:text-base font-light text-zinc-300 leading-relaxed">
              Tell us about your space and goals. We will get back to you to
              discuss the next steps.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 border border-white px-8 py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start a Project
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
