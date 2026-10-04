"use client";

import { Gift, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/layout";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";
import { useCallback, useEffect, useState } from "react";
import type { RewardSummary } from "../reward.types";

import { DailyCheckInCard } from "./daily-check-in-card";
import { ReferralRewardsCard } from "./referral-rewards-card";
import { RewardCatalog } from "./reward-catalog";

export function RewardsHub() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const balance = useAuthStore((state) => state.preppalBalance);
  const setRewardBalances = useAuthStore((state) => state.setRewardBalances);
  const setLevelProgress = useAuthStore((state) => state.setLevelProgress);
  const [summary, setSummary] = useState<RewardSummary | null>(null);
  const refreshSummary = useCallback(
    () =>
      apiClient<RewardSummary>("/api/v1/rewards/summary")
        .then((nextSummary) => {
          setSummary(nextSummary);
          setRewardBalances({
            experiencePoints: nextSummary.experiencePoints ?? 0,
            preppalBalance: nextSummary.coins ?? 0,
          });
          if (nextSummary.progress) setLevelProgress(nextSummary.progress);
        })
        .catch(() => setSummary(null)),
    [setLevelProgress, setRewardBalances],
  );
  useEffect(() => {
    if (isAuthenticated) void refreshSummary();
  }, [isAuthenticated, refreshSummary]);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl min-w-0 flex-1 px-3 py-6 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-2xl">
              <Gift className="size-5" />
            </span>
            <div>
              <h1 className="text-foreground text-xl font-extrabold tracking-tight sm:text-2xl">
                Rewards
              </h1>
              <p className="text-muted-foreground mt-1 max-w-xl text-[.8rem] leading-relaxed">
                Keep learning to earn XP, convert it into Preppal Coins, and
                redeem your progress for useful rewards.
              </p>
            </div>
          </div>
        </header>

        {isAuthenticated ? (
          <div className="mt-7 space-y-8">
            <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
              <DailyCheckInCard summary={summary} onUpdated={refreshSummary} />
              <ReferralRewardsCard summary={summary} />
            </div>
            <RewardCatalog balance={balance} />
          </div>
        ) : (
          <section className="surface-card mt-8 max-w-2xl p-6 sm:p-8">
            <h2 className="text-foreground text-lg font-semibold">
              Make every quiz count
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Create an account to collect XP from quizzes, daily check-ins,
              streaks, leaderboard placements, and referrals, then convert it
              into Preppal Coins.
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
