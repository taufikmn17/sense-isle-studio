import type { Metadata } from "next";
import ReviewsClient from "./reviewsClient";

export const metadata: Metadata = {
  title: "Client Reviews",
  description:
    "Read what our clients say about Sense Isle Studio. Discover their experiences with our Architecture Services, Interior Design, Home & Office Renovation, and Custom-Built Furniture.",
  keywords: [
    "Sense Isle Studio Reviews",
    "Sense Isle Testimonials",
    "Interior Design Reviews",
    "Architecture Client Feedback",
    "Home Renovation Testimonials",
    "Custom Furniture Reviews",
    "Sense Isle Studio",
  ],
  alternates: {
    canonical: "https://www.sensestudio.co.id/reviews",
  },
  openGraph: {
    title: "Sense Isle Studio - Client Reviews",
    description:
      "Discover why clients trust Sense Isle Studio for their interior and architecture needs. Read our latest testimonials and reviews.",
    url: "https://www.sensestudio.co.id/reviews",
  },
};

export default function Page() {
  return <ReviewsClient />;
}
