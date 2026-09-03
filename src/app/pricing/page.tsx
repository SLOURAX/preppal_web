import type { Metadata } from "next";

import { PricingPage } from "@/features/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare Preppal Free, Monthly, and Annual plans for AI-supported quizzes, advanced analytics, and faster learning rewards.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
