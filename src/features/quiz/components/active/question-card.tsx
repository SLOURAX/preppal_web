"use client";

import { Info } from "lucide-react";
import { SaxFlag2Bulk } from "@meysam213/iconsax-react";
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
  readonly isPracticeMode?: boolean;
  readonly feedback?: "correct" | "incorrect";
  readonly correctAnswer?: string;
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
  isPracticeMode = false,
  feedback,
  correctAnswer,
}: QuestionCardProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex shrink-0 items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase sm:text-[.8rem]">
            Question
          </span>
          <span className="text-foreground text-sm font-bold sm:text-base">
            {index + 1}
          </span>
          <span className="text-muted-foreground text-xs sm:text-[.8rem]">
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
            <SaxFlag2Bulk
              className="size-4 sm:size-3.5"
              fill={isFlagged ? "currentColor" : "none"}
            />
            <span className="hidden sm:inline">
              {isFlagged ? "Flagged" : "Flag Question"}
            </span>
          </button>
        </div>
      </div>

      <div
        className="surface-card relative overflow-hidden rounded-[1.35rem] p-5 shadow-[0_14px_0_-7px_rgba(124,58,237,0.12),0_18px_34px_-18px_rgba(76,45,180,0.35)] sm:p-6"
        style={{
          clipPath:
            "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        <div className="via-primary pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
        {isPracticeMode ? (
          <div className="mb-3 flex items-center justify-between">
            <span className="text-primary/70 text-[10px] font-bold tracking-[0.18em] uppercase">
              Playground challenge
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-[10px] font-bold">
              +10 P
            </span>
          </div>
        ) : null}
        {question.passage ? (
          <div className="bg-surface-subtle mb-4 rounded-xl p-3 sm:p-4">
            <p className="text-muted-foreground mb-2 text-[.58rem] font-bold tracking-wide uppercase">
              Read the passage
            </p>
            <div
              className="rich-content text-foreground text-[.76rem] leading-6"
              dangerouslySetInnerHTML={{ __html: question.passage }}
            />
          </div>
        ) : null}
        <div
          className="rich-content text-foreground text-[.8rem] leading-normal font-medium sm:text-[.9rem]"
          dangerouslySetInnerHTML={{ __html: question.text }}
        />
        <div className="mt-5 space-y-2.5">
          {question.options.map((option, idx) => (
            <AnswerOption
              key={option}
              letter={String.fromCharCode(65 + idx)}
              text={option}
              isSelected={selectedAnswer === option}
              disabled={isPracticeMode && Boolean(selectedAnswer)}
              isCorrect={Boolean(
                isPracticeMode &&
                ((feedback === "incorrect" && correctAnswer === option) ||
                  (feedback === "correct" && selectedAnswer === option)),
              )}
              isIncorrect={Boolean(
                isPracticeMode &&
                feedback === "incorrect" &&
                selectedAnswer === option,
              )}
              onSelect={() => onSelectAnswer(option)}
            />
          ))}
        </div>
        <style jsx>{`
          .rich-content :global(img) {
            display: block;
            max-width: 100%;
            max-height: 20rem;
            margin: 0.75rem auto;
            border-radius: 0.75rem;
            object-fit: contain;
          }
          .rich-content :global(figure) {
            margin: 0.75rem 0;
            text-align: center;
          }
          .rich-content :global(figcaption) {
            color: var(--muted-foreground);
            font-size: 0.72rem;
            margin-top: 0.35rem;
          }
          .rich-content :global(.rich-inline) {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            background: color-mix(in srgb, var(--primary) 8%, transparent);
            border-radius: 0.35rem;
            padding: 0.1rem 0.28rem;
            white-space: pre-wrap;
          }
          .rich-content :global(ul) {
            list-style: disc;
            padding-left: 1.4rem;
          }
          .rich-content :global(ol) {
            list-style: decimal;
            padding-left: 1.4rem;
          }
          .rich-content :global(blockquote) {
            border-left: 2px solid var(--primary);
            padding-left: 0.75rem;
            opacity: 0.85;
          }
          .rich-content :global(table) {
            width: 100%;
            border-collapse: collapse;
          }
          .rich-content :global(th),
          .rich-content :global(td) {
            border: 1px solid var(--border);
            padding: 0.35rem 0.5rem;
          }
        `}</style>
      </div>
    </div>
  );
}
