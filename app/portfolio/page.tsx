import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioClient from "./PortfolioClient";
import { getPortfolioData } from "@/services/portfolioService";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore the portfolio of Sense Isle Studio. Discover our completed projects in architecture, interior design, home & office renovation, and custom-built furniture.",
  keywords: [
    "Sense Isle Studio Portfolio",
    "Architecture Portfolio",
    "Interior Design Projects",
    "Renovation Projects",
    "Custom Furniture Portfolio",
    "Design Studio Projects",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://www.sensestudio.co.id/portfolio",
  },
  openGraph: {
    title: "Sense Isle Studio - Portfolio",
    description:
      "Browse our completed projects — timeless architecture, refined interiors, and custom-crafted spaces by Sense Isle Studio.",
    url: "https://www.sensestudio.co.id/portfolio",
  },
};

export default async function PortfolioPage() {
  const { data, overflow } = await getPortfolioData();

  // ✅ Jika ada data yang melampaui MAX
  if (overflow) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <PortfolioClient data={data} />
    </div>
  );
}
