"use client";

import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import Image from "next/image";

type FeedbackKind = "error" | "success" | "info";
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
    error: "/assets/mascots/error.png",
    info: "/assets/mascots/thinking.png",
  } as const;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center bg-slate-950/35 p-5 backdrop-blur-sm"
      role="presentation"
    >
      <div
        aria-labelledby="feedback-title"
        aria-modal="true"
        className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl"
        role="dialog"
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 grid size-28 place-items-center rounded-full">
            <Image
              alt={`${feedback.kind} Preppal mascot`}
              className="size-20 object-contain"
              height={80}
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
          Cancel
        </button>
      </div>
    </div>
  );
}
