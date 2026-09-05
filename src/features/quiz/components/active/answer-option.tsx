"use client";

import {
  SaxCloseCircleBulk,
  SaxLike1Bulk,
  SaxTickCircleBulk,
} from "@meysam213/iconsax-react";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  readonly letter: string;
  readonly text: string;
  readonly isSelected: boolean;
  readonly onSelect: () => void;
  readonly disabled?: boolean;
  readonly isCorrect?: boolean;
  readonly isIncorrect?: boolean;
}

export function AnswerOption({
  letter,
  text,
  isSelected,
  onSelect,
  disabled = false,
  isCorrect = false,
  isIncorrect = false,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-xl border px-4 py-3 pr-14 text-left text-sm font-medium transition-all",
        isCorrect
          ? "border-emerald-500/80 bg-emerald-600/15 shadow-sm"
          : isIncorrect
            ? "border-rose-500/80 bg-rose-600/15 shadow-sm"
            : isSelected
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-80",
      )}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center text-[.8rem] font-bold transition-colors",
          isCorrect
            ? "text-emerald-600"
            : isIncorrect
              ? "text-rose-600"
              : isSelected
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary",
        )}
      >
        {letter}
      </span>
      <span className="text-foreground flex-1 text-[.8rem]">{text}</span>
      {isCorrect && isSelected ? (
        <span
          aria-label="Correct selection"
          className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 leading-none text-white shadow-sm"
        >
          <SaxLike1Bulk className="block size-4" />
        </span>
      ) : isCorrect ? (
        <SaxTickCircleBulk className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-emerald-600" />
      ) : isIncorrect ? (
        <SaxCloseCircleBulk className="absolute top-1/2 right-3 size-5 -translate-y-1/2 text-rose-600" />
      ) : isSelected ? (
        <SaxTickCircleBulk className="text-primary absolute top-1/2 right-3 size-5 -translate-y-1/2" />
      ) : null}
    </button>
  );
}
