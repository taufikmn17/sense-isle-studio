"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Statistik from "../portfolio/statistik/statistik";

interface ValueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
}

const leadershipData = {
  sectionSubtitle: "LEADERSHIP",
  sectionTitle: "Our Founder",
  image: "/images/about2.webp",
  founder: {
    role: "FOUNDER & PRINCIPAL",
    name: "Stanley Prayogo, S.T",
    title: "Chief Executive Officer & Principal Architect",
    paragraphs: [
      "Founded Sense Isle Studio in 2016 and currently serves as its CEO. With extensive experience in architecture and interior design, along with an educational background at Petra Christian University, he has continued to develop his expertise and design perspective through years of professional experience before establishing an independent practice focused on exploring space, function, and architectural character.",
      "Under his creative direction, Sense Isle Studio has continued to grow through hundreds of completed architecture and interior design projects. Each project has contributed to a more refined design approach, responding to the needs of each client while creating spaces with a strong sense of character and function. With this experience, he leads Sense Isle Studio in delivering a diverse range of residential, commercial, and hospitality projects, with a design approach centered on detail, quality, and relevance.",
    ],
  },
  quote:
    "“Architecture is not merely about building walls; it is about framing moments, emotions, and light within a lived environment.”",
};

export default function AboutClient() {
  return (
    <main className="w-full text-white min-h-screen bg-black">
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
            Shaping spaces of enduring character through visionary architecture
            and meticulous interior design.
          </p>
        </div>
      </div>

      {/* 2. Story */}
      <section
        aria-labelledby="story-heading"
        className="w-full bg-zinc-900 border-t border-white/10 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light">
                  OUR PHILOSOPHY
                </span>
              </div>

              <h2
                id="story-heading"
                className="text-3xl md:text-5xl font-light tracking-[0.05em] text-white leading-snug"
              >
                A Legacy of Spatial Innovation
              </h2>

              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                We are an architecture and interior design studio based in
                Surabaya, Indonesia. We like to call ourselves “Dream Makers”,
                as we believe every dream home deserves to be thoughtfully
                designed and brought to life.
              </p>

              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                Established in 2010, Sense Isle Studio has grown into an
                architecture and interior design practice with experience across
                a wide range of design and build projects. Over the years, we
                have worked on residential, commercial, hospitality, and other
                architectural and interior projects throughout East Java and
                across Indonesia.
              </p>

              <p className="text-sm md:text-base font-light text-zinc-300 leading-relaxed">
                In every project, we bring our values and design philosophy into
                every detail of our work. For us, success is achieved when our
                clients achieve their goals. We strive to understand their
                needs, translate their ideas into meaningful spaces, and create
                designs that are functional, considered, and built to last.
              </p>
            </div>

            <div className="lg:col-span-6 relative h-[380px] md:h-[500px] border border-white/15 overflow-hidden">
              <Image
                src="/images/about1.webp"
                alt="Studio Atmosphere"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section
        aria-labelledby="mission-vision-heading"
        className="w-full bg-black border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-24">
            <div className="bg-zinc-900 border border-white/15 p-8 md:p-12 flex flex-col justify-between rounded-none shadow-xl relative overflow-hidden">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-[1px] bg-white/60"></span>
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-light">
                    OUR VISION
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-[0.02em] text-white leading-snug mb-8">
                  &quot;To become a trusted architecture and interior design
                  studio that transforms our clients’ aspirations into
                  meaningful, functional, and enduring spaces.&quot;
                </h3>
              </div>
            </div>

            <div className="bg-black border border-white/15 p-8 md:p-12 flex flex-col justify-between rounded-none shadow-xl relative overflow-hidden">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-[1px] bg-white"></span>
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light">
                    OUR MISSION
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-[0.02em] text-white leading-snug mb-8">
                  &quot;Create thoughtful architecture and interior solutions
                  that balance functionality, aesthetics, and the character of
                  each client.&quot;
                </h3>
              </div>
            </div>
          </div>

          <div>
            <Statistik />
          </div>
        </div>
      </section>

      {/* 4. Core Values / Presence */}
      <section
        aria-labelledby="values-heading"
        className="w-full bg-zinc-900 border-t border-white/15 py-16 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-light">
                OUR PRESENCE
              </span>
            </div>
            <h2
              id="values-heading"
              className="text-3xl md:text-4xl font-light tracking-[0.05em] text-white"
            >
              Where We Work
            </h2>
          </div>

          {/* Diperbesar menjadi max-w-3xl agar kotaknya lebih lebar proporsional */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-black/40 border border-white/15 p-10 md:p-14 flex flex-col justify-between rounded-none shadow-xl transition-all duration-300 hover:border-white/40">
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0">
                    <MapPin size={28} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium tracking-[0.08em] text-white">
                      SURABAYA
                    </h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-light block mt-0.5">
                      Headquarters
                    </span>
                  </div>
                </div>

                <p className="text-base md:text-lg font-light text-zinc-300 leading-relaxed">
                  Jl. Manyar Tirtoyoso Utara III No.6, Klampis Ngasem, Kec.
                  Sukolilo, Surabaya, Jawa Timur 60117
                </p>
              </div>

              <div className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-light">
                  Primary Studio
                </span>
                <span className="text-xs tracking-widest text-zinc-400 font-mono">
                  Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership - Single Founder Section */}
      <section
        aria-labelledby="leadership-heading"
        className="w-full bg-black border-t border-white/15 py-12 md:py-24"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-light">
                {leadershipData.sectionSubtitle}
              </span>
            </div>
            <h2
              id="leadership-heading"
              className="text-2xl sm:text-3xl md:text-5xl font-light tracking-[0.05em] text-white"
            >
              {leadershipData.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Foto Leadership */}
            <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-[3/4] border border-white/15 bg-zinc-900 overflow-hidden lg:sticky lg:top-8">
              <Image
                src={leadershipData.image}
                alt={leadershipData.founder.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Informasi Detail Founder */}
            <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-12 justify-center">
              <div className="space-y-3 md:space-y-4">
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-light block">
                  {leadershipData.founder.role}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.05em] text-white">
                    {leadershipData.founder.name}
                  </h3>
                  <p className="text-xs md:text-sm tracking-[0.1em] text-zinc-400 mt-1">
                    {leadershipData.founder.title}
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  {leadershipData.founder.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm md:text-base font-light text-zinc-300 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/15"></div>

              <div className="pt-2">
                <span className="w-8 h-[1px] bg-white block mb-4"></span>
                <blockquote className="text-xs sm:text-sm md:text-base font-light italic text-zinc-300 leading-relaxed">
                  {leadershipData.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Parallax / Fixed Background Section */}
      <section
        className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/about3.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 md:pb-24">
          <div className="max-w-xl bg-black/60 backdrop-blur-md border border-white/15 p-5 sm:p-6 md:p-8">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-light block mb-2">
              ARCHITECTURAL EXCELLENCE
            </span>
            <p className="text-xs sm:text-sm md:text-base font-light text-zinc-200 leading-relaxed">
              Transforming complex spatial concepts into tangible landmarks of
              elegance. Our multidisciplinary approach ensures holistic design
              coherence from foundation to interior styling.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Call To Action */}
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
              Share your vision and spatial requirements with us. Our team will
              reach out to coordinate the initial brief exploration.
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
