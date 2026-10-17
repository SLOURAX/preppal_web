"use client";

import {
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { ListSelect } from "@/components/ui/list-select";
import { apiClient } from "@/lib/api/client";
import type { QuizCatalog } from "@/features/quiz/quiz-catalog";

export function ExamsTab() {
  const catalogQuery = useQuery({
    queryKey: ["quiz", "catalog"],
    queryFn: () => apiClient<QuizCatalog>("/api/v1/question-bank/catalog"),
  });
  const exams = catalogQuery.data?.exams ?? [];
  const [selectedExam, setSelectedExam] = useState<string>("");
  useEffect(() => {
    if (!selectedExam && exams[0]) setSelectedExam(exams[0].id);
  }, [exams, selectedExam]);
  const selectedExamDetails = exams.find((exam) => exam.id === selectedExam);

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-foreground mt-5 text-base font-bold sm:text-[1.05rem]">
            Prepare for an Exam
          </h2>
          <p className="text-muted-foreground text-xs leading-5 sm:text-[.8rem]">
            Choose an available exam and practise with its published questions.
          </p>
        </div>
        <Link
          className="border-primary/25 text-primary hover:bg-primary/5 inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors"
          href="/quiz?path=exam"
        >
          View all
        </Link>
      </div>

      {catalogQuery.isLoading ? (
        <div className="text-muted-foreground flex min-h-32 items-center justify-center gap-2 text-xs">
          <LoaderCircle className="text-primary size-5 animate-spin" /> Loading
          available exams…
        </div>
      ) : catalogQuery.isError ? (
        <div className="surface-card text-muted-foreground p-5 text-center text-xs">
          Available exams could not be loaded. Please try again shortly.
        </div>
      ) : exams.length === 0 ? (
        <div className="surface-card p-5 text-center">
          <p className="text-foreground text-sm font-semibold">
            No exams are ready for practice yet
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Exams will appear once they have subjects, years, and published
            questions.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:hidden">
            <ListSelect
              onChange={setSelectedExam}
              options={exams.map((exam) => ({
                value: exam.id,
                label: exam.name,
              }))}
              placeholder="Choose an exam"
              showOptionDescriptions={false}
              compact
              value={selectedExam}
            />
            {selectedExamDetails ? (
              <Link
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm"
                href={`/quiz?path=exam&choice=${selectedExamDetails.id}`}
              >
                Start {selectedExamDetails.name} practice{" "}
                <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="surface-card border-primary/15 from-primary/10 to-primary/5 flex flex-col gap-4 border bg-gradient-to-br p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="bg-primary/10 text-primary inline-grid size-11 place-items-center rounded-2xl">
                    <GraduationCap className="size-5" />
                  </span>
                  <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-[10px] font-bold">
                    {exam.subjects.length}{" "}
                    {exam.subjects.length === 1 ? "subject" : "subjects"}
                  </span>
                </div>

                <div>
                  <h3 className="text-foreground font-bold">{exam.name}</h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-5">
                    {exam.description ||
                      "Structured practice using available published questions."}
                  </p>
                </div>

                <Link
                  href={`/quiz?path=exam&choice=${exam.id}`}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-[.8rem] font-medium transition-colors"
                >
                  Start practice <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

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
          href="/quiz?path=subject"
          className="border-border hover:bg-surface-subtle text-foreground hidden items-center gap-2 rounded-xl border px-4 py-2 text-[.8rem] font-medium transition-colors sm:flex"
        >
          Start practicing <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
