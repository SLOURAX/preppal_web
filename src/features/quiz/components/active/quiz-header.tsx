"use client";

import { X, Send } from "lucide-react";
import { Button } from "@/components/ui";
import { QuizTimer } from "./quiz-timer";

interface QuizHeaderProps {
  readonly currentIndex: number;
  readonly total: number;
  readonly secondsLeft?: number;
  readonly onExit: () => void;
  readonly onSubmit: () => void;
}

export function QuizHeader({
  currentIndex,
  total,
  secondsLeft,
  onExit,
  onSubmit,
}: QuizHeaderProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <header className="border-border bg-surface/95 z-30 flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onExit}
          className="text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-red-500/10 hover:text-red-500"
        >
          <X className="size-4" />
        </button>
        <div className="hidden min-w-0 sm:block">
          <p className="text-foreground truncate text-sm font-semibold">
            JAMB Mathematics
          </p>
          <p className="text-muted-foreground text-xs">
            2023 · Timed Simulation
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-primary bg-primary/10 rounded-full px-2.5 py-1 text-xs font-semibold">
          {currentIndex + 1} / {total}
        </span>
        <div className="bg-surface-subtle hidden h-1.5 w-24 overflow-hidden rounded-full sm:block">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {secondsLeft !== undefined ? (
          <QuizTimer secondsLeft={secondsLeft} />
        ) : null}
        <Button
          onClick={onSubmit}
          className="hidden gap-1.5 px-4 text-xs sm:flex"
        >
          <Send className="size-3.5" />
          Submit Quiz
        </Button>
      </div>
    </header>
  );
}
