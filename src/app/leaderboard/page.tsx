"use client";

import { Crown, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/layout";
import { LeaderboardOverview } from "@/features/leaderboard";
import { useAuthStore } from "@/store";

export default function LeaderboardPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.userName);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-10">
        <header className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 grid size-16 place-items-center rounded-full">
            <Crown className="text-primary size-8" />
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">
            See how your progress compares with the Preppal community and earn
            your place at the top.
          </p>
        </header>
        {isAuthenticated ? (
          <div className="mt-8">
            <LeaderboardOverview userName={userName} />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground text-sm">
              Create an account to track your rank and compete with other
              learners.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors"
              >
                <UserPlus className="size-4" /> Create account
              </Link>
              <Link
                href="/login"
                className="bg-surface-subtle text-foreground hover:bg-border inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
              >
                <LogIn className="size-4" /> Log in
              </Link>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}
