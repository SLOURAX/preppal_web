"use client";

import { useState } from "react";
import {
  SaxArrowDown2Bulk,
  SaxArrowLeftBulk,
  SaxAwardBulk,
  SaxChartSuccessBulk,
  SaxClockBulk,
  SaxCloseCircleBulk,
  SaxShareBulk,
  SaxStar1Bulk,
  SaxTickCircleBulk,
} from "@meysam213/iconsax-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { QUIZ_QUESTIONS } from "@/features/quiz/mock-questions";

const REVIEW = [
  {
    number: "01",
    title: "Angles in a straight line",
    time: "2m 14s",
    selected: "78°",
    correct: "78°",
    options: ["68°", "78°", "88°", "98°"],
    explanation:
      "Combine the angles on the straight line, simplify, and isolate the expression to get 78°.",
  },
  {
    number: "02",
    title: "Factorising polynomials",
    time: "1m 08s",
    selected: "(x − 2)",
    correct: "(x − 2)",
    options: ["(x − 3)", "(x − 2)", "(x + 1)", "(x + 2)"],
    explanation:
      "x³ − 3x² + 2x factors to x(x − 1)(x − 2), so (x − 2) is a factor.",
  },
  {
    number: "03",
    title: "Average speed",
    time: "3m 42s",
    selected: "120 km/h",
    correct: "150 km/h",
    options: ["100 km/h", "120 km/h", "150 km/h", "180 km/h"],
    explanation: "Average speed is distance ÷ time: 300 ÷ 2 = 150 km/h.",
  },
  {
    number: "04",
    title: "Logarithms",
    time: "1m 27s",
    selected: "6",
    correct: "6",
    options: ["4", "5", "6", "8"],
    explanation: "Because 2⁶ = 64, log₂ 64 equals 6.",
  },
  {
    number: "05",
    title: "Interior angles",
    time: "2m 31s",
    selected: undefined,
    correct: "9",
    options: ["7", "8", "9", "10"],
    explanation: "Use (n − 2) × 180 = 1260, giving n = 9 sides.",
  },
] as const;

