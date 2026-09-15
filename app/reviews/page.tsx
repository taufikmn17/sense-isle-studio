// app/reviews/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  comment: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "1",
    name: "Ebnu Sudarso",
    role: "Private Residence Owner",
    comment:
      "Worked with Sense Isle on a partial home renovation. Responsive throughout, incorporated our feedback without it getting lost between revisions, and delivered a design that felt genuinely considered rather than templated. What stood out most was how seriously they worked within a fixed budget — not by cutting corners or simplifying the brief, but by being smart about where it counted. The result doesn't look like a compromise. Highly recommend.",
  },
  {
    id: "2",
    name: "Handriono Kwa",
    role: "Private Residence Owner",
    comment:
      "Banyak memberi ide ide, mampu memahami keinginan pemesan, tetapi tetap memberi pandangan keahlian arsitektur sehingga menghasillan output yang excellent.",
  },
  {
    id: "3",
    name: "Andree Limardinata",
    role: "Private Residence Owner",
    comment: "Professional, collaborative, timely and excellent result.",
  },
  {
    id: "4",
    name: "Verdo Reginald",
    role: "Private Residence Owner",
    comment:
      "Bagus, desain yang beragam, terutama desain minimalis dan mewah yang menarik.",
  },
];

const googleMapsReviewUrl = "https://maps.app.goo.gl/nVBpuX7beRrVmCLg7";

export default function ReviewsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="w-full text-white min-h-screen">
      {/* Header Section — disamakan max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
      <div className="w-full bg-black py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
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
      <section className="relative w-full min-h-[85vh] py-16 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/reviewss.webp"
          alt="Reviews Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay untuk menjaga kontras background secara keseluruhan */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Review Cards — disamakan container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dengan grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsData.map((review) => {
            const isActive = activeId === review.id;

            return (
              <div
                key={review.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleActive(review.id)}
                onMouseEnter={() => setActiveId(review.id)}
                onMouseLeave={() =>
                  setActiveId((prev) => (prev === review.id ? null : prev))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleActive(review.id);
                  }
                }}
                className={`
                  relative
                  min-h-[220px]
                  p-6
                  md:p-8
                  flex
                  flex-col
                  justify-between
                  text-left
                  cursor-pointer
                  select-none

                  border
                  rounded-2xl
                  shadow-2xl

                  transition-all
                  duration-500

                  ${
                    isActive
                      ? "bg-black/65 border-white/35 -translate-y-1"
                      : "bg-black/50 border-white/15"
                  }
                `}
              >
                {/* Top Content */}
                <div>
                  {/* Quote + Number */}
                  <div className="flex items-start justify-between mb-4">
                    <Quote
                      size={24}
                      strokeWidth={1}
                      className={`transition-colors duration-500 ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    />

                    <span
                      className={`text-[9px] tracking-[0.3em] transition-colors duration-500 ${
                        isActive ? "text-white/70" : "text-white/40"
                      }`}
                    >
                      {review.id.padStart(2, "0")}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={12}
                        strokeWidth={1}
                        fill="currentColor"
                        className={`text-amber-400 transition-transform duration-500 ${
                          isActive ? "scale-110" : "scale-100"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p
                    className={`text-xs md:text-sm leading-relaxed font-light tracking-wide transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/85"
                    }`}
                  >
                    “{review.comment}”
                  </p>
                </div>

                {/* Bottom Content */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  {/* Client Name */}
                  <h3 className="text-xs md:text-sm font-medium tracking-[0.12em] text-white transition-colors duration-500">
                    {review.name}
                  </h3>

                  {/* Client Role */}
                  <span className="mt-1 block text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/50 font-light transition-colors duration-500">
                    {review.role}
                  </span>

                  {/* Google Maps */}
                  <a
                    href={googleMapsReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${review.name}'s reviews on Google Maps`}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-block mt-3 text-[8px] md:text-[9px] uppercase tracking-[0.22em] underline underline-offset-4 transition-all duration-300 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    View Reviews on Google Maps ↗
                  </a>
                </div>

                {/* Bottom Hover Line */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-500 ${
                    isActive ? "w-full" : "w-0"
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
