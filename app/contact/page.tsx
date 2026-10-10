import type { Metadata } from "next";
import ContactClient from "./contactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sense Isle Studio. Reach out for Architecture Services, Interior Design, Home & Office Renovation, and Custom-Built Furniture consultations. We'd love to hear about your project.",
  keywords: [
    "Contact Sense Isle Studio",
    "Sense Isle Studio Contact",
    "Architecture Consultation",
    "Interior Design Consultation",
    "Renovation Consultation",
    "Hire Interior Designer",
    "Hire Architect",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://sensestudio.co.id/contact",
  },
  openGraph: {
    title: "Sense Isle Studio - Contact",
    description:
      "Reach out to Sense Isle Studio for architecture, interior design, renovation, and custom furniture consultations. Let's create something timeless together.",
    url: "https://sensestudio.co.id/contact",
    siteName: "Sense Isle Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
