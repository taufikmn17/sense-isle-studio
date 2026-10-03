import BlogClients from "./BlogClient";
import { getBlogData } from "@/services/blogService";

export default async function BlogPage() {
  const posts = await getBlogData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <BlogClients data={posts} />
    </div>
  );
}
