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
    <div className="grid grid-cols-5 gap-3 p-1.5">
      {Array.from({ length: total }, (_, idx) => {
        const questionId = idx + 1;
        const status = getStatus(questionId);
        const isCurrent = idx === currentIndex;

        return (
          <button
            key={questionId}
            onClick={() => onSelect(idx)}
            title={`Question ${questionId}`}
            className={cn(
              "relative flex size-9 items-center justify-center rounded-full text-xs font-semibold transition-all",
              isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-surface",
              status === "answered" && "bg-primary text-primary-foreground shadow-sm",
              status === "flagged" &&
                "bg-amber-400/20 text-amber-600",
              status === "unanswered" &&
                "bg-surface-subtle text-muted-foreground hover:bg-primary/10 hover:text-primary",
            )}
          >
            {questionId}
            {status === "flagged" && (
              <span className="bg-amber-400 absolute top-0 right-0 size-2 rounded-full border-2 border-surface" />
            )}
          </button>
        );
      })}
    </div>
  );
}
