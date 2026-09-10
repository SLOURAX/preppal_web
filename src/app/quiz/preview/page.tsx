"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  BookOpen,
  Clock3,
  FileText,
  Lightbulb,
  ShieldCheck,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui";

function QuizPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "timed";
  const isUntimed = mode === "untimed";

  const subject = searchParams.get("subject") || "Mathematics";
  const exam = searchParams.get("exam") || "JAMB";
  const year = searchParams.get("year") || "2023";
  const [questionCount, setQuestionCount] = useState<number>(10);

  const EXAM_STATS = [
    { icon: BookOpen, label: "Exam", value: exam },
    {
      icon: FileText,
      label: "Questions",
      value: isUntimed ? String(questionCount) : "40",
    },
    {
      icon: Zap,
      label: "Mode",
      value: isUntimed ? "Practice Playground" : "Timed Simulation",
    },
    {
      icon: Clock3,
      label: "Time Limit",
      value: isUntimed ? "None" : "45 mins",
    },
    { icon: BookOpen, label: "Year", value: year },
    { icon: ShieldCheck, label: "Subject", value: subject },
  ];

  const INSTRUCTIONS = isUntimed
    ? [
        "This is a practice playground with no time limits.",
        "You can request AI assistance or hints on any question if you get stuck.",
        "Each question carries equal marks. There is no negative marking.",
        "You can view the answer and explanation immediately after attempting.",
        "Use the question grid on the right to jump between questions at any time.",
      ]
    : [
        "This exam consists of 40 multiple-choice questions to be completed in 45 minutes.",
        "Each question carries equal marks. There is no negative marking.",
        "You can flag any question and return to it before submitting.",
        "The exam will auto-submit when time expires — make sure to answer all questions.",
        "Do not refresh or navigate away from the page during the exam.",
        "Use the question grid on the right to jump between questions at any time.",
      ];

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-5 text-center">
          <h1 className="text-foreground mt-2 text-xl font-bold tracking-tight capitalize sm:text-3xl">
            Exam Preview
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {EXAM_STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-surface-subtle flex items-center gap-3 rounded-2xl p-3 text-left"
            >
              <div className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-xl">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                  {label}
                </p>
                <p className="text-foreground mt-0.5 truncate text-sm font-bold capitalize">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isUntimed ? (
          <section
            className="surface-card mt-5 rounded-2xl p-4 sm:p-5"
            aria-labelledby="practice-size-title"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="practice-size-title"
                  className="text-foreground text-sm font-semibold"
                >
                  Practice set size
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  Choose how many questions you want to explore today.
                </p>
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Number of questions"
              >
                {[5, 10, 15, 20, 30].map((count) => (
                  <button
                    key={count}
                    type="button"
                    aria-pressed={questionCount === count}
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      questionCount === count
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-surface-subtle text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <div className="surface-card mt-5 rounded-3xl p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-primary size-6" />
            <h2 className="text-foreground font-semibold">Before you begin</h2>
          </div>
          <ul className="space-y-3">
            {INSTRUCTIONS.map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-[.8rem] leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {isUntimed ? (
          <div className="border-primary/20 bg-primary/5 mt-4 flex items-start gap-3 rounded-2xl border p-4">
            <Lightbulb className="text-primary mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              AI Assistance is enabled. If you get stuck, you can ask for hints
              or explanations directly on the question card to enhance your
              learning.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              Once the exam starts, the timer cannot be paused. Ensure you are
              in a quiet environment with a stable internet connection.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-row gap-2 sm:justify-end sm:gap-3">
          <button
            onClick={() => router.push("/quiz")}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border !border-rose-600 px-3 py-2.5 text-xs font-semibold text-rose-600 transition-colors sm:flex-none sm:px-6 sm:text-sm"
          >
            Cancel
          </button>
          <Button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              if (isUntimed) params.set("count", String(questionCount));
              router.push(`/quiz/active?${params.toString()}`);
            }}
            className="min-w-0 flex-1 gap-2 rounded-xl px-3 text-xs font-semibold sm:flex-none sm:px-8 sm:text-sm"
          >
            Start {isUntimed ? "Practice" : "Exam"}
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function QuizPreviewPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <QuizPreviewContent />
    </Suspense>
  );
}
