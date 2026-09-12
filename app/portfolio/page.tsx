import PortfolioClient from "./PortfolioClient";

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string | number;
  description: string;
  purpose: string;
}

// Fungsi Fetch data dengan ISR (revalidate setiap 60 detik)
async function getPortfolioData(): Promise<PortfolioItem[]> {
  const WEB_APP_URL = process.env.APPS_SCRIPT_URL;

  if (!WEB_APP_URL) {
    console.error("URL Apps Script belum disetel di environment variable!");
    return [];
  }

  try {
    const res = await fetch(WEB_APP_URL, {
      next: { revalidate: 60 }, // ISR: Update cache setiap 60 detik di background
    });

    if (!res.ok) {
      throw new Error("Gagal mengambil data portfolio dari Google Sheets");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Mengoper data hasil Server-Side/ISR ke Client Component untuk interaksi filter */}
      <PortfolioClient data={portfolioData} />
    </div>
  );
}
