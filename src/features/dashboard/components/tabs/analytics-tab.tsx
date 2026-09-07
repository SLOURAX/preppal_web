import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store";

const SCORES = [68, 72, 70, 76, 74, 81, 78, 84, 82, 88, 86, 91];
const SUBJECTS = [
  ["Chemistry", 91, "+12%", "bg-emerald-500"],
  ["English Language", 84, "+8%", "bg-violet-500"],
  ["Mathematics", 76, "+4%", "bg-blue-500"],
  ["Physics", 58, "Focus", "bg-amber-500"],
] as const;
const TOUCHPOINTS = [
  ["Quizzes completed", "24", "This month", CheckCircle2],
  ["Study time", "12h 40m", "Across 18 sessions", Clock3],
  ["AI explanations", "38", "Questions reviewed", BrainCircuit],
] as const;

function TrendChart() {
  const points = SCORES.map(
    (score, index) =>
      `${(index / 11) * 100},${100 - ((score - 60) / 35) * 100}`,
  ).join(" ");
  return (
    <div className="relative h-48 pt-4">
      <div className="text-muted-foreground absolute inset-y-3 left-0 flex flex-col justify-between text-[10px]">
        <span>95%</span>
        <span>80%</span>
        <span>65%</span>
      </div>
      <div className="ml-8 h-full">
        <div className="pointer-events-none absolute inset-x-0 top-3 bottom-6 ml-8 flex flex-col justify-between">
          {[0, 1, 2].map((line) => (
            <div
              className="border-border/70 border-t border-dashed"
              key={line}
            />
          ))}
        </div>
        <svg
          className="relative z-10 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Score trend chart"
        >
          <defs>
            <linearGradient id="analytics-area" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.25"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#analytics-area)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          {SCORES.map((score, index) => (
            <circle
              cx={(index / 11) * 100}
              cy={100 - ((score - 60) / 35) * 100}
              fill="hsl(var(--surface))"
              key={`${score}-${index}`}
              r="2"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="text-muted-foreground mt-2 flex justify-between text-[10px]">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  const [period, setPeriod] = useState("Last 6 months");
  const attempts = useAuthStore((state) => state.quizAttempts);
  const answered = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const correct = attempts.reduce((sum, attempt) => sum + attempt.correct, 0);
  const averageScore = attempts.length
    ? Math.round(
        attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
          attempts.length,
      )
    : 0;
  const cards = [
    [
      "Overall score",
      `${averageScore}%`,
      attempts.length
        ? `${attempts.length} quiz${attempts.length === 1 ? "" : "zes"} tracked`
        : "Complete a quiz to unlock",
      TrendingUp,
      "text-emerald-600 bg-emerald-500/10",
    ],
    [
      "Questions answered",
      String(answered),
      attempts.length ? `${correct} correct answers` : "No answers yet",
      CheckCircle2,
      "text-primary bg-primary/10",
    ],
    [
      "Study streak",
      attempts.length
        ? `${attempts.length} session${attempts.length === 1 ? "" : "s"}`
        : "—",
      attempts.length
        ? "Keep practising to build a streak"
        : "Start your first session",
      Target,
      "text-amber-600 bg-amber-500/10",
    ],
    [
      "Class percentile",
      attempts.length ? "—" : "—",
      attempts.length
        ? "Ranking unlocks with more activity"
        : "Complete quizzes to compare",
      Trophy,
      "text-violet-600 bg-violet-500/10",
    ],
  ] as const;
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Analytics
          </h2>
          <p className="text-muted-foreground text-sm">
            A clear view of your progress, habits, and next best steps.
          </p>
        </div>
        <button
          className="border-border text-muted-foreground hover:bg-surface-subtle inline-flex w-fit items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors"
          type="button"
          onClick={() =>
            setPeriod((current) =>
              current === "Last 6 months" ? "Last 30 days" : "Last 6 months",
            )
          }
        >
          {period} <ArrowUpRight className="size-3.5" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value, note, Icon, color]) => (
          <div
            className="surface-card relative overflow-hidden p-4"
            key={label}
          >
            <Icon
              aria-hidden="true"
              className="text-primary/5 pointer-events-none absolute -right-3 -bottom-3 size-24"
            />
            <span
              className={`grid size-9 place-items-center rounded-xl ${color}`}
            >
              <Icon className="size-4" />
            </span>
            <p className="text-foreground mt-3 text-xl font-bold">{value}</p>
            <p className="text-muted-foreground text-xs font-medium">{label}</p>
            <p className="mt-2 text-[11px] font-semibold text-emerald-600">
              {note}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="surface-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-foreground font-semibold">Score trend</h3>
              <p className="text-muted-foreground text-xs">
                Your average quiz score over time
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
              <TrendingUp className="size-3" /> 6.4%
            </span>
          </div>
          <TrendChart />
        </section>
        <section className="surface-card from-primary/10 via-surface to-surface bg-gradient-to-br p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground font-semibold">Readiness score</h3>
              <p className="text-muted-foreground text-xs">
                Based on recent practice
              </p>
            </div>
            <Compass className="text-primary size-5" />
          </div>
          <div
            className="relative mx-auto mt-5 grid size-36 place-items-center rounded-full"
            style={{
              background: `conic-gradient(hsl(var(--primary)) 0deg ${averageScore * 3.6}deg, hsl(var(--border)) ${averageScore * 3.6}deg 360deg)`,
            }}
          >
            <div className="bg-surface grid size-28 place-items-center rounded-full">
              <div className="text-center">
                <p className="text-foreground text-3xl font-black">
                  {averageScore}
                </p>
                <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                  of 100
                </p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-xs leading-5">
            You’re building strong momentum. Keep practising Physics to reach
            your next milestone.
          </p>
        </section>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-foreground font-semibold">
                Strengths & focus areas
              </h3>
              <p className="text-muted-foreground text-xs">
                Where your effort is paying off
              </p>
            </div>
            <BarChart3 className="text-muted-foreground size-5" />
          </div>
          <div className="space-y-4">
            {SUBJECTS.map(([name, score, change, color]) => (
              <div key={name}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="text-foreground text-[.8rem] font-medium">
                    {name}
                  </span>
                  <span
                    className={`text-xs font-bold ${change === "Focus" ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {score}%
                  </span>
                </div>
                <div className="bg-surface-subtle h-2 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-foreground font-semibold">Study touchpoints</h3>
            <p className="text-muted-foreground text-xs">
              How you’re engaging with Preppal
            </p>
          </div>
          <div className="space-y-3">
            {TOUCHPOINTS.map(([label, value, detail, Icon]) => (
              <div
                className="bg-surface-subtle flex items-center gap-3 rounded-2xl p-3"
                key={label}
              >
                <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-xl">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground text-[.85rem] font-semibold">
                    {label}
                  </p>
                  <p className="text-muted-foreground text-xs">{detail}</p>
                </div>
                <span className="text-foreground text-[.85rem] font-bold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="surface-card from-primary/10 via-surface to-surface flex flex-col gap-4 bg-gradient-to-r p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-xl">
            <BrainCircuit className="size-5" />
          </span>
          <div>
            <h3 className="text-foreground font-semibold">
              Your next best move
            </h3>
            <p className="text-muted-foreground max-w-xl text-[.75rem] leading-5">
              Take a 10-question Physics practice set today. Improving this
              focus area could move your readiness score into the excellent
              range.
            </p>
          </div>
        </div>
        <a
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[.8rem] font-semibold transition-colors"
          href="/quiz"
        >
          Start practice <ArrowUpRight className="size-4" />
        </a>
      </section>
    </div>
  );
}
