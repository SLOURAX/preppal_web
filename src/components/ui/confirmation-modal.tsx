"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly destructive?: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

export function ConfirmationModal({
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
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
        <div className="flex flex-col items-start justify-center gap-3">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${destructive ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}
          >
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <h2
              className="text-foreground text-sm font-bold sm:text-base"
              id="confirmation-title"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mt-1 text-[.75rem] leading-5">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-5">
          <button
            className="flex-1 rounded-xl border !border-rose-600 px-2.5 py-2 text-xs font-semibold text-rose-600 transition-colors sm:px-3 sm:py-2.5 sm:text-[.8rem]"
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className={`flex-1 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors sm:px-3 sm:py-2.5 sm:text-[.8rem] ${destructive ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-primary text-primary-foreground hover:bg-primary-strong"}`}
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
