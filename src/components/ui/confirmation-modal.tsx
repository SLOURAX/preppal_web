"use client";

import Image from "next/image";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

interface ConfirmationModalProps {
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly destructive?: boolean;
  readonly loading?: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

export function ConfirmationModal({
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loading, onCancel]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        aria-label="Close confirmation"
        className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
        onClick={() => {
          if (!loading) onCancel();
        }}
        type="button"
      />
      <div
        aria-labelledby="confirmation-title"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm rounded-3xl border border-white/70 bg-white/90 p-5 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl"
        role="dialog"
      >
        <div className="bg-primary/10 mx-auto mb-3 grid size-24 place-items-center rounded-full">
          <Image
            alt={
              destructive
                ? "Preppal mascot looking concerned"
                : "Preppal mascot asking you to confirm"
            }
            className="size-20 object-contain"
            height={80}
            src={
              destructive
                ? "/assets/mascots/error.png"
                : "/assets/mascots/thinking.png"
            }
            width={80}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div>
            <h2
              className="text-foreground text-sm font-bold sm:text-base"
              id="confirmation-title"
            >
              {title}
            </h2>
            <p className="text-muted-foreground mx-auto mt-1 max-w-[18rem] text-xs leading-5">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 sm:mt-5">
          <button
            className="flex-1 rounded-xl border !border-rose-600 px-2.5 py-2 text-xs font-semibold text-rose-600 transition-colors sm:px-3 sm:py-2.5 sm:text-[.8rem]"
            disabled={loading}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className={`flex flex-1 items-center justify-center rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors disabled:opacity-60 sm:px-3 sm:py-2.5 sm:text-[.8rem] ${destructive ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-primary text-primary-foreground hover:bg-primary-strong"}`}
            disabled={loading}
            onClick={onConfirm}
            type="button"
          >
            {loading ? (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            ) : null}
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
