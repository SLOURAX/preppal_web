"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Share2,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const REVIEW = [
  ["01", "Angles in a straight line", "Correct", "2m 14s", true],
  ["02", "Factorising polynomials", "Correct", "1m 08s", true],
  ["03", "Average speed", "Review", "3m 42s", false],
  ["04", "Logarithms", "Correct", "1m 27s", true],
  ["05", "Interior angles", "Review", "2m 31s", false],
] as const;
const RESULT_STATS = [
  ["32", "Correct", CheckCircle2, "text-emerald-600 bg-emerald-500/10"],
  ["8", "To review", XCircle, "text-rose-600 bg-rose-500/10"],
  ["24m", "Time spent", Clock3, "text-primary bg-primary/10"],
  ["+80", "Points earned", Sparkles, "text-amber-600 bg-amber-500/10"],
] as const;

export default function QuizResultsPage() {
  const router = useRouter();
  const [shared, setShared] = useState<boolean>(false);

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
            <ArrowLeft className="size-4" /> Back to quizzes
          </button>
          <button
            className="border-border text-primary hover:bg-primary/5 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold"
            onClick={shareResult}
            type="button"
          >
            <Share2 className="size-3.5" />{" "}
            {shared ? "Copied!" : "Share result"}
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl space-y-5 px-5 py-8 sm:px-8 sm:py-10">
        <section className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-8">
          <div className="bg-primary/10 pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full blur-3xl" />
          <div className="relative flex flex-col items-center gap-7 text-center sm:flex-row sm:text-left">
            <div
              className="relative grid size-40 shrink-0 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(hsl(var(--primary)) 0deg 288deg, hsl(var(--border)) 288deg 360deg)",
              }}
            >
              <div className="bg-surface grid size-32 place-items-center rounded-full">
                <div>
                  <p className="text-foreground text-4xl font-black">80%</p>
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
              <Target className="text-primary size-5" />
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
              <Sparkles className="text-primary size-5" />
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

        <section className="surface-card overflow-hidden">
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
              View all <ChevronDown className="size-3.5 -rotate-90" />
            </button>
          </div>
          <div className="divide-border divide-y">
            {REVIEW.map(([number, title, status, time, correct]) => (
              <button
                className="hover:bg-surface-subtle flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors sm:px-6"
                key={number}
                type="button"
              >
                <span className="text-muted-foreground w-6 text-xs font-bold">
                  {number}
                </span>
                <span
                  className={`grid size-8 place-items-center rounded-lg ${correct ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                >
                  {correct ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <XCircle className="size-4" />
                  )}
                </span>
                <span className="text-foreground min-w-0 flex-1 truncate text-sm font-medium">
                  {title}
                </span>
                <span className="text-muted-foreground hidden text-xs sm:block">
                  {time}
                </span>
                <span
                  className={`text-xs font-semibold ${correct ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {status}
                </span>
                <ArrowUpRight className="text-muted-foreground size-4" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
