"use client";

import Link from "next/link";
import { Bot, CheckCircle2, Lightbulb, LoaderCircle, Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import {
  answerPracticeQuestion,
  askPracticeQuestion,
  generatePracticeQuestion,
  generatePublicPracticeQuestion,
  getPracticeHint,
  type AiPracticeQuestion,
} from "@/features/ai/tutor-api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

const LOADING_QUESTION: AiPracticeQuestion = {
  id: "loading",
  subject: "Preppal AI",
  topic: null,
  question: "Preparing a fresh AI question…",
  options: [],
  expiresAt: "",
};

export function AiQuizSection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [question, setQuestion] = useState(LOADING_QUESTION);
  const [publicAnswer, setPublicAnswer] = useState<{
    correctOptionId: string;
    explanation: string;
    hint: string;
  } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{
    isCorrect: boolean | null;
    correctOptionId: string;
    feedback: string;
    explanation: string;
  } | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [followUp, setFollowUp] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [busy, setBusy] = useState<
    "generate" | "answer" | "hint" | "ask" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setSelected(null);
    setResult(null);
    setHint(null);
    setFollowUp("");
    setAnswer(null);
    setError(null);
  }, []);
  const newQuestion = useCallback(async () => {
    setBusy("generate");
    setError(null);
    try {
      if (isAuthenticated) {
        setQuestion(
          await generatePracticeQuestion({
            subject: "Biology",
          }),
        );
        setPublicAnswer(null);
      } else {
        const generated = await generatePublicPracticeQuestion();
        setQuestion({
          id: "public",
          subject: "General knowledge",
          topic: null,
          question: generated.question,
          options: generated.options,
          expiresAt: generated.generatedAt,
        });
        setPublicAnswer(generated);
      }
      resetState();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "A new question could not be generated.",
      );
    } finally {
      setBusy(null);
    }
  }, [isAuthenticated, resetState]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- begin async question load
    void newQuestion();
    const timer = window.setInterval(() => void newQuestion(), 3 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [isAuthenticated, newQuestion]);

  const checkAnswer = async (selectedOptionId?: string) => {
    const choice = selectedOptionId ?? selected ?? undefined;
    if (question.id === "public" && publicAnswer) {
      setResult({
        isCorrect: choice ? choice === publicAnswer.correctOptionId : null,
        correctOptionId: publicAnswer.correctOptionId,
        feedback: choice
          ? choice === publicAnswer.correctOptionId
            ? "Correct — well done."
            : "Not quite. The correct option is highlighted."
          : "The correct option is highlighted.",
        explanation: publicAnswer.explanation,
      });
      return;
    }
    setBusy("answer");
    setError(null);
    try {
      setResult(await answerPracticeQuestion(question.id, choice));
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Your answer could not be checked.",
      );
    } finally {
      setBusy(null);
    }
  };
  const requestHint = async () => {
    if (question.id === "public" && publicAnswer) {
      setHint(publicAnswer.hint);
      return;
    }
    setBusy("hint");
    setError(null);
    try {
      setHint((await getPracticeHint(question.id)).hint);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "A hint could not be loaded.",
      );
    } finally {
      setBusy(null);
    }
  };
  const ask = async () => {
    const message = followUp.trim();
    if (!message || question.id === "public" || question.id === "loading")
      return;
    setBusy("ask");
    setError(null);
    try {
      setAnswer((await askPracticeQuestion(question.id, message)).answer);
      setFollowUp("");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Preppal AI could not answer right now.",
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="mt-5 grid items-start gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <h2 className="text-foreground mt-4 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
          Get help at the moment <br />
          you need it.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg text-[.8rem] leading-5">
          Generate fresh practice questions, check your answer, request a hint,
          and ask follow-up questions with Preppal AI.
        </p>
        <ul className="text-muted-foreground mt-6 space-y-3 text-[.8rem]">
          {[
            "Clear feedback for every answer",
            "Helpful hints without giving the answer away",
            "Fresh curriculum-aligned practice questions",
          ].map((benefit) => (
            <li className="flex items-center gap-2" key={benefit}>
              <CheckCircle2 className="text-success size-4 shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <div className="surface-card border-primary/20 from-surface via-surface to-primary/5 relative overflow-hidden bg-gradient-to-br p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-primary text-[.8rem] font-extrabold">
              {question.subject}
              {question.topic ? ` · ${question.topic}` : ""}
            </p>
            <h3 className="text-foreground mt-2 text-[1rem] font-medium">
              {question.question}
            </h3>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {question.options.map((option) => {
            const chosen = selected === option.id;
            const correct = result?.correctOptionId === option.id;
            const wrong = Boolean(result && chosen && !result.isCorrect);
            return (
              <button
                aria-pressed={chosen}
                className={cn(
                  "border-border hover:border-primary/50 rounded-xl border px-4 py-3 text-left text-[.85rem] font-medium transition-colors",
                  chosen &&
                    !result &&
                    "border-primary bg-primary/10 text-primary",
                  correct &&
                    "border-emerald-500 bg-emerald-500/10 text-emerald-700",
                  wrong && "border-rose-500 bg-rose-500/10 text-rose-700",
                )}
                disabled={Boolean(result)}
                key={option.id}
                onClick={() => {
                  setSelected(option.id);
                  void checkAnswer(option.id);
                }}
                type="button"
              >
                <span className="text-muted-foreground mr-2 text-[10px] font-bold">
                  {option.id}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
        {hint && <Feedback title="Hint" text={hint} icon={Lightbulb} />}
        {result && (
          <Feedback
            title={
              result.isCorrect === null
                ? "Correct answer"
                : result.isCorrect
                  ? "Correct — well done"
                  : "Let’s learn from this one"
            }
            text={`${result.feedback} ${result.explanation}`}
            icon={result.isCorrect ? CheckCircle2 : Bot}
          />
        )}
        {answer && <Feedback title="Preppal AI" text={answer} icon={Bot} />}
        {error && (
          <p className="mt-4 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-700">
            {error}
          </p>
        )}
        {isAuthenticated && question.id !== "loading" && (
          <div className="mt-4 flex gap-2">
            <input
              aria-label="Ask a follow-up question"
              className="border-border bg-surface text-foreground min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-xs outline-none"
              onChange={(event) => setFollowUp(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void ask();
              }}
              placeholder="Ask why, or request another explanation…"
              value={followUp}
            />
            <button
              aria-label="Send to Preppal AI"
              className="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-xl disabled:opacity-50"
              disabled={!followUp.trim() || busy !== null}
              onClick={() => void ask()}
              type="button"
            >
              <Send className="size-4" />
            </button>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {!isAuthenticated ? (
            <>
              <Button
                disabled={Boolean(result)}
                onClick={() => void checkAnswer()}
                className="gap-1"
              >
                <Bot className="size-4" /> Check answer
              </Button>
              <Link
                className="text-primary inline-flex min-h-10 items-center justify-center px-2 text-[.75rem] font-semibold"
                href="/login"
              >
                Sign in to ask follow-up questions
              </Link>
            </>
          ) : (
            <>
              <Button
                disabled={Boolean(result) || busy !== null}
                onClick={() => void checkAnswer()}
                className="gap-3"
              >
                {busy === "answer" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Bot className="size-4" />
                )}{" "}
                Check answer
              </Button>
              <Button
                className="bg-surface-subtle text-foreground hover:bg-border"
                disabled={Boolean(hint) || busy !== null}
                onClick={() => void requestHint()}
              >
                <Lightbulb className="size-4" /> Get hint
              </Button>
              <span className="text-muted-foreground inline-flex items-center text-[10px] font-medium">
                A new question appears every 3 minutes
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Feedback({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: typeof Bot;
}) {
  return (
    <div className="bg-surface-subtle mt-4 rounded-2xl p-4">
      <p className="text-foreground flex items-center gap-2 text-sm font-semibold">
        <Icon className="text-primary size-4" />
        {title}
      </p>
      <p className="text-muted-foreground mt-2 text-xs leading-5">{text}</p>
    </div>
  );
}
