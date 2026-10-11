import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogClients from "./BlogClient";
import { getBlogData } from "@/services/blogService";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest insights, tips, and inspiration from Sense Isle Studio. Explore articles on architecture, interior design, home renovation, and custom-built furniture.",
  keywords: [
    "Sense Isle Studio Blog",
    "Interior Design Blog",
    "Architecture Articles",
    "Home Renovation Tips",
    "Custom Furniture Ideas",
    "Design Inspiration",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://www.sensestudio.co.id/blog",
  },
  openGraph: {
    title: "Sense Isle Studio - Blog",
    description:
      "Insights, tips, and inspiration on architecture, interior design, renovation, and custom furniture from Sense Isle Studio.",
    url: "https://www.sensestudio.co.id/blog",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default async function BlogPage() {
  const { data, overflow } = await getBlogData();

  // ✅ Jika ada data yang melampaui MAX → tampilkan 404
  if (overflow) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <BlogClients data={data} />
    </div>
  );
}
