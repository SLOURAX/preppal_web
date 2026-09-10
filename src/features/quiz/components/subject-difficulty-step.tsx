import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Gauge,
  Mountain,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { DIFFICULTY_CHOICES, type QuizDifficulty } from "../quiz.constants";

const DIFFICULTY_ICONS: Readonly<Record<QuizDifficulty, LucideIcon>> = {
  easy: Sprout,
  medium: Gauge,
  hard: Mountain,
};

interface SubjectDifficultyStepProps {
  readonly subjectLabel: string;
  readonly selectedDifficulty: QuizDifficulty | null;
  readonly onBack: () => void;
  readonly onContinue: () => void;
  readonly onSelectDifficulty: (difficulty: QuizDifficulty) => void;
}

export function SubjectDifficultyStep({
  subjectLabel,
  selectedDifficulty,
  onBack,
  onContinue,
  onSelectDifficulty,
}: SubjectDifficultyStepProps) {
  return (
    <section className="surface-card mx-auto max-w-3xl p-5 sm:p-8">
      <button
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold transition-colors"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="size-5" />
      </button>

      <div className="mt-5 flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <BrainCircuit className="size-5" />
        </span>
        <div>
          <p className="text-primary text-xs font-semibold">{subjectLabel}</p>
          <h2 className="text-foreground mt-1 text-lg font-bold sm:text-xl">
            Choose your difficulty
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Pick the level that best matches how you want to practise today.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {DIFFICULTY_CHOICES.map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty.value;
          const Icon = DIFFICULTY_ICONS[difficulty.value];

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "rounded-2xl p-4 text-left transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-primary/15 shadow-lg"
                  : "bg-surface text-foreground border hover:-translate-y-0.5",
              )}
              key={difficulty.value}
              onClick={() => onSelectDifficulty(difficulty.value)}
              type="button"
            >
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-xl",
                  isSelected ? "bg-white/15" : "bg-surface text-primary",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="mt-4 block text-sm font-semibold">
                {difficulty.label}
              </span>
              <span
                className={cn(
                  "mt-1 block text-xs leading-5",
                  isSelected ? "text-white/75" : "text-muted-foreground",
                )}
              >
                {difficulty.description}
              </span>
              <span
                className={cn(
                  "mt-3 block text-[10px] font-semibold tracking-wide uppercase",
                  isSelected ? "text-white/85" : "text-primary",
                )}
              >
                {difficulty.estimatedLevel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          You can change the difficulty before starting.
        </p>
        <Button
          className="gap-2"
          disabled={!selectedDifficulty}
          onClick={onContinue}
        >
          Choose topics <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
