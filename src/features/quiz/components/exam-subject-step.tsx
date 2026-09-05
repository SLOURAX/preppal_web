"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { EXAM_SUBJECTS } from "../quiz.constants";

interface ExamSubjectStepProps {
  readonly examLabel: string;
  readonly examValue: string;
  readonly selectedSubject: string | null;
  readonly onBack: () => void;
  readonly onSelectSubject: (value: string) => void;
  readonly onContinue: () => void;
}

export function ExamSubjectStep({
  examLabel,
  examValue,
  selectedSubject,
  onBack,
  onSelectSubject,
  onContinue,
}: ExamSubjectStepProps) {
  const subjects = EXAM_SUBJECTS[examValue] ?? [];

  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="mt-5">
        <h2 className="text-foreground text-xl font-bold">
          Choose a subject for {examLabel}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Select the subject you want to practice under the {examLabel}{" "}
          syllabus.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => {
          const isSelected = selectedSubject === subject.value;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "relative rounded-2xl border p-4 text-left transition-all",
                isSelected
                  ? "border-primary text-primary"
                  : "text-foreground border-transparent hover:-translate-y-0.5",
              )}
              key={subject.value}
              onClick={() => onSelectSubject(subject.value)}
              type="button"
            >
              {isSelected && (
                <div className="bg-primary text-primary-foreground absolute top-3 right-3 flex size-4 items-center justify-center rounded-full">
                  <Check className="size-2.5" strokeWidth={3} />
                </div>
              )}
              <span className="block text-[.8rem] font-semibold">
                {subject.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          You can change this subject later.
        </p>
        <Button
          className="gap-2"
          disabled={!selectedSubject}
          onClick={onContinue}
        >
          Choose year <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
