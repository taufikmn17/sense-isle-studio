// app/reviews/page.tsx
import Image from "next/image";

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

export default function ReviewsPage() {
  return (
    <main className="w-full">
      {/* Header Section (Gaya awal: rata kiri, label kecil di atas, judul besar, tanpa HOMEPAGE) */}
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

        {/* Konten Grid Kartu Testimoni dengan Transparan Putih */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 min-h-[220px]"
            >
              <h3 className="text-lg md:text-xl font-light tracking-[0.2em] text-white mb-1">
                {review.name}
              </h3>
              <span className="text-xs uppercase tracking-[0.15em] text-zinc-300 font-light mb-4 block">
                {review.role}
              </span>
              <p className="text-zinc-200 text-sm md:text-base font-light tracking-[0.1em] leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
