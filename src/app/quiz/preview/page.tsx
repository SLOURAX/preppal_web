"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  FileQuestion,
  ShieldCheck,
  Zap,
  Play,
  BookOpen,
  AlertCircle,
  Book
} from "lucide-react";
import { Button } from "@/components/ui";

const EXAM_STATS = [
  { icon: Book, label: "Exam", value: "WAEC" },
  { icon: FileQuestion, label: "Questions", value: "40" },
  { icon: Zap, label: "Mode", value: "Timed Simulation" },
  { icon: Clock, label: "Time Limit", value: "45 mins" },
  { icon: BookOpen, label: "Year", value: "2023" },
  { icon: ShieldCheck, label: "Subject", value: "Mathematics" },
];

const INSTRUCTIONS = [
  "This exam consists of 40 multiple-choice questions to be completed in 45 minutes.",
  "Each question carries equal marks. There is no negative marking.",
  "You can flag any question and return to it before submitting.",
  "The exam will auto-submit when time expires — make sure to answer all questions.",
  "Do not refresh or navigate away from the page during the exam.",
  "Use the question grid on the right to jump between questions at any time.",
];

export default function QuizPreviewPage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="border-border bg-surface/80 sticky top-0 z-20 flex h-14 items-center border-b px-5 backdrop-blur-md sm:px-8">
        <button
          onClick={() => router.push("/quiz")}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to setup
        </button>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8">
        {/* Exam identity */}
        <div className="mb-8 text-center">
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight">
            JAMB Mathematics
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Official Past Questions · 2023 Edition
          </p>
        </div>

        {/* Stats row */}
        <div className="grid items-center justify-center grid-cols-2 gap-3 sm:grid-cols-3">
          {EXAM_STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
            >
              <div className="bg-primary/10 text-primary grid size-9 place-items-center rounded-xl">
                <Icon className="size-4" />
              </div>
              <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">
                {label}
              </p>
              <p className="text-foreground text-base font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="surface-card mt-6 rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-primary size-5" />
            <h2 className="text-foreground font-semibold">
              Before you begin
            </h2>
          </div>
          <ul className="space-y-3">
            {INSTRUCTIONS.map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            Once the exam starts, the timer cannot be paused. Ensure you are
            in a quiet environment with a stable internet connection.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => router.push("/quiz")}
            className="border-border text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <Button
            onClick={() => router.push("/quiz/active")}
            className="flex items-center gap-2 px-8 text-sm font-semibold"
          >
            <Play className="size-4" fill="currentColor" />
            Start Exam
          </Button>
        </div>
      </main>
    </div>
  );
}
