"use client";

import { Bell, LogOut, Moon, Shield, Sun, Trash2 } from "lucide-react";
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
    description: "When your rank changes significantly",
    defaultOn: true,
  },
  {
    label: "Reward alerts",
    description: "When you earn coins or unlock rewards",
    defaultOn: false,
  },
  {
    label: "Weekly summary",
    description: "Your weekly performance report",
    defaultOn: true,
  },
] as const;

export function SettingsTab() {
  const { resolvedTheme } = useTheme();
  const userName = useAuthStore((s) => s.userName);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-foreground text-xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account and preferences.
        </p>
      </div>

      {/* Account */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0">
        <div className="px-5 py-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Account
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Display name
            </p>
            <p className="text-muted-foreground text-xs">{userName}</p>
          </div>
          <button className="border-border hover:bg-surface-subtle rounded-xl border px-4 py-1.5 text-xs font-medium transition-colors">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-foreground text-sm font-semibold">Password</p>
            <p className="text-muted-foreground text-xs">Last changed never</p>
          </div>
          <button className="border-border hover:bg-surface-subtle rounded-xl border px-4 py-1.5 text-xs font-medium transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0">
        <div className="px-5 py-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Appearance
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            {resolvedTheme === "dark" ? (
              <Moon className="text-primary size-4" />
            ) : (
              <Sun className="size-4 text-amber-500" />
            )}
            <div>
              <p className="text-foreground text-sm font-semibold">Theme</p>
              <p className="text-muted-foreground text-xs capitalize">
                {resolvedTheme ?? "light"} mode
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Notifications */}
      <div className="surface-card divide-border divide-y overflow-hidden p-0">
        <div className="flex items-center gap-2 px-5 py-3">
          <Bell className="text-muted-foreground size-3.5" />
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Notifications
          </p>
        </div>
        {NOTIFICATION_PREFS.map((pref) => (
          <div
            key={pref.label}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div>
              <p className="text-foreground text-sm font-semibold">
                {pref.label}
              </p>
              <p className="text-muted-foreground text-xs">
                {pref.description}
              </p>
            </div>
            {/* Simple toggle pill */}
            <button
              aria-label={`Toggle ${pref.label}`}
              className={`relative h-6 w-10 rounded-full transition-colors ${
                pref.defaultOn ? "bg-primary" : "bg-surface-subtle"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  pref.defaultOn ? "left-4.5 translate-x-0" : "left-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="surface-card divide-border divide-y overflow-hidden border-rose-500/20 p-0">
        <div className="flex items-center gap-2 px-5 py-3">
          <Shield className="size-3.5 text-rose-500" />
          <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
            Danger zone
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-foreground text-sm font-semibold">Sign out</p>
            <p className="text-muted-foreground text-xs">
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
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Delete account
            </p>
            <p className="text-muted-foreground text-xs">
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
