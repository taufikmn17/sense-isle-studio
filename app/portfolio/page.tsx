import PortfolioClient from "./PortfolioClient";
import { getPortfolioData } from "@/services/portfolioService"; // <-- Menggunakan service terpusat yang sudah ada Zod-nya

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <PortfolioClient data={portfolioData} />
    </div>
  );
}
