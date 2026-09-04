"use client";

import { cn } from "@/lib/utils";
import type { QuestionStatus } from "./types";

interface QuestionGridProps {
  readonly total: number;
  readonly currentIndex: number;
  readonly getStatus: (id: number) => QuestionStatus;
  readonly onSelect: (idx: number) => void;
}

export function QuestionGrid({
  total,
  currentIndex,
  getStatus,
  onSelect,
}: QuestionGridProps) {
  return (
    <div className="grid grid-cols-5 gap-5 p-2 sm:grid-cols-6 lg:grid-cols-5">
      {Array.from({ length: total }, (_, idx) => {
        const questionId = idx + 1;
        const status = getStatus(questionId);
        const isCurrent = idx === currentIndex;

        return (
          <div key={questionId}>
            <button
              onClick={() => onSelect(idx)}
              title={`Question ${questionId}`}
              className={cn(
                "relative mx-auto flex size-8 items-center justify-center rounded-md text-[.75rem] font-bold transition-all active:translate-y-px",
                isCurrent &&
                  "ring-primary ring-offset-surface ring-2 ring-offset-2",
                status === "answered" &&
                  "from-primary to-primary-strong text-primary-foreground bg-gradient-to-br shadow-[inset_0_1px_1px_rgb(255_255_255/0.35),0_3px_6px_rgb(76_45_180/0.25)]",
                status === "flagged" &&
                  "bg-gradient-to-br from-amber-300/40 to-amber-500/15 text-amber-700 shadow-[inset_0_1px_1px_rgb(255_255_255/0.8),0_2px_4px_rgb(180_120_20/0.12)]",
                status === "unanswered" &&
                  "from-surface-subtle to-border/30 text-muted-foreground hover:bg-primary/10 hover:text-primary bg-gradient-to-br shadow-[inset_0_1px_1px_rgb(255_255_255/0.7),0_2px_4px_rgb(39_24_93/0.08)]",
              )}
            >
              {questionId}
              {status === "flagged" && (
                <span className="border-surface absolute top-0 right-0 size-2 rounded-full border-2 bg-amber-400" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
