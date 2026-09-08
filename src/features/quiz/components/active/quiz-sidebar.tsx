"use client";

import { LogOut, Send } from "lucide-react";
import {
  SaxAwardBulk,
  SaxChartSuccessBulk,
  SaxFlag2Bulk,
} from "@meysam213/iconsax-react";
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
  readonly isUntimed?: boolean;
}

const LEGEND = [
  { dot: "bg-primary", label: "Answered" },
  { dot: "bg-amber-400", label: "Flagged" },
  { dot: "bg-border", label: "Unanswered" },
] as const;

const ZIGZAG_BG = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20l10-10 20 20 10-10' stroke='rgba(124, 58, 237, 0.03)' stroke-width='1' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export function QuizSidebar({
  total,
  currentIndex,
  answeredCount,
  flaggedCount,
  unansweredCount,
  getStatus,
  onSelectQuestion,
  onSubmit,
  isUntimed = false,
}: QuizSidebarProps) {
  const stats = [
    {
      label: "Answered",
      value: answeredCount,
      color: "text-primary",
      icon: SaxChartSuccessBulk,
    },
    {
      label: "Flagged",
      value: flaggedCount,
      color: "text-amber-500",
      icon: SaxFlag2Bulk,
    },
    {
      label: "Left",
      value: unansweredCount,
      color: "text-muted-foreground",
      icon: SaxAwardBulk,
    },
  ];

  return (
    <aside
      className="border-border hidden w-[30%] shrink-0 flex-col border-l md:flex"
      style={{
        backgroundColor: "var(--surface)",
        backgroundImage: ZIGZAG_BG,
      }}
    >
      <div className="flex h-full flex-col p-5">
        <h3 className="text-foreground mb-4 text-[.85rem] font-bold tracking-widest uppercase">
          Question Overview
        </h3>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          {stats.map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="bg-surface-subtle p-x2.5 rounded-md py-3"
            >
              <Icon className={cn("mx-auto mb-1 size-8", color)} />
              <p className="text-muted-foreground mt-3 text-[11px] leading-tight">
                {label}
              </p>
              <p className={cn("text-[1rem] font-bold", color)}>{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {LEGEND.map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={cn("block size-2 rounded-full", dot)} />
              <span className="text-muted-foreground text-[11px]">{label}</span>
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
            {isUntimed ? (
              <LogOut className="size-4" />
            ) : (
              <Send className="size-4" />
            )}
            {isUntimed ? "Finish playground" : "Submit Exam"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
