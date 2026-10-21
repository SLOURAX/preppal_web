"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Tags,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";
import { clearCompletedQuiz } from "@/features/quiz/quiz-session-navigation";

interface QuestionAvailability {
  readonly total: number;
}
interface PlatformSettings {
  readonly defaultQuestionCount: number;
  readonly defaultQuizDurationMinutes: number;
}

function QuizPreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const settingsQuery = useQuery({
    queryKey: ["platform", "settings"],
    queryFn: () => apiClient<PlatformSettings>("/api/v1/platform/settings"),
    staleTime: 5 * 60 * 1000,
  });
  const defaultQuestionCount = settingsQuery.data?.defaultQuestionCount ?? 20;
  const quizDurationMinutes =
    settingsQuery.data?.defaultQuizDurationMinutes ?? 30;

  const mode = searchParams.get("mode") || "";
  const isUntimed = mode === "untimed";
  const maxQuestionsPerQuiz = useAuthStore(
    (state) => state.membership?.entitlements?.maxQuestionsPerQuiz ?? 20,
  );
  const path = searchParams.get("path") === "subject" ? "STANDALONE" : "EXAM";
  const selectedSubjectId = searchParams.get("subject") ?? "";
  const yearLink = searchParams.get("yearLink") ?? "";
  const topicIds = searchParams.get("topicIds") ?? "";
  const availabilityQuery = useQuery({
    queryKey: [
      "quiz",
      "availability",
      path,
      selectedSubjectId,
      yearLink,
      topicIds,
    ],
    enabled:
      Boolean(selectedSubjectId) &&
      (path === "STANDALONE" || Boolean(yearLink)),
    queryFn: () => {
      const params = new URLSearchParams({ path });
      if (path === "EXAM") params.set("examSubjectId", selectedSubjectId);
      else params.set("subjectId", selectedSubjectId);
      if (yearLink) params.set("examSubjectYearId", yearLink);
      if (topicIds) params.set("topicIds", topicIds);
      return apiClient<QuestionAvailability>(
        `/api/v1/question-bank/availability?${params}`,
      );
    },
  });
  const availableQuestionCount = availabilityQuery.data?.total ?? 0;
  const timedQuestionCount = Math.min(
    40,
    maxQuestionsPerQuiz,
    availableQuestionCount,
  );

  const subject = searchParams.get("subjectName") || "";
  const exam = searchParams.get("examName") || "";
  const year = searchParams.get("year") || "";
  const topics = searchParams.get("topics") || "";
  const className = searchParams.get("className") || "";
  const requestedCount = Number(
    searchParams.get("count") || defaultQuestionCount,
  );
  const [questionCount, setQuestionCount] = useState<number>(() =>
    Number.isFinite(requestedCount) ? Math.max(1, requestedCount) : 10,
  );
  const practiceCountOptions = Array.from(
    new Set([
      Math.min(5, availableQuestionCount, maxQuestionsPerQuiz),
      10,
      15,
      20,
      30,
    ]),
  ).filter(
    (count) =>
      count > 0 &&
      count <= maxQuestionsPerQuiz &&
      count <= availableQuestionCount,
  );
  useEffect(() => {
    if (availableQuestionCount > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clamp live inventory changes
      setQuestionCount((current) =>
        Math.min(current, maxQuestionsPerQuiz, availableQuestionCount),
      );
    }
  }, [availableQuestionCount, maxQuestionsPerQuiz]);

  const previewStats = [
    ...(exam ? [{ icon: BookOpen, label: "Exam", value: exam }] : []),
    {
      icon: FileText,
      label: "Questions",
      value: availabilityQuery.isLoading
        ? "Checking…"
        : isUntimed
          ? String(questionCount)
          : String(timedQuestionCount),
    },
    ...(mode
      ? [
          {
            icon: Zap,
            label: "Mode",
            value: isUntimed ? "Practice Playground" : "Timed Simulation",
          },
        ]
      : []),
    ...(mode === "timed"
      ? [
          {
            icon: Clock3,
            label: "Time Limit",
            value: `${quizDurationMinutes} mins`,
          },
        ]
      : []),
    ...(year ? [{ icon: BookOpen, label: "Year", value: year }] : []),
    ...(subject
      ? [{ icon: ShieldCheck, label: "Subject", value: subject }]
      : []),
    ...(className
      ? [{ icon: GraduationCap, label: "Class", value: className }]
      : []),
    ...(topics
      ? [{ icon: Tags, label: "Topics", value: topics.split(",").join(", ") }]
      : []),
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
        `This ${path === "EXAM" ? "exam" : "practice session"} consists of ${timedQuestionCount} multiple-choice questions to be completed in ${quizDurationMinutes} minutes.`,
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
            {path === "EXAM" ? "Exam Preview" : "Practice Preview"}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {previewStats.map(({ icon: Icon, label, value }) => (
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
                {practiceCountOptions.map((count) => (
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

        {availabilityQuery.isLoading ? (
          <div className="bg-surface-subtle text-muted-foreground mt-5 rounded-2xl p-4 text-sm">
            Checking available published questions…
          </div>
        ) : null}
        {availabilityQuery.isError ||
        (!availabilityQuery.isLoading && availableQuestionCount === 0) ? (
          <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
            <p className="text-foreground text-sm font-semibold">
              No published questions are available for this selection yet.
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-5">
              Go back and choose another available subject, class, year, or
              topic. You will not be sent into an empty quiz.
            </p>
          </div>
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
            disabled={
              availabilityQuery.isLoading ||
              availabilityQuery.isError ||
              availableQuestionCount === 0
            }
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set(
                "count",
                String(isUntimed ? questionCount : timedQuestionCount),
              );
              if (!isUntimed)
                params.set("durationMinutes", String(quizDurationMinutes));
              clearCompletedQuiz();
              router.replace(`/quiz/active?${params.toString()}`);
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
