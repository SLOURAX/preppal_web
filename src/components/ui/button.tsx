import type { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export function Button({
  className,
  loading = false,
  type = "button",
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      type={type}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary-strong focus-visible:outline-primary inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-[.8rem] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
      disabled={loading || disabled}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="mr-2 size-4 animate-spin" /> : null}
      {loading ? "Please wait…" : children}
    </button>
  );
}
