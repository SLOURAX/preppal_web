"use client";

import { AlertTriangle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui";

interface SubmitModalProps {
  readonly answeredCount: number;
  readonly flaggedCount: number;
  readonly unansweredCount: number;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
}

export function SubmitModal({
  answeredCount,
  flaggedCount,
  unansweredCount,
  onClose,
  onSubmit,
}: SubmitModalProps) {
  const stats = [
    { label: "Answered", value: answeredCount, color: "text-primary" },
    { label: "Flagged", value: flaggedCount, color: "text-amber-500" },
    { label: "Unanswered", value: unansweredCount, color: "text-red-500" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-surface relative z-10 w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl">
        <div className="px-6 py-6">
          <div className="mb-5 flex items-start gap-3">
            {/* <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500/10">
              <AlertTriangle className="size-5 text-amber-500" />
            </div> */}
            <div>
              <h2 className="text-foreground font-bold">Submit Exam?</h2>
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
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
              <p className="text-xs leading-relaxed text-amber-600">
                {unansweredCount} question
                {unansweredCount > 1 ? "s are" : " is"} still unanswered.
                Consider reviewing before submitting.
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={onClose}
              className="border-border text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-[.8rem] font-medium transition-colors"
            >
              <ArrowLeft className="size-4" />
              Continue exam
            </button>
            <Button onClick={onSubmit} className="w-full gap-2">
              <Send className="size-4" />
              Submit Exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
