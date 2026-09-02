"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Clock3,
  GraduationCap,
  ListChecks,
  SlidersHorizontal,
} from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

import {
  EXAM_CHOICES,
  SUBJECT_CHOICES,
  type QuizPath,
} from "../quiz.constants";
import { QuizAuthGate } from "./quiz-auth-gate";
import { QuizSelect } from "./quiz-select";

const QUIZ_PATHS = [
  {
    value: "exam",
    title: "Prepare for an exam",
    description: "Practice within the structure of JAMB, WAEC, or NECO.",
    icon: GraduationCap,
  },
  {
    value: "subject",
    title: "Practice a subject",
    description: "Focus directly on Mathematics, English, Sciences, and more.",
    icon: BookOpenCheck,
  },
] as const;

const SETUP_STEPS = [
  { label: "Choose type", icon: ListChecks },
  { label: "Difficulty", icon: SlidersHorizontal },
  { label: "Timing", icon: Clock3 },
] as const;

interface QuizEntryScreenProps {
  readonly initialPath?: QuizPath;
  readonly initialSelection?: string;
}

export function QuizEntryScreen({
  initialPath = "exam",
  initialSelection = "",
}: QuizEntryScreenProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [quizPath, setQuizPath] = useState<QuizPath>(initialPath);
  const [selectedExam, setSelectedExam] = useState<string>(
    initialPath === "exam" ? initialSelection : "",
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(
    initialPath === "subject" ? initialSelection : "",
  );
  const [isSelectionSaved, setIsSelectionSaved] = useState<boolean>(false);
  const [isAuthGateOpen, setIsAuthGateOpen] = useState<boolean>(false);
  const choices = quizPath === "exam" ? EXAM_CHOICES : SUBJECT_CHOICES;
  const selectedValue = quizPath === "exam" ? selectedExam : selectedSubject;
  const selectedChoice = choices.find(
    (choice) => choice.value === selectedValue,
  );

  const updatePath = (path: QuizPath): void => {
    setQuizPath(path);
    setIsSelectionSaved(false);
  };

  const updateSelection = (value: string): void => {
    if (quizPath === "exam") setSelectedExam(value);
    else setSelectedSubject(value);
    setIsSelectionSaved(false);
  };

  const submitSelection = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!selectedChoice) return;

    if (!isAuthenticated) {
      setIsAuthGateOpen(true);
      return;
    }

    setIsSelectionSaved(true);
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
          What would you like to practice?
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          Choose an exam for structured preparation or select a subject for
          focused practice. You’ll configure difficulty and timing next.
        </p>
      </header>

      <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-2">
        {SETUP_STEPS.map(({ label, icon: Icon }, index) => (
          <div className="flex min-w-0 items-center gap-2" key={label}>
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full",
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-subtle text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="text-muted-foreground hidden text-xs font-medium sm:block">
              {label}
            </span>
            {index < SETUP_STEPS.length - 1 ? (
              <span className="bg-border mx-1 h-px w-5 sm:w-10" />
            ) : null}
          </div>
        ))}
      </div>

      <form
        className="surface-card mx-auto mt-8 max-w-3xl p-5 sm:p-8"
        onSubmit={submitSelection}
      >
        <fieldset>
          <legend className="text-foreground text-sm font-semibold">
            Choose your practice path
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {QUIZ_PATHS.map(({ value, title, description, icon: Icon }) => {
              const isSelected = quizPath === value;
              return (
                <button
                  aria-pressed={isSelected}
                  className={cn(
                    "group rounded-2xl p-4 text-left transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-primary/15 shadow-lg"
                      : "bg-surface-subtle text-foreground hover:-translate-y-0.5",
                  )}
                  key={value}
                  onClick={() => updatePath(value)}
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
                    {title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-xs leading-5",
                      isSelected ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {description}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <QuizSelect
            icon={quizPath === "exam" ? GraduationCap : BookOpenCheck}
            id="quiz-category"
            label={quizPath === "exam" ? "Select an exam" : "Select a subject"}
            onChange={updateSelection}
            options={choices}
            placeholder={
              quizPath === "exam"
                ? "Choose JAMB, WAEC, or NECO"
                : "Choose a subject"
            }
            value={selectedValue}
          />
        </div>

        {selectedChoice ? (
          <div className="bg-surface-subtle mt-4 flex items-start gap-3 rounded-2xl p-4">
            <span className="bg-success/10 text-success grid size-8 shrink-0 place-items-center rounded-full">
              <Check className="size-4" />
            </span>
            <div>
              <p className="text-foreground text-sm font-semibold">
                {selectedChoice.label}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {selectedChoice.description}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-center text-xs sm:text-left">
            {isSelectionSaved
              ? "Selection saved. Difficulty and timing are next."
              : isAuthenticated
                ? "You can change this before starting your quiz."
                : "Preview the options now. Sign in when you’re ready to continue."}
          </p>
          <Button className="gap-2" disabled={!selectedChoice} type="submit">
            Continue setup <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>

      {isAuthGateOpen && selectedChoice ? (
        <QuizAuthGate
          onClose={() => setIsAuthGateOpen(false)}
          returnTo={`/quiz?path=${quizPath}&choice=${selectedChoice.value}`}
          selectionLabel={selectedChoice.label}
        />
      ) : null}
    </main>
  );
}
