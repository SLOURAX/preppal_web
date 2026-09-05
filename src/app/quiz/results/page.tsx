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
  SaxTickCircleBulk,
} from "@meysam213/iconsax-react";
import { useRouter } from "next/navigation";

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
const RESULT_STATS = [
  ["32", "Correct", SaxTickCircleBulk, "text-emerald-600 bg-emerald-500/10"],
  ["8", "To review", SaxCloseCircleBulk, "text-rose-600 bg-rose-500/10"],
  ["24m", "Time spent", SaxClockBulk, "text-primary bg-primary/10"],
  ["+80", "Points earned", SaxAwardBulk, "text-amber-600 bg-amber-500/10"],
] as const;

export default function QuizResultsPage() {
  const router = useRouter();
  const [shared, setShared] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState<string | null>(null);

  const shareResult = async (): Promise<void> => {
    const text = "I just completed a Preppal practice quiz with an 80% score!";
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
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <button
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold"
            onClick={() => router.push("/quiz")}
            type="button"
          >
            <SaxArrowLeftBulk className="size-4" /> Back to quizzes
          </button>
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm"
            onClick={shareResult}
            type="button"
          >
            <SaxShareBulk className="size-4" />{" "}
            {shared ? "Copied!" : "Share result"}
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl space-y-5 px-5 py-8 sm:px-8 sm:py-10">
        <section className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-8">
          <div className="bg-primary/10 pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full blur-3xl" />
          <div className="relative flex flex-col items-center gap-7 text-center sm:flex-row sm:text-left">
            <div
              className="relative grid size-36 shrink-0 place-items-center rounded-2xl p-2 shadow-sm sm:size-44"
              style={{
                background:
                  "conic-gradient(hsl(var(--primary)) 0deg 288deg, hsl(var(--border)) 288deg 360deg)",
              }}
            >
              <div className="bg-surface grid size-full place-items-center rounded-xl">
                <div>
                  <p className="text-foreground text-4xl font-black sm:text-5xl">
                    80%
                  </p>
                  <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Score
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                Great work on JAMB Mathematics
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
                You’re building strong momentum. Review the questions below and
                turn today’s misses into tomorrow’s strengths.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="bg-surface text-foreground rounded-full px-3 py-1.5 text-xs font-semibold">
                  +80 Preppal points
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  Top 22% this week
                </span>
              </div>
              <button
                onClick={shareResult}
                type="button"
                className="bg-primary text-primary-foreground mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <SaxShareBulk className="size-4" />{" "}
                {shared ? "Result copied" : "Share your result"}
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RESULT_STATS.map(([value, label, Icon, color]) => (
            <div className="surface-card p-4" key={label as string}>
              <span
                className={`grid size-9 place-items-center rounded-xl ${color}`}
              >
                <Icon className="size-4" />
              </span>
              <p className="text-foreground mt-3 text-xl font-bold">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
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
                ["Accuracy", 80, "Questions answered correctly"],
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
          {/* <section className="surface-card via-surface to-surface bg-gradient-to-br from-violet-500/10 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground font-semibold">
                  Your next focus
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  A small step for a big gain
                </p>
              </div>
              <SaxAwardBulk className="text-primary size-5" />
            </div>
            <div className="mt-5 rounded-2xl bg-amber-500/10 p-4">
              <p className="text-xs font-bold tracking-wider text-amber-700 uppercase">
                Needs attention
              </p>
              <p className="text-foreground mt-1 text-lg font-bold">
                Speed & applied maths
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                Practise word problems and aim to spend under 2 minutes on each
                question.
              </p>
            </div>
            <button
              className="bg-primary text-primary-foreground mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
              onClick={() => router.push("/quiz")}
              type="button"
            >
              Practise this area <ArrowUpRight className="size-4" />
            </button>
          </section> */}
        </div>

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
            className="bg-primary text-primary-foreground w-full rounded-xl px-4 py-2.5 text-sm font-semibold sm:w-auto"
            onClick={() => router.push("/quiz/review")}
            type="button"
          >
            Review all questions
          </button>
        </section>

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
            {REVIEW.map((item) => {
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
