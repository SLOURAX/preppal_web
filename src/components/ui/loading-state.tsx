"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

interface LoadingVisualProps {
  readonly title?: string;
  readonly description?: string;
  readonly compact?: boolean;
  readonly immersive?: boolean;
}

function LoadingVisual({
  title = "Preppal is getting things ready",
  description = "Friendly. Smart. Focused.",
  compact = false,
  immersive = false,
}: LoadingVisualProps) {
  const isLarge = immersive && !compact;
  return (
    <div
      className={
        compact
          ? "flex items-center gap-3"
          : "flex flex-col items-center text-center"
      }
      role="status"
      aria-live="polite"
    >
      <div
        className={
          compact
            ? "relative size-14 shrink-0"
            : isLarge
              ? "bg-primary/8 ring-primary/10 relative mx-auto size-36 rounded-full ring-1 sm:size-40"
              : "relative mx-auto size-32"
        }
      >
        {!isLarge ? (
          <>
            <div className="border-primary/15 absolute inset-0 rounded-full border-2" />
            <div className="border-t-primary absolute inset-1 rounded-full border-2 border-transparent border-r-violet-300 motion-safe:animate-spin" />
            <div className="bg-primary/10 absolute inset-3 rounded-full blur-md" />
          </>
        ) : (
          <div className="bg-primary/10 absolute inset-6 rounded-full blur-2xl" />
        )}
        <Image
          alt=""
          className={`relative z-10 object-contain ${isLarge ? "p-5 sm:p-6" : "p-3 motion-safe:animate-[mascot-float_3s_ease-in-out_infinite]"}`}
          fill
          loading="lazy"
          sizes={compact ? "56px" : isLarge ? "160px" : "128px"}
          src="/assets/mascots/thinking.png"
        />
      </div>
      <div className={compact ? "min-w-0" : isLarge ? "mt-5" : "mt-4"}>
        {title ? (
          <p
            className={`text-foreground font-semibold ${isLarge ? "text-md sm:text-xl" : "text-sm"}`}
          >
            {title}
          </p>
        ) : null}
        <p
          className={`text-muted-foreground ${title ? "mt-1" : ""} ${isLarge ? "text-sm" : "text-xs"}`}
        >
          {description}
        </p>
        {isLarge ? (
          <div
            aria-hidden="true"
            className="mt-5 flex items-center justify-center gap-2"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <span
                className={`size-2.5 rounded-full motion-safe:animate-pulse ${
                  index === 2
                    ? "bg-amber-400"
                    : index % 2 === 0
                      ? "bg-primary"
                      : "bg-violet-300"
                }`}
                key={index}
                style={{ animationDelay: `${index * 160}ms` }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function LoadingState(props: LoadingVisualProps) {
  return <LoadingVisual compact={!props.immersive} {...props} />;
}

export function LoadingModal({
  open,
  title = "Processing your request",
  description = "Please wait while we complete this securely.",
}: LoadingVisualProps & { readonly open: boolean }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const blockInteractionKeys = (event: KeyboardEvent) => {
      if (["Tab", "Escape", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", blockInteractionKeys, true);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", blockInteractionKeys, true);
      previousFocus?.focus();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[300] grid cursor-wait place-items-center bg-slate-950/35 p-5 backdrop-blur-md dark:bg-black/55"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div
        ref={dialogRef}
        aria-busy="true"
        aria-labelledby={titleId}
        aria-modal="true"
        className="border-border/70 bg-surface/95 w-full max-w-sm rounded-2xl border p-8 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-2xl outline-none sm:p-8 dark:shadow-black/40"
        role="alertdialog"
        tabIndex={-1}
      >
        <Info className="mx-auto h-10 w-10 text-primary mb-10" />
        <h2 className="text-foreground text-base font-semibold" id={titleId}>
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-1 max-w-[17rem] text-xs leading-5">
          {description}
        </p>
        <div
          aria-hidden="true"
          className="mt-6 flex items-center justify-center gap-2.5"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <span
              className={`size-2.5 rounded-full motion-safe:animate-bounce ${
                index === 2
                  ? "bg-amber-400"
                  : index % 2 === 0
                    ? "bg-primary"
                    : "bg-violet-300 dark:bg-violet-400"
              }`}
              key={index}
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
