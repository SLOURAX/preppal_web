"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Lightbulb, Send, RobotArm, X } from "lucide-react";
import {
  SaxMessageQuestionBulk,
  SaxCalculatorBold,
} from "@meysam213/iconsax-react";

import { QuizHeader } from "@/features/quiz/components/active/quiz-header";
import { QuestionCard } from "@/features/quiz/components/active/question-card";
import { NavControls } from "@/features/quiz/components/active/nav-controls";
import { QuizSidebar } from "@/features/quiz/components/active/quiz-sidebar";
import { InstructionsModal } from "@/features/quiz/components/active/instructions-modal";
import { SubmitModal } from "@/features/quiz/components/active/submit-modal";
import { QuestionAudioPlayer } from "@/features/quiz/components/active/question-audio-player";
import { QuickCalculator } from "@/features/quiz/components/active/quick-calculator";
import { ConfirmationModal, LoadingModal, useFeedback } from "@/components/ui";
import type { QuestionStatus } from "@/features/quiz/components/active/types";
import type { QuizQuestion } from "@/features/quiz/mock-questions";
import {
  hasCompletedQuiz,
  markQuizCompleted,
} from "@/features/quiz/quiz-session-navigation";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";

const DEFAULT_TOTAL_SECONDS = 30 * 60;

interface ApiQuizQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly passage?: string | null;
  readonly explanation?: string;
  readonly correctAnswer: string;
  readonly options: readonly {
    readonly text: string;
    readonly position: number;
  }[];
}

type ActiveQuizQuestion = QuizQuestion & { readonly sourceQuestionId: string };

interface AiAllowance {
  readonly requestLimit: number;
  readonly requestsUsed: number;
  readonly requestsRemaining: number;
  readonly tokenLimit: number;
  readonly tokensUsed: number;
  readonly tokensRemaining: number;
  readonly resetsAt: string;
}

/*
  {
    text: "In the diagram, PQR is a straight line. If (a + 12)° + (a + b)° + (3b + 12)° = 180°. Find 2b + a.",
    options: ["68°", "78°", "88°", "98°"] as const,
  },
  {
    text: "Which of the following is a factor of the polynomial x³ − 3x² + 2x?",
    options: ["(x − 3)", "(x − 2)", "(x + 1)", "(x + 2)"] as const,
  },
  {
    text: "A train travels 300 km in 2 hours. What is its average speed in km/h?",
    options: ["100 km/h", "120 km/h", "150 km/h", "180 km/h"] as const,
  },
  {
    text: "Evaluate log₂ 64.",
    options: ["4", "5", "6", "8"] as const,
  },
  {
    text: "If the sum of the interior angles of a polygon is 1260°, how many sides does the polygon have?",
    options: ["7", "8", "9", "10"] as const,
  },
  {
    text: "A circle has a circumference of 44 cm. Find its radius. (Take π = 22/7)",
    options: ["6 cm", "7 cm", "8 cm", "14 cm"] as const,
  },
  {
    text: "Simplify: (3x² − 5x + 2) ÷ (x − 1)",
    options: ["3x − 2", "3x + 2", "x − 2", "3x − 1"] as const,
  },
  {
    text: "If P = {2, 3, 5, 7} and Q = {1, 3, 5, 9}, find P ∩ Q.",
    options: ["{3, 5}", "{2, 3}", "{1, 7}", "{3, 7}"] as const,
  },
  {
    text: "What is the value of sin 30° + cos 60°?",
    options: ["0", "½", "1", "√3/2"] as const,
  },
  {
    text: "A rectangular field is 80 m long and 60 m wide. Find the length of a diagonal.",
    options: ["90 m", "100 m", "110 m", "120 m"] as const,
  },
] satisfies Array<{ text: string; options: readonly string[] }>;

const CORRECT_ANSWERS = [
  "78°",
  "(x − 2)",
  "150 km/h",
  "6",
  "9",
  "7 cm",
  "3x − 2",
  "{3, 5}",
  "1",
  "100 m",
] as const;

const ALL_QUESTIONS: (Question & { readonly correctAnswer: string })[] =
  Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    text: RAW_QUESTIONS[i % RAW_QUESTIONS.length]!.text,
    options: RAW_QUESTIONS[i % RAW_QUESTIONS.length]!.options,
    correctAnswer: CORRECT_ANSWERS[i % CORRECT_ANSWERS.length]!,
  })); */

