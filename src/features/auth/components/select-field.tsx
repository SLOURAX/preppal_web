import { ChevronDown, type LucideIcon } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className" | "id"
> {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export function SelectField({
  id,
  label,
  icon: Icon,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-foreground text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
          />
        ) : null}
        <select
          {...selectProps}
          className={cn(
            "border-border bg-surface/90 text-foreground hover:border-primary/35 focus:border-primary focus:ring-primary/10 h-11 w-full appearance-none rounded-xl border px-3 pr-10 text-sm transition-[border-color,box-shadow] outline-none focus:ring-4",
            Icon && "pl-10",
          )}
          id={id}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
