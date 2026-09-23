"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdFormat = "auto" | "horizontal" | "rectangle";
interface AdSlotProps {
  readonly slotId: string;
  readonly format?: AdFormat;
  readonly placement?: "center" | "top-right";
  readonly className?: string;
}
const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const minHeights: Record<AdFormat, string> = {
  auto: "min-h-[90px]",
  horizontal: "min-h-[100px]",
  rectangle: "min-h-[250px]",
};

export function AdSlot({
  slotId,
  format = "auto",
  placement = "center",
  className,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (!publisherId || !adRef.current || adRef.current.dataset.loaded) return;
    try {
      (window.adsbygoogle ??= []).push({});
      adRef.current.dataset.loaded = "true";
    } catch {
      /* unavailable locally or blocked */
    }
  }, []);
  if (!publisherId) return null;
  return (
    <div
      aria-label="Advertisement"
      className={cn(
        "relative flex w-full overflow-hidden rounded-2xl border border-violet-100/80 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-2",
        "justify-center",
        className,
      )}
      role="complementary"
    >
      <span className="pointer-events-none absolute top-2 right-3 text-[9px] font-medium tracking-[0.12em] text-slate-400 uppercase">
        Sponsored ad
      </span>
      <ins
        className={`adsbygoogle block w-full ${minHeights[format]}`}
        data-ad-client={publisherId}
        data-ad-format={format}
        data-ad-slot={slotId}
        data-full-width-responsive="true"
        ref={adRef}
        style={{ display: "block" }}
      />
    </div>
  );
}