const QUIZ_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(124,58,237,0.14)' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 22h16v20H15zM15 22l8-4 8 4M15 42l8-4 8 4'/%3E%3Cpath d='M102 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z'/%3E%3Cpath d='M61 15h15M68 8v15'/%3E%3Ccircle cx='106' cy='52' r='8'/%3E%3Cpath d='M103 51a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3v.5'/%3E%3Cpath d='M22 76h18m-9-9v18'/%3E%3Cpath d='M75 67h17v14H75zM75 67l8-5 9 5'/%3E%3Ccircle cx='27' cy='115' r='8'/%3E%3Cpath d='M24 115a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3v.5'/%3E%3Cpath d='M105 99l3 3 7-8M101 107h17'/%3E%3Cpath d='M55 112c5-6 12-6 17 0'/%3E%3Cpath d='M67 91h14m-7-7v14'/%3E%3C/g%3E%3C/svg%3E\")";

function ActiveQuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showFeedback } = useFeedback();
  const recordQuizAttempt = useAuthStore((state) => state.recordQuizAttempt);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const maxQuestionsPerQuiz = useAuthStore(
    (state) => state.membership?.entitlements?.maxQuestionsPerQuiz ?? 20,
  );
  const setLevelProgress = useAuthStore((state) => state.setLevelProgress);
  const mode = searchParams.get("mode") || "timed";
  const isUntimed = mode === "untimed";
  const parsedDurationMinutes = Number(
    searchParams.get("durationMinutes") || DEFAULT_TOTAL_SECONDS / 60,
  );
  const totalSeconds =
    Math.max(
      1,
      Number.isFinite(parsedDurationMinutes) ? parsedDurationMinutes : 30,
    ) * 60;
  const parsedCount = Number(searchParams.get("count") || 40);
  const requestedQuestionCount = isUntimed
    ? Math.max(5, Math.min(30, Number.isFinite(parsedCount) ? parsedCount : 10))
    : Math.max(1, Number.isFinite(parsedCount) ? parsedCount : 20);
  const questionCount = Math.min(requestedQuestionCount, maxQuestionsPerQuiz);
  const rawSimulationSeed = Number(searchParams.get("seed") || 0);
  const simulationSeed = Number.isFinite(rawSimulationSeed)
    ? Math.abs(Math.trunc(rawSimulationSeed)) % 2_147_483_647
    : 0;
  const path = searchParams.get("path") === "subject" ? "STANDALONE" : "EXAM";
  const selectedSubjectId = searchParams.get("subject") ?? "";
  const yearLink = searchParams.get("yearLink") ?? "";
  const topicIds = searchParams.get("topicIds") ?? "";
  const examName = searchParams.get("examName") ?? "";
  const subjectName = searchParams.get("subjectName") ?? "";
  const year = searchParams.get("year") ?? "";
  const [activeAccessChecked, setActiveAccessChecked] = useState(false);

  useEffect(() => {
    const protectCompletedQuiz = () => {
      if (hasCompletedQuiz()) {
        router.replace("/quiz/results");
        return;
      }
      setActiveAccessChecked(true);
    };

    protectCompletedQuiz();
    window.addEventListener("pageshow", protectCompletedQuiz);
    return () => window.removeEventListener("pageshow", protectCompletedQuiz);
  }, [router]);

  const questionQuery = useQuery({
    queryKey: [
      "quiz",
      "questions",
      path,
      selectedSubjectId,
      yearLink,
      topicIds,
      questionCount,
    ],
    enabled:
      activeAccessChecked &&
      Boolean(selectedSubjectId) &&
      (path === "STANDALONE" || Boolean(yearLink)),
    queryFn: async () => {
      const params = new URLSearchParams({
        path,
        count: String(questionCount),
      });
      if (path === "EXAM") params.set("examSubjectId", selectedSubjectId);
      else params.set("subjectId", selectedSubjectId);
      if (yearLink) params.set("examSubjectYearId", yearLink);
      if (topicIds) params.set("topicIds", topicIds);
      const result = await apiClient<ApiQuizQuestion[]>(
        `/api/v1/question-bank/quiz-questions?${params}`,
      );
      return result.map<ActiveQuizQuestion>((question, index) => ({
        id: index + 1,
        sourceQuestionId: question.id,
        text: question.prompt,
        passage: question.passage ?? undefined,
        options: [...question.options]
          .sort((a, b) => a.position - b.position)
          .map((option) => option.text),
        correctAnswer: question.correctAnswer,
        explanation: question.explanation ?? "",
      }));
    },
  });
  const questions = useMemo(
    () => questionQuery.data ?? [],
    [questionQuery.data],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [clientAttemptId] = useState(() => `attempt-${crypto.randomUUID()}`);
  const [startedAt] = useState(() => new Date().toISOString());
  const [startedAtMs] = useState(() => Date.now());
  const [aiHints, setAiHints] = useState<Record<number, string>>({});
  const [aiConversation, setAiConversation] = useState<
    Record<number, string[]>
  >({});
  const [aiInput, setAiInput] = useState<string>("");
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);
  const [quizSessionId, setQuizSessionId] = useState<string | null>(null);
  const [quizSessionError, setQuizSessionError] = useState<string | null>(null);
  const [aiAllowance, setAiAllowance] = useState<AiAllowance | null>(null);
  const [feedback, setFeedback] = useState<
    Record<number, "correct" | "incorrect">
  >({});

  const currentQ = useMemo(
    () =>
      questions[Math.min(currentIndex, questions.length - 1)] ?? {
        id: 0,
        sourceQuestionId: "",
        text: "",
        options: [],
        correctAnswer: "",
        explanation: "",
      },
    [currentIndex, questions],
  );
  const textToRead = `Question ${currentIndex + 1}. ${currentQ.text.replace(/<[^>]*>/g, " ")}. Options: ${currentQ.options.map((option, index) => `${String.fromCharCode(65 + index)}: ${option.replace(/<[^>]*>/g, " ")}`).join(". ")}.`;

  useEffect(() => {
    if (!isAuthenticated || !questions.length || quizSessionId) return;
    let cancelled = false;
    const startSession = async () => {
      try {
        const [session, allowance] = await Promise.all([
          apiClient<{ id: string; status: string }>(
            "/api/v1/learning/quiz-sessions/start",
            {
              method: "POST",
              body: JSON.stringify({
                clientAttemptId,
                examType: examName || "Standalone practice",
                subject: subjectName || "Standalone subject",
                mode: isUntimed ? "untimed" : "timed",
                path:
                  searchParams.get("path") === "subject" ? "subject" : "exam",
                year: year || undefined,
                simulationSeed: simulationSeed || undefined,
                startedAt,
                questionIds: questions.map(
                  (question) => question.sourceQuestionId,
                ),
              }),
            },
          ),
          apiClient<AiAllowance>("/api/v1/ai/tutor/quiz/allowance"),
        ]);
        if (!cancelled) {
          setQuizSessionId(session.id);
          setAiAllowance(allowance);
          setQuizSessionError(null);
        }
      } catch (error) {
        if (!cancelled)
          setQuizSessionError(
            error instanceof Error
              ? error.message
              : "The quiz session could not be started.",
          );
      }
    };
    void startSession();
    return () => {
      cancelled = true;
    };
  }, [
    clientAttemptId,
    isAuthenticated,
    isUntimed,
    questions,
    quizSessionId,
    searchParams,
    simulationSeed,
    examName,
    subjectName,
    year,
    startedAt,
  ]);
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;
  const correctCount = Object.values(feedback).filter(
    (value) => value === "correct",
  ).length;
  const hasAiAllowance =
    !aiAllowance ||
    (aiAllowance.requestsRemaining > 0 && aiAllowance.tokensRemaining > 0);

  useEffect(() => {
    if (isUntimed || secondsLeft <= 0) return;
    const timer = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [secondsLeft, isUntimed]);

  const goTo = (idx: number): void => {
    setCurrentIndex(Math.max(0, Math.min(questions.length - 1, idx)));
  };

  const getStatus = useCallback(
    (id: number): QuestionStatus => {
      if (flagged[id]) return "flagged";
      if (answers[id]) return "answered";
      return "unanswered";
    },
    [flagged, answers],
  );

  const playAnswerTone = (isCorrect: boolean): void => {
    if (typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = isCorrect ? 660 : 220;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + (isCorrect ? 0.24 : 0.3),
    );
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.32);
    window.setTimeout(() => void context.close(), 450);
  };

  const handleSelectAnswer = useCallback(
    (answer: string) => {
      if (isUntimed && answers[currentQ.id]) return;
      setAnswers((prev) => ({ ...prev, [currentQ.id]: answer }));
      if (isUntimed) {
        const isCorrect = answer === currentQ.correctAnswer;
        setFeedback((prev) => ({
          ...prev,
          [currentQ.id]: isCorrect ? "correct" : "incorrect",
        }));
        playAnswerTone(isCorrect);
      }
    },
    [answers, currentQ, isUntimed],
  );

  const handleToggleFlag = (): void => {
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const requestAiHint = async () => {
    if (aiHints[currentQ.id] || !quizSessionId) return;
    setIsAiLoading(true);
    try {
      const result = await apiClient<{
        hint: string;
        allowance: AiAllowance;
      }>("/api/v1/ai/tutor/quiz/hint", {
        method: "POST",
        body: JSON.stringify({
          sessionId: quizSessionId,
          questionId: currentQ.sourceQuestionId,
          selectedAnswer: answers[currentQ.id] || undefined,
        }),
      });
      setAiHints((prev) => ({
        ...prev,
        [currentQ.id]: result.hint,
      }));
      setAiAllowance(result.allowance);
    } catch (error) {
      showFeedback({
        kind: "error",
        title: "Hint could not load",
        message:
          error instanceof Error
            ? error.message
            : "Please check your connection and try again.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const askAiFollowUp = async (): Promise<void> => {
    const question = aiInput.trim();
    if (!question || isAiLoading || !quizSessionId) return;
    setAiInput("");
    setAiConversation((prev) => ({
      ...prev,
      [currentQ.id]: [...(prev[currentQ.id] ?? []), `You: ${question}`],
    }));
    setIsAiLoading(true);
    try {
      const result = await apiClient<{
        answer: string;
        allowance: AiAllowance;
      }>("/api/v1/ai/tutor/quiz/ask", {
        method: "POST",
        body: JSON.stringify({
          sessionId: quizSessionId,
          questionId: currentQ.sourceQuestionId,
          selectedAnswer: answers[currentQ.id] || undefined,
          message: question,
        }),
      });
      setAiConversation((prev) => ({
        ...prev,
        [currentQ.id]: [
          ...(prev[currentQ.id] ?? []),
          `Preppal AI: ${result.answer}`,
        ],
      }));
      setAiAllowance(result.allowance);
    } catch (error) {
      showFeedback({
        kind: "error",
        title: "Preppal AI could not answer",
        message:
          error instanceof Error
            ? error.message
            : "Please check your connection and try again.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const confirmExit = (): void => {
    if (isUntimed) {
      void submitQuiz();
      return;
    }
    router.replace(`/quiz/preview?${searchParams.toString()}`);
  };

  const submitQuiz = async (): Promise<void> => {
    if (isSubmittingQuiz) return;
    const correct = questions.filter(
      (question) => answers[question.id] === question.correctAnswer,
    ).length;
    const completedAt = new Date().toISOString();
    const score = questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0;
    const durationSeconds = isUntimed
      ? Math.max(0, Math.round((Date.now() - startedAtMs) / 1000))
      : totalSeconds - secondsLeft;
    const attempt = {
      id: clientAttemptId,
      subject: subjectName || "Standalone subject",
      exam: examName || "Standalone practice",
      mode: (isUntimed ? "untimed" : "timed") as "timed" | "untimed",
      path: (searchParams.get("path") === "subject" ? "subject" : "exam") as
        "exam" | "subject",
      year: year || undefined,
      score,
      total: questions.length,
      correct,
      date: completedAt,
      durationSeconds,
      answers,
      seed: simulationSeed || undefined,
      context: {
        examId: searchParams.get("exam") || undefined,
        subjectId: selectedSubjectId || undefined,
        examName: examName || undefined,
        subjectName: subjectName || undefined,
        yearLink: yearLink || undefined,
        classId: searchParams.get("class") || undefined,
        className: searchParams.get("className") || undefined,
        topicIds: topicIds || undefined,
        topics: searchParams.get("topics") || undefined,
      },
      questions,
    };

    if (!isAuthenticated) {
      recordQuizAttempt(attempt);
      markQuizCompleted();
      router.replace("/quiz/results");
      return;
    }

    setIsSubmittingQuiz(true);
    try {
      const result = await apiClient<{
        id: string;
        completedAt: string;
        xpAwarded: number;
        progress: Parameters<typeof setLevelProgress>[0] | null;
      }>("/api/v1/learning/quiz-sessions", {
        method: "POST",
        body: JSON.stringify({
          clientAttemptId,
          examType: attempt.exam,
          subject: attempt.subject,
          mode: attempt.mode,
          path: attempt.path,
          year: attempt.year,
          simulationSeed: attempt.seed,
          totalQuestions: attempt.total,
          correctAnswers: attempt.correct,
          scorePercent: attempt.score,
          durationSeconds: attempt.durationSeconds,
          startedAt,
          answers,
          context: attempt.context,
        }),
      });
      if (result.progress) setLevelProgress(result.progress);
      recordQuizAttempt({
        ...attempt,
        id: result.id,
        date: result.completedAt ?? completedAt,
        xpAwarded: result.xpAwarded,
      });
      if (result.xpAwarded > 0) {
        showFeedback({
          kind: "reward",
          title: "Quiz reward earned!",
          message: `You earned ${result.xpAwarded.toLocaleString()} XP for completing this quiz. Keep practising to earn more.`,
        });
      }
      markQuizCompleted();
      router.replace("/quiz/results");
    } catch (error) {
      showFeedback({
        kind: "error",
        title: "Quiz could not be saved",
        message:
          error instanceof Error
            ? error.message
            : "Please check your connection and submit again.",
      });
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  if (!activeAccessChecked || questionQuery.isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <LoadingModal
          description="Loading the published questions for your selected practice setup."
          open
          title="Preparing your quiz"
        />
      </div>
    );
  }

  if (questionQuery.error || !questions.length) {
    return (
      <main className="bg-background grid min-h-screen place-items-center px-5">
        <section className="surface-card max-w-md p-7 text-center">
          <h1 className="text-foreground text-lg font-bold">
            No published questions yet
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {questionQuery.error?.message ??
              "No published questions are available for this practice selection yet."}
          </p>
          <button
            className="bg-primary text-primary-foreground mt-5 h-10 rounded-xl px-5 text-sm font-semibold"
            onClick={() => router.push("/quiz")}
            type="button"
          >
            Choose another quiz
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <QuizHeader
        currentIndex={currentIndex}
        total={questions.length}
        secondsLeft={isUntimed ? undefined : secondsLeft}
        onExit={() => setShowExitModal(true)}
        isUntimed={isUntimed}
        correctCount={correctCount}
        examName={path === "EXAM" ? examName || undefined : undefined}
        subjectName={subjectName || undefined}
        year={path === "EXAM" ? year || undefined : undefined}
        onSubmit={() =>
          isUntimed ? setShowExitModal(true) : setShowSubmitModal(true)
        }
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main
          className="flex min-w-0 flex-1 flex-col overflow-y-auto"
          style={{
            backgroundImage: QUIZ_PATTERN_BG,
            backgroundSize: "80px 80px",
          }}
        >
          <div className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
            <div className="relative">
              <QuestionCard
                question={currentQ}
                index={currentIndex}
                total={questions.length}
                selectedAnswer={answers[currentQ.id]}
                isFlagged={!!flagged[currentQ.id]}
                onSelectAnswer={handleSelectAnswer}
                onToggleFlag={handleToggleFlag}
                onOpenInstructions={() => setShowInstructions(true)}
                isPracticeMode={isUntimed}
                feedback={feedback[currentQ.id]}
                correctAnswer={currentQ.correctAnswer}
              />
            </div>

            <NavControls
              currentIndex={currentIndex}
              total={questions.length}
              questions={questions}
              getStatus={getStatus}
              onNavigate={goTo}
            />

            {showAiPanel && (
              <div
                className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-violet-300/30 bg-[#3a2b68] p-4 text-white shadow-[0_16px_36px_rgb(76_45_180/0.24)] sm:right-[max(1.5rem,calc((100vw-640px)/2))] sm:bottom-6 sm:p-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 85% 10%, rgba(196,181,253,.16), transparent 38%), url(\"data:image/svg+xml,%3Csvg width='44' height='32' viewBox='0 0 44 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16L11 5l11 11L33 5l11 11' fill='none' stroke='rgba(221,214,254,.07)' stroke-width='1'/%3E%3C/svg%3E\")",
                  backgroundSize: "auto, 44px 32px",
                }}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-violet-400/20 p-1.5">
                      <RobotArm className="size-5 text-violet-200" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Preppal AI
                      </h3>
                      <p className="text-[11px] text-violet-200/75">
                        Ask, clarify, and keep learning
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label="Close Preppal AI"
                    className="rounded-lg p-1 text-violet-100/70 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={() => setShowAiPanel(false)}
                    type="button"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {aiAllowance ? (
                  <div className="mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-violet-100/75">
                    <span>Today&apos;s plan allowance</span>
                    <span className="font-semibold text-white">
                      {aiAllowance.requestsRemaining} of{" "}
                      {aiAllowance.requestLimit} requests left
                    </span>
                  </div>
                ) : null}
                {aiAllowance && !hasAiAllowance ? (
                  <p className="mb-3 rounded-lg bg-amber-300/15 px-3 py-2 text-[11px] leading-4 text-amber-100">
                    You have reached today&apos;s AI allowance for your plan. It
                    resets tomorrow, or you can upgrade for a larger allowance.
                  </p>
                ) : null}
                {quizSessionError ? (
                  <p className="mb-3 rounded-lg bg-rose-400/15 px-3 py-2 text-[11px] leading-4 text-rose-100">
                    {quizSessionError}
                  </p>
                ) : null}

                {aiHints[currentQ.id] || aiConversation[currentQ.id]?.length ? (
                  <div className="mb-3 max-h-40 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5">
                    {aiHints[currentQ.id] ? (
                      <p className="text-violet-100">{aiHints[currentQ.id]}</p>
                    ) : null}
                    {aiConversation[currentQ.id]?.map((message, index) => (
                      <p
                        className={
                          message.startsWith("You:")
                            ? "text-violet-200"
                            : "text-violet-100/75"
                        }
                        key={`${message}-${index}`}
                      >
                        {message}
                      </p>
                    ))}
                  </div>
                ) : null}
                {!aiHints[currentQ.id] ? (
                  <button
                    type="button"
                    className="mx-auto mt-3 mb-3 flex h-9 w-[60%] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/90 text-sm font-semibold text-violet-900 transition-colors hover:bg-white"
                    onClick={requestAiHint}
                    disabled={isAiLoading || !quizSessionId || !hasAiAllowance}
                  >
                    <Lightbulb className="size-4" />
                    {isAiLoading ? "Thinking..." : "Get a hint"}
                  </button>
                ) : null}
                <div className="flex items-center gap-2">
                  <input
                    aria-label="Ask Preppal AI a question"
                    className="min-w-0 flex-1 rounded-xl bg-white/10 px-3 py-2.5 text-xs text-white ring-1 ring-white/15 outline-none placeholder:text-violet-200/60 focus:ring-violet-300"
                    onChange={(event) => setAiInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") void askAiFollowUp();
                    }}
                    placeholder="Ask a follow-up question..."
                    value={aiInput}
                  />
                  <button
                    aria-label="Send question to AI"
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-400 text-white shadow-lg shadow-violet-950/30 disabled:opacity-50"
                    disabled={
                      !aiInput.trim() ||
                      isAiLoading ||
                      !quizSessionId ||
                      !hasAiAllowance
                    }
                    onClick={() => void askAiFollowUp()}
                    type="button"
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="min-w-0 flex-1">
                <QuestionAudioPlayer
                  textToRead={textToRead}
                  questionId={currentQ.id}
                />
              </div>
              {!showAiPanel && isAuthenticated ? (
                <button
                  aria-label="Ask Preppal AI"
                  className="bg-surface text-primary border-primary/30 shadow-primary/10 mb-0 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[.8rem] font-semibold whitespace-nowrap shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
                  disabled={!quizSessionId}
                  onClick={() => setShowAiPanel(true)}
                  type="button"
                >
                  <SaxMessageQuestionBulk className="size-5 shrink-0" />
                  Ask Preppal AI
                </button>
              ) : null}
            </div>
          </div>
        </main>

        <QuizSidebar
          total={questions.length}
          currentIndex={currentIndex}
          answeredCount={answeredCount}
          flaggedCount={flaggedCount}
          unansweredCount={unansweredCount}
          getStatus={getStatus}
          onSelectQuestion={goTo}
          isUntimed={isUntimed}
          onSubmit={() =>
            isUntimed ? setShowExitModal(true) : setShowSubmitModal(true)
          }
        />
      </div>

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      <LoadingModal
        description="Scanning the question and preparing a useful hint."
        open={isAiLoading}
        title="Preppal is thinking"
      />

      <LoadingModal
        description="Saving your result and updating your XP securely."
        open={isSubmittingQuiz}
        title="Completing your quiz"
      />

      {showSubmitModal && !isUntimed && (
        <SubmitModal
          unansweredCount={unansweredCount}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={submitQuiz}
        />
      )}

      {showExitModal ? (
        <ConfirmationModal
          title={isUntimed ? "Finish playground?" : "Leave quiz?"}
          description={
            isUntimed
              ? "You’re ready to see a quick overview of your playground performance."
              : "Your quiz progress may be lost if you leave before submitting."
          }
          confirmLabel={isUntimed ? "View results" : "Leave quiz"}
          destructive={!isUntimed}
          onCancel={() => setShowExitModal(false)}
          onConfirm={confirmExit}
        />
      ) : null}

      <div className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6">
        {showCalculator ? (
          <QuickCalculator onClose={() => setShowCalculator(false)} />
        ) : null}
        <button
          aria-label={showCalculator ? "Close calculator" : "Open calculator"}
          className="bg-primary text-primary border-primary/20 grid size-12 place-items-center rounded-xl border shadow-lg transition-transform hover:-translate-y-0.5"
          onClick={() => setShowCalculator((current) => !current)}
          type="button"
        >
          <SaxCalculatorBold className="size-7" color="white" />
        </button>
      </div>
    </div>
  );
}

export default function ActiveQuizPage() {
  return (
    <Suspense fallback={<div className="bg-background h-screen" />}>
      <ActiveQuizContent />
    </Suspense>
  );
}
