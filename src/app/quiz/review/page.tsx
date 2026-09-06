"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/features/quiz/mock-questions";
import { useAuthStore } from "@/store";

export default function QuizReviewPage() {
  const router = useRouter();
  const latestAttempt = useAuthStore((state) => state.quizAttempts[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true);
  const reviewQuestions = QUIZ_QUESTIONS.slice(0, latestAttempt?.total ?? 40);
  const activeQuestion = reviewQuestions[activeIndex]!;
  const number = String(activeQuestion.id).padStart(2, "0");
  const { text, options, correctAnswer: correct, explanation } = activeQuestion;
  const selected = latestAttempt?.answers[activeQuestion.id];
  const isCorrect = selected === correct;

  return (
    <main className="bg-background min-h-screen">
      <header className="bg-surface/90 border-border sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => router.push("/quiz/results")}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold"
            type="button"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <span className="text-muted-foreground text-xs font-semibold">
            {latestAttempt
              ? `${latestAttempt.exam} ${latestAttempt.subject}`
              : "Quiz review"}
          </span>
        </div>
      </header>
      <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-7">
          <h1 className="text-foreground mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Question review
          </h1>
          <p className="text-muted-foreground mt-1 text-[.8rem]">
            See your selection, the correct answer, and the reasoning behind
            each question.
          </p>
        </div>
        <section className="surface-card overflow-hidden">
          <div className="flex items-center gap-2 p-4 sm:p-5">
            <span
              className={`grid size-9 place-items-center rounded-xl ${isCorrect ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
              aria-label={
                isCorrect ? "Correct question" : "Question needs review"
              }
            >
              {isCorrect ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <XCircle className="size-5" />
              )}
            </span>
            <span className="text-muted-foreground text-sm font-bold tabular-nums">
              {number}/{reviewQuestions.length}
            </span>
            <div className="flex-1"></div>
            <span
              className={`text-xs font-semibold ${isCorrect ? "text-emerald-600" : selected ? "text-rose-600" : "text-muted-foreground"}`}
            >
              {selected ? (isCorrect ? "Correct" : "Wrong") : "Unanswered"}
            </span>
          </div>
          {open ? (
            <div className="bg-surface-subtle/50 border-border/50 border-t px-4 pt-4 pb-5 sm:px-16">
              <div className="bg-surface mb-4 rounded-xl px-3 py-3">
                <p className="text-foreground max-h-16 overflow-y-auto text-xs leading-5 font-semibold">
                  {text}
                </p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Your response is compared with the verified answer below.
                </p>
              </div>
              <div className="space-y-2">
                {options.map((option, optionIndex) => {
                  const optionIsCorrect = option === correct;
                  const optionWasSelected = option === selected;
                  return (
                    <div
                      key={option}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[.8rem] ${optionIsCorrect ? "bg-emerald-500/10 font-semibold text-emerald-700" : optionWasSelected ? "bg-rose-500/10 font-semibold text-rose-700" : "bg-surface text-muted-foreground"}`}
                    >
                      <span className="grid size-6 shrink-0 place-items-center text-xs font-bold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="flex-1 text-[.75rem]">{option}</span>
                      {optionIsCorrect ? (
                        <CheckCircle2
                          className="size-4 text-emerald-600"
                          aria-label="Correct answer"
                        />
                      ) : optionWasSelected ? (
                        <XCircle
                          className="size-4 text-rose-600"
                          aria-label="Your incorrect answer"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="bg-primary/5 mt-4 rounded-xl px-3 py-3">
                <p className="text-primary text-[11px] font-bold tracking-wide uppercase">
                  Explanation
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {explanation}
                </p>
              </div>
            </div>
          ) : null}
        </section>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-xl border px-3 py-2 text-[.75rem] font-semibold disabled:opacity-40"
            disabled={activeIndex === 0}
            onClick={() => {
              setActiveIndex((value) => value - 1);
              setOpen(true);
            }}
            type="button"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>
          <button
            className="bg-primary text-primary-foreground flex items-center gap-1 rounded-xl px-3 py-2 text-[.75rem] font-semibold disabled:opacity-40"
            disabled={activeIndex === reviewQuestions.length - 1}
            onClick={() => {
              setActiveIndex((value) => value + 1);
              setOpen(true);
            }}
            type="button"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
