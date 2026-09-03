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
        label: "Daily practice quizzes",
        detail: "Subject to daily limits",
        included: true,
      },
      {
        label: "AI learning support",
        detail: "Limited explanations",
        included: true,
      },
      { label: "Basic progress tracking", included: true },
      { label: "Standard points and XP", included: true },
      { label: "Ad-free learning", included: false },
      { label: "Advanced analytics", included: false },
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
      { label: "Unlimited practice quizzes", included: true },
      {
        label: "Expanded AI support",
        detail: "Fair-use limits apply",
        included: true,
      },
      { label: "Completely ad-free", included: true },
      { label: "Advanced learning analytics", included: true },
      { label: "2× points on eligible activities", included: true },
      {
        label: "Faster XP accumulation",
        detail: "2× eligible quiz XP",
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
        label: "Expanded AI support",
        detail: "Fair-use limits apply",
        included: true,
      },
      { label: "Completely ad-free", included: true },
      { label: "Advanced learning analytics", included: true },
      { label: "2× points on eligible activities", included: true },
      {
        label: "Faster XP accumulation",
        detail: "2× eligible quiz XP",
        included: true,
      },
    ],
  },
];

export const PRICING_ASSURANCES = [
  "Cancel whenever you need",
  "Secure local payment options",
  "Your quiz history stays yours",
] as const;

export const PRICING_CAVEATS = [
  "Premium AI support is subject to reasonable fair-use limits and service availability.",
  "The 2× points and XP benefits apply to eligible completed quizzes and exclude referrals, promotions, refunds, and manual adjustments.",
  "Monthly and annual plans renew automatically until cancelled. Annual pricing is charged upfront; taxes or payment-provider fees may apply.",
] as const;
