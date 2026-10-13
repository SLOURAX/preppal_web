"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "@/store";
import { LoadingState } from "@/components/ui";

export function AuthBootstrap({ children }: PropsWithChildren) {
  const sessionChecked = useAuthStore((state) => state.sessionChecked);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const membershipEnd = useAuthStore(
    (state) => state.membership?.currentPeriodEnd,
  );
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    if (!sessionChecked) void restoreSession();
  }, [restoreSession, sessionChecked]);

  useEffect(() => {
    if (!sessionChecked || !isAuthenticated || !membershipEnd) return;
    const remaining = new Date(membershipEnd).getTime() - Date.now();
    if (!Number.isFinite(remaining)) return;
    if (remaining <= 0) {
      void restoreSession();
      return;
    }
    const timer = window.setTimeout(
      () => void restoreSession(),
      Math.min(remaining + 1_000, 2_147_000_000),
    );
    return () => window.clearTimeout(timer);
  }, [isAuthenticated, membershipEnd, restoreSession, sessionChecked]);

  if (!sessionChecked)
    return (
      <main className="grid min-h-dvh place-items-center">
        <LoadingState immersive title="" />
      </main>
    );
  return children;
}
