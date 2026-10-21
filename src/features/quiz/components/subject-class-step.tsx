"use client";

import { ArrowLeft, ChevronRight, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui";
import { QuizSelect } from "./quiz-select";

interface SubjectClassStepProps {
  readonly subjectLabel: string;
  readonly classes: readonly {
    value: string;
    label: string;
    description?: string;
  }[];
  readonly selectedClass: string | null;
  readonly onBack: () => void;
  readonly onSelectClass: (value: string) => void;
  readonly onContinue: () => void;
}

export function SubjectClassStep({
  subjectLabel,
  classes,
  selectedClass,
  onBack,
  onSelectClass,
  onContinue,
}: SubjectClassStepProps) {
  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-4" /> Back to subjects
      </button>
      <div className="mt-5 flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <GraduationCap className="size-5" />
        </span>
        <div>
          <p className="text-primary text-xs font-semibold">{subjectLabel}</p>
          <h2 className="text-foreground mt-1 text-lg font-bold sm:text-xl">
            Choose your class
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            We’ll show only topics and questions available for that class.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <QuizSelect
          icon={GraduationCap}
          id="subject-class"
          label="Class"
          onChange={onSelectClass}
          options={classes}
          placeholder="Select a class"
          value={selectedClass ?? ""}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          className="gap-2"
          disabled={!selectedClass}
          onClick={onContinue}
        >
          Choose topics <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
