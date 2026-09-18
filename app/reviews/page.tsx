// app/reviews/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  shortComment: string;
  timeAgo: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: "1",
    name: "Ebnu Sudarso",
    role: "Private Residence Owner",
    comment:
      "Worked with Sense Isle on a partial home renovation. Responsive throughout, incorporated our feedback without it getting lost between revisions, and delivered a design that felt genuinely considered rather than templated. What stood out most was how seriously they worked within a fixed budget — not by cutting corners or simplifying the brief, but by being smart about where it counted. The result doesn't look like a compromise. Highly recommend.",
    shortComment:
      "Worked with Sense Isle on a partial home renovation. Responsive throughout, incorporated our feedback without it getting lost...",
    timeAgo: "5 months ago",
  },
  {
    id: "2",
    name: "Andree Limardinata",
    role: "Private Residence Owner",
    comment: "Professional, collaborative, timely and excellent result.",
    shortComment: "Professional, collaborative, timely and excellent result.",
    timeAgo: "10 months ago",
  },
  {
    id: "3",
    name: "handriono kwa",
    role: "Private Residence Owner",
    comment:
      "Banyak memberi ide ide, mampu memahami keinginan pemesan, tetapi tetap memberi pandangan keahlian arsitektur sehingga menghasillan output yang excellent.",
    shortComment:
      "Banyak memberi ide ide, mampu memahami keinginan pemesan, tetapi tetap memberi pandangan keahlian...",
    timeAgo: "1 year ago",
  },
  {
    id: "4",
    name: "Verdo Reginald",
    role: "Private Residence Owner",
    comment:
      "Bagus, desain yang beragam, terutama desain minimalis dan mewah yang menarik.",
    shortComment:
      "Bagus, desain yang beragam, terutama desain minimalis dan mewah yang menarik.",
    timeAgo: "5 years ago",
  },
];

const googleMapsReviewUrl = "https://maps.app.goo.gl/nVBpuX7beRrVmCLg7";

export default function ReviewsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main className="w-full text-white min-h-screen">
      {/* Header Section */}
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
          src="/images/reviews.webp"
          alt="Reviews Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Review Cards */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {reviewsData.map((review) => {
            const isSelected = activeId === review.id;

            return (
              <div
                key={review.id}
                onClick={() => setActiveId(review.id)}
                className={`bg-white text-zinc-950 p-4.5 flex flex-col justify-between text-left select-none rounded-xl shadow-xl cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? "border-blue-600 ring-4 ring-blue-500/20 scale-[1.02]"
                    : "border-zinc-200 hover:border-blue-500 hover:scale-[1.02]"
                }`}
              >
                {/* Top Content */}
                <div>
                  {/* Google Header Badge Style */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base tracking-tighter text-zinc-800">
                        G
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500">
                        Review from Google
                      </span>
                    </div>
                  </div>

                  {/* Client Name & Time */}
                  <div className="mb-2">
                    <h3 className="text-xs font-semibold text-zinc-900 flex items-center gap-1">
                      {review.name}
                      <span className="text-blue-600 text-[10px]">✔</span>
                    </h3>
                    <span className="text-[10px] text-zinc-400 font-light">
                      {review.timeAgo}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={11}
                        strokeWidth={1}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review / Comment */}
                  <p className="text-[11px] md:text-xs leading-relaxed font-normal text-zinc-600">
                    “{review.shortComment}”
                  </p>
                </div>

                {/* Bottom Content */}
                <div className="mt-4 pt-3 border-t border-zinc-100">
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400 font-medium mb-1.5">
                    {review.role}
                  </span>

                  {/* Google Maps Link */}
                  <a
                    href={googleMapsReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${review.name}'s reviews on Google Maps`}
                    className="inline-block text-[11px] font-medium text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    See more on Google
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
