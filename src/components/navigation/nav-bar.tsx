"use client";

import { BadgeCent, ChevronDown, LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { SaxCategory2Bulk, SaxFlashBulk } from "@meysam213/iconsax-react";

import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import { DesktopNavigation } from "./desktop-navigation";
import { NAVIGATION } from "./navigation.constants";

export function NavBar() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const preppalBalance = useAuthStore((state) => state.preppalBalance);
  const experiencePoints = useAuthStore((state) => state.experiencePoints);
  const userName = useAuthStore((state) => state.userName);
  const userPlan = useAuthStore((state) => state.userPlan);
  const openSignOutModal = useAuthStore((state) => state.openSignOutModal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-[0_1px_18px_rgb(39_24_93/0.04)]">
        <div className="bg-surface/90 absolute inset-0 -z-10 backdrop-blur-xl" />
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center gap-2.5"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-xl text-base font-black shadow-sm">
              pp
            </span>
            <span className="text-lg font-bold tracking-[-0.025em]">
              Preppal
            </span>
          </Link>

          <div className="hidden items-center gap-2.5 sm:gap-4 md:flex">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-1 rounded-full bg-[#21194d] px-5 py-1 text-white sm:flex">
                  <span className="font-bold text-amber-400">ℙ</span>
                  <span className="text-xs font-bold">{preppalBalance}</span>
                </div>
                <div className="hidden items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1.5 text-amber-600 sm:flex">
                  <SaxFlashBulk className="size-4" />
                  <span className="text-xs font-bold">
                    {experiencePoints.toLocaleString()} XP
                  </span>
                </div>

                <Link
                  href="/dashboard"
                  className="bg-primary text-primary-foreground hover:bg-primary-strong hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-colors lg:inline-flex"
                >
                  <SaxCategory2Bulk className="size-4" />
                  Dashboard
                </Link>

                <Notifications />

                <div className="relative" ref={dropdownRef}>
                  <button
                    className="focus-visible:outline-primary flex items-center gap-2 rounded-full focus-visible:outline-2"
                    onClick={() =>
                      setIsDropdownOpen((current: boolean) => !current)
                    }
                    type="button"
                  >
                    <span className="bg-primary grid size-9 place-items-center rounded-full text-white">
                      <User className="size-4" />
                    </span>
                    <span className="hidden flex-col items-start sm:flex">
                      <span className="text-sm leading-tight font-bold">
                        {userName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {userPlan}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "text-muted-foreground hidden size-4 transition-transform sm:block",
                        isDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isDropdownOpen ? (
                    <div className="bg-surface absolute right-0 mt-3 w-60 rounded-2xl p-2 shadow-xl">
                      <div className="text-muted-foreground px-3 py-2 text-xs font-medium">
                        Account
                      </div>
                      <Link
                        className="hover:bg-surface-subtle flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="size-4" />
                        My Dashboard
                      </Link>
                      <div className="bg-border/60 my-1 h-px" />
                      <button
                        className="text-danger hover:bg-surface-subtle flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          openSignOutModal();
                        }}
                        type="button"
                      >
                        <LogOut className="size-4" />
                        Sign out
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  className="text-foreground hover:text-primary hidden px-2 text-sm font-medium transition-colors sm:block"
                  href="/login"
                >
                  Log in
                </Link>
                <Link
                  className="bg-primary text-[.85rem] text-primary-foreground hover:bg-primary-strong rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition sm:px-5"
                  href="/register"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && <Notifications />}
            <button
              className="text-foreground hover:bg-surface-subtle -mr-2 rounded-full p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="10" y1="12" x2="20" y2="12" />
                <line x1="14" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-surface-subtle/65 hidden shadow-[inset_0_10px_24px_rgb(67_44_145/0.025)] md:block">
          <DesktopNavigation pathname={pathname} />
        </div>
      </header>

      {/* Mobile Sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="bg-background/80 fixed inset-0 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="bg-surface border-border animate-in slide-in-from-right fixed inset-y-0 right-0 flex h-full w-3/4 max-w-sm flex-col border-l p-4 shadow-2xl sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <button
                className="hover:bg-surface-subtle -mr-2 rounded-full p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground",
                    )}
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-border mt-auto flex flex-col gap-3 border-t pt-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-muted-foreground text-sm font-medium">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-primary/5 flex items-center justify-between rounded-xl p-3 px-2">
                    <div className="flex flex-col">
                      <span className="text-foreground font-bold">
                        {userName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {userPlan}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <BadgeCent className="h-4 w-4" />
                      {preppalBalance}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-primary text-primary-foreground hover:bg-primary-strong flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold shadow-sm transition-colors"
                    >
                      <SaxCategory2Bulk className="size-5" />
                      My Dashboard
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openSignOutModal();
                    }}
                    className="text-danger hover:bg-surface-subtle flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-primary hover:bg-primary-strong text-primary-foreground w-full rounded-xl py-2.5 text-center text-sm font-medium shadow-sm"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-border hover:bg-surface-subtle text-foreground w-full rounded-xl border py-2.5 text-center text-sm font-medium"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
