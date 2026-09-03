"use client";

import {
  ArrowRight,
  BookOpenCheck,
  BookOpenText,
  CalendarDays,
  Check,
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
  SUBJECT_TOPICS,
  type QuizDifficulty,
  type QuizPath,
  type QuizSetupStep,
} from "../quiz.constants";
import { ExamYearStep } from "./exam-year-step";
import { QuizAuthGate } from "./quiz-auth-gate";
import { QuizSelect } from "./quiz-select";
import { QuizSetupProgress } from "./quiz-setup-progress";
import { SubjectDifficultyStep } from "./subject-difficulty-step";
import { SubjectTopicsStep } from "./subject-topics-step";

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

const EXAM_SETUP_STEPS = [
  { label: "Exam", icon: GraduationCap },
  { label: "Year", icon: CalendarDays },
  { label: "Questions", icon: ListChecks },
] as const;

const SUBJECT_SETUP_STEPS = [
  { label: "Subject", icon: BookOpenText },
  { label: "Difficulty", icon: SlidersHorizontal },
  { label: "Topics", icon: ListChecks },
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
  const [setupStep, setSetupStep] = useState<QuizSetupStep>("entry");
  const [selectedExam, setSelectedExam] = useState<string>(
    initialPath === "exam" ? initialSelection : "",
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(
    initialPath === "subject" ? initialSelection : "",
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<QuizDifficulty | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isAuthGateOpen, setIsAuthGateOpen] = useState<boolean>(false);

  const choices = quizPath === "exam" ? EXAM_CHOICES : SUBJECT_CHOICES;
  const selectedValue = quizPath === "exam" ? selectedExam : selectedSubject;
  const selectedChoice = choices.find(
    (choice) => choice.value === selectedValue,
  );
  const progressItems =
    quizPath === "exam" ? EXAM_SETUP_STEPS : SUBJECT_SETUP_STEPS;
  const activeStepIndex =
    setupStep === "entry" ? 0 : setupStep === "subject-topics" ? 2 : 1;
  const subjectTopics = selectedSubject
    ? (SUBJECT_TOPICS[selectedSubject] ?? [])
    : [];

  const updatePath = (path: QuizPath): void => {
    setQuizPath(path);
    setSetupStep("entry");
    setSelectedYear(null);
    setSelectedDifficulty(null);
    setSelectedTopics([]);
  };

  const updateSelection = (value: string): void => {
    if (quizPath === "exam") {
      setSelectedExam(value);
      setSelectedYear(null);
      return;
    }

    setSelectedSubject(value);
    setSelectedDifficulty(null);
    setSelectedTopics([]);
  };

  const submitEntry = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!selectedChoice) return;

    if (!isAuthenticated) {
      setIsAuthGateOpen(true);
      return;
    }

    setSetupStep(quizPath === "exam" ? "exam-year" : "subject-difficulty");
  };

  const toggleTopic = (topic: string): void => {
    setSelectedTopics((currentTopics) =>
      currentTopics.includes(topic)
        ? currentTopics.filter((currentTopic) => currentTopic !== topic)
        : [...currentTopics, topic],
    );
  };

  const toggleAllTopics = (): void => {
    setSelectedTopics((currentTopics) =>
      currentTopics.length === subjectTopics.length ? [] : [...subjectTopics],
    );
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
          {setupStep === "entry"
            ? "What would you like to practice?"
            : "Build your practice session"}
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          {setupStep === "entry"
            ? "Choose an exam for structured preparation or a subject for focused practice."
            : "Make a few focused choices so Preppal can prepare the right questions for you."}
        </p>
      </header>

      <div className="mt-7">
        <QuizSetupProgress
          activeIndex={activeStepIndex}
          items={progressItems}
        />
      </div>

      <div className="mt-8">
        {setupStep === "entry" ? (
          <form
            className="surface-card mx-auto max-w-3xl p-5 sm:p-8"
            onSubmit={submitEntry}
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
                        "relative rounded-2xl border-2 p-4 text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/30"
                          : "bg-surface-subtle border-transparent hover:-translate-y-0.5",
                      )}
                      key={value}
                      onClick={() => updatePath(value)}
                      type="button"
                    >
                      {isSelected && (
                        <div className="bg-primary text-primary-foreground animate-in zoom-in absolute top-4 right-4 flex size-5 items-center justify-center rounded-full duration-200">
                          <Check className="size-3" strokeWidth={3} />
                        </div>
                      )}
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-xl",
                          isSelected
                            ? "bg-primary/15 text-primary"
                            : "bg-surface text-primary",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="text-foreground mt-4 block text-sm font-semibold">
                        {title}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs leading-5">
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
                label={
                  quizPath === "exam" ? "Select an exam" : "Select a subject"
                }
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
                {isAuthenticated
                  ? "You can return and change this choice later."
                  : "Preview the options now. Sign in when you’re ready to continue."}
              </p>
              <Button
                className="gap-2"
                disabled={!selectedChoice}
                type="submit"
              >
                Continue setup <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        ) : null}

        {setupStep === "exam-year" && selectedChoice ? (
          <ExamYearStep
            examLabel={selectedChoice.label}
            onBack={() => setSetupStep("entry")}
            onSelectYear={setSelectedYear}
            selectedYear={selectedYear}
          />
        ) : null}

        {setupStep === "subject-difficulty" && selectedChoice ? (
          <SubjectDifficultyStep
            onBack={() => setSetupStep("entry")}
            onContinue={() => setSetupStep("subject-topics")}
            onSelectDifficulty={setSelectedDifficulty}
            selectedDifficulty={selectedDifficulty}
            subjectLabel={selectedChoice.label}
          />
        ) : null}

        {setupStep === "subject-topics" &&
        selectedChoice &&
        selectedDifficulty ? (
          <SubjectTopicsStep
            difficulty={selectedDifficulty}
            onBack={() => setSetupStep("subject-difficulty")}
            onToggleAll={toggleAllTopics}
            onToggleTopic={toggleTopic}
            selectedTopics={selectedTopics}
            subjectLabel={selectedChoice.label}
            topics={subjectTopics}
          />
        ) : null}
      </div>

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
