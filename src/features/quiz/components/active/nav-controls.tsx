"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question, QuestionStatus } from "./types";

interface NavControlsProps {
  readonly currentIndex: number;
  readonly total: number;
  readonly questions: readonly Question[];
  readonly getStatus: (id: number) => QuestionStatus;
  readonly onNavigate: (idx: number) => void;
}

export function NavControls({
  currentIndex,
  total,
  questions,
  getStatus,
  onNavigate,
}: NavControlsProps) {
  const nearbyStart = Math.max(0, currentIndex - 3);
  const nearbyEnd = Math.min(total, currentIndex + 4);
  const nearbySlice = questions.slice(nearbyStart, nearbyEnd);

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <button
        onClick={() => onNavigate(currentIndex - 1)}
        disabled={currentIndex === 0}
        className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-all hover:border-border disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      <div className="hidden items-center gap-1.5 sm:flex">
        {nearbySlice.map((q, i) => {
          const actualIdx = nearbyStart + i;
          const isCur = actualIdx === currentIndex;
          const status = getStatus(q.id);
          return (
            <button
              key={q.id}
              onClick={() => onNavigate(actualIdx)}
              className={cn(
                "rounded-full transition-all",
                isCur
                  ? "bg-primary size-2.5"
                  : status === "answered"
                    ? "bg-primary/40 size-2"
                    : status === "flagged"
                      ? "bg-amber-400 size-2"
                      : "bg-border size-2",
              )}
            />
          );
        })}
      </div>

      <button
        onClick={() => onNavigate(currentIndex + 1)}
        disabled={currentIndex === total - 1}
        className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-40"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
