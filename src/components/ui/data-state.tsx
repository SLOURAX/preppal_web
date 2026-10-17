import type { ReactNode } from "react";
import { Mascot } from "./mascot";

interface DataStateProps {
  readonly title: string;
  readonly description: string;
  readonly action?: ReactNode;
  readonly icon?: ReactNode;
  readonly tone?: "empty" | "error";
}

export function DataState({
  title,
  description,
  action,
  icon,
  tone = "empty",
}: DataStateProps) {
  const isError = tone === "error";
  return (
    <div
      className="bg-surface-subtle/55 border-border/70 flex flex-col items-center rounded-2xl border border-dashed px-5 py-5 text-center"
      role={isError ? "alert" : undefined}
    >
      {icon ? <span className="mb-2">{icon}</span> : null}
      {!isError ? (
        <Mascot
          mood="disappointed"
          size="lg"
          className="mt-3"
          animated={false}
        />
      ) : null}
      <p className="text-foreground mt-1 text-[1rem] font-semibold">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-sm text-[.85rem] leading-5">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
