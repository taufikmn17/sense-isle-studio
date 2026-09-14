// app/reviews/page.tsx
"use client";

import Image from "next/image";

export default function ReviewsPage() {
  return (
    <main className="w-full">
      {/* Header Section */}
      <div className="py-16 px-4 md:px-8 w-full max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
            TESTIMONIAL
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.15em] text-white mb-4">
            What They Say?
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-light tracking-[0.1em] max-w-xl">
            Discover what our valued clients say about their journey and
            collaboration with Sense Isle Studio.
          </p>
        </div>
      </div>

      {/* Full-Screen Background Section */}
      <section className="relative w-full min-h-[85vh] py-16 px-4 md:px-12 flex items-center justify-center overflow-hidden">
        {/* Background Image Original Full Screen */}
        <Image
          src="/images/hero1.webp"
          alt="Reviews Background"
          fill
          className="object-cover"
          priority
        />

        {/* Konten Widget Google Reviews Elfsight */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-626aaa1f-a797-436e-a272-030bb9f71370"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>
    </main>
  );
}
