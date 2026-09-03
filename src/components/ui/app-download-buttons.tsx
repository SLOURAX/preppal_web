"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface AppDownloadButtonsProps {
  readonly className?: string;
}

export function AppDownloadButtons({ className }: AppDownloadButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href="#"
        className="bg-foreground text-background flex items-center gap-2.5 rounded-xl px-4 py-2 transition-transform hover:scale-105 active:scale-95"
      >
        <FaApple className="size-5" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-background/80 text-[7px] leading-none font-medium tracking-wider">
            Download on the
          </span>
          <span className="text-[13px] leading-tight font-bold">App Store</span>
        </div>
      </a>

      <a
        href="#"
        className="bg-foreground text-background flex items-center gap-2.5 rounded-xl px-4 py-2 transition-transform hover:scale-105 active:scale-95"
      >
        <FaGooglePlay className="size-4" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-background/80 text-[7px] leading-none font-medium tracking-wider">
            GET IT ON
          </span>
          <span className="text-[13px] leading-tight font-bold">
            Google Play
          </span>
        </div>
      </a>
    </div>
  );
}
