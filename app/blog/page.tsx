import type { Metadata } from "next";
import BlogClients from "./BlogClients";
import { getBlogData } from "@/services/blogService";

export const metadata: Metadata = {
  title: "Sense Isle Studio - Blog",
  description:
    "Explore thoughtful perspectives, design philosophies, technical breakdowns, and behind-the-scenes architectural and interior design insights by Sense Isle Studio.",
  keywords: [
    "Sense Isle Studio Blog",
    "Architecture Journal",
    "Interior Design Insights",
    "Modern Architecture Articles",
    "Biophilic Design",
    "Minimalist Interior",
  ],
  authors: [{ name: "Sense Isle Studio" }],
  creator: "Sense Isle Studio",
  publisher: "Sense Isle Studio",
  openGraph: {
    title: "Sense Isle Studio - Blog",
    description:
      "Explore thoughtful perspectives, design philosophies, and architectural insights from Sense Isle Studio.",
    url: "https://sensestudio.co.id/blog",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sense Isle Studio - Blog",
    description:
      "Explore thoughtful perspectives, design philosophies, and architectural insights from Sense Isle Studio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function BlogPage() {
  const posts = await getBlogData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Data dari Server-Side/ISR dioper ke Client Component untuk filter kategori */}
      <BlogClients data={posts} />
    </div>
  );
}
