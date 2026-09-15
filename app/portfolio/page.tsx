import PortfolioClient from "./PortfolioClient";
import { getPortfolioData } from "@/services/portfolioService"; // <-- Menggunakan service terpusat yang sudah ada Zod-nya

export default async function PortfolioPage() {
  // Memanggil fungsi getPortfolioData yang sama persis dengan HomePortfolio
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Mengoper data hasil Server-Side/ISR ke Client Component untuk interaksi filter */}
      <PortfolioClient data={portfolioData} />
    </div>
  );
}
