"use client";

import {
  BadgeCent,
  BookOpen,
  ChartNoAxesCombined,
  Pencil,
  Shield,
  Target,
} from "lucide-react";
import { useAuthStore } from "@/store";

const STATS = [
  { label: "Quizzes completed", value: "24", icon: BookOpen },
  { label: "Current streak", value: "7 days", icon: ChartNoAxesCombined },
  { label: "Average score", value: "78%", icon: Target },
] as const;

const ACHIEVEMENTS = [
  {
    label: "First Quiz",
    description: "Completed your first quiz",
    earned: true,
  },
  { label: "Week Warrior", description: "7-day study streak", earned: true },
  {
    label: "High Scorer",
    description: "Score 90%+ on any quiz",
    earned: false,
  },
  {
    label: "Subject Master",
    description: "Complete 50 quizzes in one subject",
    earned: false,
  },
] as const;

export function ProfileTab() {
  const userName = useAuthStore((s) => s.userName);
  const userPlan = useAuthStore((s) => s.userPlan);
  const preppalBalance = useAuthStore((s) => s.preppalBalance);

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="surface-card p-6">
        <div className="flex items-center gap-5">
          <div className="bg-primary text-primary-foreground relative grid size-20 shrink-0 place-items-center rounded-2xl text-2xl font-black shadow-md">
            {userName.slice(0, 1).toUpperCase()}
            <button className="bg-surface hover:bg-surface-subtle absolute -right-2 -bottom-2 grid size-7 place-items-center rounded-full border shadow-sm transition-colors">
              <Pencil className="text-muted-foreground size-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Learner profile
            </p>
            <h2 className="text-foreground mt-1 text-2xl font-bold">
              {userName}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                {userPlan} plan
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <BadgeCent className="size-4" />
                {preppalBalance} P
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        {STATS.map(({ icon: Icon, label, value }) => (
          <div className="surface-card p-5" key={label}>
            <Icon className="text-primary size-5" />
            <p className="text-foreground mt-4 text-xl font-bold">{value}</p>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="surface-card p-5 sm:p-6">
        <h3 className="text-foreground mb-4 font-semibold">Achievements</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.label}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                ach.earned ? "bg-primary/5" : "bg-surface-subtle opacity-60"
              }`}
            >
              <div
                className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                  ach.earned
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-muted-foreground"
                }`}
              >
                <Shield className="size-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {ach.label}
                </p>
                <p className="text-muted-foreground text-xs">
                  {ach.description}
                </p>
              </div>
              {ach.earned && (
                <span className="text-primary ml-auto text-xs font-bold">
                  ✓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
