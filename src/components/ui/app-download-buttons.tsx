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
        className="flex items-center gap-2.5 rounded-xl bg-foreground px-4 py-2 text-background transition-transform hover:scale-105 active:scale-95"
      >
        <FaApple className="size-5" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-[7px] font-medium leading-none tracking-wider text-background/80">
            Download on the
          </span>
          <span className="text-[13px] font-bold leading-tight">App Store</span>
        </div>
      </a>

      <a
        href="#"
        className="flex items-center gap-2.5 rounded-xl bg-foreground px-4 py-2 text-background transition-transform hover:scale-105 active:scale-95"
      >
        <FaGooglePlay className="size-4" />
        <div className="flex flex-col items-start justify-center">
          <span className="text-[7px] font-medium leading-none tracking-wider text-background/80">
            GET IT ON
          </span>
          <span className="text-[13px] font-bold leading-tight">Google Play</span>
        </div>
      </a>
    </div>
  );
}
