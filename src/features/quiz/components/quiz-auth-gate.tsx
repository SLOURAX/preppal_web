"use client";

import { LockKeyhole, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface QuizAuthGateProps {
  readonly selectionLabel: string;
  readonly returnTo: string;
  readonly onClose: () => void;
}

export function QuizAuthGate({
  selectionLabel,
  returnTo,
  onClose,
}: QuizAuthGateProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        aria-describedby="quiz-auth-description"
        aria-labelledby="quiz-auth-title"
        aria-modal="true"
        className="bg-surface relative w-full max-w-md rounded-3xl p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close sign-in prompt"
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-rose-500/10 text-rose-600 transition-colors hover:bg-rose-500/15"
          onClick={onClose}
          type="button"
        >
          <X className="size-4" />
        </button>

        <span className="bg-primary/10 text-primary grid size-12 place-items-center rounded-2xl">
          <LockKeyhole className="size-5" />
        </span>
        <h2
          className="text-foreground mt-2 text-xl font-bold"
          id="quiz-auth-title"
        >
          Sign in to continue
        </h2>
        <p
          className="text-muted-foreground mt-2 text-sm leading-relaxed"
          id="quiz-auth-description"
        >
          Your{" "}
          <span className="text-foreground font-semibold">
            {selectionLabel}
          </span>{" "}
          selection is saved. Sign in or create a learner account to continue
          setting up your practice session.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
          className="border-rose-600 text-rose-600 hover:bg-rose-500/5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-colors"
            href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
          >
            <X className="size-4" /> Cancel
          </Link>
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors"
            href={`/register?returnTo=${encodeURIComponent(returnTo)}`}
          >
            <UserPlus className="size-4" /> Create account
          </Link>
        </div>
      </section>
    </div>
  );
}
