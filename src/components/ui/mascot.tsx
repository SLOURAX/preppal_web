import Image from "next/image";
import { cn } from "@/lib/utils";

type MascotMood = "wave" | "encourage" | "celebrate" | "thinking";

interface MascotProps {
  readonly mood?: MascotMood;
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
  readonly alt?: string;
}

const moodLabels: Record<MascotMood, string> = {
  wave: "Preppal mascot waving hello",
  encourage: "Preppal mascot encouraging you",
  celebrate: "Preppal mascot celebrating your progress",
  thinking: "Preppal mascot thinking",
};

const sizeClasses = {
  sm: "size-14",
  md: "size-20",
  lg: "size-28",
} as const;

/** A single swap-friendly mascot primitive for empty, progress, and success moments. */
export function Mascot({
  mood = "wave",
  size = "md",
  className,
  alt,
}: MascotProps) {
  return (
    <div
      aria-hidden={alt ? undefined : true}
      className={cn(
        "relative shrink-0 motion-safe:animate-[mascot-float_5s_ease-in-out_infinite]",
        sizeClasses[size],
        mood === "celebrate" && "motion-safe:animate-[mascot-bounce_1.8s_ease-in-out_infinite]",
        className,
      )}
      data-mascot-mood={mood}
    >
      <Image
        alt={alt ?? moodLabels[mood]}
        className="object-contain drop-shadow-sm"
        fill
        sizes="112px"
        src="/owl-mascot.png"
      />
    </div>
  );
}
