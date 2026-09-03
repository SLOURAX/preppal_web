"use client";

import { BrainCircuit, CheckCircle2, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface QuizOption {
  readonly id: string;
  readonly label: string;
}

const QUIZ_OPTIONS: readonly QuizOption[] = [
  { id: "nucleus", label: "Nucleus" },
  { id: "ribosome", label: "Ribosome" },
  { id: "mitochondrion", label: "Mitochondrion" },
  { id: "chloroplast", label: "Chloroplast" },
];

const CORRECT_ANSWER = "mitochondrion";

export function AiQuizSection() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  const resetQuestion = (): void => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <section className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <h2 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.035em]">
          Get help at the moment <br />
          you need it.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-6">
          Ask Preppal AI for guidance for practice questions, and understand the
          reasoning behind every answer before moving forward.
        </p>
        <ul className="text-muted-foreground mt-6 space-y-3 text-sm">
          {[
            "Clear explanations for every question",
            "Helpful hints without giving the answer away",
            "Fresh practice questions based on weak areas",
          ].map((benefit) => (
            <li className="flex items-center gap-2" key={benefit}>
              <CheckCircle2 className="text-success size-4 shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="surface-card p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-primary text-xs font-semibold">
              Biology · Question 3
            </p>
            <h3 className="text-foreground mt-2 text-lg font-semibold">
              Which organelle is known as the powerhouse of the cell?
            </h3>
          </div>
          <BrainCircuit className="text-primary size-6 shrink-0" />
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {QUIZ_OPTIONS.map((option) => {
            const isSelected = selectedAnswer === option.id;
            return (
              <button
                aria-pressed={isSelected}
                className={cn(
                  "border-border hover:border-primary/50 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  isSelected && "border-primary bg-primary/10 text-primary",
                )}
                key={option.id}
                onClick={() => {
                  setSelectedAnswer(option.id);
                  setShowExplanation(false);
                }}
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {showExplanation ? (
          <div className="bg-surface-subtle mt-4 rounded-2xl p-4">
            <p className="text-foreground flex items-center gap-2 text-sm font-semibold">
              {isCorrect ? "That’s correct." : "Here’s a useful explanation."}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Mitochondria convert nutrients into ATP, the usable energy that
              powers most cellular activities.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            className="gap-2"
            disabled={!selectedAnswer}
            onClick={() => setShowExplanation(true)}
          >
            Ask Preppal AI
          </Button>
          <Button
            className="bg-surface-subtle text-foreground hover:bg-border gap-2"
            onClick={resetQuestion}
          >
            <RefreshCw className="size-4" /> Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
