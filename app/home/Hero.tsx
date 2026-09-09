import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative w-full h-[calc(100vh-theme(spacing.16))] min-h-[550px] flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero.jpeg"
          alt="Interior Architecture Background"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-90 scale-100"
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.25em] uppercase text-white drop-shadow-lg leading-tight">
          Interior Design & Architecture Services
        </h1>
        <p className="text-base sm:text-xl font-light text-zinc-300 tracking-[0.15em] drop-shadow-md">
          Safe, Comfortable, and Elegant Living Spaces
        </p>

        {/* Pill Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <span className="px-5 py-2 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-400 hover:text-white transition cursor-pointer font-light">
            Hotel + Resort
          </span>
          <span className="px-5 py-2 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-400 hover:text-white transition cursor-pointer font-light">
            Commercial + Office
          </span>
          <span className="px-5 py-2 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-400 hover:text-white transition cursor-pointer font-light">
            Developments
          </span>
          <span className="px-5 py-2 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-400 hover:text-white transition cursor-pointer font-light">
            Private Homes
          </span>
        </div>
      </div>
    </header>
  );
}
