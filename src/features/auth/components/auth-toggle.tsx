"use client";

import { LogIn, UserPlus, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { getSafeReturnTo, withReturnTo } from "../utils";

interface AuthTab {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

const tabs: readonly AuthTab[] = [
  { href: "/login", label: "Log in", icon: LogIn },
  { href: "/register", label: "Sign up", icon: UserPlus },
];

export function AuthToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo = getSafeReturnTo(`?${searchParams.toString()}`);

  if (pathname === "/forgot-password") return null;

  return (
    <nav
      aria-label="Authentication"
      className="bg-surface-subtle/70 grid h-11 grid-cols-2 gap-1 rounded-xl p-1"
    >
      {tabs.map((tab: AuthTab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-[background-color,color,box-shadow] duration-200",
              isActive
                ? "bg-surface text-primary-strong shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            href={withReturnTo(tab.href, returnTo)}
            key={tab.href}
          >
            <Icon aria-hidden="true" className="size-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
