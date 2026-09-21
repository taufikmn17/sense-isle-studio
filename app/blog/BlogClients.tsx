"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Search, Tag, X } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "01",
    slug: "minimalist-architecture-trends-2026",
    title: "The Evolution of Minimalist Architecture in 2026",
    excerpt:
      "Exploring how sustainable materials, brutalist concrete accents, and fluid spatial zoning are redefining modern minimalist structures.",
    category: "Architecture",
    date: "March 24, 2026",
    image: "/images/services1.webp",
    featured: true,
  },
  {
    id: "02",
    slug: "curating-warmth-through-lighting",
    title: "Curating Warmth: The Art of Layered Lighting in Interior Design",
    excerpt:
      "Why lighting is the most crucial element in monochrome spaces, shifting moods from stark and industrial to intimate and organic.",
    category: "Interior Design",
    date: "March 18, 2026",
    image: "/images/services2.webp",
  },
  {
    id: "03",
    slug: "maximizing-compact-urban-spaces",
    title:
      "Smart Zoning: Maximizing Compact Urban Homes Without Compromising Style",
    excerpt:
      "Practical spatial techniques for small-footprint residences, utilizing custom built-ins and hidden storage systems.",
    category: "Renovation",
    date: "March 10, 2026",
    image: "/images/services3.webp",
  },
  {
    id: "04",
    slug: "bespoke-furniture-craftsmanship",
    title: "Bespoke vs. Mass Production: Why Custom Woodwork Lasts a Lifetime",
    excerpt:
      "An inside look into our workshop process and the meticulous selection of high-grade raw materials for custom joinery.",
    category: "Craftsmanship",
    date: "February 28, 2026",
    image: "/images/services4.webp",
  },
];

export default function BlogClients() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleActive = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // Logika Filter Pencarian
  const filteredPosts = blogPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  });

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];

  const isSearching = searchQuery.trim().length > 0;
  const displayPosts = isSearching
    ? filteredPosts
    : filteredPosts.filter((post) => post.id !== featuredPost.id);
  const showFeatured =
    !isSearching && filteredPosts.some((p) => p.id === featuredPost.id);

  const isFeaturedActive = activeId === featuredPost.id;

  return (
    <main className="w-full text-white min-h-screen bg-black">
      {/* Header Section */}
      <div className="w-full bg-black py-16 border-b border-white/15">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
                JOURNAL & INSIGHTS
              </span>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.15em] text-white mb-4">
                Our Blog
              </h1>
              <p className="text-zinc-400 text-sm md:text-base font-light tracking-[0.1em] max-w-xl">
                Thoughts, design philosophies, technical breakdowns, and
                behind-the-scenes stories from our studio.
              </p>
            </div>

            {/* Kotak Input Pencarian */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                <Search size={16} strokeWidth={1.5} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics..."
                className="w-full bg-zinc-900 border border-white/15 rounded-none py-3 pl-10 pr-10 text-xs md:text-sm text-white placeholder-zinc-500 font-light tracking-wider focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article Section */}
      {showFeatured && (
        <section className="w-full bg-zinc-900 border-b border-white/10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light block mb-6">
              FEATURED ARTICLE
            </span>

            <Link
              href={`/blog/${featuredPost.slug}`}
              onClick={() => toggleActive(featuredPost.id)}
              onMouseEnter={() => setActiveId(featuredPost.id)}
              onMouseLeave={() =>
                setActiveId((prev) => (prev === featuredPost.id ? null : prev))
              }
              className="group relative bg-zinc-900 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer select-none overflow-hidden p-6 md:p-8 block"
            >
              <div className="lg:col-span-7 relative h-[320px] md:h-[450px] overflow-hidden rounded-sm">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isFeaturedActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-4 text-xs font-light text-zinc-400 tracking-wider mb-3">
                    <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-[0.2em] bg-white/10 px-2.5 py-1 text-white">
                      <Tag size={12} /> {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {featuredPost.date}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white leading-snug mb-4 group-hover:text-zinc-200 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-white/10">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white relative py-2 group/btn">
                    <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">
                      Read Article
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover/btn:bg-white transition-colors duration-300" />
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover/btn:w-full" />
                  </div>
                </div>
              </div>

              {/* Garis aksen kiri saat aktif/hover */}
              <span
                className={`absolute left-0 top-0 h-full w-[2px] bg-white origin-top transition-transform duration-500 z-20 ${
                  isFeaturedActive ? "scale-y-100" : "scale-y-0"
                }`}
              />
            </Link>
          </div>
        </section>
      )}

      {/* Grid Card List Section */}
      <section className="w-full bg-black py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light">
              {isSearching
                ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`
                : "LATEST PUBLICATIONS"}
            </h3>
            <span className="text-xs text-zinc-500 font-light">
              Showing {displayPosts.length} entries
            </span>
          </div>

          {displayPosts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 bg-zinc-950">
              <p className="text-zinc-400 text-sm font-light mb-2">
                No articles found matching your search.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs uppercase tracking-widest text-white underline underline-offset-4 hover:text-zinc-300 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((post) => {
                const isActive = activeId === post.id;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={() => toggleActive(post.id)}
                    onMouseEnter={() => setActiveId(post.id)}
                    onMouseLeave={() =>
                      setActiveId((prev) => (prev === post.id ? null : prev))
                    }
                    className="group relative bg-zinc-900 border border-white/10 flex flex-col justify-between overflow-hidden transition-all duration-500"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-2.5 py-1 text-white border border-white/10">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-light text-zinc-400 mb-3">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>

                        <h4 className="text-xl font-light tracking-[0.05em] text-white leading-snug mb-3 group-hover:text-zinc-300 transition-colors">
                          {post.title}
                        </h4>

                        <p className="text-xs md:text-sm font-light text-zinc-400 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white relative py-2 group/btn">
                          <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">
                            Read Article
                          </span>
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover/btn:bg-white transition-colors duration-300" />
                          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover/btn:w-full" />
                        </div>
                      </div>
                    </div>

                    <span
                      className={`absolute left-0 top-0 h-full w-[2px] bg-white origin-top transition-transform duration-500 z-20 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
