"use client";

import { LogOut, Send, X } from "lucide-react";
import { SaxAwardBulk, SaxFlashBulk } from "@meysam213/iconsax-react";
import { Button } from "@/components/ui";
import { QuizTimer } from "./quiz-timer";

interface QuizHeaderProps {
  readonly currentIndex: number;
  readonly total: number;
  readonly secondsLeft?: number;
  readonly onExit: () => void;
  readonly onSubmit: () => void;
  readonly isUntimed?: boolean;
  readonly correctCount?: number;
}

export function QuizHeader({
  currentIndex,
  total,
  secondsLeft,
  onExit,
  onSubmit,
  isUntimed = false,
  correctCount = 0,
}: QuizHeaderProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <header className="border-border bg-surface/95 z-30 flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onExit}
          className="text-muted-foreground hidden size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-red-500/10 hover:text-red-500 sm:flex"
        >
          <X className="size-4" />
        </button>
        <div className="hidden min-w-0 sm:block">
          <p className="text-foreground truncate text-sm font-semibold">
            JAMB Mathematics
          </p>
          <p className="text-muted-foreground text-xs">
            2023 · {isUntimed ? "Practice Playground" : "Timed Simulation"}
          </p>
        </div>
        {isUntimed ? (
          <div
            className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 sm:hidden"
            aria-label={`${correctCount * 10} XP, ${correctCount} correct`}
          >
            <SaxFlashBulk className="size-3.5" />
            <span>{correctCount * 10} XP</span>
            <span className="text-amber-300">•</span>
            <SaxAwardBulk className="size-3.5" />
            <span>{correctCount}</span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        {isUntimed ? (
          <div className="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 sm:flex">
            <SaxFlashBulk className="size-4" />
            <span>{correctCount * 10} XP</span>
            <span className="text-amber-300">•</span>
            <SaxAwardBulk className="size-4" />
            <span>{correctCount} correct</span>
          </div>
        ) : null}
        <span className="text-primary bg-primary/10 hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex">
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
          aria-label={isUntimed ? "Exit playground" : "Submit quiz"}
          className="flex gap-1.5 px-2.5 text-xs sm:px-4"
        >
          {isUntimed ? (
            <LogOut className="size-3.5" />
          ) : (
            <Send className="size-3.5" />
          )}
          <span>{isUntimed ? "Exit playground" : "Submit Quiz"}</span>
        </Button>
      </div>
    </header>
  );
}
