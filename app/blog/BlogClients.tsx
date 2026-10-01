"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Search, Tag, X } from "lucide-react";
import {
  BlogPost,
  formatBlogDate,
  parseBlogDate,
} from "@/services/blogService";

interface BlogClientsProps {
  data: BlogPost[];
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='20' letter-spacing='4'>SENSE ISLE STUDIO</text></svg>";

function safeImageSrc(post: BlogPost): string {
  return post.image && post.image.length > 0 ? post.image : FALLBACK_IMAGE;
}

// Ringkasan untuk kartu, diambil dari kolom description di sheet
function makeExcerpt(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "..." : clean;
}

export default function BlogClients({ data }: BlogClientsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleActive = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // 1. FEATURED: Paksa ambil ID 1 (toleransi tipe data string/number)
  const featuredPost: BlogPost | undefined = useMemo(() => {
    return data.find(
      (post) => Number(post.id) === 1 || String(post.id).trim() === "1"
    );
  }, [data]);

  const featuredId = featuredPost ? String(featuredPost.id) : null;

  // 2. SORTING: Urutkan data untuk grid di bawah (kecualikan ID 1 agar tidak duplikat)
  const sortedPosts = useMemo(() => {
    return [...data]
      .filter((post) => Number(post.id) !== 1 && String(post.id).trim() !== "1")
      .sort((a, b) => {
        const dateA = parseBlogDate(a.date)?.getTime() ?? 0;
        const dateB = parseBlogDate(b.date)?.getTime() ?? 0;
        if (dateA !== dateB) return dateB - dateA;
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      });
  }, [data]);

  // Logika filter pencarian (judul, isi, kategori)
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return sortedPosts;
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
  }, [sortedPosts, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  // Jika sedang mencari, gunakan hasil filter. Jika tidak, tampilkan sortedPosts biasa.
  const displayPosts = filteredPosts;

  const showFeatured = !isSearching && !!featuredPost;
  const isFeaturedActive = featuredId !== null && activeId === featuredId;

  // Belum ada data sama sekali (sheet kosong / gagal dimuat)
  const hasNoData = data.length === 0;

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
                aria-label="Search articles"
                className="w-full bg-zinc-900 border border-white/15 rounded-none py-3 pl-10 pr-10 text-xs md:text-sm text-white placeholder-zinc-500 font-light tracking-wider focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Kondisi data kosong / gagal dimuat */}
      {hasNoData && (
        <section className="w-full bg-black py-20">
          <div className="text-center">
            <p className="text-zinc-400 text-sm tracking-[0.15em] uppercase font-light mb-4">
              No articles available.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-white/40 hover:bg-white hover:text-black transition-colors"
            >
              Reload Page
            </button>
          </div>
        </section>
      )}

      {/* Featured Article Section (ID 1) */}
      {showFeatured && featuredPost && (
        <section className="w-full bg-zinc-900 border-b border-white/10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light block mb-6">
              FEATURED ARTICLE
            </span>

            <Link
              href={`/blog/${encodeURIComponent(String(featuredPost.id))}`}
              onClick={() => toggleActive(String(featuredPost.id))}
              onMouseEnter={() => setActiveId(String(featuredPost.id))}
              onMouseLeave={() =>
                setActiveId((prev) =>
                  prev === String(featuredPost.id) ? null : prev
                )
              }
              className="group relative bg-zinc-900 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer select-none overflow-hidden p-6 md:p-8"
            >
              <div className="lg:col-span-7 relative h-[320px] md:h-[450px] overflow-hidden rounded-sm">
                <Image
                  src={safeImageSrc(featuredPost)}
                  alt={featuredPost.title || "Featured article"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
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
                      <Calendar size={12} /> {formatBlogDate(featuredPost.date)}
                    </span>
                  </div>

                  {/* Efek hover warna teks dihilangkan, tetap menggunakan text-white */}
                  <h2 className="text-2xl md:text-4xl font-light tracking-[0.05em] text-white leading-snug mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm md:text-base font-light text-zinc-400 leading-relaxed mb-6">
                    {makeExcerpt(featuredPost.description, 220)}
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

      {/* Grid Card List Section (Urut Terbaru, Kecuali ID 1) */}
      {!hasNoData && !(showFeatured && displayPosts.length === 0) && (
        <section className="w-full bg-black py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light">
                {isSearching
                  ? `SEARCH RESULTS FOR "${searchQuery.trim().toUpperCase()}"`
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
                  const postId = String(post.id);
                  const isActive = activeId === postId;

                  return (
                    <Link
                      key={postId}
                      href={`/blog/${encodeURIComponent(postId)}`}
                      onClick={() => toggleActive(postId)}
                      onMouseEnter={() => setActiveId(postId)}
                      onMouseLeave={() =>
                        setActiveId((prev) => (prev === postId ? null : prev))
                      }
                      className="group relative bg-zinc-900 border border-white/10 flex flex-col justify-between overflow-hidden transition-all duration-500"
                    >
                      <div className="relative h-60 w-full overflow-hidden">
                        <Image
                          src={safeImageSrc(post)}
                          alt={post.title || "Blog post"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                            <span>{formatBlogDate(post.date)}</span>
                          </div>

                          {/* Efek hover warna teks dihilangkan, tetap menggunakan text-white */}
                          <h4 className="text-xl font-light tracking-[0.05em] text-white leading-snug mb-3">
                            {post.title}
                          </h4>

                          <p className="text-xs md:text-sm font-light text-zinc-400 leading-relaxed mb-6">
                            {makeExcerpt(post.description)}
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
      )}
    </main>
  );
}
