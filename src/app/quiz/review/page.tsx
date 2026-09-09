"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  RefreshCw,
  XCircle,
} from "lucide-react";
import {
  SaxDislikeBulk,
  SaxLikeBulk,
  SaxMessageQuestionBulk,
  SaxSend2Bulk,
} from "@meysam213/iconsax-react";
import { useRouter } from "next/navigation";
import {
  generateExamSimulation,
  QUIZ_QUESTIONS,
} from "@/features/quiz/mock-questions";
import { ConfirmationModal } from "@/components/ui";
import { useAuthStore } from "@/store";

export default function QuizReviewPage() {
  const router = useRouter();
  const latestAttempt = useAuthStore((state) => state.quizAttempts[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<"helpful" | "unhelpful" | null>(
    null,
  );
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const reviewQuestions = latestAttempt?.seed
    ? generateExamSimulation(latestAttempt.seed, latestAttempt.total)
    : QUIZ_QUESTIONS.slice(0, latestAttempt?.total ?? 40);
  const activeQuestion = reviewQuestions[activeIndex]!;
  const number = String(activeQuestion.id).padStart(2, "0");
  const { text, options, correctAnswer: correct, explanation } = activeQuestion;
  const selected = latestAttempt?.answers[activeQuestion.id];
  const isCorrect = selected === correct;
  const submitFollowUp = (): void => {
    const question = followUp.trim();
    if (!question) return;
    setConversation((messages) => [...messages, question]);
    setFollowUp("");
  };

  const generateFreshSimulation = (): void => {
    if (!latestAttempt) return;
    const params = new URLSearchParams({
      mode: "timed",
      path: latestAttempt.path ?? "exam",
      exam: latestAttempt.exam,
      subject: latestAttempt.subject,
      seed: String(Date.now()),
    });
    if (latestAttempt.year) params.set("year", latestAttempt.year);
    router.push(`/quiz/preview?${params.toString()}`);
  };

  return (
    <main className="bg-background min-h-screen">
      <header className="bg-surface/90 border-border sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => router.push("/quiz/results")}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold"
            type="button"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <span className="text-muted-foreground text-xs font-semibold">
            {latestAttempt
              ? `${latestAttempt.exam} ${latestAttempt.subject}`
              : "Quiz review"}
          </span>
          {latestAttempt ? (
            <button
              className="border-primary text-primary hover:bg-primary/10 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors"
              onClick={() => setShowSimulationModal(true)}
              type="button"
            >
              <RefreshCw className="size-3.5" /> New simulation
            </button>
          ) : null}
        </div>
      </header>
      <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-7">
          <h1 className="text-foreground mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Question review
          </h1>
          <p className="text-muted-foreground mt-1 text-[.8rem]">
            See your selection, the correct answer, and the reasoning behind
            each question.
          </p>
        </div>
        <section className="surface-card overflow-hidden">
          <div className="flex items-center gap-2 p-4 sm:p-5">
            <span
              className={`grid size-9 place-items-center rounded-xl ${isCorrect ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
              aria-label={
                isCorrect ? "Correct question" : "Question needs review"
              }
            >
              {isCorrect ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <XCircle className="size-5" />
              )}
            </span>
            <span className="text-muted-foreground text-sm font-bold tabular-nums">
              {number}/{reviewQuestions.length}
            </span>
            <div className="flex-1"></div>
            <span
              className={`text-xs font-semibold ${isCorrect ? "text-emerald-600" : selected ? "text-rose-600" : "text-muted-foreground"}`}
            >
              {selected ? (isCorrect ? "Correct" : "Wrong") : "Unanswered"}
            </span>
          </div>
          {!open ? (
            <div className="border-border/50 bg-surface-subtle/50 border-t px-4 py-5 sm:px-16">
              <div className="bg-surface mb-4 rounded-xl px-3 py-3 text-left">
                <p className="text-foreground text-xs leading-5 font-semibold">
                  {text}
                </p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Your response is compared with the verified answer below.
                </p>
              </div>
              <div className="space-y-2 text-left">
                {options.map((option, optionIndex) => {
                  const optionIsCorrect = option === correct;
                  const optionWasSelected = option === selected;
                  return (
                    <div
                      key={option}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[.8rem] ${optionIsCorrect ? "bg-emerald-500/10 font-semibold text-emerald-700" : optionWasSelected ? "bg-rose-500/10 font-semibold text-rose-700" : "bg-surface text-muted-foreground"}`}
                    >
                      <span className="grid size-6 shrink-0 place-items-center text-xs font-bold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="flex-1 text-[.75rem]">{option}</span>
                      {optionIsCorrect ? (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      ) : optionWasSelected ? (
                        <XCircle className="size-4 text-rose-600" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <button
                className="text-primary mt-3 inline-flex items-center gap-2 text-xs font-bold"
                onClick={() => setOpen(true)}
                type="button"
              >
                Show explanation <ChevronDown className="size-4" />
              </button>
            </div>
          ) : (
            <div className="bg-surface-subtle/50 border-border/50 animate-in fade-in slide-in-from-top-2 border-t px-4 pt-4 pb-5 duration-300 sm:px-16">
              <div className="bg-surface mb-4 rounded-xl px-3 py-3">
                <p className="text-foreground max-h-16 overflow-y-auto text-xs leading-5 font-semibold">
                  {text}
                </p>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Your response is compared with the verified answer below.
                </p>
              </div>
              <div className="space-y-2">
                {options.map((option, optionIndex) => {
                  const optionIsCorrect = option === correct;
                  const optionWasSelected = option === selected;
                  return (
                    <div
                      key={option}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[.8rem] ${optionIsCorrect ? "bg-emerald-500/10 font-semibold text-emerald-700" : optionWasSelected ? "bg-rose-500/10 font-semibold text-rose-700" : "bg-surface text-muted-foreground"}`}
                    >
                      <span className="grid size-6 shrink-0 place-items-center text-xs font-bold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="flex-1 text-[.75rem]">{option}</span>
                      {optionIsCorrect ? (
                        <CheckCircle2
                          className="size-4 text-emerald-600"
                          aria-label="Correct answer"
                        />
                      ) : optionWasSelected ? (
                        <XCircle
                          className="size-4 text-rose-600"
                          aria-label="Your incorrect answer"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <button
                className="text-primary mt-3 inline-flex items-center gap-2 text-xs font-bold"
                onClick={() => setOpen(false)}
                type="button"
              >
                Hide explanation <ChevronUp className="size-4" />
              </button>
              <div className="bg-primary/5 mt-4 rounded-xl px-3 py-3">
                <p className="text-primary text-[11px] font-bold tracking-wide uppercase">
                  Explanation
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {explanation}
                </p>
              </div>
              <div className="border-border/60 mt-5 border-t pt-4">
                <p className="text-foreground text-center text-sm font-semibold">
                  Was this explanation helpful?
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${feedback === "helpful" ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" : "border-border text-muted-foreground hover:border-emerald-500/50 hover:text-emerald-600"}`}
                    onClick={() => setFeedback("helpful")}
                    type="button"
                  >
                    <SaxLikeBulk
                      className={`size-4 ${feedback === "helpful" ? "animate-bounce" : ""}`}
                    />{" "}
                    Yes, it was
                  </button>
                  <button
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${feedback === "unhelpful" ? "border-rose-500 bg-rose-500/10 text-rose-600" : "border-border text-muted-foreground hover:border-rose-500/50 hover:text-rose-600"}`}
                    onClick={() => {
                      setFeedback("unhelpful");
                      setFollowUpOpen(true);
                    }}
                    type="button"
                  >
                    <SaxDislikeBulk className="size-4" /> No, it wasn't
                  </button>
                </div>
                {followUpOpen ? (
                  <div className="bg-primary/5 mt-4 rounded-2xl p-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/15 text-primary grid size-8 place-items-center rounded-lg">
                        <SaxMessageQuestionBulk className="size-4" />
                      </span>
                      <div>
                        <p className="text-foreground text-xs font-bold">
                          Ask a follow-up
                        </p>
                        <p className="text-muted-foreground text-[10px]">
                          Premium preview enabled for this demo.
                        </p>
                      </div>
                    </div>
                    {conversation.map((message) => (
                      <p
                        className="bg-surface text-foreground mt-3 rounded-xl px-3 py-2 text-xs"
                        key={message}
                      >
                        {message}
                      </p>
                    ))}
                    <form
                      className="bg-surface border-border/60 mt-3 flex items-center gap-2 rounded-xl border p-1.5"
                      onSubmit={(event) => {
                        event.preventDefault();
                        submitFollowUp();
                      }}
                    >
                      <input
                        className="text-foreground min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"
                        onChange={(event) => setFollowUp(event.target.value)}
                        placeholder="Ask about this question…"
                        value={followUp}
                      />
                      <button
                        aria-label="Send follow-up"
                        className="bg-primary text-primary-foreground grid size-8 shrink-0 place-items-center rounded-lg"
                        type="submit"
                      >
                        <SaxSend2Bulk className="size-3.5" />
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </section>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-xl border px-3 py-2 text-[.75rem] font-semibold disabled:opacity-40"
            disabled={activeIndex === 0}
            onClick={() => {
              setActiveIndex((value) => value - 1);
              setOpen(false);
            }}
            type="button"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>
          <button
            className="bg-primary text-primary-foreground flex items-center gap-1 rounded-xl px-3 py-2 text-[.75rem] font-semibold disabled:opacity-40"
            disabled={activeIndex === reviewQuestions.length - 1}
            onClick={() => {
              setActiveIndex((value) => value + 1);
              setOpen(false);
            }}
            type="button"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      {showSimulationModal ? (
        <ConfirmationModal
          cancelLabel="Cancel"
          confirmLabel="Continue"
          description="A fresh set of questions will follow the same exam pattern, subject, and difficulty so you can practise the areas you just reviewed."
          onCancel={() => router.push("/quiz/results")}
          onConfirm={generateFreshSimulation}
          title="Ready for another simulation?"
        />
      ) : null}
    </main>
  );
}
