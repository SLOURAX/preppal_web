import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { SiteChrome } from "@/components/layout";
import { AppProviders } from "@/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Preppal", template: "%s | Preppal" },
  description:
    "Smart preparation, confident outcomes, and rewards for learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} min-h-full antialiased`}>
        <AppProviders>
          <SiteChrome>{children}</SiteChrome>
        </AppProviders>
      </body>
    </html>
  );
}
