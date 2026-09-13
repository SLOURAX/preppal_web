"use client";

import {
  BadgeCent,
  BarChart3,
  BookOpen,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { SaxFlashBulk } from "@meysam213/iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

import { OverviewTab } from "./tabs/overview-tab";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { AccountTab } from "./tabs/account-tab";
import { LearnTab } from "./tabs/learn-tab";
import { WalletTab } from "./tabs/wallet-tab";
import { QuizHistoryTab } from "./tabs/quiz-history-tab";
import { WalletHistoryTab } from "./tabs/wallet-history-tab";

type TabId =
  | "home"
  | "learn"
  | "wallet"
  | "analytics"
  | "account"
  | "quiz-history"
  | "wallet-history";

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
    case "quiz-history":
      return <QuizHistoryTab />;
    case "wallet-history":
      return <WalletHistoryTab />;
  }
}

export function DashboardShell() {
  const searchParams = useSearchParams();
  const requestedView = searchParams.get("view");
  const requestedTab = searchParams.get("tab");
  const requestedDashboardTab =
    requestedTab === "learn" ||
    requestedTab === "wallet" ||
    requestedTab === "analytics" ||
    requestedTab === "account"
      ? requestedTab
      : null;
  const [selectedTab, setSelectedTab] = useState<TabId>("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const activeTab: TabId =
    requestedView === "quiz-history" || requestedView === "wallet-history"
      ? requestedView
      : (requestedDashboardTab ?? selectedTab);
  const userName = useAuthStore((s) => s.userName);
  const userPlan = useAuthStore((s) => s.userPlan);
  const preppalBalance = useAuthStore((s) => s.preppalBalance);
  const experiencePoints = useAuthStore((s) => s.experiencePoints);
  const openSignOutModal = useAuthStore((s) => s.openSignOutModal);
  const userInitials =
    userName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div
      className="bg-background relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, hsl(var(--primary) / .045) 1px, transparent 1px), linear-gradient(45deg, hsl(var(--primary) / .03) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    >
      <div
        className="bg-background/55 pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative flex min-h-dvh flex-col">
        <header className="bg-surface/95 border-border sticky top-0 z-40 border-b backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
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

              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <div className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-full text-xs font-bold">
                  {userInitials}
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs leading-tight font-bold">
                    {userName}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {userPlan}
                  </span>
                </div>
              </div>

              <button
                onClick={openSignOutModal}
                title="Sign out"
                className="text-muted-foreground hover:text-danger hover:bg-surface-subtle hidden rounded-lg p-1.5 transition-colors sm:flex"
              >
                <LogOut className="size-4" />
              </button>

              <div className="relative sm:hidden">
                <button
                  type="button"
                  aria-label="Open account menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((open) => !open)}
                  className="text-foreground focus-visible:ring-primary/40 flex items-center gap-1.5 rounded-xl p-1 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-full text-xs font-bold">
                    {userInitials}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-muted-foreground size-4 transition-transform",
                      isProfileOpen && "rotate-180",
                    )}
                  />
                </button>
                {isProfileOpen ? (
                  <div className="border-border bg-surface absolute top-full right-0 mt-2 w-48 rounded-xl border p-2 shadow-lg">
                    <div className="border-border mb-1 border-b px-3 py-2">
                      <p className="text-foreground truncate text-xs font-semibold">
                        {userName}
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        {userPlan}
                      </p>
                    </div>
                    <div className="border-border flex items-center justify-between border-b px-3 py-2">
                      <span className="text-muted-foreground text-xs font-semibold">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        openSignOutModal();
                      }}
                      className="text-danger hover:bg-danger/5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
                    >
                      <LogOut className="size-3.5" />
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="bg-surface-subtle/50 border-border hidden border-t md:block">
            <nav className="mx-auto w-full overflow-x-auto px-4 sm:px-6">
              <div className="flex min-w-max justify-center gap-0.5 py-3">
                {TABS.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedTab(id)}
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
          className="border-border bg-surface/95 text-muted-foreground fixed right-0 bottom-0 left-0 z-50 border-t px-2 pt-1.5 pb-[calc(env(safe-area-inset-bottom)+0.45rem)] shadow-[0_-8px_24px_rgb(39_24_93/0.08)] backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "mx-auto flex min-w-0 flex-col items-center gap-0.5 rounded-xl px-1 py-0.5 text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => setSelectedTab(id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "bg-transparent",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <span
            className="bg-primary/25 mx-auto mt-1.5 block h-0.5 w-24 rounded-full"
            aria-hidden="true"
          />
        </nav>

        <main className="mx-auto w-full flex-1 px-4 py-8 pb-24 sm:px-6 md:pb-8 lg:w-[60vw]">
          <TabContent activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
