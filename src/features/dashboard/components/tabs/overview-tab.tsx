import {
  BadgeCent,
  BookOpen,
  Flame,
  ArrowUpRight,
  Target,
  Zap,
} from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="from-primary/15 via-primary/5 to-surface relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-7">
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
          <div className="ml-auto hidden items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 sm:flex">
            <Flame className="size-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600">
              7 day streak
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="surface-card p-4 transition-transform hover:-translate-y-0.5 sm:p-5"
          >
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
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold">
            5 / 7 days
          </span>
        </div>
        <div className="flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div
              key={day}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <div
                className={`h-8 w-full rounded-md transition-colors ${
                  i < 5 ? "bg-primary" : "bg-surface-subtle"
                }`}
              />
              <span className="text-muted-foreground text-[10px]">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="surface-card overflow-hidden p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-foreground font-semibold">Recent quizzes</h3>
            <p className="text-muted-foreground mt-1 text-xs">
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
                <p className="text-foreground truncate text-sm font-semibold">
                  {item.subject}
                </p>
                <p className="text-muted-foreground text-xs">
                  {item.exam} · {item.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold ${item.passed ? "text-emerald-600" : "text-rose-500"}`}
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
