"use client";

import Script from "next/script";
import { useAuthStore } from "@/store";

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function AdSenseScript() {
  const sessionChecked = useAuthStore((state) => state.sessionChecked);
  const adFree = useAuthStore(
    (state) => state.membership?.entitlements?.adFree ?? false,
  );
  if (!publisherId || !sessionChecked || adFree) return null;
  return (
    <Script
      async
      crossOrigin="anonymous"
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
    />
  );
}
