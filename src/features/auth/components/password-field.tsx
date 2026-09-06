"use client";

import { Eye, EyeOff, LockKeyhole, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { FormField, type FormFieldProps } from "./form-field";

type PasswordFieldProps = Omit<FormFieldProps, "icon" | "trailing" | "type"> & {
  /** Optional leading icon to distinguish password contexts. */
  icon?: LucideIcon;
};

export function PasswordField({
  icon: Icon = LockKeyhole,
  ...props
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <FormField
      {...props}
      icon={Icon}
      type={isVisible ? "text" : "password"}
      trailing={
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="text-muted-foreground hover:bg-surface-subtle hover:text-foreground focus-visible:outline-primary absolute top-1/2 right-2.5 grid size-8 -translate-y-1/2 place-items-center rounded-lg transition-colors focus-visible:outline-2"
          onClick={() => setIsVisible((current: boolean) => !current)}
          type="button"
        >
          {isVisible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      }
    />
  );
}
