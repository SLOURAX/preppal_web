import Link from "next/link";

import { cn } from "@/lib/utils";

import { NAVIGATION, type NavigationItem } from "./navigation.constants";

interface DesktopNavigationProps {
  readonly pathname: string;
}

export function DesktopNavigation({ pathname }: DesktopNavigationProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className="mx-auto flex h-12 max-w-5xl items-center justify-center gap-1.5 px-6"
    >
      {NAVIGATION.map((item: NavigationItem) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-[.78rem] font-medium transition-colors",
              isActive
                ? "bg-surface text-primary shadow-[0_5px_18px_rgb(58_34_140/0.1)]"
                : "text-muted-foreground hover:bg-surface/65 hover:text-foreground",
            )}
            href={item.href}
            key={item.href}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
