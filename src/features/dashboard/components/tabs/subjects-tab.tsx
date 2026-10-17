"use client";

import { ArrowRight, BookOpen, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ListSelect } from "@/components/ui/list-select";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";
import type { QuizCatalog } from "@/features/quiz/quiz-catalog";

const SUBJECT_STYLES = [
  "bg-blue-500/10 text-blue-600",
  "bg-violet-500/10 text-violet-600",
  "bg-amber-500/10 text-amber-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-rose-500/10 text-rose-600",
  "bg-orange-500/10 text-orange-600",
] as const;

function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 80
      ? "bg-emerald-500"
      : value >= 50
        ? "bg-primary"
        : "bg-amber-500";
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
  const attempts = useAuthStore((state) => state.quizAttempts);
  const catalogQuery = useQuery({
    queryKey: ["quiz", "catalog"],
    queryFn: () => apiClient<QuizCatalog>("/api/v1/question-bank/catalog"),
  });
  const subjects = (catalogQuery.data?.standaloneSubjects ?? []).slice(0, 6);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initialize from async catalogue
    if (!selectedSubject && subjects[0]) setSelectedSubject(subjects[0].id);
  }, [selectedSubject, subjects]);
  const selectedSubjectDetails = subjects.find(
    (subject) => subject.id === selectedSubject,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold">Subjects</h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Track your mastery across each subject area.
          </p>
        </div>
        <Link
          href="/quiz?path=subject"
          className="border-primary/25 text-primary hover:bg-primary/5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors"
        >
          <BookOpen className="size-4" /> View all
        </Link>
      </div>

      {catalogQuery.isLoading ? (
        <div className="text-muted-foreground flex min-h-32 items-center justify-center gap-2 text-xs">
          <LoaderCircle className="text-primary size-5 animate-spin" /> Loading
          available subjects…
        </div>
      ) : catalogQuery.isError ? (
        <div className="surface-card text-muted-foreground p-5 text-center text-xs">
          Available subjects could not be loaded. Please try again shortly.
        </div>
      ) : subjects.length === 0 ? (
        <div className="surface-card p-5 text-center">
          <p className="text-foreground text-sm font-semibold">
            No subjects are ready for practice yet
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Subjects will appear here once they have published questions.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:hidden">
            <ListSelect
              onChange={setSelectedSubject}
              options={subjects.map((subject) => ({
                label: subject.name,
                value: subject.id,
              }))}
              placeholder="Choose a subject"
              showOptionDescriptions={false}
              value={selectedSubject}
            />
            {selectedSubjectDetails ? (
              <Link
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                href={`/quiz?path=subject&choice=${encodeURIComponent(selectedSubjectDetails.id)}`}
              >
                Practice {selectedSubjectDetails.name}{" "}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => {
              const subjectAttempts = attempts.filter(
                (attempt) =>
                  attempt.subject.toLowerCase() === subject.name.toLowerCase(),
              );
              const progress = subjectAttempts.length
                ? Math.round(
                    subjectAttempts.reduce(
                      (sum, attempt) => sum + attempt.score,
                      0,
                    ) / subjectAttempts.length,
                  )
                : 0;
              return (
                <div
                  key={subject.name}
                  className="surface-card group flex flex-col gap-3 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid size-10 place-items-center rounded-xl text-sm font-bold ${SUBJECT_STYLES[index % SUBJECT_STYLES.length]}`}
                    >
                      {subject.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-muted-foreground text-[11px] font-medium">
                      {subjectAttempts.length || "No"}{" "}
                      {subjectAttempts.length === 1 ? "quiz" : "quizzes"}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-semibold sm:text-sm">
                      {subject.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <ProgressBar value={progress} />
                      <span className="text-muted-foreground shrink-0 text-[11px] font-bold">
                        {progress ? `${progress}%` : "Not started"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/quiz?path=subject&choice=${encodeURIComponent(subject.id)}`}
                    className="text-primary group-hover:text-primary/80 flex items-center gap-1 text-[11px] font-semibold transition-colors"
                  >
                    Practice <ArrowRight className="size-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
