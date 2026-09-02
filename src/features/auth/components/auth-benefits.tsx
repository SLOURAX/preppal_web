import { Check } from "lucide-react";

interface AuthBenefitsProps {
  items: readonly string[];
}

export function AuthBenefits({ items }: AuthBenefitsProps) {
  return (
    <ul
      className="mt-6 flex flex-wrap justify-center gap-2"
      aria-label="Member benefits"
    >
      {items.map((item: string) => (
        <li
          className="border-border/80 bg-surface/70 text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
          key={item}
        >
          <Check aria-hidden="true" className="text-success size-3.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}
