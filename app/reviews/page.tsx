// app/reviews/page.tsx
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
    name: "Mr. Alexander Vance",
    role: "Private Residence Owner",
    comment:
      "Sense Isle Studio transformed our vision into an architectural masterpiece. Their attention to detail and spatial design exceeded all our expectations.",
  },
  {
    id: "2",
    name: "Mrs. Clara Santoso",
    role: "Commercial Property Developer",
    comment:
      "An exceptional team with high professionalism. They successfully delivered our modern commercial project on schedule and with stunning aesthetics.",
  },
  {
    id: "3",
    name: "Mr. David Wijaya",
    role: "Luxury Villa Client",
    comment:
      "Working with Sense Isle Studio was a seamless experience. They balance elegance and functionality perfectly in every corner of our home.",
  },
  {
    id: "4",
    name: "Ms. Sarah Jenkins",
    role: "Interior Design Client",
    comment:
      "Their minimalist yet luxurious design approach completely redefined our living space. Highly recommended for anyone seeking top-tier architectural design.",
  },
];

const googleMapsReviewUrl = "https://maps.app.goo.gl/nVBpuX7beRrVmCLg7";

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
        {/* Background Image */}
        <Image
          src="/images/reviewss.png"
          alt="Reviews Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay untuk menjaga kontras background secara keseluruhan */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Review Cards */}
        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="
                group
                relative
                min-h-[220px]
                p-6
                md:p-8
                flex
                flex-col
                justify-between
                text-left

                bg-black/50
                border
                border-white/15
                rounded-2xl
                shadow-2xl

                transition-all
                duration-500

                hover:bg-black/65
                hover:border-white/35
                hover:-translate-y-1
              "
            >
              {/* Top Content */}
              <div>
                {/* Quote + Number */}
                <div className="flex items-start justify-between mb-4">
                  <Quote
                    size={24}
                    strokeWidth={1}
                    className="
                      text-white/60
                      transition-colors
                      duration-500
                      group-hover:text-white
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      tracking-[0.3em]
                      text-white/40
                      transition-colors
                      duration-500
                      group-hover:text-white/70
                    "
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
                      className="
                        text-amber-400
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                    />
                  ))}
                </div>

                {/* Review */}
                <p
                  className="
                    text-xs
                    md:text-sm
                    leading-relaxed
                    font-light
                    tracking-wide
                    text-white/85
                    transition-colors
                    duration-500
                    group-hover:text-white
                  "
                >
                  “{review.comment}”
                </p>
              </div>

              {/* Bottom Content */}
              <div className="mt-6 pt-4 border-t border-white/10">
                {/* Client Name */}
                <h3
                  className="
                    text-xs
                    md:text-sm
                    font-medium
                    tracking-[0.12em]
                    text-white
                    transition-colors
                    duration-500
                  "
                >
                  {review.name}
                </h3>

                {/* Client Role */}
                <span
                  className="
                    mt-1
                    block
                    text-[8px]
                    md:text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/50
                    font-light
                    transition-colors
                    duration-500
                  "
                >
                  {review.role}
                </span>

                {/* Google Maps */}
                <a
                  href={googleMapsReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${review.name}'s reviews on Google Maps`}
                  className="
                    inline-block
                    mt-3
                    text-[8px]
                    md:text-[9px]
                    uppercase
                    tracking-[0.22em]
                    text-white/70
                    underline
                    underline-offset-4
                    transition-all
                    duration-300
                    hover:text-white
                  "
                >
                  View Reviews on Google Maps ↗
                </a>
              </div>

              {/* Bottom Hover Line */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-white
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
