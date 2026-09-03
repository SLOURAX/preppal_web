"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore<boolean>(
    () => () => undefined,
    () => true,
    () => false,
  );
  
  const currentTheme = mounted ? theme : "light";

  return (
    <div
      className="bg-surface-subtle/80 relative grid h-9 w-[6.5rem] grid-cols-3 rounded-full p-1"
      role="group"
      aria-label="Color theme"
    >
      <span
        aria-hidden="true"
        className={cn(
          "bg-surface absolute top-1 left-[6px] size-7 rounded-full shadow-sm transition-transform duration-300 ease-out",
          currentTheme === "system" && "translate-x-8",
          currentTheme === "dark" && "translate-x-16",
        )}
      />
      <button
        aria-label="Use light theme"
        aria-pressed={currentTheme === "light"}
        className={cn(
          "relative z-10 grid place-items-center rounded-full transition-colors",
          currentTheme === "light" ? "text-amber-500" : "text-muted-foreground",
        )}
        onClick={() => setTheme("light")}
        type="button"
      >
        <Sun className="size-3.5" />
      </button>
      <button
        aria-label="Use system theme"
        aria-pressed={currentTheme === "system"}
        className={cn(
          "relative z-10 grid place-items-center rounded-full transition-colors",
          currentTheme === "system" ? "text-primary" : "text-muted-foreground",
        )}
        onClick={() => setTheme("system")}
        type="button"
      >
        <Monitor className="size-3.5" />
      </button>
      <button
        aria-label="Use dark theme"
        aria-pressed={currentTheme === "dark"}
        className={cn(
          "relative z-10 grid place-items-center rounded-full transition-colors",
          currentTheme === "dark" ? "text-primary" : "text-muted-foreground",
        )}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}
