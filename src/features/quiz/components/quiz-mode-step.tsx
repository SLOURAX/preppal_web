"use client";

import { ArrowLeft, Play, BoomBox, Timer } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { QUIZ_MODES, type QuizMode, type QuizPath } from "../quiz.constants";

interface QuizModeStepProps {
  readonly selectedMode: QuizMode | null;
  readonly context: {
    path: QuizPath;
    examLabel?: string;
    subjectLabel?: string;
    yearLabel?: string;
    difficulty?: string;
  };
  readonly onBack: () => void;
  readonly onSelectMode: (mode: QuizMode) => void;
  readonly onStart: () => void;
}

export function QuizModeStep({
  selectedMode,
  context,
  onBack,
  onSelectMode,
  onStart,
}: QuizModeStepProps) {
  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="bg-surface border-border mt-5 flex flex-wrap items-center gap-2 rounded-xl border p-3">
        <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {context.path === "exam" ? "Exam" : "Subject"} Practice:
        </span>
        <div className="flex flex-wrap gap-2">
          {context.examLabel && (
            <span className="bg-surface text-foreground rounded-full border px-4 py-1 text-xs font-semibold">
              {context.examLabel}
            </span>
          )}
          {context.subjectLabel && (
            <span className="bg-surface text-foreground rounded-full border px-4 py-1 text-xs font-semibold">
              {context.subjectLabel}
            </span>
          )}
          {context.yearLabel && (
            <span className="bg-surface text-foreground rounded-full border px-4 py-1 text-xs font-semibold">
              {context.yearLabel}
            </span>
          )}
          {context.difficulty && (
            <span className="bg-surface text-foreground rounded-full border px-4 py-1 text-xs font-semibold capitalize">
              {context.difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-foreground text-lg font-bold sm:text-xl">
          How would you like to practice?
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Choose to simulate real exam conditions or learn at your own pace with
          AI assistance.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {QUIZ_MODES.map((mode) => {
          const isSelected = selectedMode === mode.value;
          const Icon = mode.icon === "Timer" ? Timer : BoomBox;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "relative rounded-2xl border p-6 text-left transition-all",
                isSelected
                  ? "bg-surface-subtle shadow-primary/10 border shadow-lg"
                  : "bg-surface border-transparent hover:-translate-y-0.5",
              )}
              key={mode.value}
              onClick={() => onSelectMode(mode.value as QuizMode)}
              type="button"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface text-primary",
                  )}
                >
                  <Icon className="size-6" />
                </span>
                {mode.value === "timed" ? (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-600 uppercase">
                    Take a quiz
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-600 uppercase">
                    Learn at your own pace
                  </span>
                )}
              </div>
              <span className="text-foreground mt-5 block text-base font-bold sm:text-lg">
                {mode.label}
              </span>
              <span className="text-muted-foreground mt-2 block text-sm leading-relaxed">
                {mode.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          className="w-full gap-2 sm:w-auto"
          disabled={!selectedMode}
          onClick={onStart}
        >
          {/* <Play className="size-4" fill="currentColor" />  */}
          Start practice
        </Button>
      </div>
    </section>
  );
}
