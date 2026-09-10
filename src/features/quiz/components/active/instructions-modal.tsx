"use client";

import { X, BookOpen } from "lucide-react";

const INSTRUCTIONS = [
  "Select one answer per question by clicking on it.",
  "Use the Flag button to mark questions you want to revisit before submitting.",
  "Use the question grid in the sidebar to jump to any question at any time.",
  "The exam will auto-submit when the timer reaches zero.",
  "You cannot pause or resume a timed exam once it has started.",
] as const;

interface InstructionsModalProps {
  readonly onClose: () => void;
}

export function InstructionsModal({ onClose }: InstructionsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-surface relative z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
        <div className="border-border flex items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 grid size-8 place-items-center rounded-lg">
              <BookOpen className="text-primary size-4" />
            </div>
            <h2 className="text-foreground font-bold">Exam Instructions</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-rose-500/10 p-1.5 text-rose-600 transition-colors hover:bg-rose-500/15"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <ul className="space-y-4 sm:space-y-5">
            {INSTRUCTIONS.map((text, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
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
