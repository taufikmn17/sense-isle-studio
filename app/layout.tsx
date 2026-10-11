import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://www.sensestudio.co.id"),

  title: {
    default: "Sense Isle Studio - Architect, Interior Design & Build",
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
    canonical: "https://www.sensestudio.co.id",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // ✅ OPEN GRAPH — Preview share (WhatsApp, Facebook, Twitter, LinkedIn)
  openGraph: {
    title: "Sense Isle Studio - Interior & Architecture",
    description:
      "Sophisticated, timeless spaces through thoughtful design. Architecture, Interior Design, Renovation, and Custom Furniture.",
    url: "https://www.sensestudio.co.id",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sense Isle Studio — Architecture & Interior Design",
      },
    ],
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
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y44EZSNHKC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y44EZSNHKC');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
