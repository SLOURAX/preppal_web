"use client";

import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { QuestionGrid } from "./question-grid";
import type { QuestionStatus } from "./types";

interface QuizSidebarProps {
  readonly total: number;
  readonly currentIndex: number;
  readonly answeredCount: number;
  readonly flaggedCount: number;
  readonly unansweredCount: number;
  readonly getStatus: (id: number) => QuestionStatus;
  readonly onSelectQuestion: (idx: number) => void;
  readonly onSubmit: () => void;
}

const LEGEND = [
  { dot: "bg-primary", label: "Answered" },
  { dot: "bg-amber-400", label: "Flagged" },
  { dot: "bg-border", label: "Unanswered" },
] as const;

export function QuizSidebar({
  total,
  currentIndex,
  answeredCount,
  flaggedCount,
  unansweredCount,
  getStatus,
  onSelectQuestion,
  onSubmit,
}: QuizSidebarProps) {
  const stats = [
    { label: "Answered", value: answeredCount, color: "text-primary" },
    { label: "Flagged", value: flaggedCount, color: "text-amber-500" },
    { label: "Left", value: unansweredCount, color: "text-muted-foreground" },
  ];

  return (
    <aside className="border-border bg-surface hidden w-[30%] shrink-0 flex-col border-l md:flex">
      <div className="flex h-full flex-col p-5">
        <h3 className="text-foreground mb-4 text-xs font-bold uppercase tracking-widest">
          Question Overview
        </h3>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="bg-surface-subtle rounded-xl p-2.5">
              <p className={cn("text-lg font-bold", color)}>{value}</p>
              <p className="text-muted-foreground mt-0.5 text-[10px] leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {LEGEND.map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={cn("block size-2 rounded-full", dot)} />
              <span className="text-muted-foreground text-[10px]">{label}</span>
            </div>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <QuestionGrid
            total={total}
            currentIndex={currentIndex}
            getStatus={getStatus}
            onSelect={onSelectQuestion}
          />
        </div>

        <div className="border-border mt-4 border-t pt-4">
          <Button onClick={onSubmit} className="w-full gap-2 text-sm">
            <Send className="size-4" />
            Submit Exam
          </Button>
        </div>
      </div>
    </aside>
  );
}
