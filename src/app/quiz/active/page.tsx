"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui";
import { QuizHeader } from "@/features/quiz/components/active/quiz-header";
import { QuestionCard } from "@/features/quiz/components/active/question-card";
import { NavControls } from "@/features/quiz/components/active/nav-controls";
import { QuizSidebar } from "@/features/quiz/components/active/quiz-sidebar";
import { InstructionsModal } from "@/features/quiz/components/active/instructions-modal";
import { SubmitModal } from "@/features/quiz/components/active/submit-modal";
import { QuestionAudioPlayer } from "@/features/quiz/components/active/question-audio-player";
import type { Question, QuestionStatus } from "@/features/quiz/components/active/types";

const TOTAL_SECONDS = 45 * 60;

const RAW_QUESTIONS = [
  {
    text: "In the diagram, PQR is a straight line. If (a + 12)° + (a + b)° + (3b + 12)° = 180°. Find 2b + a.",
    options: ["120°", "140°", "160°", "180°"] as const,
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

const QUESTIONS: Question[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  text: RAW_QUESTIONS[i % RAW_QUESTIONS.length]!.text,
  options: RAW_QUESTIONS[i % RAW_QUESTIONS.length]!.options,
}));

const GRID_BG =
  "linear-gradient(to right, rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.04) 1px, transparent 1px)";

export default function ActiveQuizPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentQ = QUESTIONS[currentIndex]!;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const unansweredCount = QUESTIONS.length - answeredCount;
  
  const textToRead = `Question ${currentIndex + 1}. ${currentQ.text}. Options: ${currentQ.options.map((opt, i) => `${String.fromCharCode(65 + i)}: ${opt}`).join('. ')}.`;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(QUESTIONS.length - 1, idx)));
  }, []);

  const getStatus = useCallback(
    (id: number): QuestionStatus => {
      if (flagged[id]) return "flagged";
      if (answers[id]) return "answered";
      return "unanswered";
    },
    [flagged, answers],
  );

  const handleSelectAnswer = useCallback(
    (answer: string) =>
      setAnswers((prev) => ({ ...prev, [currentQ.id]: answer })),
    [currentQ.id],
  );

  const handleToggleFlag = useCallback(
    () =>
      setFlagged((prev) => ({
        ...prev,
        [currentQ.id]: !prev[currentQ.id],
      })),
    [currentQ.id],
  );

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <QuizHeader
        currentIndex={currentIndex}
        total={QUESTIONS.length}
        secondsLeft={secondsLeft}
        onExit={() => router.push("/quiz/preview")}
        onSubmit={() => setShowSubmitModal(true)}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main
          className="flex min-w-0 flex-1 flex-col overflow-y-auto"
          style={{ backgroundImage: GRID_BG, backgroundSize: "40px 40px" }}
        >
          <div className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
            <QuestionCard
              question={currentQ}
              index={currentIndex}
              total={QUESTIONS.length}
              selectedAnswer={answers[currentQ.id]}
              isFlagged={!!flagged[currentQ.id]}
              onSelectAnswer={handleSelectAnswer}
              onToggleFlag={handleToggleFlag}
              onOpenInstructions={() => setShowInstructions(true)}
            />
            <NavControls
              currentIndex={currentIndex}
              total={QUESTIONS.length}
              questions={QUESTIONS}
              getStatus={getStatus}
              onNavigate={goTo}
            />
            
            <QuestionAudioPlayer 
              textToRead={textToRead} 
              questionId={currentQ.id} 
            />

            <div className="mt-6 sm:hidden">
              <Button
                onClick={() => setShowSubmitModal(true)}
                className="w-full gap-2"
              >
                <Send className="size-4" />
                Submit Exam
              </Button>
            </div>
          </div>
        </main>

        <QuizSidebar
          total={QUESTIONS.length}
          currentIndex={currentIndex}
          answeredCount={answeredCount}
          flaggedCount={flaggedCount}
          unansweredCount={unansweredCount}
          getStatus={getStatus}
          onSelectQuestion={goTo}
          onSubmit={() => setShowSubmitModal(true)}
        />
      </div>

      {showInstructions && (
        <InstructionsModal
          currentIndex={currentIndex}
          total={QUESTIONS.length}
          onClose={() => setShowInstructions(false)}
          onNavigate={goTo}
        />
      )}

      {showSubmitModal && (
        <SubmitModal
          answeredCount={answeredCount}
          flaggedCount={flaggedCount}
          unansweredCount={unansweredCount}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={() => router.push("/quiz/results")}
        />
      )}
    </div>
  );
}
