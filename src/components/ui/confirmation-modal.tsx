"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly destructive?: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

export function ConfirmationModal({
  title,
  description,
  confirmLabel = "Continue",
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        aria-label="Close confirmation"
        className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
        onClick={onCancel}
        type="button"
      />
      <div
        aria-labelledby="confirmation-title"
        aria-modal="true"
        className="bg-surface relative z-10 w-full max-w-sm rounded-2xl p-5 shadow-2xl"
        role="dialog"
      >
        <div className="flex items-start gap-3">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${destructive ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}
          >
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <h2
              className="text-foreground text-base font-bold"
              id="confirmation-title"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-5">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button
            className="border-border text-muted-foreground hover:text-foreground flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${destructive ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-primary text-primary-foreground hover:bg-primary-strong"}`}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
