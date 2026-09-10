import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../data/portfolioData";

export default function HomePortfolio() {
  const residentialProjects = portfolioData.filter(
    (item) => item.category === "residential"
  );
  const commercialProjects = portfolioData.filter(
    (item) => item.category === "commercial"
  );

  return (
    <section className="py-16 px-4 md:px-8 w-full bg-black text-white">
      {/* Header Section Utama */}
      <div className="flex justify-between items-end mb-10 px-4">
        <div>
          <span className="text-zinc-300 text-xs uppercase tracking-[0.2em] font-light">
            Selected Works
          </span>
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-white mt-2">
            Featured Portfolio
          </h2>
        </div>
      </div>

      {/* --- BAGIAN RESIDENTIAL --- */}
      <div className="mb-16">
        <div className="px-4 mb-6 border-l-2 border-zinc-500">
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
            Residential
          </h3>
          <p className="text-xs text-zinc-300 uppercase tracking-[0.15em] font-light mt-1">
            Private living spaces & retreats
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {residentialProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/detail?id=${project.id}`}
              className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block mb-1">
                  {project.category}
                </span>
                <h4 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                  {project.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- BAGIAN COMMERCIAL --- */}
      <div className="mb-12">
        <div className="px-4 mb-6 border-l-2 border-zinc-500">
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-white">
            Commercial
          </h3>
          <p className="text-xs text-zinc-300 uppercase tracking-[0.15em] font-light mt-1">
            Public spaces, retail & offices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commercialProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/detail?id=${project.id}`}
              className="group relative block overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light block mb-1">
                  {project.category}
                </span>
                <h4 className="text-base md:text-lg font-light tracking-[0.15em] text-white">
                  {project.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tombol View All di Tengah Bawah */}
      <div className="text-center mt-12">
        <Link
          href="/portfolio"
          className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-white/40 bg-black/20 hover:bg-white hover:text-black text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] backdrop-blur-md transition-all duration-300 whitespace-nowrap"
        >
          View All Portfolio
        </Link>
      </div>
    </section>
  );
}
