"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ListOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

interface ListSelectProps {
  readonly id?: string;
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly placeholder: string;
  readonly options: readonly ListOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export function ListSelect({
  id,
  label,
  icon: Icon,
  placeholder,
  options,
  value,
  onChange,
  className,
}: ListSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {label && (
        <label
          className="text-foreground mb-2 block text-sm font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border-border bg-surface text-foreground hover:border-primary/50 relative flex h-14 w-full items-center justify-between rounded-2xl border px-4 text-left text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/15",
          isOpen && "border-primary ring-4 ring-primary/15",
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && (
            <Icon
              className={cn(
                "size-5 shrink-0 transition-colors",
                value ? "text-primary" : "text-muted-foreground",
              )}
            />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : <span className="text-muted-foreground">{placeholder}</span>}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "text-muted-foreground size-5 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Modal / Dropdown */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute top-full left-0 z-50 mt-2 w-full origin-top rounded-2xl border border-border bg-surface-subtle p-2 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 px-3 pt-2">
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              {placeholder}
            </span>
          </div>
          <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:bg-surface hover:shadow-sm",
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold")}>{option.label}</p>
                    {option.description && (
                      <p
                        className={cn(
                          "mt-0.5 text-xs",
                          isSelected
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {option.description}
                      </p>
                    )}
                  </div>
                  {isSelected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
