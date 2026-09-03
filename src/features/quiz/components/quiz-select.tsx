import { ListSelect } from "@/components/ui/list-select";
import type { LucideIcon } from "lucide-react";
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
  icon,
  label,
  options,
  placeholder,
  value,
  onChange,
}: QuizSelectProps) {
  return (
    <ListSelect
      id={id}
      icon={icon}
      label={label}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
