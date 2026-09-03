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
        <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm leading-6">
          Start free, then upgrade when you want deeper AI support, an ad-free
          experience, richer insights, and faster rewards.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
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

      <section className="surface-card mt-6 grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-2xl">
            <ShieldCheck className="size-5" />
          </span>
          <h2 className="text-foreground mt-3 text-base font-semibold">
            Clear terms, confident choice
          </h2>
          <p className="text-muted-foreground mt-1.5 text-xs leading-5">
            Premium gives you more room to learn, but we keep the important
            limits visible before you choose a plan.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {PREMIUM_HIGHLIGHTS.map(({ label, icon: Icon }) => (
              <span
                className="bg-surface-subtle text-foreground inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium"
                key={label}
              >
                <Icon className="text-primary size-3.5" /> {label}
              </span>
            ))}
          </div>
        </div>

        <ol className="divide-border/60 divide-y">
          {PRICING_CAVEATS.map((caveat, index) => (
            <li className="flex gap-3 py-3 first:pt-0 last:pb-0" key={caveat}>
              <span className="bg-surface-subtle text-primary grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                {index + 1}
              </span>
              <p className="text-muted-foreground text-xs leading-5">
                {caveat}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 text-center">
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
