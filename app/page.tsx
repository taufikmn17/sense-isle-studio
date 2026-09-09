import Navbar from "@/app/components/Navbar";
import Hero from "@/app/home/Hero";
import Portofolio from "@/app/home/Portfolio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <Navbar />
      <Hero />
      <Portofolio />
    </div>
  );
}
