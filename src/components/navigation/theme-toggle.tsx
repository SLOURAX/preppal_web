"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore<boolean>(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className="bg-surface-subtle/80 relative grid h-9 w-[4.75rem] grid-cols-2 rounded-full p-1"
      role="group"
      aria-label="Color theme"
    >
      <span
        aria-hidden="true"
        className={cn(
          "bg-surface absolute top-1 left-1 size-7 rounded-full shadow-sm transition-transform duration-300 ease-out",
          isDark && "translate-x-8",
        )}
      />
      <button
        aria-label="Use light theme"
        aria-pressed={!isDark}
        className={cn(
          "relative z-10 grid place-items-center rounded-full transition-colors",
          !isDark ? "text-amber-500" : "text-muted-foreground",
        )}
        onClick={() => setTheme("light")}
        type="button"
      >
        <Sun className="size-3.5" />
      </button>
      <button
        aria-label="Use dark theme"
        aria-pressed={isDark}
        className={cn(
          "relative z-10 grid place-items-center rounded-full transition-colors",
          isDark ? "text-primary" : "text-muted-foreground",
        )}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}
