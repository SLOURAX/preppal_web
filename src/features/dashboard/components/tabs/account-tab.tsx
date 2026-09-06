"use client";

import {
  BadgeCent,
  Pencil,
  Bell,
  LogOut,
  Moon,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

const NOTIFICATION_PREFS = [
  {
    label: "Quiz reminders",
    description: "Daily nudge to maintain your streak",
    defaultOn: true,
  },
  {
    label: "Leaderboard updates",
    description: "Get notified about your rank and progress",
    defaultOn: true,
  },
] as const;

export function AccountTab() {
  const { resolvedTheme } = useTheme();
  const userName = useAuthStore((s) => s.userName);
  const userPlan = useAuthStore((s) => s.userPlan);
  const preppalBalance = useAuthStore((s) => s.preppalBalance);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 md:pb-0">
      {/* Profile card */}
      <div className="surface-card p-6 rounded-3xl flex items-center gap-5 shadow-sm">
        <div className="bg-primary text-primary-foreground relative grid size-16 sm:size-20 shrink-0 place-items-center rounded-2xl text-2xl font-black shadow-md">
          {userName.slice(0, 1).toUpperCase()}
          <button className="bg-surface hover:bg-surface-subtle absolute -right-2 -bottom-2 grid size-7 place-items-center rounded-full border shadow-sm transition-colors">
            <Pencil className="text-muted-foreground size-3.5" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-foreground mt-1 text-lg sm:text-xl font-bold">
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

      {/* Account */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0 rounded-3xl shadow-sm">
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Account
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Display name
            </p>
            <p className="text-muted-foreground mt-1 text-xs">{userName}</p>
          </div>
          <button className="border-border hover:bg-surface-subtle rounded-full border px-4 py-1.5 text-xs font-medium transition-colors">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">Password</p>
            <p className="text-muted-foreground mt-1 text-xs">Last changed never</p>
          </div>
          <button className="border-border hover:bg-surface-subtle rounded-full border px-4 py-1.5 text-xs font-medium transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0 rounded-3xl shadow-sm">
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Appearance
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            {resolvedTheme === "dark" ? (
              <Moon className="text-amber-500 size-5" />
            ) : (
              <Sun className="size-5 text-amber-500" />
            )}
            <div>
              <p className="text-foreground text-sm font-semibold">Theme</p>
              <p className="text-muted-foreground mt-1 text-xs capitalize">
                {resolvedTheme ?? "light"} mode
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Notifications */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4">
          <Bell className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Notifications
          </p>
        </div>
        {NOTIFICATION_PREFS.map((pref) => (
          <div
            key={pref.label}
            className="flex items-center justify-between gap-4 px-5 py-5"
          >
            <div>
              <p className="text-foreground text-sm font-semibold">
                {pref.label}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {pref.description}
              </p>
            </div>
            <button
              aria-label={`Toggle ${pref.label}`}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                pref.defaultOn ? "bg-primary" : "bg-surface-subtle"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  pref.defaultOn ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="surface-card divide-border divide-y overflow-hidden border-rose-500/20 p-0 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4">
          <Shield className="size-4 text-rose-500" />
          <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
            Danger zone
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">Sign out</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Sign out of your account on this device.
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-500/20"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Delete account
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Permanently delete your account and all data.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-500/20">
            <Trash2 className="size-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
