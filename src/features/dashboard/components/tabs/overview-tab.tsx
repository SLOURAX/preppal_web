import {
  BadgeCent,
  BookOpen,
  Flame,
  ArrowUpRight,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store";

const RECENT_ACTIVITY = [
  {
    subject: "Mathematics",
    exam: "JAMB",
    score: 82,
    date: "Today",
    passed: true,
  },
  {
    subject: "English Language",
    exam: "WAEC",
    score: 74,
    date: "Yesterday",
    passed: true,
  },
  {
    subject: "Physics",
    exam: "JAMB",
    score: 58,
    date: "2 days ago",
    passed: false,
  },
  {
    subject: "Chemistry",
    exam: "NECO",
    score: 91,
    date: "3 days ago",
    passed: true,
  },
] as const;

const STATS = [
  {
    label: "Quizzes completed",
    value: "24",
    icon: BookOpen,
    color: "text-primary bg-primary/10",
  },
  {
    label: "Current streak",
    value: "7 days",
    icon: Flame,
    color: "text-orange-500 bg-orange-500/10",
  },
  {
    label: "Average score",
    value: "78%",
    icon: Target,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    label: "Points earned",
    value: "12,450 P",
    icon: BadgeCent,
    color: "text-amber-500 bg-amber-500/10",
  },
] as const;

export function OverviewTab() {
  const userName = useAuthStore((s) => s.userName);
  const weeklyGoal = useAuthStore((s) => s.weeklyGoal);
  const weeklyActivity = useAuthStore((s) => s.weeklyActivity);
  const setWeeklyGoal = useAuthStore((s) => s.setWeeklyGoal);

  const completedDays = weeklyActivity.filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 sm:p-5">
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
        <div className="relative flex items-center gap-4">
          <div className="bg-primary text-primary-foreground shadow-primary/20 grid size-14 shrink-0 place-items-center rounded-2xl text-xl font-black shadow-lg">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
            <h2 className="text-foreground text-xl font-bold sm:text-2xl">
              {userName}
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Ready for your next win?
            </p>
          </div>
          <div className="relative ml-auto flex h-20 w-24 shrink-0 sm:h-28 sm:w-32">
            <Image
              alt="Preppal mascot waving hello"
              className="object-contain object-bottom drop-shadow-sm"
              fill
              sizes="128px"
              src="/owl-mascot.png"
            />
            <span className="bg-surface/80 text-primary absolute -top-1 right-0 rounded-full px-2 py-1 text-[10px] font-bold shadow-sm">
              Hi there!
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
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
          <div className="border-border/70 bg-surface-subtle/40 rounded-2xl border border-dashed p-4">
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
          <div className="bg-primary/10 flex items-center gap-1.5 rounded-full px-3 py-1">
            <Zap className="text-primary size-3" />
            <span className="text-primary text-xs font-bold">Live</span>
          </div>
        </div>
        <div className="divide-border divide-y">
          {RECENT_ACTIVITY.map((item) => (
            <div
              key={item.subject}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-foreground truncate text-[.8rem] font-semibold">
                  {item.subject}
                </p>
                <p className="text-muted-foreground text-[.75rem]">
                  {item.exam} · {item.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[.85rem] font-bold ${item.passed ? "text-emerald-600" : "text-rose-500"}`}
                >
                  {item.score}%
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    item.passed
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {item.passed ? "Pass" : "Retry"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
