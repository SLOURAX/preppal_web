import {
  BadgeCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  Gauge,
  ShieldCheck,
} from "lucide-react";

import {
  PRICING_ASSURANCES,
  PRICING_CAVEATS,
  PRICING_PLANS,
} from "../pricing.constants";
import { PricingCard } from "./pricing-card";

const PREMIUM_HIGHLIGHTS = [
  { label: "AI-supported learning", icon: BrainCircuit },
  { label: "Advanced analytics", icon: ChartNoAxesCombined },
  { label: "Faster progress", icon: Gauge },
] as const;

export function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground mt-4 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
          Choose the support your learning needs
        </h1>
        <p className="text-muted-foreground mx-auto mt-1 max-w-xl text-sm leading-6">
          Start free, then upgrade when you want deeper AI support, an ad-free
          experience, richer insights, and faster rewards.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 mb-5">
          {PRICING_ASSURANCES.map((assurance) => (
            <span
              className="text-muted-foreground flex items-center gap-2 text-xs font-medium"
              key={assurance}
            >
              <BadgeCheck className="text-success size-4" /> {assurance}
            </span>
          ))}
        </div>
      </header>

      <section
        aria-label="Preppal plans"
        className="mt-8 grid items-stretch gap-4 lg:grid-cols-3"
      >
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-foreground text-base font-semibold">
          Not ready to upgrade?
        </h2>
        <p className="text-muted-foreground mx-auto mt-1.5 max-w-xl text-xs leading-5">
          The free plan remains available. Your quiz history, points, and
          progress stay with your account when you upgrade later.
        </p>
      </section>
    </main>
  );
}
