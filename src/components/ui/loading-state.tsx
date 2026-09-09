import Image from "next/image";

interface LoadingVisualProps {
  readonly title?: string;
  readonly description?: string;
  readonly compact?: boolean;
}

function LoadingVisual({
  title = "Preppal is getting things ready",
  description = "Friendly. Smart. Focused.",
  compact = false,
}: LoadingVisualProps) {
  return (
    <div className={compact ? "flex items-center gap-3" : "text-center"} role="status" aria-live="polite">
      <div className={compact ? "relative size-14 shrink-0" : "relative mx-auto size-32"}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-violet-300 motion-safe:animate-spin" />
        <div className="absolute inset-3 rounded-full bg-primary/10 blur-md" />
        <Image
          alt=""
          className="relative z-10 object-contain p-3 motion-safe:animate-[mascot-float_3s_ease-in-out_infinite]"
          fill
          sizes={compact ? "56px" : "128px"}
          src="/owl-mascot.png"
        />
      </div>
      <div className={compact ? "min-w-0" : "mt-4"}>
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        {/* {!compact ? (
          <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
            {["Focus", "Scan", "Process", "Learn", "Done"].map((stage, index) => (
              <span
                className="text-muted-foreground motion-safe:animate-[loading-stage_2.4s_ease-in-out_infinite] text-[9px] font-medium"
                key={stage}
                style={{ animationDelay: `${index * 180}ms` }}
              >
                {stage}
              </span>
            ))}
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export function LoadingState(props: LoadingVisualProps) {
  return <LoadingVisual compact {...props} />;
}

export function LoadingModal({
  open,
  title,
  description,
}: LoadingVisualProps & { readonly open: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/35 p-5 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-xs rounded-3xl border border-white/60 p-7 shadow-2xl dark:border-white/10">
        <LoadingVisual title={title} description={description} />
      </div>
    </div>
  );
}
