import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppFloat from "@/app/components/WhatsAppFloat";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sensestudio.co.id"),

  // Template: nama studio di DEPAN, judul halaman di BELAKANG
  title: {
    default: "Sense Isle Studio - Interior & Architecture",
    template: "Sense Isle Studio - %s",
  },
  description:
    "Sense Isle Studio is an interior and architecture studio creating sophisticated, timeless spaces. Our services include Architecture Services, Interior Design, Home & Office Renovation, and Custom-Built Furniture.",
  keywords: [
    "Sense Isle Studio",
    "Sense Isle",
    "Web Sense Isle",
    "Sense Isle Interior",
    "Sense Isle Architecture",
    "Architecture Services",
    "Interior Design",
    "Home Renovation",
    "Office Renovation",
    "Custom-Built Furniture",
    "Interior and Architecture Studio",
  ],
  alternates: {
    canonical: "https://sensestudio.co.id",
  },
  openGraph: {
    title: "Sense Isle Studio - Interior & Architecture",
    description:
      "Sophisticated, timeless spaces through thoughtful design. Architecture, Interior Design, Renovation, and Custom Furniture.",
    url: "https://sensestudio.co.id",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
