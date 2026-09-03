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
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[.9rem] font-medium uppercase tracking-widest">
            Question
          </span>
          <span className="text-foreground text-sm font-bold">{index + 1}</span>
          <span className="text-muted-foreground text-[.8rem]">of {total}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInstructions}
            className="text-muted-foreground hover:text-foreground hover:bg-surface-subtle flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <Info className="size-3.5" />
            Read Instructions
          </button>
          <button
            onClick={onToggleFlag}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
              isFlagged
                ? "bg-amber-500/15 text-amber-600"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle",
            )}
          >
            <Flag
              className="size-3.5"
              fill={isFlagged ? "currentColor" : "none"}
            />
            {isFlagged ? "Flagged" : "Flag Question"}
          </button>
        </div>
      </div>

      <div className="surface-card rounded-2xl p-6 sm:p-8">
        <p className="text-foreground text-[.85rem] font-medium leading-normal sm:text-[1rem]">
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
