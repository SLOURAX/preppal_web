"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { QueryProvider } from "./query-provider";
import { FeedbackProvider, ToastProvider } from "@/components/ui";
import { AuthBootstrap } from "./auth-bootstrap";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <ToastProvider>
          <FeedbackProvider>
            <AuthBootstrap>{children}</AuthBootstrap>
          </FeedbackProvider>
        </ToastProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
