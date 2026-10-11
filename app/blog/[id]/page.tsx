import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogById, formatBlogDate } from "@/services/blogService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='24' letter-spacing='4'>SENSE ISLE STUDIO</text></svg>";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { post, overflow } = await getBlogById(id); // ✅ Destructure

  // ✅ Guard: kalau overflow atau post null → metadata 404
  if (overflow || !post) {
    return {
      title: "Article not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // ✅ Sekarang post dijamin ada, aman akses .description
  const description = (post.description ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: `${post.title}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { post, overflow } = await getBlogById(id); // ✅ Destructure

  // ✅ Kalau overflow atau post tidak ada → 404
  if (overflow || !post) {
    notFound();
  }

  const currentPost = post;

  const imageSrc =
    currentPost.image && currentPost.image.trim() !== ""
      ? currentPost.image
      : FALLBACK_IMAGE;

  const paragraphs = (currentPost.description ?? "")
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p !== "");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 py-16 w-full">
        <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Kategori & tanggal */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-light">
              {currentPost.category}
            </span>
            <span className="text-[11px] tracking-[0.1em] text-zinc-400 font-light">
              {formatBlogDate(currentPost.date)}
            </span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-2xl md:text-4xl font-light tracking-[0.15em] uppercase text-white mb-8 leading-snug">
            {currentPost.title}
          </h1>

          {/* Gambar utama */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 border border-zinc-800 mb-10">
            <Image
              src={imageSrc}
              alt={currentPost.title || "Blog post"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Isi Artikel */}
          <div className="font-light tracking-[0.05em] text-zinc-300 leading-relaxed space-y-6 text-justify break-words">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => {
                const isSubheading = paragraph.length < 90;

                if (isSubheading) {
                  return (
                    <h2
                      key={index}
                      className="text-xl md:text-2xl font-normal tracking-[0.1em] text-white pt-6 mb-2 leading-snug text-left"
                    >
                      {paragraph}
                    </h2>
                  );
                }

                return (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })
            ) : (
              <p>-</p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
