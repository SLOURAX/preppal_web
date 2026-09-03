import { ArrowLeft, BookOpenText, Check, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import type { QuizDifficulty } from "../quiz.constants";

interface SubjectTopicsStepProps {
  readonly difficulty: QuizDifficulty;
  readonly selectedTopics: readonly string[];
  readonly subjectLabel: string;
  readonly topics: readonly string[];
  readonly onBack: () => void;
  readonly onToggleAll: () => void;
  readonly onToggleTopic: (topic: string) => void;
  readonly onContinue: () => void;
}

export function SubjectTopicsStep({
  difficulty,
  selectedTopics,
  subjectLabel,
  topics,
  onBack,
  onToggleAll,
  onToggleTopic,
  onContinue,
}: SubjectTopicsStepProps) {
  const allTopicsSelected = selectedTopics.length === topics.length;

  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-4" /> Back to difficulty
      </button>

      <div className="mt-5 flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <BookOpenText className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-primary text-xs font-semibold">{subjectLabel}</p>
            <span className="bg-surface-subtle text-muted-foreground rounded-full px-2 py-1 text-[10px] font-semibold capitalize">
              {difficulty}
            </span>
          </div>
          <h2 className="text-foreground mt-1 text-xl font-bold">
            Pick your topics
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Select one or more areas. Your practice set will focus on these
            topics.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          {selectedTopics.length} of {topics.length} selected
        </p>
        <button
          className="text-primary text-xs font-semibold hover:underline"
          onClick={onToggleAll}
          type="button"
        >
          {allTopicsSelected ? "Clear all" : "Select all"}
        </button>
      </div>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-xl px-4 text-left text-sm font-medium transition-colors",
                isSelected
                  ? "bg-primary/10 text-primary"
                  : "bg-surface text-foreground hover:bg-primary/5 border",
              )}
              key={topic}
              onClick={() => onToggleTopic(topic)}
              type="button"
            >
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-md",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-subtle text-muted-foreground",
                )}
              >
                {isSelected ? <Check className="size-3.5" /> : null}
              </span>
              {topic}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          {selectedTopics.length > 0
            ? "Your topic choices are ready."
            : "Select at least one topic for your practice set."}
        </p>
        <Button
          className="gap-2"
          disabled={selectedTopics.length === 0}
          onClick={onContinue}
        >
          Choose mode <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
