"use client";

import {
  ChartNoAxesCombined,
  Gift,
  LogIn,
  Trophy,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store";

export default function RewardsPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="bg-primary/10 mb-4 rounded-full p-4">
        <Gift className="text-primary h-9 w-9" />
      </div>

      <h1 className="text-foreground mb-2 text-xl font-bold tracking-tight">
        Your Rewards Hub
      </h1>

      <p className="text-muted-foreground mb-3 max-w-md text-sm">
        Earn Preppal coins by taking quizzes, topping the leaderboard, and
        inviting friends. Redeem your coins for premium courses, exclusive
        content, and real prizes.
      </p>

      {isAuthenticated ? (
        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          <div className="surface-card flex flex-col items-center p-6 text-center">
            <div className="mb-3 rounded-full bg-orange-100 p-3">
              <ChartNoAxesCombined className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="mb-1.5 text-base font-semibold">Daily Streak</h2>
            <p className="text-muted-foreground mb-4 text-xs">
              Log in every day and complete a quick quiz to earn multiplier
              bonuses.
            </p>
            <button className="bg-surface-subtle text-foreground hover:bg-border mt-auto flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors">
              <ChartNoAxesCombined className="h-3.5 w-3.5" /> Start Streak
            </button>
          </div>

          <div className="surface-card border-primary flex flex-col items-center border-2 p-6 text-center">
            <div className="bg-primary/20 mb-3 rounded-full p-3">
              <Trophy className="text-primary h-6 w-6" />
            </div>
            <h2 className="mb-1.5 text-base font-semibold">Premium Plan</h2>
            <p className="text-muted-foreground mb-4 text-xs">
              Unlock all mock exams and advanced analytics for 1 month.
            </p>
            <button className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary-strong mt-auto flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-md transition-all">
              <Trophy className="h-3.5 w-3.5" /> Redeem 5,000 P
            </button>
          </div>

          <div className="surface-card flex flex-col items-center p-6 text-center">
            <div className="mb-3 rounded-full bg-green-100 p-3">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mb-1.5 text-base font-semibold">Gift Cards</h2>
            <p className="text-muted-foreground mb-4 text-xs">
              Redeem your tokens for Amazon, Apple, and Google Play gift cards.
            </p>
            <button className="bg-surface-subtle text-foreground hover:bg-border mt-auto flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors">
              <Gift className="h-3.5 w-3.5" /> View Options
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-strong text-primary-foreground flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-all"
            >
              <UserPlus className="h-4 w-4" /> Create Account
            </Link>
            <Link
              href="/login"
              className="bg-surface-subtle hover:bg-border text-foreground border-border flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all"
            >
              <LogIn className="h-4 w-4" /> Log In
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
