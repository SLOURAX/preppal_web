"use client";

import {
  BookOpenCheck,
  Check,
  Crown,
  Gem,
  Minus,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

import type { PlanId, PricingPlan } from "../pricing.constants";

interface PricingCardProps {
  readonly plan: PricingPlan;
}

const PLAN_ICONS: Readonly<Record<PlanId, LucideIcon>> = {
  free: BookOpenCheck,
  monthly: Crown,
  annual: Gem,
};

export function PricingCard({ plan }: PricingCardProps) {
  const PlanIcon = PLAN_ICONS[plan.id];
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const ctaHref = isAuthenticated
    ? plan.id === "free"
      ? "/dashboard"
      : `/dashboard?tab=account&upgrade=${plan.id}`
    : plan.ctaHref;
  const ctaLabel = isAuthenticated
    ? plan.id === "free"
      ? "Go to dashboard"
      : "Upgrade plan"
    : plan.ctaLabel;

  return (
    <article
      className={cn(
        `pricing-card-${plan.id}`,
        "relative flex h-full overflow-hidden rounded-[1.5rem] shadow-[0_18px_48px_rgb(58_34_140/0.09)] transition-transform duration-300 hover:-translate-y-1",
        plan.featured
          ? "text-primary-foreground shadow-primary/20"
          : "text-foreground",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-16 -right-12 size-36 rounded-full blur-2xl",
          plan.featured ? "bg-white/10" : "bg-primary/5",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-20 -left-16 size-40 rounded-full blur-3xl",
          plan.featured
            ? "bg-indigo-950/15"
            : "bg-violet-200/15 dark:bg-violet-900/5",
        )}
      />

      <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "grid size-10 place-items-center rounded-2xl shadow-sm",
              plan.featured
                ? "bg-white/15 text-white"
                : "bg-primary/10 text-primary",
            )}
          >
            <PlanIcon className="size-[1.125rem]" />
          </span>
          {plan.badge ? (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[9px] font-bold tracking-[0.12em] uppercase",
                plan.featured
                  ? "text-primary bg-white"
                  : "bg-primary/10 text-primary",
              )}
            >
              {plan.badge}
            </span>
          ) : null}
        </div>

        <h2 className="mt-3 text-xl font-bold">{plan.name}</h2>
        <p
          className={cn(
            "mt-1.5 text-xs leading-5",
            plan.featured ? "text-white/72" : "text-muted-foreground",
          )}
        >
          {plan.description}
        </p>

        <div className="mt-5 flex items-end gap-1.5">
          <span className="pb-0.5 text-base font-semibold">₦</span>
          <span className="text-3xl font-bold tracking-[-0.045em]">
            {plan.price.toLocaleString("en-NG")}
          </span>
          <span
            className={cn(
              "pb-1 text-[10px]",
              plan.featured ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {plan.billingLabel}
          </span>
        </div>

        {plan.id === "annual" ? (
          <p className="text-success mt-1.5 text-[10px] font-semibold">
            ₦2,500 monthly equivalent
          </p>
        ) : null}

        <Link
          className={cn(
            "mt-5 inline-flex min-h-10 items-center justify-center rounded-full px-4 text-xs font-semibold transition-colors",
            plan.featured
              ? "text-primary bg-white hover:bg-white/90"
              : plan.id === "free"
                ? "bg-surface-subtle text-foreground hover:bg-border"
                : "bg-primary text-primary-foreground hover:bg-primary-strong",
          )}
          href={ctaHref}
        >
          {ctaLabel}
        </Link>

        <div
          className={cn(
            "my-5 h-px",
            plan.featured ? "bg-white/15" : "bg-border/60",
          )}
        />

        <ul className="space-y-2.5">
          {plan.features.map((feature) => (
            <li className="flex items-start gap-2.5" key={feature.label}>
              <span
                className={cn(
                  "mt-0.5 grid size-[1.125rem] shrink-0 place-items-center rounded-full",
                  feature.included
                    ? plan.featured
                      ? "bg-white/15 text-white"
                      : "bg-success/10 text-success"
                    : "bg-surface-subtle text-muted-foreground",
                )}
              >
                {feature.included ? (
                  <Check className="size-2.5" />
                ) : (
                  <Minus className="size-2.5" />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-xs font-medium",
                    !feature.included && "text-muted-foreground",
                  )}
                >
                  {feature.label}
                </p>
                {feature.detail ? (
                  <p
                    className={cn(
                      "mt-0.5 text-[10px]",
                      plan.featured ? "text-white/55" : "text-muted-foreground",
                    )}
                  >
                    {feature.detail}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
