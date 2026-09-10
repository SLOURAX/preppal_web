"use client";

import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAuthStore } from "@/store";
import { DataState } from "@/components/ui";

const formatLabel = (value: string): string =>
  value.replace(/\b\w/g, (character) => character.toUpperCase());

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function QuizHistoryTab() {
  const quizAttempts = useAuthStore((state) => state.quizAttempts);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(quizAttempts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = quizAttempts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-6">
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs"
        href="/dashboard"
      >
        <ArrowLeft className="size-4" /> Back to overview
      </Link>
      <header>
        <h1 className="text-foreground text-[1.2rem] font-bold tracking-tight sm:text-2xl">
          Quiz history
        </h1>
        <p className="text-muted-foreground text-[.8rem]">
          Review every practice session you have completed.
        </p>
      </header>
      <section className="surface-card overflow-hidden p-5 sm:p-6">
        {quizAttempts.length === 0 ? (
          <DataState
            title="No quizzes yet"
            description="Complete a practice session and your score, exam, subject, and date will appear here."
            action={
              <Link
                className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                href="/quiz"
              >
                Start a quiz <ChevronRight className="size-4" />
              </Link>
            }
          />
        ) : (
          <div className="divide-border divide-y">
            {pageItems.map((attempt) => (
              <div
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                key={attempt.id}
              >
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-semibold">
                    {formatLabel(attempt.subject)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {formatLabel(attempt.exam)} · {formatDate(attempt.date)} ·{" "}
                    {formatLabel(attempt.mode)}
                  </p>
                </div>
                <span
                  className={`text-sm font-bold ${attempt.score >= 50 ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {attempt.score}%
                </span>
              </div>
            ))}
            {totalPages > 1 ? (
              <div className="border-border flex items-center justify-between gap-3 border-t pt-4">
                <button
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold disabled:pointer-events-none disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  type="button"
                >
                  <ChevronLeft className="size-3.5" /> Previous
                </button>
                <span className="text-muted-foreground text-xs font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="text-primary hover:text-primary-strong inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold disabled:pointer-events-none disabled:opacity-40"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setPage((value) => Math.min(totalPages, value + 1))
                  }
                  type="button"
                >
                  Next <ChevronRight className="size-3.5" />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
