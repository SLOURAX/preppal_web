import { Check, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SetupProgressItem {
  readonly label: string;
  readonly icon: LucideIcon;
}

interface QuizSetupProgressProps {
  readonly activeIndex: number;
  readonly items: readonly SetupProgressItem[];
}

export function QuizSetupProgress({
  activeIndex,
  items,
}: QuizSetupProgressProps) {
  return (
    <ol
      aria-label="Quiz setup progress"
      className="mx-auto flex max-w-xl items-center justify-center gap-2"
    >
      {items.map(({ label, icon: Icon }, index) => {
        const isComplete = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <li className="flex min-w-0 items-center gap-2" key={label}>
            <span
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                (isActive || isComplete) &&
                  "bg-primary text-primary-foreground",
                !isActive &&
                  !isComplete &&
                  "bg-surface-subtle text-muted-foreground",
              )}
            >
              {isComplete ? (
                <Check className="size-4" />
              ) : (
                <Icon className="size-4" />
              )}
            </span>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {index < items.length - 1 ? (
              <span
                className={cn(
                  "mx-1 h-px w-5 sm:w-10",
                  isComplete ? "bg-primary/60" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
