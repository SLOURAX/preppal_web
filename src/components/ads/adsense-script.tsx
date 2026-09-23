import Script from "next/script";

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function AdSenseScript() {
  if (!publisherId) return null;
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
