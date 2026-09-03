import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const SUBJECTS = [
  { name: "Mathematics", progress: 72, quizzes: 8, icon: "∑", color: "bg-blue-500/10 text-blue-600" },
  { name: "English Language", progress: 85, quizzes: 12, icon: "A", color: "bg-violet-500/10 text-violet-600" },
  { name: "Physics", progress: 54, quizzes: 5, icon: "⚡", color: "bg-amber-500/10 text-amber-600" },
  { name: "Chemistry", progress: 91, quizzes: 10, icon: "⚗", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "Biology", progress: 63, quizzes: 7, icon: "🧬", color: "bg-green-500/10 text-green-600" },
  { name: "Government", progress: 38, quizzes: 3, icon: "🏛", color: "bg-rose-500/10 text-rose-600" },
  { name: "Economics", progress: 47, quizzes: 4, icon: "📈", color: "bg-orange-500/10 text-orange-600" },
  { name: "Literature", progress: 29, quizzes: 2, icon: "📖", color: "bg-pink-500/10 text-pink-600" },
] as const;

function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 80 ? "bg-emerald-500" : value >= 50 ? "bg-primary" : "bg-amber-500";
  return (
    <div className="bg-surface-subtle h-1.5 w-full overflow-hidden rounded-full">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function SubjectsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-xl font-bold">Subjects</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your mastery across each subject area.
          </p>
        </div>
        <Link
          href="/quiz"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex"
        >
          <BookOpen className="size-4" /> Practice
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SUBJECTS.map((subject) => (
          <div key={subject.name} className="surface-card group flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <span className={`grid size-10 place-items-center rounded-xl text-lg ${subject.color}`}>
                {subject.icon}
              </span>
              <span className="text-muted-foreground text-xs font-medium">
                {subject.quizzes} quizzes
              </span>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">{subject.name}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <ProgressBar value={subject.progress} />
                <span className="text-muted-foreground shrink-0 text-xs font-bold">
                  {subject.progress}%
                </span>
              </div>
            </div>
            <Link
              href="/quiz"
              className="text-primary group-hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors"
            >
              Practice <ArrowRight className="size-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
