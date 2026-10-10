import type { Metadata } from "next";
import ServicesClient from "./ourServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Sense Isle Studio's full range of services: Architecture Services, Interior Design, Home & Office Renovation, and Custom-Built Furniture. Sophisticated, timeless design tailored to your space.",
  keywords: [
    "Sense Isle Studio Services",
    "Architecture Services",
    "Interior Design Services",
    "Home Renovation",
    "Office Renovation",
    "Custom-Built Furniture",
    "Interior and Architecture Studio",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://www.sensestudio.co.id/ourServices",
  },
  openGraph: {
    title: "Sense Isle Studio - Our Services",
    description:
      "Architecture Services, Interior Design, Home & Office Renovation, and Custom-Built Furniture. Discover how Sense Isle Studio brings timeless design to life.",
    url: "https://www.sensestudio.co.id/ourServices",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <ServicesClient />;
}
