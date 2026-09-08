"use client";

import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="space-y-6">
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs"
        href="/dashboard"
      >
        <ArrowLeft className="size-4" /> Back to overview
      </Link>
      <header>
        <div className="bg-primary/10 text-primary mb-4 grid size-12 place-items-center rounded-2xl">
          <BookOpen className="size-6" />
        </div>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Quiz history
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
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
            {quizAttempts.map((attempt) => (
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
          </div>
        )}
      </section>
    </div>
  );
}
