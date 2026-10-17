"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";
import { AI_LIMIT_EVENT } from "@/lib/api/client";

type FeedbackKind = "error" | "success" | "info" | "reward";
type Feedback = { kind: FeedbackKind; title: string; message: string };
type FeedbackContextValue = {
  showFeedback: (feedback: Feedback) => void;
  closeFeedback: () => void;
};
const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context)
    throw new Error("useFeedback must be used inside FeedbackProvider");
  return context;
}

export function FeedbackProvider({ children }: PropsWithChildren) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const lastAiLimit = useRef<{ message: string; shownAt: number } | null>(null);
  useEffect(() => {
    const notifyAiLimit = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      const message =
        detail?.message ||
        "You have reached your AI allowance for today. Your access will reset automatically.";
      const now = Date.now();
      if (
        lastAiLimit.current?.message === message &&
        now - lastAiLimit.current.shownAt < 2_000
      )
        return;
      lastAiLimit.current = { message, shownAt: now };
      setFeedback({
        kind: "info",
        title: "Daily AI limit reached",
        message: `${message}. You can continue using the rest of Preppal, or upgrade your plan for a higher allowance.`,
      });
    };
    window.addEventListener(AI_LIMIT_EVENT, notifyAiLimit);
    return () => window.removeEventListener(AI_LIMIT_EVENT, notifyAiLimit);
  }, []);
  return (
    <FeedbackContext.Provider
      value={{
        showFeedback: setFeedback,
        closeFeedback: () => setFeedback(null),
      }}
    >
      {children}
      {feedback ? (
        <FeedbackDialog feedback={feedback} onClose={() => setFeedback(null)} />
      ) : null}
    </FeedbackContext.Provider>
  );
}

function FeedbackDialog({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  const mascotByKind = {
    success: "/assets/mascots/success.png",
    reward: "/assets/mascots/excited.png",
    error: "/assets/mascots/error.png",
    info: "/assets/mascots/thinking.png",
  } as const;
  const isReward = feedback.kind === "reward";

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-slate-950/35 p-5 backdrop-blur-sm"
      role="presentation"
    >
      <div
        aria-labelledby="feedback-title"
        aria-modal="true"
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl"
        role="dialog"
      >
        <button
          aria-label="Close modal"
          className="text-muted-foreground hover:bg-surface-subtle hover:text-foreground absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full border border-slate-200/80 bg-white/85 shadow-sm transition-colors"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
        {isReward ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {[
              "top-5 left-7 text-amber-400",
              "top-12 right-8 text-primary",
              "top-28 left-5 text-emerald-400",
              "top-32 right-5 text-rose-400",
            ].map((className, index) => (
              <Sparkles
                className={`absolute size-4 animate-pulse ${className}`}
                key={className}
                style={{ animationDelay: `${index * 180}ms` }}
              />
            ))}
          </div>
        ) : null}
        <div className="flex flex-col items-center text-center">
          <div
            className={`grid size-28 place-items-center rounded-full ${isReward ? "bg-gradient-to-br from-amber-100 via-violet-100 to-emerald-100 ring-8 ring-primary/5" : "bg-primary/10"}`}
          >
            <Image
              alt={`${feedback.kind} Preppal mascot`}
              className="size-20 object-contain"
              height={80}
              loading="lazy"
              src={mascotByKind[feedback.kind]}
              width={80}
            />
          </div>
          <div className="mt-1 min-w-0">
            <h2
              className="text-foreground text-base font-bold"
              id="feedback-title"
            >
              {feedback.title}
            </h2>
            <p className="text-muted-foreground mx-auto mt-1 max-w-[18rem] text-xs leading-4">
              {feedback.message}
            </p>
          </div>
        </div>
        <button
          className="bg-primary text-primary-foreground mt-6 h-11 w-full rounded-xl text-[.8rem] font-semibold"
          onClick={onClose}
          type="button"
        >
          {isReward ? "Continue" : "Close"}
        </button>
      </div>
    </div>
  );
}
