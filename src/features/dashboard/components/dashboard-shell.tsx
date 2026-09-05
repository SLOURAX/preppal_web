"use client";

import {
  BadgeCent,
  BarChart3,
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { SaxFlashBulk } from "@meysam213/iconsax-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

import { OverviewTab } from "./tabs/overview-tab";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { AccountTab } from "./tabs/account-tab";
import { LearnTab } from "./tabs/learn-tab";
import { WalletTab } from "./tabs/wallet-tab";

type TabId = "home" | "learn" | "wallet" | "analytics" | "account";

const TABS: Array<{
  id: TabId;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "home", label: "Overview", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "wallet", label: "Wallet", icon: BadgeCent },
  { id: "account", label: "Account", icon: UserRound },
];

function TabContent({ activeTab }: { activeTab: TabId }) {
  switch (activeTab) {
    case "home":
      return <OverviewTab />;
    case "learn":
      return <LearnTab />;
    case "wallet":
      return <WalletTab />;
    case "analytics":
      return <AnalyticsTab />;
    case "account":
      return <AccountTab />;
  }
}

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const userName = useAuthStore((s) => s.userName);
  const userPlan = useAuthStore((s) => s.userPlan);
  const preppalBalance = useAuthStore((s) => s.preppalBalance);
  const experiencePoints = useAuthStore((s) => s.experiencePoints);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <header className="bg-surface/95 border-border sticky top-0 z-40 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-lg p-1.5 text-xs font-medium transition-colors"
              title="Back to homepage"
            >
              <Home className="size-5 sm:size-4" aria-hidden="true" />
            </Link>
            <div className="bg-border hidden h-4 w-px sm:block" />
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-foreground hidden text-sm font-bold sm:block">
                My Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1 rounded-full bg-[#21194d] px-4 py-1 text-white sm:flex">
              <span className="font-bold text-amber-400">ℙ</span>
              <span className="text-xs font-bold">{preppalBalance}</span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-amber-600 sm:flex">
              <SaxFlashBulk className="size-3.5" />
              <span className="text-xs font-bold">
                {experiencePoints.toLocaleString()} XP
              </span>
            </div>

            <ThemeToggle />

            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-full text-xs font-bold">
                {userName.slice(0, 1).toUpperCase()}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-foreground text-xs leading-tight font-bold">
                  {userName}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {userPlan}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sign out"
              className="text-muted-foreground hover:text-danger hover:bg-surface-subtle rounded-lg p-1.5 transition-colors"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        <div className="bg-surface-subtle/50 border-border hidden border-t md:block">
          <nav className="mx-auto max-w-[1400px] overflow-x-auto px-4 sm:px-6">
            <div className="flex min-w-max gap-0.5 py-3">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3.5 py-2 text-[.8rem] font-medium transition-all",
                      isActive
                        ? "bg-surface text-primary"
                        : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        isActive && "text-primary",
                      )}
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Dashboard navigation"
        className="bg-surface/95 border-border fixed right-0 bottom-0 left-0 z-40 border-t px-2 py-2 shadow-[0_-8px_24px_rgb(39_24_93/0.08)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTab(id)}
                type="button"
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 pb-24 sm:px-6 md:pb-8">
        <TabContent activeTab={activeTab} />
      </main>
    </div>
  );
}
