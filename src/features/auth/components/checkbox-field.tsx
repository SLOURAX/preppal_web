import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CheckboxFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "type"
> {
  id: string;
  label: ReactNode;
  variant?: "inline" | "panel";
}

export function CheckboxField({
  id,
  label,
  variant = "inline",
  ...inputProps
}: CheckboxFieldProps) {
  return (
    <label
      className={cn(
        "text-foreground flex cursor-pointer items-start gap-2.5 text-sm font-medium",
        variant === "panel" &&
          "bg-surface-subtle/60 text-muted-foreground rounded-xl p-3 text-xs leading-5 font-normal",
      )}
      htmlFor={id}
    >
      <input
        {...inputProps}
        className="accent-primary mt-0.5 size-4 shrink-0"
        id={id}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}
