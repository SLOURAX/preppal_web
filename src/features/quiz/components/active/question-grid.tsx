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
    <div
      className="grid gap-y-3 p-1.5"
      style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
    >
      {Array.from({ length: total }, (_, idx) => {
        const questionId = idx + 1;
        const status = getStatus(questionId);
        const isCurrent = idx === currentIndex;

        // Honeycomb/zigzag logic
        const row = Math.floor(idx / 5);
        const colInRow = idx % 5;
        const colStart = row % 2 === 0 ? colInRow * 2 + 1 : colInRow * 2 + 2;

        return (
          <div
            key={questionId}
            className="flex justify-center"
            style={{ gridColumn: `${colStart} / span 2` }}
          >
            <button
              onClick={() => onSelect(idx)}
              title={`Question ${questionId}`}
              className={cn(
                "relative flex size-9 items-center justify-center rounded-full text-xs font-semibold transition-all",
                isCurrent &&
                  "ring-primary ring-offset-surface ring-2 ring-offset-2",
                status === "answered" &&
                  "bg-primary text-primary-foreground shadow-sm",
                status === "flagged" && "bg-amber-400/20 text-amber-600",
                status === "unanswered" &&
                  "bg-surface-subtle text-muted-foreground hover:bg-primary/10 hover:text-primary",
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
