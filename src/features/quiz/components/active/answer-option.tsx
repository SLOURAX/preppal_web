"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  readonly letter: string;
  readonly text: string;
  readonly isSelected: boolean;
  readonly onSelect: () => void;
}

export function AnswerOption({
  letter,
  text,
  isSelected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
        isSelected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border bg-surface hover:border-primary/40 hover:bg-primary/5",
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg text-[.8rem] font-semibold transition-colors",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-surface-subtle text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
        )}
      >
        {letter}
      </span>
      <span className="text-foreground text-[.8rem] flex-1">{text}</span>
      {isSelected && <CheckCircle2 className="text-primary size-4 shrink-0" />}
    </button>
  );
}
