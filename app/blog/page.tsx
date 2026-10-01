import BlogClients from "./BlogClients";
import { getBlogData } from "@/services/blogService";

export default async function BlogPage() {
  const posts = await getBlogData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Data dari Server-Side/ISR dioper ke Client Component untuk filter kategori */}
      <BlogClients data={posts} />
    </div>
  );
}
