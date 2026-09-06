import { ArrowRight, BookOpenCheck, GraduationCap } from "lucide-react";
import Link from "next/link";

const EXAMS = [
  {
    value: "jamb",
    name: "JAMB UTME",
    description:
      "Joint Admissions and Matriculation Board. Nigeria's foremost university entrance exam.",
    subjects: ["Mathematics", "English Language", "Physics", "Chemistry"],
    color: "from-primary/15 to-primary/5 border-primary/20",
    iconColor: "text-primary bg-primary/10",
    badge: "Most popular",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    value: "waec",
    name: "WAEC SSCE",
    description:
      "West African Examinations Council. Covering all core secondary school subjects.",
    subjects: ["Mathematics", "English", "Biology", "Government"],
    color: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
    iconColor: "text-violet-600 bg-violet-500/10",
    badge: "6 subjects",
    badgeColor: "bg-violet-500/10 text-violet-600",
  },
  {
    value: "neco",
    name: "NECO",
    description:
      "National Examinations Council. Widely accepted alternative to WAEC across Nigeria.",
    subjects: ["Mathematics", "English", "Physics", "Economics"],
    color: "from-violet-500/10 to-violet-500/5 border-violet-500/20",
    iconColor: "text-violet-600 bg-violet-500/10",
    badge: "New content",
    badgeColor: "bg-violet-500/10 text-violet-600",
  },
] as const;

export function ExamsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-xl font-bold">
          Prepare for an Exam
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Choose an exam to practice within its official structure and syllabus.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMS.map((exam) => (
          <div
            key={exam.name}
            className={`surface-card border bg-gradient-to-br p-5 sm:p-6 ${exam.color} flex flex-col gap-4`}
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`inline-grid size-11 place-items-center rounded-2xl ${exam.iconColor}`}
              >
                <GraduationCap className="size-5" />
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${exam.badgeColor}`}
              >
                {exam.badge}
              </span>
            </div>

            <div>
              <h3 className="text-foreground font-bold">{exam.name}</h3>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {exam.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {exam.subjects.map((s) => (
                <span
                  key={s}
                  className="text-muted-foreground bg-surface-subtle rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>

            <Link
              href={`/quiz?path=exam&choice=${exam.value}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors"
            >
              Start practice <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="surface-card flex items-center gap-4 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-500/10">
          <BookOpenCheck className="size-5 text-amber-500" />
        </span>
        <div className="flex-1">
          <p className="text-foreground text-sm font-semibold">
            Practice a specific subject instead
          </p>
          <p className="text-muted-foreground text-xs">
            Focus on one subject across all exams without the full structure.
          </p>
        </div>
        <Link
          href="/quiz?path=subject&choice=mathematics"
          className="border-border hover:bg-surface-subtle text-foreground hidden items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors sm:flex"
        >
          Go <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
