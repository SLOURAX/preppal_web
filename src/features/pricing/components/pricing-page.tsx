"use client";

import { useQuery } from "@tanstack/react-query";
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
import { apiClient } from "@/lib/api/client";
import type { PublicPlan } from "@/features/payments";
import type { PricingPlan } from "../pricing.constants";

const PREMIUM_HIGHLIGHTS = [
  { label: "AI-supported learning", icon: BrainCircuit },
  { label: "Advanced analytics", icon: ChartNoAxesCombined },
  { label: "Faster progress", icon: Gauge },
] as const;

function featuresFromPlan(plan: PublicPlan): PricingPlan["features"] {
  const quizzes = plan.dailyQuizLimit
    ? `${plan.dailyQuizLimit} practice quizzes daily`
    : "Unlimited practice quizzes";
  const analytics = plan.advancedAnalyticsEnabled
    ? "Advanced learning analytics"
    : `${plan.analyticsHistoryDays ?? 30}-day progress overview`;
  return [
    ...(plan.slug === "annual"
      ? [
          { label: "Everything in Monthly", included: true },
          {
            label: "12 months of uninterrupted access",
            included: true,
          },
        ]
      : []),
    {
      label: quizzes,
      detail: `Up to ${plan.maxQuestionsPerQuiz} questions per quiz`,
      included: true,
    },
    {
      label: `${plan.dailyAiRequestLimit} AI explanations daily`,
      detail: "Allowance resets every day",
      included: plan.dailyAiRequestLimit > 0,
    },
    { label: analytics, included: true },
    {
      label: "Personalised study recommendations",
      included: plan.personalizedRecommendationsEnabled,
    },
    {
      label: "Completely ad-free",
      included: plan.adFree,
    },
    {
      label: `${plan.xpMultiplier}× XP on completed quizzes`,
      detail: "Excludes referrals and adjustments",
      included: true,
    },
  ];
}

export function PricingPage() {
  const plansQuery = useQuery({
    queryKey: ["payments", "plans"],
    queryFn: () => apiClient<PublicPlan[]>("/api/v1/payments/plans"),
    staleTime: 5 * 60 * 1000,
  });
  const plans = PRICING_PLANS.map((plan) => {
    const current = plansQuery.data?.find((item) => item.slug === plan.id);
    return current
      ? {
          ...plan,
          name: current.name,
          description: current.description,
          price: current.amountMinor / 100,
          features: featuresFromPlan(current),
        }
      : plan;
  });
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground mt-4 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
          Choose the support your learning needs
        </h1>
        <p className="text-muted-foreground mx-auto mt-1 max-w-xl text-sm leading-6">
          Start free, then upgrade when you want deeper AI support, an ad-free
          experience, richer insights, and faster rewards.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {PRICING_ASSURANCES.map((assurance) => (
            <span
              className="text-muted-foreground flex items-center gap-2 text-xs font-medium"
              key={assurance}
            >
              <BadgeCheck className="text-success size-4" /> {assurance}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {PREMIUM_HIGHLIGHTS.map(({ label, icon: Icon }) => (
            <span
              className="bg-primary/5 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
              key={label}
            >
              <Icon className="size-3.5" /> {label}
            </span>
          ))}
        </div>
      </header>

      <section
        aria-label="Preppal plans"
        className="mt-15 grid items-stretch gap-4 lg:grid-cols-3"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </section>

      <section className="mt-24 p-4 border rounded-2xl">
        <div className="flex items-start gap-3">
          <ShieldCheck className="text-primary mt-0.5 size-4 shrink-0" />
          <ul className="text-muted-foreground space-y-1.5 text-[12px] leading-5">
            {PRICING_CAVEATS.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-foreground text-base font-semibold">
          Not ready to upgrade?
        </h2>
        <p className="text-muted-foreground mx-auto mt-1.5 max-w-xl text-xs leading-5">
          The free plan remains available. Your quiz history, XP, coin balance,
          and progress stay with your account when you upgrade later.
        </p>
      </section>
    </main>
  );
}
