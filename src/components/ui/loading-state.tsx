import Image from "next/image";

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
              ? "bg-primary/8 ring-primary/10 relative mx-auto size-44 rounded-full ring-1 sm:size-52"
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
          sizes={compact ? "56px" : isLarge ? "208px" : "128px"}
          src="/assets/mascots/thinking.png"
        />
      </div>
      <div className={compact ? "min-w-0" : isLarge ? "mt-5" : "mt-4"}>
        <p
          className={`text-foreground font-semibold ${isLarge ? "text-lg sm:text-xl" : "text-sm"}`}
        >
          {title}
        </p>
        <p
          className={`text-muted-foreground mt-1 ${isLarge ? "text-sm" : "text-xs"}`}
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
