import {
  BadgeCent,
  BookOpen,
  ChartNoAxesCombined,
  Flame,
  Target,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/store";

const RECENT_ACTIVITY = [
  { subject: "Mathematics", exam: "JAMB", score: 82, date: "Today", passed: true },
  { subject: "English Language", exam: "WAEC", score: 74, date: "Yesterday", passed: true },
  { subject: "Physics", exam: "JAMB", score: 58, date: "2 days ago", passed: false },
  { subject: "Chemistry", exam: "NECO", score: 91, date: "3 days ago", passed: true },
] as const;

const STATS = [
  { label: "Quizzes completed", value: "24", icon: BookOpen, color: "text-primary bg-primary/10" },
  { label: "Current streak", value: "7 days", icon: Flame, color: "text-orange-500 bg-orange-500/10" },
  { label: "Average score", value: "78%", icon: Target, color: "text-emerald-600 bg-emerald-500/10" },
  { label: "Points earned", value: "12,450 P", icon: BadgeCent, color: "text-amber-500 bg-amber-500/10" },
] as const;

export function OverviewTab() {
  const userName = useAuthStore((s) => s.userName);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="from-primary/10 to-primary/5 bg-gradient-to-br rounded-2xl border border-primary/10 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground grid size-14 shrink-0 place-items-center rounded-2xl text-xl font-black shadow-md">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Welcome back 👋</p>
            <h2 className="text-foreground text-2xl font-bold">{userName}</h2>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 sm:flex">
            <Flame className="size-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600">7 day streak</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="surface-card p-4 sm:p-5">
            <span className={`inline-grid size-10 place-items-center rounded-xl ${color}`}>
              <Icon className="size-5" />
            </span>
            <p className="text-foreground mt-4 text-xl font-bold">{value}</p>
            <p className="text-muted-foreground mt-0.5 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Weekly progress */}
      <div className="surface-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-foreground font-semibold">Weekly goal</h3>
          <span className="text-primary text-sm font-bold">5 / 7 days</span>
        </div>
        <div className="flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`h-8 w-full rounded-md ${
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
          <h3 className="text-foreground font-semibold">Recent quizzes</h3>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <Zap className="size-3 text-primary" />
            <span className="text-primary text-xs font-bold">Live</span>
          </div>
        </div>
        <div className="divide-border divide-y">
          {RECENT_ACTIVITY.map((item) => (
            <div key={item.subject} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold">{item.subject}</p>
                <p className="text-muted-foreground text-xs">{item.exam} · {item.date}</p>
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
