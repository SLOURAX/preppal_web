"use client";

import { Flag, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnswerOption } from "./answer-option";
import type { Question } from "./types";

interface QuestionCardProps {
  readonly question: Question;
  readonly index: number;
  readonly total: number;
  readonly selectedAnswer: string | undefined;
  readonly isFlagged: boolean;
  readonly onSelectAnswer: (answer: string) => void;
  readonly onToggleFlag: () => void;
  readonly onOpenInstructions: () => void;
}

export function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onToggleFlag,
  onOpenInstructions,
}: QuestionCardProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase sm:text-[.9rem]">
            Question
          </span>
          <span className="text-foreground text-sm font-bold sm:text-base">
            {index + 1}
          </span>
          <span className="text-muted-foreground text-[10px] sm:text-[.8rem]">
            of {total}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={onOpenInstructions}
            className="text-muted-foreground hover:text-foreground hover:bg-surface-subtle bg-surface/65 flex items-center gap-1.5 rounded-full p-2 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors sm:px-3 sm:py-1.5"
            title="Read Instructions"
          >
            <Info className="size-4 sm:size-3.5" />
            <span className="hidden sm:inline">Read Instructions</span>
          </button>
          <button
            onClick={onToggleFlag}
            className={cn(
              "flex items-center gap-1.5 rounded-full p-2 text-xs font-semibold transition-all sm:px-3 sm:py-1.5",
              isFlagged
                ? "bg-amber-500/15 text-amber-600"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle bg-surface/65 shadow-sm backdrop-blur-sm",
            )}
            title="Flag Question"
          >
            <Flag
              className="size-4 sm:size-3.5"
              fill={isFlagged ? "currentColor" : "none"}
            />
            <span className="hidden sm:inline">
              {isFlagged ? "Flagged" : "Flag Question"}
            </span>
          </button>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 sm:p-8">
        <p className="text-foreground text-[.85rem] leading-normal font-medium sm:text-[1rem]">
          {question.text}
        </p>
        <div className="mt-7 space-y-3">
          {question.options.map((option, idx) => (
            <AnswerOption
              key={option}
              letter={String.fromCharCode(65 + idx)}
              text={option}
              isSelected={selectedAnswer === option}
              onSelect={() => onSelectAnswer(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
