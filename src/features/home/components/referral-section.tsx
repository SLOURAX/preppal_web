"use client";

import {
  SaxCopyBulk,
  SaxCopySuccessBulk,
  SaxPeopleBulk,
  SaxProfileAddBulk,
  SaxShareBulk,
} from "@meysam213/iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";
import type { RewardSummary } from "@/features/rewards/reward.types";

const REFERRAL_STEPS = [
  "Share your personal invite link",
  "Your friend joins and verifies their email",
  "You receive 50 bonus XP",
] as const;

export function ReferralSection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const referralQuery = useQuery({
    queryKey: ["rewards", "summary"],
    queryFn: () => apiClient<RewardSummary>("/api/v1/rewards/summary"),
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
  const summary = referralQuery.data;
  const referrals = summary?.referrals ?? [];
  const referralUrl = summary?.referralLink ?? "";
  const invitedCount = referrals.length;
  const activatedReferrals = referrals.filter(
    (referral) => referral.status === "ACTIVATED",
  );
  const activatedCount = activatedReferrals.length;
  const activationRate = invitedCount
    ? Math.round((activatedCount / invitedCount) * 100)
    : 0;
  const referralXp = referrals.reduce(
    (total, referral) => total + (referral.rewardPoints ?? 0),
    0,
  );
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const copyReferralLink = async (): Promise<void> => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 1800);
  };

  const shareReferralLink = async (): Promise<void> => {
    if (!referralUrl) return;
    if (navigator.share) {
      await navigator.share({
        title: "Join me on Preppal",
        text: "Practise smarter, earn XP, and learn with me on Preppal.",
        url: referralUrl,
      });
      return;
    }
    await copyReferralLink();
  };

  return (
    <section className="surface-card w-full min-w-0 overflow-hidden">
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 p-4 sm:p-8 lg:p-10">
          <h2 className="text-foreground mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:mt-4 sm:text-3xl">
            Learn together. Earn together.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-6">
            Invite your friends to practise with Preppal. When a friend verifies
            their email, you earn 50 XP.
          </p>

          <ol className="mt-6 space-y-3">
            {REFERRAL_STEPS.map((step, index) => (
              <li className="flex min-w-0 items-center gap-2" key={step}>
                <span className="bg-primary/10 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-[.8rem] leading-5 font-semibold">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          {isAuthenticated ? (
            <div className="mt-7">
              <div className="bg-surface-subtle flex min-w-0 items-center justify-between gap-3 rounded-2xl p-2 pl-4">
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[11px]">
                    Your invite link
                  </p>
                  <p className="text-foreground truncate text-[.8rem] font-semibold">
                    {referralQuery.isLoading
                      ? "Loading your invite link…"
                      : referralUrl}
                  </p>
                </div>
                <button
                  aria-label="Copy referral link"
                  className="bg-surface text-primary grid size-9 shrink-0 place-items-center rounded-[10px] shadow-sm disabled:opacity-50"
                  onClick={copyReferralLink}
                  disabled={!referralUrl}
                  type="button"
                >
                  {hasCopied ? (
                    <SaxCopySuccessBulk className="size-4" />
                  ) : (
                    <SaxCopyBulk className="size-4" />
                  )}
                </button>
              </div>
              <Button
                className="mt-3 gap-2"
                onClick={shareReferralLink}
                disabled={!referralUrl}
              >
                <SaxShareBulk className="size-4" /> Invite friends
              </Button>
            </div>
          ) : (
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary-strong mt-7 inline-flex min-h-11 items-center gap-2 rounded-[10px] px-8 text-[.85rem] font-semibold transition-colors"
              href="/register"
            >
              <SaxProfileAddBulk className="size-4" /> Create an account to
              invite
            </Link>
          )}
        </div>

        <div className="from-primary/15 via-primary/5 to-surface relative flex min-w-0 flex-col justify-center overflow-hidden bg-gradient-to-br p-4 sm:p-8 lg:p-10">
          <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative z-10 flex min-w-0 flex-col items-start gap-3 sm:gap-4">
            <span className="bg-primary text-primary-foreground relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl shadow-[0_10px_28px_rgba(124,58,237,0.24)] sm:size-16">
              <SaxPeopleBulk className="size-8 sm:size-9" />
            </span>
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Referral progress
              </p>
              {referralQuery.isLoading ? (
                <p className="bg-primary/10 mt-2 h-6 w-36 animate-pulse rounded-md" />
              ) : referralQuery.isError ? (
                <p className="text-foreground mt-1 text-base font-black sm:text-[1.2rem]">
                  Progress unavailable
                </p>
              ) : isAuthenticated ? (
                <p className="text-foreground mt-1 text-lg font-black sm:text-[1.2rem]">
                  {activatedCount} of {invitedCount} verified
                </p>
              ) : (
                <p className="text-foreground mt-1 text-base font-black sm:text-[1.2rem]">
                  Sign in to see your progress
                </p>
              )}
            </div>
          </div>
          {!referralQuery.isError && (
            <div className="bg-surface-subtle relative z-10 mt-5 h-2 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-[width] duration-500"
                style={{ width: `${activationRate}%` }}
              />
            </div>
          )}
          {isAuthenticated && !referralQuery.isError ? (
            <div className="relative z-10 mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              <div className="bg-surface/80 min-w-0 rounded-xl p-3 sm:p-4">
                <p className="text-muted-foreground text-[11px] sm:text-xs">
                  Friends invited
                </p>
                <p className="text-foreground mt-1 text-lg font-black sm:text-xl">
                  {referralQuery.isLoading ? "—" : invitedCount}
                </p>
              </div>
              <div className="bg-surface/80 min-w-0 rounded-xl p-3 sm:p-4">
                <p className="text-muted-foreground text-[11px] sm:text-xs">
                  Referral XP earned
                </p>
                <p className="text-foreground mt-1 text-lg font-black sm:text-xl">
                  {referralQuery.isLoading
                    ? "—"
                    : `${referralXp.toLocaleString()} XP`}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-surface/80 relative z-10 mt-5 rounded-xl p-3 sm:mt-6 sm:p-4">
              <p className="text-muted-foreground text-xs leading-5">
                Create an account to get your personal invite link and track
                referral XP here.
              </p>
            </div>
          )}
          {referralQuery.isError ? (
            <p className="text-muted-foreground bg-surface/80 relative z-10 mt-5 rounded-xl p-3 text-xs leading-5 sm:p-4">
              Referral progress could not load. Please refresh and try again.
            </p>
          ) : isAuthenticated && !referralQuery.isLoading ? (
            <p className="text-muted-foreground relative z-10 mt-4 text-xs leading-5">
              Share your invite link and start earning referral XP.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
