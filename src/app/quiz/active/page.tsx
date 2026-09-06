"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
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
import { ConfirmationModal } from "@/components/ui";
import type { QuestionStatus } from "@/features/quiz/components/active/types";
import { QUIZ_QUESTIONS } from "@/features/quiz/mock-questions";
import { useAuthStore } from "@/store";

const TOTAL_SECONDS = 45 * 60;

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
  const recordQuizAttempt = useAuthStore((state) => state.recordQuizAttempt);
  const mode = searchParams.get("mode") || "timed";
  const isUntimed = mode === "untimed";
  const parsedCount = Number(searchParams.get("count") || 40);
  const questionCount = isUntimed
    ? Math.max(5, Math.min(30, Number.isFinite(parsedCount) ? parsedCount : 10))
    : 40;
  const questions = QUIZ_QUESTIONS.slice(0, questionCount);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHints, setAiHints] = useState<Record<number, string>>({});
  const [aiConversation, setAiConversation] = useState<
    Record<number, string[]>
  >({});
  const [aiInput, setAiInput] = useState<string>("");
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<
    Record<number, "correct" | "incorrect">
  >({});

  const currentQ = questions[Math.min(currentIndex, questions.length - 1)]!;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;
  const correctCount = Object.values(feedback).filter(
    (value) => value === "correct",
  ).length;

  const textToRead = `Question ${currentIndex + 1}. ${currentQ.text}. Options: ${currentQ.options.map((opt, i) => `${String.fromCharCode(65 + i)}: ${opt}`).join(". ")}.`;

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

  const requestAiHint = () => {
    if (aiHints[currentQ.id]) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiHints((prev) => ({
        ...prev,
        [currentQ.id]: `Here's a hint for question ${currentQ.id}: Try isolating the variable step by step, or remember the key formula for this topic. Notice how the options are structured.`,
      }));
      setIsAiLoading(false);
    }, 1500);
  };

  const askAiFollowUp = (): void => {
    const question = aiInput.trim();
    if (!question || isAiLoading) return;
    setAiInput("");
    setAiConversation((prev) => ({
      ...prev,
      [currentQ.id]: [
        ...(prev[currentQ.id] ?? []),
        `You: ${question}`,
        "Preppal AI: Good question. Break the problem into smaller steps and compare your working with each answer option. I can help you reason through the next step.",
      ],
    }));
  };

  const confirmExit = (): void => {
    router.push(isUntimed ? "/quiz" : "/quiz/preview");
  };

  const submitQuiz = (): void => {
    const correct = questions.filter(
      (question) => answers[question.id] === question.correctAnswer,
    ).length;
    recordQuizAttempt({
      id: `attempt-${Date.now()}`,
      subject: searchParams.get("subject") || "Mathematics",
      exam: searchParams.get("exam") || "JAMB",
      mode: isUntimed ? "untimed" : "timed",
      score: questions.length
        ? Math.round((correct / questions.length) * 100)
        : 0,
      total: questions.length,
      correct,
      date: new Date().toISOString(),
      durationSeconds: TOTAL_SECONDS - secondsLeft,
      answers,
    });
    router.push("/quiz/results");
  };

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <QuizHeader
        currentIndex={currentIndex}
        total={questions.length}
        secondsLeft={isUntimed ? undefined : secondsLeft}
        onExit={() => setShowExitModal(true)}
        isUntimed={isUntimed}
        correctCount={correctCount}
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

            {isUntimed && showAiPanel && (
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
                    disabled={isAiLoading}
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
                      if (event.key === "Enter") askAiFollowUp();
                    }}
                    placeholder="Ask a follow-up question..."
                    value={aiInput}
                  />
                  <button
                    aria-label="Send question to AI"
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-400 text-white shadow-lg shadow-violet-950/30 disabled:opacity-50"
                    disabled={!aiInput.trim()}
                    onClick={askAiFollowUp}
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
              {isUntimed && !showAiPanel ? (
                <button
                  aria-label="Ask Preppal AI"
                  className="bg-surface text-primary border-primary/30 shadow-primary/10 mb-0 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[.8rem] font-semibold whitespace-nowrap shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
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
        <InstructionsModal
          currentIndex={currentIndex}
          total={questions.length}
          onNavigate={goTo}
          onClose={() => setShowInstructions(false)}
        />
      )}

      {showSubmitModal && !isUntimed && (
        <SubmitModal
          answeredCount={answeredCount}
          flaggedCount={flaggedCount}
          unansweredCount={unansweredCount}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={submitQuiz}
        />
      )}

      {showExitModal ? (
        <ConfirmationModal
          title={isUntimed ? "Exit playground?" : "Leave quiz?"}
          description={
            isUntimed
              ? "Your current playground progress will be cleared if you leave."
              : "Your quiz progress may be lost if you leave before submitting."
          }
          confirmLabel={isUntimed ? "Exit playground" : "Leave quiz"}
          destructive
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
