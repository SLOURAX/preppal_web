import { ArrowLeft, CalendarDays, Check, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { EXAM_YEARS } from "../quiz.constants";

interface ExamYearStepProps {
  readonly examLabel: string;
  readonly selectedYear: number | null;
  readonly onBack: () => void;
  readonly onSelectYear: (year: number) => void;
}

export function ExamYearStep({
  examLabel,
  selectedYear,
  onBack,
  onSelectYear,
}: ExamYearStepProps) {
  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-4" /> Back to exam selection
      </button>

      <div className="mt-5 flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <CalendarDays className="size-5" />
        </span>
        <div>
          <p className="text-primary text-xs font-semibold">{examLabel}</p>
          <h2 className="text-foreground mt-1 text-xl font-bold">
            Choose an exam year
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Select the year whose past questions you want to practise.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
        {EXAM_YEARS.map((year) => {
          const isSelected = selectedYear === year;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "relative min-h-12 rounded-xl px-3 text-sm font-semibold transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-primary/15 shadow-lg"
                  : "bg-surface-subtle text-foreground hover:bg-primary/10 hover:text-primary",
              )}
              key={year}
              onClick={() => onSelectYear(year)}
              type="button"
            >
              {year}
              {isSelected ? (
                <Check className="absolute top-1.5 right-1.5 size-3" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          {selectedYear
            ? `${examLabel} ${selectedYear} selected.`
            : "Choose one year to continue your setup."}
        </p>
        <Button className="gap-2" disabled>
          Question setup comes next <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
