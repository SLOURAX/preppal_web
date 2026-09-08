"use client";

import {
  ArrowLeft,
  BookOpenText,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

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
  const [isTopicPickerOpen, setIsTopicPickerOpen] = useState(false);
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

      <div className="relative mt-3 sm:hidden">
        <button
          aria-expanded={isTopicPickerOpen}
          className={cn(
            "border-border bg-surface text-foreground flex h-14 w-full items-center justify-between rounded-2xl border px-4 text-left text-sm font-medium transition-all",
            isTopicPickerOpen && "border-primary ring-primary/15 ring-4",
          )}
          onClick={() => setIsTopicPickerOpen((open) => !open)}
          type="button"
        >
          <span>
            {selectedTopics.length > 0
              ? `${selectedTopics.length} topic${selectedTopics.length === 1 ? "" : "s"} selected`
              : "Choose topics"}
          </span>
          <ChevronDown
            className={cn(
              "text-muted-foreground size-5 transition-transform",
              isTopicPickerOpen && "rotate-180",
            )}
          />
        </button>

        {isTopicPickerOpen && (
          <div className="border-border bg-surface absolute top-full left-0 z-20 mt-2 w-full rounded-2xl border p-2 shadow-2xl">
            <div className="flex max-h-60 flex-col overflow-y-auto">
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);

                return (
                  <button
                    aria-pressed={isSelected}
                    className={cn(
                      "flex items-center justify-between border-b px-3 py-3 text-left text-sm last:border-b-0",
                      isSelected
                        ? "text-primary"
                        : "text-foreground hover:bg-surface-subtle",
                    )}
                    key={topic}
                    onClick={() => onToggleTopic(topic)}
                    type="button"
                  >
                    {topic}
                    {isSelected && <Check className="text-primary size-4" />}
                  </button>
                );
              })}
            </div>
            <button
              className="text-primary mt-2 w-full border-t pt-3 text-xs font-semibold"
              onClick={() => setIsTopicPickerOpen(false)}
              type="button"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 hidden gap-2.5 sm:grid sm:grid-cols-2">
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
