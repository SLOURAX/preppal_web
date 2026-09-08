"use client";

import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  Filter,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";

import { ListSelect } from "@/components/ui/list-select";
import { EXAM_CHOICES, SUBJECT_CHOICES } from "@/features/quiz/quiz.constants";
import type { QuizAttempt } from "@/store/use-auth-store";
import { useAuthStore } from "@/store";

type Period = "7" | "30" | "90" | "180" | "0";

const PERIOD_OPTIONS = [
  { value: "30", label: "Last 30 days" },
  { value: "7", label: "Last 7 days" },
  { value: "90", label: "Last 3 months" },
  { value: "180", label: "Last 6 months" },
  { value: "0", label: "All time" },
] as const;

const MODE_OPTIONS = [
  { value: "all", label: "All modes" },
  { value: "timed", label: "Timed quizzes" },
  { value: "untimed", label: "Playground" },
] as const;

const formatDuration = (seconds: number) => {
  if (!seconds) return "0m";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const titleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly icon: typeof CheckCircle2;
  readonly tone: string;
}) {
  return (
    <article className="surface-card relative overflow-hidden p-3 sm:p-4">
      <Icon className="text-primary/5 pointer-events-none absolute -right-3 -bottom-3 size-20 sm:size-24" />
      <span
        className={`grid size-8 place-items-center rounded-lg sm:size-9 sm:rounded-xl ${tone}`}
      >
        <Icon className="size-3.5 sm:size-4" />
      </span>
      <p className="text-foreground mt-2 text-[1rem] font-bold sm:mt-3 sm:text-[1rem]">
        {value}
      </p>
      <p className="text-muted-foreground text-[11px] font-medium sm:text-xs">
        {label}
      </p>
      <p className="text-muted-foreground mt-1.5 text-[10px] sm:mt-2 sm:text-[11px]">
        {detail}
      </p>
    </article>
  );
}

