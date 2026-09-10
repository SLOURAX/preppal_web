import { ArrowLeft, ArrowRight, CalendarDays, Check } from "lucide-react";

import { Button } from "@/components/ui";
import { ListSelect } from "@/components/ui/list-select";
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
        <ArrowLeft className="size-5" /> Back
      </button>

      <div className="mt-5">
        <h2 className="text-foreground text-lg font-bold sm:text-xl">
          Choose a year for {examLabel}
        </h2>
        <p className="text-muted-foreground mt-1 text-[.8rem] leading-relaxed">
          Select a specific past question year or choose a random mix.
        </p>
      </div>

      <div className="mt-6 sm:hidden">
        <ListSelect
          icon={CalendarDays}
          onChange={(value) => onSelectYear(Number(value))}
          options={EXAM_YEARS.map((year) => ({
            label: String(year),
            value: String(year),
          }))}
          placeholder="Choose a year"
          showOptionDescriptions={false}
          value={selectedYear ? String(selectedYear) : ""}
        />
      </div>

      <div className="mt-6 hidden grid-cols-2 gap-2 sm:grid sm:grid-cols-4">
        {EXAM_YEARS.map((year) => {
          const isSelected = selectedYear === year;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "relative rounded-xl py-3 text-center text-[.8rem] font-semibold transition-colors",
                isSelected
                  ? "border border-primary text-primary bg-surface"
                  : "bg-surface text-foreground hover:bg-primary/5 border",
              )}
              key={year}
              onClick={() => onSelectYear(year)}
              type="button"
            >
              {year}
              {isSelected ? (
                <span className="bg-primary text-primary-foreground absolute top-3 right-3 grid size-4 place-items-center rounded-full">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              ) : null}
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
