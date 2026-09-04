"use client";

import { Calculator, Delete, X } from "lucide-react";
import { useState } from "react";

interface QuickCalculatorProps {
  readonly onClose: () => void;
}

type Operator = "+" | "−" | "×" | "÷";

const KEYS = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "−",
  "0",
  ".",
  "C",
  "+",
] as const;

export function QuickCalculator({ onClose }: QuickCalculatorProps) {
  const [display, setDisplay] = useState<string>("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [resetDisplay, setResetDisplay] = useState<boolean>(false);

  const calculate = (next: number): number => {
    if (stored === null || operator === null) return next;
    if (operator === "+") return stored + next;
    if (operator === "−") return stored - next;
    if (operator === "×") return stored * next;
    return next === 0 ? 0 : stored / next;
  };

  const handleKey = (key: string): void => {
    if (/\d/.test(key) || key === ".") {
      if (resetDisplay) {
        setDisplay(key === "." ? "0." : key);
        setResetDisplay(false);
      } else if (key !== "." || !display.includes(".")) {
        setDisplay(display === "0" && key !== "." ? key : `${display}${key}`);
      }
      return;
    }
    if (key === "C") {
      setDisplay("0");
      setStored(null);
      setOperator(null);
      setResetDisplay(false);
      return;
    }
    if (["+", "−", "×", "÷"].includes(key)) {
      setStored(Number(display));
      setOperator(key as Operator);
      setResetDisplay(true);
      return;
    }
    const result = calculate(Number(display));
    setDisplay(
      Number.isFinite(result) ? String(Number(result.toFixed(8))) : "0",
    );
    setStored(null);
    setOperator(null);
    setResetDisplay(true);
  };

  return (
    <div className="bg-surface border-border absolute bottom-full left-0 z-50 mb-3 w-64 rounded-2xl border p-3 shadow-2xl sm:w-72">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-lg">
            <Calculator className="size-4" />
          </span>
          <div>
            <p className="text-foreground text-sm font-bold">
              Quick calculator
            </p>
            <p className="text-muted-foreground text-[10px]">
              For working things out
            </p>
          </div>
        </div>
        <button
          aria-label="Close calculator"
          className="text-muted-foreground hover:bg-surface-subtle rounded-lg p-1.5"
          onClick={onClose}
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="bg-surface-subtle text-foreground mb-3 flex h-12 items-center justify-end overflow-hidden rounded-xl px-3 text-2xl font-bold tabular-nums">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {KEYS.map((key) => (
          <button
            className={`h-10 rounded-lg text-sm font-semibold transition-colors ${["+", "−", "×", "÷"].includes(key) ? "bg-primary/10 text-primary hover:bg-primary/20" : key === "C" ? "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20" : "bg-surface-subtle text-foreground hover:bg-primary/10"}`}
            key={key}
            onClick={() => handleKey(key)}
            type="button"
          >
            {key}
          </button>
        ))}
        <button
          aria-label="Backspace"
          className="bg-surface-subtle text-muted-foreground hover:bg-primary/10 col-span-2 flex h-10 items-center justify-center rounded-lg"
          onClick={() =>
            setDisplay(display.length > 1 ? display.slice(0, -1) : "0")
          }
          type="button"
        >
          <Delete className="size-4" />
        </button>
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/90 col-span-2 h-10 rounded-lg text-sm font-bold"
          onClick={() => handleKey("=")}
          type="button"
        >
          =
        </button>
      </div>
    </div>
  );
}