function ReadinessCard({ score }: { readonly score: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;
  return (
    <section className="surface-card from-primary/10 via-surface to-surface relative overflow-hidden bg-gradient-to-br p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-primary text-[11px] font-bold tracking-[0.16em] uppercase">
            Exam readiness
          </p>
          <h3 className="text-foreground mt-1 text-lg font-semibold">
            Your current readiness
          </h3>
          <p className="text-muted-foreground mt-1 max-w-md text-xs leading-5">
            Based on accuracy and consistency across the selected filters.
          </p>
        </div>
        <Compass className="text-primary size-5" />
      </div>
      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative grid size-32 shrink-0 place-items-center">
          <svg
            aria-label={`Exam readiness: ${score}%`}
            className="size-full -rotate-90"
            role="img"
            viewBox="0 0 120 120"
          >
            <circle
              className="stroke-border/70"
              cx="60"
              cy="60"
              fill="none"
              r={radius}
              strokeWidth="10"
            />
            <circle
              className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
              cx="60"
              cy="60"
              fill="none"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="bg-surface absolute grid size-24 place-items-center rounded-full">
            <div className="text-center">
              <p className="text-foreground text-2xl font-black">{score}%</p>
              <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                ready
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-semibold">
            {score >= 75
              ? "You’re on track"
              : score > 0
                ? "Keep building your accuracy"
                : "Complete a quiz to get your readiness score"}
          </p>
          <p className="text-muted-foreground mt-1 text-xs leading-5">
            {score > 0
              ? "Keep practising your focus areas to move this score higher."
              : "Your results will appear here after your first completed quiz."}
          </p>
        </div>
      </div>
    </section>
  );
}

function SubjectPerformance({
  attempts,
}: {
  readonly attempts: QuizAttempt[];
}) {
  const rows = useMemo(() => {
    const grouped = new Map<string, { correct: number; total: number }>();
    attempts.forEach((attempt) => {
      const current = grouped.get(attempt.subject) ?? { correct: 0, total: 0 };
      grouped.set(attempt.subject, {
        correct: current.correct + attempt.correct,
        total: current.total + attempt.total,
      });
    });
    return [...grouped.entries()]
      .map(([subject, result]) => ({
        subject,
        score: result.total
          ? Math.round((result.correct / result.total) * 100)
          : 0,
        questions: result.total,
      }))
      .sort((a, b) => b.score - a.score);
  }, [attempts]);

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-foreground font-semibold">Subject performance</h3>
          <p className="text-muted-foreground text-xs">
            Accuracy and questions answered by subject
          </p>
        </div>
        <BarChart3 className="text-muted-foreground size-5" />
      </div>
      {rows.length ? (
        <div className="space-y-4">
          {rows.map(({ subject, score, questions }) => (
            <div key={subject}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-foreground text-[.8rem] font-medium">
                  {titleCase(subject)}
                </span>
                <span className="text-muted-foreground text-xs font-semibold">
                  {score}% · {questions} questions
                </span>
              </div>
              <div className="bg-surface-subtle h-2 overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full ${score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground bg-surface-subtle rounded-2xl p-4 text-xs">
          Complete a quiz to see performance by subject.
        </p>
      )}
    </section>
  );
}

function ExamPerformance({ attempts }: { readonly attempts: QuizAttempt[] }) {
  const rows = useMemo(() => {
    const grouped = new Map<string, { correct: number; total: number }>();
    attempts.forEach((attempt) => {
      const current = grouped.get(attempt.exam) ?? { correct: 0, total: 0 };
      grouped.set(attempt.exam, {
        correct: current.correct + attempt.correct,
        total: current.total + attempt.total,
      });
    });
    return [...grouped.entries()].map(([exam, result]) => ({
      exam,
      score: result.total
        ? Math.round((result.correct / result.total) * 100)
        : 0,
      total: result.total,
    }));
  }, [attempts]);

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-foreground font-semibold">Exam performance</h3>
          <p className="text-muted-foreground text-xs">
            See how you are tracking across exam tracks
          </p>
        </div>
        <Trophy className="text-primary size-5" />
      </div>
      {rows.length ? (
        <div className="space-y-4">
          {rows.map(({ exam, score, total }) => (
            <div key={exam}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-foreground text-xs font-semibold">
                  {titleCase(exam)}
                </span>
                <span className="text-muted-foreground text-xs">
                  {score}% · {total} questions
                </span>
              </div>
              <div className="bg-surface-subtle h-3 rounded-full p-0.5">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground bg-surface-subtle rounded-2xl p-4 text-xs">
          Complete an exam quiz to compare your exam performance.
        </p>
      )}
    </section>
  );
}

export function AnalyticsTab() {
  const attempts = useAuthStore((state) => state.quizAttempts);
  const [exam, setExam] = useState("all");
  const [subject, setSubject] = useState("all");
  const [mode, setMode] = useState("all");
  const [period, setPeriod] = useState<Period>("30");
  const [now] = useState(() => Date.now());

  const filteredAttempts = useMemo(() => {
    const cutoff = Number(period) ? now - Number(period) * 86400000 : 0;
    return attempts.filter((attempt) => {
      const matchesExam = exam === "all" || attempt.exam === exam;
      const matchesSubject = subject === "all" || attempt.subject === subject;
      const matchesMode = mode === "all" || attempt.mode === mode;
      const matchesPeriod =
        !cutoff || new Date(attempt.date).getTime() >= cutoff;
      return matchesExam && matchesSubject && matchesMode && matchesPeriod;
    });
  }, [attempts, exam, mode, now, period, subject]);

  const totals = useMemo(() => {
    const answered = filteredAttempts.reduce(
      (sum, attempt) => sum + attempt.total,
      0,
    );
    const correct = filteredAttempts.reduce(
      (sum, attempt) => sum + attempt.correct,
      0,
    );
    const duration = filteredAttempts.reduce(
      (sum, attempt) => sum + attempt.durationSeconds,
      0,
    );
    return {
      answered,
      correct,
      duration,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      average: filteredAttempts.length
        ? Math.round(
            filteredAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
              filteredAttempts.length,
          )
        : 0,
    };
  }, [filteredAttempts]);

  const studyActivity = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now - (6 - index) * 86400000);
      const key = date.toISOString().slice(0, 10);
      return {
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        count: filteredAttempts.filter(
          (attempt) => attempt.date.slice(0, 10) === key,
        ).length,
      };
    });
  }, [filteredAttempts, now]);

  const timeBySubject = useMemo(() => {
    const grouped = new Map<string, number>();
    filteredAttempts.forEach((attempt) => {
      grouped.set(
        attempt.subject,
        (grouped.get(attempt.subject) ?? 0) + attempt.durationSeconds,
      );
    });
    const rows = [...grouped.entries()].sort((a, b) => b[1] - a[1]);
    const max = rows[0]?.[1] ?? 0;
    return rows.map(([subject, seconds]) => ({
      subject,
      seconds,
      percentage: max ? Math.max(8, Math.round((seconds / max) * 100)) : 0,
    }));
  }, [filteredAttempts]);

  const subjectOptions = [
    { value: "all", label: "All subjects" },
    ...SUBJECT_CHOICES.map(({ value, label }) => ({ value, label })),
  ];
  const examOptions = [
    { value: "all", label: "All exams" },
    ...EXAM_CHOICES.map(({ value, label }) => ({ value, label })),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Analytics
          </h2>
          <p className="text-muted-foreground text-sm">
            Understand your progress, strengths, and next best practice.
          </p>
        </div>
        <span className="text-muted-foreground inline-flex items-center gap-2 text-xs">
          <Filter className="size-3.5" /> Filters apply to every section
        </span>
      </div>

      <section className="surface-card grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-3 sm:p-4">
        <ListSelect
          label="Exam"
          onChange={setExam}
          options={examOptions}
          placeholder="Choose an exam"
          showOptionDescriptions={false}
          compact
          value={exam}
        />
        <ListSelect
          label="Subject"
          onChange={setSubject}
          options={subjectOptions}
          placeholder="Choose a subject"
          showOptionDescriptions={false}
          compact
          value={subject}
        />
        <ListSelect
          label="Time range"
          onChange={(value) => setPeriod(value as Period)}
          options={PERIOD_OPTIONS}
          placeholder="Choose a time range"
          showOptionDescriptions={false}
          compact
          value={period}
        />
        <ListSelect
          label="Quiz mode"
          onChange={setMode}
          options={MODE_OPTIONS}
          placeholder="Choose a mode"
          showOptionDescriptions={false}
          compact
          value={mode}
        />
      </section>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-3 xl:grid-cols-3">
        <MetricCard
          detail={`${totals.correct} correct answers`}
          icon={CheckCircle2}
          label="Overall accuracy"
          tone="bg-emerald-500/10 text-emerald-600"
          value={`${totals.accuracy}%`}
        />
        <MetricCard
          detail={`${filteredAttempts.length} sessions tracked`}
          icon={BrainCircuit}
          label="Questions answered"
          tone="bg-primary/10 text-primary"
          value={String(totals.answered)}
        />
        <MetricCard
          detail="Across selected quizzes"
          icon={Target}
          label="Average score"
          tone="bg-violet-500/10 text-violet-600"
          value={`${totals.average}%`}
        />
        <MetricCard
          detail="Across your sessions"
          icon={Clock3}
          label="Study time"
          tone="bg-amber-500/10 text-amber-600"
          value={formatDuration(totals.duration)}
        />
        <MetricCard
          detail="Keep practising to build it"
          icon={TrendingUp}
          label="Current streak"
          tone="bg-rose-500/10 text-rose-600"
          value={
            filteredAttempts.length
              ? `${filteredAttempts.length} sessions`
              : "—"
          }
        />
      </div>

      <ReadinessCard score={totals.accuracy} />

      <div className="grid gap-4 lg:grid-cols-2">
        <SubjectPerformance attempts={filteredAttempts} />
        <ExamPerformance attempts={filteredAttempts} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground font-semibold">Time analytics</h3>
              <p className="text-muted-foreground text-xs">
                How long you spend in each selected session
              </p>
            </div>
            <Timer className="text-primary size-5" />
          </div>
          {timeBySubject.length ? (
            <div className="space-y-3">
              {timeBySubject
                .slice(0, 5)
                .map(({ subject, seconds, percentage }) => (
                  <div key={subject}>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-foreground truncate text-xs font-medium">
                        {titleCase(subject)}
                      </span>
                      <span className="text-muted-foreground text-[11px]">
                        {formatDuration(seconds)}
                      </span>
                    </div>
                    <div className="bg-surface-subtle h-2 overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground bg-surface-subtle rounded-2xl p-4 text-xs">
              Your time breakdown will appear after you complete a quiz.
            </p>
          )}
        </section>
        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground font-semibold">
                Strengths & focus areas
              </h3>
              <p className="text-muted-foreground text-xs">
                Use your results to choose what to practise next
              </p>
            </div>
            <TrendingDown className="text-muted-foreground size-5" />
          </div>
          {filteredAttempts.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [
                  "Strongest result",
                  Math.max(...filteredAttempts.map((item) => item.score)),
                ],
                [
                  "Needs attention",
                  Math.min(...filteredAttempts.map((item) => item.score)),
                ],
              ].map(([label, value]) => (
                <div className="bg-surface-subtle rounded-2xl p-4" key={label}>
                  <p className="text-muted-foreground text-xs">{label}</p>
                  <p className="text-foreground mt-1 text-2xl font-bold">
                    {value}%
                  </p>
                  <p className="text-muted-foreground mt-1 text-[11px]">
                    Based on your selected results
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground bg-surface-subtle rounded-2xl p-4 text-xs">
              Complete more quizzes to identify reliable strengths and focus
              areas.
            </p>
          )}
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground font-semibold">Study activity</h3>
              <p className="text-muted-foreground text-xs">
                Your quiz sessions over the last 7 days
              </p>
            </div>
            <CheckCircle2 className="text-primary size-5" />
          </div>
          <div className="flex items-end justify-between gap-2">
            {studyActivity.map(({ label, count }) => (
              <div
                className="flex min-w-0 flex-1 flex-col items-center gap-2"
                key={label}
              >
                <div className="bg-surface-subtle flex h-24 w-full items-end overflow-hidden rounded-lg">
                  <div
                    className="bg-primary/80 w-full rounded-t-lg"
                    style={{
                      height: `${count ? Math.min(100, count * 35 + 18) : 5}%`,
                    }}
                  />
                </div>
                <span className="text-muted-foreground text-[10px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-foreground font-semibold">Your insights</h3>
              <p className="text-muted-foreground text-xs">
                Small signals from your selected results
              </p>
            </div>
            <BrainCircuit className="text-primary size-5" />
          </div>
          <div className="space-y-2">
            {(filteredAttempts.length
              ? [
                  totals.accuracy >= 75
                    ? "Your accuracy is trending in a strong direction."
                    : "Keep practising to lift your overall accuracy.",
                  `${totals.answered} questions completed in this filter range.`,
                  totals.duration
                    ? `You have spent ${formatDuration(totals.duration)} practising.`
                    : "Complete a timed quiz to track study time.",
                ]
              : [
                  "Complete a quiz to unlock personalised insights.",
                  "Your strengths and focus areas will be based on real answers.",
                  "Use the filters above to compare progress over time.",
                ]
            ).map((insight) => (
              <div
                className="bg-surface-subtle flex items-start gap-3 rounded-2xl p-3"
                key={insight}
              >
                <span className="bg-primary/10 text-primary mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs">
                  •
                </span>
                <p className="text-foreground text-xs leading-5">{insight}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="surface-card p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-foreground font-semibold">
              Question difficulty
            </h3>
            <p className="text-muted-foreground text-xs">
              Review performance by difficulty as question tags become
              available.
            </p>
          </div>
          <Target className="text-muted-foreground size-5" />
        </div>
        <p className="text-muted-foreground bg-surface-subtle rounded-2xl p-4 text-xs">
          Difficulty-level insights will populate from tagged questions in your
          completed quizzes.
        </p>
      </section>

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
              {filteredAttempts.length
                ? "Keep a steady practice rhythm and revisit the subjects with your lowest scores."
                : "Take your first practice quiz to unlock personalised recommendations."}
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
