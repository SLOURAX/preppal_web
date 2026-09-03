"use client";

import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
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
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm font-bold tabular-nums transition-colors",
        isDanger
          ? "bg-red-500/10 text-red-600"
          : isWarning
            ? "bg-amber-500/10 text-amber-600"
            : "bg-surface-subtle text-foreground",
      )}
    >
      <Timer className="size-3.5" />
      {formatTime(secondsLeft)}
    </div>
  );
}