export default function QuizResultsPage() {
  const router = useRouter();
  const [shared, setShared] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState<string | null>(null);
  const latestAttempt = useAuthStore((state) => state.quizAttempts[0]);

  const reviewItems = latestAttempt
    ? QUIZ_QUESTIONS.slice(0, latestAttempt.total).map((question, index) => ({
        number: String(index + 1).padStart(2, "0"),
        title: question.text,
        time: "—",
        selected: latestAttempt.answers[question.id],
        correct: question.correctAnswer,
        options: question.options,
        explanation: question.explanation,
      }))
    : REVIEW;
  const resultScore = latestAttempt?.score ?? 80;
  const resultCorrect = latestAttempt?.correct ?? 32;
  const resultTotal = latestAttempt?.total ?? 40;
  const resultPoints = resultCorrect * 10;
  const isPlayground = latestAttempt?.mode === "untimed";
  const resultStats = [
    [
      String(resultCorrect),
      "Correct",
      SaxTickCircleBulk,
      "text-emerald-600 bg-emerald-500/10",
    ],
    [
      String(Math.max(0, resultTotal - resultCorrect)),
      "To review",
      SaxCloseCircleBulk,
      "text-rose-600 bg-rose-500/10",
    ],
    [
      latestAttempt
        ? `${Math.round(latestAttempt.durationSeconds / 60)}m`
        : "24m",
      "Time spent",
      SaxClockBulk,
      "text-primary bg-primary/10",
    ],
    [
      `+${resultPoints}`,
      "Points earned",
      SaxAwardBulk,
      "text-amber-600 bg-amber-500/10",
    ],
  ] as const;

  const shareResult = async (): Promise<void> => {
    const text = `I just completed a Preppal practice quiz with a ${resultScore}% score!`;
    if (navigator.share)
      await navigator.share({
        title: "My Preppal result",
        text,
        url: window.location.href,
      });
    else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };

  return (
    <main className="bg-background min-h-screen">
      <header className="bg-surface/90 border-border sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 sm:px-8">
          <button
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold"
            onClick={() => router.push("/quiz")}
            type="button"
          >
            <SaxArrowLeftBulk className="size-4" /> Back to quizzes
          </button>
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold shadow-sm sm:hidden"
            onClick={shareResult}
            type="button"
          >
            <SaxShareBulk className="size-4" /> {shared ? "Copied!" : "Share"}
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-4xl space-y-5 px-5 py-8 sm:px-8 sm:py-10">
        <section className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,hsl(var(--primary)/.06)_25%,hsl(var(--primary)/.06)_26%,transparent_26%,transparent_75%,hsl(var(--primary)/.06)_75%,hsl(var(--primary)/.06)_76%,transparent_76%)] [background-size:34px_34px] opacity-40" />
          <div className="bg-primary/10 pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full blur-3xl" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-8 bottom-0 hidden h-32 w-56 items-end justify-end gap-2 opacity-35 sm:flex"
          >
            {[36, 58, 44, 78, 64, 96, 72, 112].map((height, index) => (
              <span
                key={index}
                className="from-primary/20 to-primary/5 w-5 rounded-t-md bg-gradient-to-t"
                style={{ height }}
              />
            ))}
          </div>
          <div className="relative grid items-center gap-6 sm:grid-cols-[180px_1fr] sm:gap-8">
            <div className="bg-surface relative mx-auto flex w-full max-w-[180px] flex-col items-center rounded-2xl border border-white/70 p-4 shadow-lg shadow-violet-900/10 sm:mx-0">
              <span className="bg-primary/10 text-primary absolute top-3 right-3 grid size-5 place-items-center rounded-full">
                <SaxStar1Bulk className="size-4" />
              </span>
              <div
                aria-label={`Score progress: ${resultScore} percent`}
                role="img"
                className="relative grid size-32 place-items-center"
              >
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity="0.1"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="314.16"
                    strokeDashoffset={String(
                      314.16 - (314.16 * resultScore) / 100,
                    )}
                  />
                </svg>
                <div className="bg-surface relative grid size-[6.6rem] place-items-center rounded-full">
                  <div className="text-center">
                    <p className="text-foreground text-2xl font-black">
                      {resultScore}%
                    </p>
                    <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                      Score
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <div className="bg-primary/10 text-primary mb-2 inline-flex size-10 items-center justify-center rounded-xl">
                <SaxAwardBulk className="size-5" />
              </div>
              <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                {isPlayground
                  ? "Challenge Complete!"
                  : "Great work on JAMB Mathematics"}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-5">
                {isPlayground
                  ? `Great job! You’ve completed all ${resultTotal} questions.`
                  : "You’re building strong momentum. Review the questions below and turn today’s misses into tomorrow’s strengths."}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="bg-surface text-foreground rounded-full px-3 py-1.5 text-xs font-semibold">
                  +{resultPoints} Points gained
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  Top 22% this week
                </span>
              </div>
              <button
                onClick={shareResult}
                type="button"
                className="bg-primary text-primary-foreground mt-4 hidden items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                <SaxShareBulk className="size-4" />{" "}
                {shared ? "Result copied" : "Share your result"}
              </button>
            </div>
          </div>
        </section>

        <section className="surface-card grid grid-cols-2 overflow-hidden sm:grid-cols-4">
          {resultStats.map(([value, label, Icon, color], index) => (
            <div
              className={`relative flex flex-col items-center justify-center px-3 py-4 text-center sm:px-4 sm:py-5 ${index < resultStats.length - 1 ? "after:absolute after:top-[17.5%] after:right-0 after:h-[65%] after:w-px after:bg-slate-300/60" : ""}`}
              key={label as string}
            >
              <span
                className={`grid size-9 place-items-center rounded-full ${color}`}
              >
                <Icon className="size-4" />
              </span>
              <p className="text-muted-foreground mt-2 text-[11px] font-medium sm:text-xs">
                {label}
              </p>
              <p className="text-foreground mt-1 text-xl font-bold">{value}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-5 lg:grid-cols-1">
          <section className="surface-card p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-foreground font-semibold">
                  Performance breakdown
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  See where your score came from
                </p>
              </div>
              <SaxChartSuccessBulk className="text-primary size-5" />
            </div>
            <div className="space-y-4">
              {[
                ["Accuracy", resultScore, "Questions answered correctly"],
                ["Consistency", 74, "Steady performance across the quiz"],
                ["Pace", 68, "Time spent per question"],
              ].map(([label, value, detail]) => (
                <div key={label as string}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-foreground text-sm font-medium">
                      {label}
                    </span>
                    <span className="text-primary text-xs font-bold">
                      {value}%
                    </span>
                  </div>
                  <div className="bg-surface-subtle h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground mt-1 text-[11px]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {latestAttempt?.mode !== "untimed" ? (
          <section className="surface-card flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-foreground font-semibold">
                Review your questions
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                Open the full walkthrough with answers and explanations.
              </p>
            </div>
            <button
              className="bg-primary text-primary-foreground w-full rounded-xl px-4 py-2.5 text-[.8rem] font-semibold sm:w-auto"
              onClick={() => router.push("/quiz/review")}
              type="button"
            >
              Review all questions
            </button>
          </section>
        ) : null}

        <section className="surface-card hidden overflow-hidden">
          <div className="flex items-center justify-between p-5 sm:p-6">
            <div>
              <h2 className="text-foreground font-semibold">
                Review questions
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                Revisit each answer and explanation
              </p>
            </div>
            <button
              className="text-primary flex items-center gap-1 text-xs font-bold"
              type="button"
            >
              View all <SaxArrowDown2Bulk className="size-3.5 -rotate-90" />
            </button>
          </div>
          <div className="divide-border divide-y">
            {reviewItems.map((item) => {
              const isCorrect = item.selected === item.correct;
              const isOpen = openReview === item.number;
              return (
                <div key={item.number}>
                  <button
                    className="hover:bg-surface-subtle flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors sm:px-6"
                    onClick={() => setOpenReview(isOpen ? null : item.number)}
                    type="button"
                    aria-expanded={isOpen}
                  >
                    <span className="text-muted-foreground w-6 text-xs font-bold">
                      {item.number}
                    </span>
                    <span
                      className={`grid size-8 place-items-center rounded-lg ${isCorrect ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                    >
                      {isCorrect ? (
                        <SaxTickCircleBulk className="size-4" />
                      ) : (
                        <SaxCloseCircleBulk className="size-4" />
                      )}
                    </span>
                    <span className="text-foreground min-w-0 flex-1 truncate text-sm font-medium">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground hidden text-xs sm:block">
                      {item.time}
                    </span>
                    <span
                      className={`text-xs font-semibold ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {item.selected
                        ? isCorrect
                          ? "Correct"
                          : "Review"
                        : "Unanswered"}
                    </span>
                    <SaxArrowDown2Bulk
                      className={`text-muted-foreground size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="bg-surface-subtle/60 px-5 pt-1 pb-5 sm:px-16">
                      <div className="space-y-2">
                        {item.options.map((option, optionIndex) => {
                          const optionIsCorrect = option === item.correct;
                          const optionWasSelected = option === item.selected;
                          return (
                            <div
                              key={option}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${optionIsCorrect ? "bg-emerald-500/10 font-semibold text-emerald-700" : optionWasSelected ? "bg-rose-500/10 font-semibold text-rose-700" : "bg-surface text-muted-foreground"}`}
                            >
                              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-black/5 text-xs font-bold">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span className="flex-1">{option}</span>
                              {optionIsCorrect ? (
                                <span className="text-[11px] font-bold">
                                  Correct answer
                                </span>
                              ) : optionWasSelected ? (
                                <span className="text-[11px] font-bold">
                                  Your answer
                                </span>
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
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
