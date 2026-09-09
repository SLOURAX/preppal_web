"use client";

import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface QuizTimerProps {
  readonly secondsLeft: number;
}

export function QuizTimer({ secondsLeft }: QuizTimerProps) {
  const isDanger = secondsLeft < 5 * 60;
  const isWarning = secondsLeft < 10 * 60 && !isDanger;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5 tabular-nums shadow-sm transition-colors sm:px-3",
        isDanger
          ? "animate-pulse border-red-500/30 text-red-600"
          : isWarning
            ? "border-amber-500/30 text-amber-600"
            : "border-border text-foreground",
      )}
    >
      <Clock3 className="size-4 shrink-0" strokeWidth={2.1} />
      <span className="hidden text-[10px] font-semibold tracking-wide uppercase opacity-70 sm:inline">
        Time left
      </span>
      <span className="font-mono text-[.95rem] font-bold tracking-tight">
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
}
