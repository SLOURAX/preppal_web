"use client";

import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

import { AppShell } from "@/components/layout";
import { DataState } from "@/components/ui";
import { REFERRALS } from "@/features/rewards/components/referral-rewards-card";

export default function ReferralHistoryPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-10">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          href="/rewards"
        >
          <ArrowLeft className="size-4" /> Back
        </Link>
        <header className="mt-8">
          <div className="bg-primary/10 text-primary mb-4 grid size-12 place-items-center rounded-2xl">
            <Users className="size-6" />
          </div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            All referrals
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Track every invite and the XP you have earned.
          </p>
        </header>
        <section className="surface-card mt-8 overflow-hidden p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-foreground text-sm font-semibold">
              {REFERRALS.length} invited
            </p>
            <p className="text-muted-foreground text-xs">50 XP each</p>
          </div>
          {REFERRALS.length ? (
            <div className="divide-border border-border/60 divide-y rounded-xl border px-3">
              {REFERRALS.map((referral) => (
                <div
                  className="flex items-center justify-between gap-3 py-3.5"
                  key={referral.name}
                >
                  <div className="min-w-0">
                    <p className="text-foreground text-[.8rem] font-semibold">
                      {referral.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {referral.status}
                    </p>
                  </div>
                  <span
                    className={
                      referral.reward === "+50 XP"
                        ? "text-success text-xs font-bold"
                        : "text-muted-foreground text-xs font-medium"
                    }
                  >
                    {referral.reward}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <DataState
              title="No referrals yet"
              description="Share your invite link to bring a friend to Preppal. Your referral activity will appear here once someone joins."
            />
          )}
        </section>
      </main>
    </AppShell>
  );
}
