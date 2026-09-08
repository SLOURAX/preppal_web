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
  readonly showOptionDescriptions?: boolean;
  readonly compact?: boolean;
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
  showOptionDescriptions = true,
  compact = false,
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
          className={cn(
            "text-foreground block font-semibold",
            compact ? "mb-1 text-[11px]" : "mb-2 text-sm",
          )}
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
          "border-border bg-surface text-foreground hover:border-primary/50 focus:ring-primary/15 relative flex w-full items-center justify-between border text-left font-medium transition-all focus:ring-4 focus:outline-none",
          compact
            ? "h-10 rounded-xl px-3 text-xs"
            : "h-14 rounded-2xl px-4 text-sm",
          isOpen && "border-primary ring-primary/15 ring-4",
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
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
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
        <div className="animate-in fade-in zoom-in-95 border-border bg-surface absolute top-full left-0 z-50 mt-2 w-full origin-top rounded-2xl border p-2 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 px-3 pt-2">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
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
                    "flex w-full items-center justify-between rounded-none border-b px-3 py-3 text-left transition-all last:border-b-0",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "border-border/70 text-foreground hover:border-primary/40 hover:bg-surface-subtle",
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold")}>
                      {option.label}
                    </p>
                    {showOptionDescriptions && option.description && (
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
