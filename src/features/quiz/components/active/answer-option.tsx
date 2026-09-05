"use client";

import { SaxTickCircleBulk } from "@meysam213/iconsax-react";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  readonly letter: string;
  readonly text: string;
  readonly isSelected: boolean;
  readonly onSelect: () => void;
  readonly disabled?: boolean;
  readonly isCorrect?: boolean;
}

export function AnswerOption({
  letter,
  text,
  isSelected,
  onSelect,
  disabled = false,
  isCorrect = false,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
        isCorrect
          ? "border-emerald-400/70 bg-emerald-500/10 shadow-sm"
          : isSelected
            ? "border-primary bg-primary/10 shadow-sm"
            : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-80",
      )}
    >
      <span
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-lg text-[.75rem] font-semibold transition-colors",
          isCorrect
            ? "bg-emerald-500 text-white"
            : isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-surface-subtle text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
        )}
      >
        {letter}
      </span>
      <span className="text-foreground flex-1 text-[.8rem]">{text}</span>
      {isCorrect ? (
        <SaxTickCircleBulk className="size-5 shrink-0 text-emerald-600" />
      ) : isSelected ? (
        <SaxTickCircleBulk className="text-primary size-5 shrink-0" />
      ) : null}
    </button>
  );
}
