"use client";

import { AlertTriangle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui";

interface SubmitModalProps {
  readonly unansweredCount: number;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
}

export function SubmitModal({
  unansweredCount,
  onClose,
  onSubmit,
}: SubmitModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-surface relative z-10 w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl">
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-4 flex items-start gap-3 sm:mb-5">
            {/* <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500/10">
              <AlertTriangle className="size-5 text-amber-500" />
            </div> */}
            <div>
              <h2 className="text-foreground text-sm font-bold sm:text-base">Submit Exam?</h2>
              <p className="text-muted-foreground text-[.75rem] leading-relaxed">
                Once submitted, you cannot change your answers.
              </p>
            </div>
          </div>

          {/* <div className="bg-surface-subtle mb-5 grid grid-cols-3 gap-2 rounded-xl p-3 text-center">
            {stats.map(({ label, value, color }) => (
              <div key={label}>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">
                  {label}
                </p>
              </div>
            ))}
          </div> */}

          {unansweredCount > 0 && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
              <p className="text-xs leading-relaxed text-amber-700">
                {unansweredCount} question
                {unansweredCount > 1 ? "s are" : " is"} still unanswered.
                Consider reviewing before submitting.
              </p>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl border !border-rose-600 px-3 py-2.5 text-[.8rem] font-semibold text-rose-600 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Continue exam
            </button>
            <Button onClick={onSubmit} className="w-full gap-2">
              Submit Exam
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
