import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface FormFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id"
> {
  id: string;
  label: string;
  icon: LucideIcon;
  optional?: boolean;
  labelClassName?: string;
  trailing?: ReactNode;
}

export function FormField({
  id,
  label,
  icon: Icon,
  optional = false,
  labelClassName,
  trailing,
  type = "text",
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className={cn(
          "text-foreground flex items-center gap-1 text-sm font-medium",
          labelClassName,
        )}
        htmlFor={id}
      >
        {label}
        {optional ? (
          <span className="text-muted-foreground font-normal">(optional)</span>
        ) : null}
      </label>
      <div className="group relative">
        <Icon
          aria-hidden="true"
          className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 transition-colors"
        />
        <input
          {...inputProps}
          className={cn(
            "border-border bg-surface/90 text-foreground placeholder:text-muted-foreground/70 hover:border-primary/35 focus:border-primary focus:ring-primary/10 h-11 w-full rounded-xl border pr-4 pl-10 text-sm transition-[border-color,box-shadow,background-color] outline-none focus:ring-4",
            trailing && "pr-11",
          )}
          id={id}
          type={type}
        />
        {trailing}
      </div>
    </div>
  );
}
