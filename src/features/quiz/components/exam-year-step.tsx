import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { EXAM_YEARS } from "../quiz.constants";

interface ExamYearStepProps {
  readonly examLabel: string;
  readonly selectedYear: number | null;
  readonly onBack: () => void;
  readonly onSelectYear: (year: number) => void;
  readonly onContinue: () => void;
}

export function ExamYearStep({
  examLabel,
  selectedYear,
  onBack,
  onSelectYear,
  onContinue,
}: ExamYearStepProps) {
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
          Choose a year for {examLabel}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
          Select a specific past question year or choose a random mix.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {EXAM_YEARS.map((year) => {
          const isSelected = selectedYear === year;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "rounded-xl py-3 text-center text-[.8rem] font-semibold transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-primary/20 shadow-lg"
                  : "bg-surface text-foreground hover:bg-primary/5 border",
              )}
              key={year}
              onClick={() => onSelectYear(year)}
              type="button"
            >
              {year}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          You can change the year later if needed.
        </p>
        <Button className="gap-2" disabled={!selectedYear} onClick={onContinue}>
          Choose mode <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
