"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { QueryProvider } from "./query-provider";
import { ToastProvider } from "@/components/ui";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider><ToastProvider>{children}</ToastProvider></QueryProvider>
    </ThemeProvider>
  );
}
