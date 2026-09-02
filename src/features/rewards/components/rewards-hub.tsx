"use client";

import { BadgeCent, Gift, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/layout";
import { useAuthStore } from "@/store";

import { DailyCheckInCard } from "./daily-check-in-card";
import { ReferralRewardsCard } from "./referral-rewards-card";
import { RewardCatalog } from "./reward-catalog";

export function RewardsHub() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const balance = useAuthStore((state) => state.preppalBalance);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-2xl">
              <Gift className="size-5" />
            </span>
            <div>
              <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                Rewards
              </h1>
              <p className="text-muted-foreground mt-1 max-w-xl text-sm leading-relaxed">
                Keep learning, maintain your check-in streak, and invite friends
                to earn Preppal points.
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="bg-surface flex items-center gap-3 self-start rounded-2xl px-4 py-3 shadow-sm sm:self-auto">
              <span className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
                <BadgeCent className="size-4" />
              </span>
              <div>
                <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                  Available balance
                </p>
                <p className="text-foreground text-sm font-bold">
                  {balance.toLocaleString()} P
                </p>
              </div>
            </div>
          )}
        </header>

        {isAuthenticated ? (
          <div className="mt-7 space-y-8">
            <div className="grid items-stretch gap-5 lg:grid-cols-2">
              <DailyCheckInCard />
              <ReferralRewardsCard />
            </div>
            <RewardCatalog balance={balance} />
          </div>
        ) : (
          <section className="surface-card mt-8 max-w-2xl p-6 sm:p-8">
            <h2 className="text-foreground text-lg font-semibold">
              Make every quiz count
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Create an account to collect points from quizzes, daily check-ins,
              streaks, leaderboard placements, and referrals.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
                href="/register"
              >
                <UserPlus className="size-4" /> Create account
              </Link>
              <Link
                className="bg-surface-subtle text-foreground hover:bg-border inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
                href="/login"
              >
                <LogIn className="size-4" /> Log in
              </Link>
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}
