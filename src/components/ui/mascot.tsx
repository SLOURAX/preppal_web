import Image from "next/image";
import { cn } from "@/lib/utils";

type MascotMood =
  "wave" | "encourage" | "celebrate" | "thinking" | "disappointed" | "proud";

interface MascotProps {
  readonly mood?: MascotMood;
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
  readonly alt?: string;
  readonly animated?: boolean;
}

const moodLabels: Record<MascotMood, string> = {
  wave: "Preppal mascot waving hello",
  encourage: "Preppal mascot encouraging you",
  celebrate: "Preppal mascot celebrating your progress",
  thinking: "Preppal mascot thinking",
  disappointed: "Preppal mascot disappointed",
  proud: "Preppal mascot proud of your progress",
};

const moodSources: Record<MascotMood, string> = {
  wave: "/assets/mascots/encouraging.png",
  encourage: "/assets/mascots/encouraging.png",
  celebrate: "/assets/mascots/excited.png",
  thinking: "/assets/mascots/thinking.png",
  disappointed: "/assets/mascots/error.png",
  proud: "/assets/mascots/proud.png",
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
  animated = true,
}: MascotProps) {
  return (
    <div
      aria-hidden={alt ? undefined : true}
      className={cn(
        "relative shrink-0",
        animated &&
          "motion-safe:animate-[mascot-float_5s_ease-in-out_infinite]",
        sizeClasses[size],
        animated &&
          mood === "celebrate" &&
          "motion-safe:animate-[mascot-bounce_1.8s_ease-in-out_infinite]",
        className,
      )}
      data-mascot-mood={mood}
    >
      <Image
        alt={alt ?? moodLabels[mood]}
        className={cn(
          "object-contain drop-shadow-sm",
          animated &&
            "motion-safe:animate-[mascot-breathe_2.8s_ease-in-out_infinite]",
        )}
        fill
        sizes="112px"
        src={moodSources[mood]}
      />
    </div>
  );
}
