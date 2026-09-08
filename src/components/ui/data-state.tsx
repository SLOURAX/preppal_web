import type { ReactNode } from "react";
import { AlertCircle, Inbox } from "lucide-react";
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
      className="bg-surface-subtle/55 border-border/70 flex flex-col items-center rounded-2xl border border-dashed px-5 py-10 text-center"
      role={isError ? "alert" : undefined}
    >
      <span
        className={`grid size-11 place-items-center rounded-2xl ${isError ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"}`}
      >
        {icon ??
          (isError ? (
            <AlertCircle className="size-5" />
          ) : (
            <Inbox className="size-5" />
          ))}
      </span>
      {!isError ? <Mascot mood="encourage" size="sm" className="mt-3" /> : null}
      <p className="text-foreground mt-4 text-sm font-semibold">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-5">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
