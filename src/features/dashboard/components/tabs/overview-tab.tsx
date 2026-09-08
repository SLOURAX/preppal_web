import {
  BadgeCent,
  BookOpen,
  Gauge,
  ArrowUpRight,
  Crosshair,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { Mascot } from "@/components/ui";

export function OverviewTab() {
  const userName = useAuthStore((s) => s.userName);
  const weeklyGoal = useAuthStore((s) => s.weeklyGoal);
  const weeklyActivity = useAuthStore((s) => s.weeklyActivity);
  const setWeeklyGoal = useAuthStore((s) => s.setWeeklyGoal);
  const quizAttempts = useAuthStore((s) => s.quizAttempts);

  const completedDays = weeklyActivity.filter(Boolean).length;
  const formatLabel = (value: string): string =>
    value.replace(/\b\w/g, (character) => character.toUpperCase());
  const formatDate = (value: string): string => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    return `${day}${suffix} of ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
  };
  const averageScore = quizAttempts.length
    ? Math.round(
        quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
          quizAttempts.length,
      )
    : 0;
  const stats = [
    [
      "Quizzes completed",
      String(quizAttempts.length),
      BookOpen,
      "text-primary bg-primary/10",
    ],
    [
      "Current streak",
      weeklyGoal ? `${completedDays} days` : "—",
      Gauge,
      "text-orange-500 bg-orange-500/10",
    ],
    [
      "Average score",
      `${averageScore}%`,
      Crosshair,
      "text-emerald-600 bg-emerald-500/10",
    ],
    [
      "XP earned",
      `${quizAttempts.reduce((sum, attempt) => sum + attempt.correct * 10, 0).toLocaleString()} P`,
      BadgeCent,
      "text-amber-500 bg-amber-500/10",
    ],
  ] as const;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-4 sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary) / .12) 1px, transparent 1px), linear-gradient(hsl(var(--primary) / .12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="bg-primary/10 pointer-events-none absolute -right-16 -bottom-24 size-64 rounded-full blur-3xl" />
        <div className="relative flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="bg-primary text-primary-foreground shadow-primary/20 grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-black shadow-lg sm:size-14 sm:text-xl">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Welcome back
            </p>
            <h2 className="text-foreground mt-0.5 max-w-[11rem] text-lg leading-tight font-bold sm:max-w-none sm:text-2xl">
              {userName}
            </h2>
            <p className="text-muted-foreground mt-1 text-[11px] sm:text-xs">
              Ready for your next win?
            </p>
          </div>
          <div className="relative ml-auto flex h-16 w-20 shrink-0 sm:h-28 sm:w-32">
            <Image
              alt="Preppal mascot waving hello"
              className="object-contain object-bottom drop-shadow-sm"
              fill
              sizes="112px"
              src="/owl-mascot.png"
            />
            <span className="bg-surface/80 text-primary absolute -top-1 right-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold shadow-sm sm:px-2 sm:py-1 sm:text-[10px]">
              Hi there!
            </span>
          </div>
        </div>
      </div>

      <section className="from-primary to-primary-strong shadow-primary/15 relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-lg sm:p-6">
        <div className="pointer-events-none absolute -right-8 -bottom-14 size-40 rounded-full border-[18px] border-white/10" />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-primary-foreground/70 text-[10px] font-bold tracking-widest uppercase">
              {quizAttempts[0] ? "Keep your momentum" : "Your next best move"}
            </p>
            <h3 className="mt-1 text-lg font-bold">
              {quizAttempts[0]
                ? `Review your ${formatLabel(quizAttempts[0].subject)} attempt`
                : "Start your first practice quiz"}
            </h3>
            <p className="text-primary-foreground/75 mt-1 text-xs">
              {quizAttempts[0]
                ? `You scored ${quizAttempts[0].score}%. Turn the misses into your next win.`
                : "Build a streak and unlock personalized insights as you learn."}
            </p>
          </div>
          <Link
            className="bg-surface text-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-transform hover:-translate-y-0.5"
            href={quizAttempts[0] ? "/quiz/results" : "/quiz"}
          >
            {quizAttempts[0] ? "Review attempt" : "Start practice"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([label, value, Icon, color]) => (
          <div
            key={label}
            className="surface-card relative overflow-hidden p-4 transition-transform hover:-translate-y-0.5 sm:p-5"
          >
            <Icon
              aria-hidden="true"
              className="text-primary/5 pointer-events-none absolute -right-3 -bottom-3 size-24"
            />
            <span
              className={`inline-grid size-10 place-items-center rounded-xl ${color}`}
            >
              <Icon className="size-5" />
            </span>
            <p className="text-foreground mt-4 text-lg font-bold sm:text-xl">
              {value}
            </p>
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-[11px] sm:text-xs">
                {label}
              </p>
              <ArrowUpRight className="text-muted-foreground size-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly progress */}
      <div className="surface-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-foreground font-semibold">Weekly goal</h3>
            <p className="text-muted-foreground mt-1 text-xs">
              A little consistency goes a long way
            </p>
          </div>
          {weeklyGoal ? (
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold">
              {completedDays} / {weeklyGoal} days
            </span>
          ) : (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
              Goal not set
            </span>
          )}
        </div>
        {weeklyGoal ? (
          <div className="flex gap-1.5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const isActive = weeklyActivity[i];
              return (
                <div
                  key={day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div
                    className={`h-8 w-full rounded-md transition-colors ${
                      isActive ? "bg-primary" : "bg-surface-subtle"
                    }`}
                  />
                  <span className="text-muted-foreground text-[10px]">
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-border/70 bg-surface-subtle/40 flex items-center justify-between gap-4 rounded-2xl border border-dashed p-4">
            <div className="min-w-0">
              <p className="text-foreground text-sm font-semibold">
                Add a new weekly goal
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Choose how many days you want to practice each week.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[3, 5, 7].map((days) => (
                  <button
                    className="border-primary/25 text-primary hover:bg-primary/10 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors"
                    key={days}
                    onClick={() => setWeeklyGoal(days)}
                    type="button"
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>
            <Mascot
              alt="Preppal mascot ready to help you set a goal"
              className="hidden sm:block"
              mood="encourage"
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div className="surface-card overflow-hidden p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-foreground font-semibold">Recent quizzes</h3>
            <p className="text-muted-foreground text-xs">
              Your latest practice activity
            </p>
          </div>
          <Link
            className="text-primary hover:bg-primary/10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold transition-colors"
            href="/dashboard?view=quiz-history"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="divide-border divide-y">
          {quizAttempts.length === 0 ? (
            <div className="flex items-center justify-center gap-3 py-5 text-center">
              <Mascot mood="thinking" size="sm" />
              <p className="text-muted-foreground max-w-xs text-left text-xs">
                No quizzes yet. Start a practice session to see your progress
                here.
              </p>
            </div>
          ) : (
            quizAttempts.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-foreground truncate text-[.8rem] font-semibold">
                    {formatLabel(item.subject)}
                  </p>
                  <p className="text-muted-foreground text-[.75rem]">
                    {formatLabel(item.exam)} · {formatDate(item.date)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[.85rem] font-bold ${item.score >= 50 ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {item.score}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
