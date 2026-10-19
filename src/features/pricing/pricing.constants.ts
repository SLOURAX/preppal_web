export type PlanId = "free" | "monthly" | "annual";

export interface PlanFeature {
  readonly label: string;
  readonly detail?: string;
  readonly included: boolean;
}

export interface PricingPlan {
  readonly id: PlanId;
  readonly name: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly price: number;
  readonly billingLabel: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly featured: boolean;
  readonly badge?: string;
  readonly features: readonly PlanFeature[];
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    eyebrow: "Start learning",
    description:
      "A focused way to practise, build momentum, and explore Preppal.",
    price: 0,
    billingLabel: "free forever",
    ctaLabel: "Start for free",
    ctaHref: "/register",
    featured: false,
    features: [
      {
        label: "3 practice quizzes daily",
        detail: "Up to 20 questions per quiz",
        included: true,
      },
      {
        label: "3 AI explanations daily",
        detail: "Allowance resets every day",
        included: true,
      },
      { label: "30-day progress overview", included: true },
      { label: "Standard 1× quiz XP", included: true },
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    eyebrow: "Learn without limits",
    description:
      "Everything active learners need, with the freedom to cancel anytime.",
    price: 3500,
    billingLabel: "per month",
    ctaLabel: "Choose monthly",
    ctaHref: "/register?plan=monthly",
    featured: true,
    badge: "Most popular",
    features: [
      {
        label: "Unlimited practice quizzes",
        detail: "Up to 100 questions per quiz",
        included: true,
      },
      {
        label: "30 AI explanations daily",
        detail: "With AI follow-up support",
        included: true,
      },
      { label: "Completely ad-free", included: true },
      { label: "Advanced learning analytics", included: true },
      {
        label: "Personalised study recommendations",
        included: true,
      },
      {
        label: "2× XP on completed quizzes",
        detail: "Excludes referrals and adjustments",
        included: true,
      },
    ],
  },
  {
    id: "annual",
    name: "Annual",
    eyebrow: "Best long-term value",
    description:
      "A full year of premium preparation at the lowest effective monthly price.",
    price: 30000,
    billingLabel: "per year",
    ctaLabel: "Choose annual",
    ctaHref: "/register?plan=annual",
    featured: false,
    badge: "Save 29%",
    features: [
      { label: "Everything in Monthly", included: true },
      {
        label: "12 months of uninterrupted access",
        included: true,
      },
      {
        label: "30 AI explanations daily",
        detail: "With AI follow-up support",
        included: true,
      },
      { label: "Completely ad-free", included: true },
      { label: "Advanced learning analytics", included: true },
      {
        label: "2× XP on completed quizzes",
        detail: "Excludes referrals and adjustments",
        included: true,
      },
    ],
  },
];

export const PRICING_ASSURANCES = [
  "No automatic renewal",
  "Secure local payment options",
  "Your quiz history stays yours",
] as const;

export const PRICING_CAVEATS = [
  "AI allowances reset daily and remain subject to service availability and platform safety limits.",
  "The 2× XP benefit applies to eligible completed quizzes and excludes referrals, promotions, refunds, and manual adjustments.",
  "Monthly and annual access is prepaid, does not renew automatically, and expires at the end of the selected period. You can renew from your account.",
] as const;
