import { ChevronDown, type LucideIcon } from "lucide-react";

import type { QuizChoice } from "../quiz.constants";

interface QuizSelectProps {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly options: readonly QuizChoice[];
  readonly placeholder: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function QuizSelect({
  id,
  icon: Icon,
  label,
  options,
  placeholder,
  value,
  onChange,
}: QuizSelectProps) {
  return (
    <div>
      <label className="text-foreground text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="text-primary pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        <select
          className="border-border bg-surface text-foreground focus:border-primary focus:ring-primary/15 h-14 w-full appearance-none rounded-2xl border pr-12 pl-12 text-sm font-medium transition outline-none focus:ring-4"
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" />
      </div>
    </div>
  );
}
