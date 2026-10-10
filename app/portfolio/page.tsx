import type { Metadata } from "next";
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
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <PortfolioClient data={portfolioData} />
    </div>
  );
}
