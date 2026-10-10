import type { Metadata } from "next";
import AboutClient from "./aboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sense Isle Studio, an interior and architecture studio creating sophisticated, timeless spaces. Discover our story, our philosophy, and the team behind every refined design.",
  keywords: [
    "About Sense Isle Studio",
    "Sense Isle Studio Team",
    "Interior and Architecture Studio",
    "Design Philosophy",
    "Architecture Studio Profile",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://sensestudio.co.id/about",
  },
  openGraph: {
    title: "Sense Isle Studio - About Us",
    description:
      "Discover the story, philosophy, and team behind Sense Isle Studio — creating sophisticated, timeless spaces through thoughtful design.",
    url: "https://sensestudio.co.id/about",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AboutClient />;
}
