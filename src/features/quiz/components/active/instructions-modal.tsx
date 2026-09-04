"use client";

import { X, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const INSTRUCTIONS = [
  "Select one answer per question by clicking on it.",
  "Use the Flag button to mark questions you want to revisit before submitting.",
  "Use the question grid in the sidebar to jump to any question at any time.",
  "The exam will auto-submit when the timer reaches zero.",
  "You cannot pause or resume a timed exam once it has started.",
] as const;

interface InstructionsModalProps {
  readonly currentIndex: number;
  readonly total: number;
  readonly onClose: () => void;
  readonly onNavigate: (idx: number) => void;
}

export function InstructionsModal({
  currentIndex,
  total,
  onClose,
  onNavigate,
}: InstructionsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-surface relative z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
        <div className="border-border flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 grid size-8 place-items-center rounded-lg">
              <BookOpen className="text-primary size-4" />
            </div>
            <h2 className="text-foreground font-bold">Exam Instructions</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-surface-subtle rounded-full p-1.5 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <ul className="space-y-5">
            {INSTRUCTIONS.map((text, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
