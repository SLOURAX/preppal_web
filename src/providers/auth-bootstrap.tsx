"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "@/store";
import { LoadingState } from "@/components/ui";

export function AuthBootstrap({ children }: PropsWithChildren) {
  const sessionChecked = useAuthStore((state) => state.sessionChecked);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    if (!sessionChecked) void restoreSession();
  }, [restoreSession, sessionChecked]);

  if (!sessionChecked)
    return (
      <main className="grid min-h-dvh place-items-center">
        <LoadingState immersive title="Restoring your session" />
      </main>
    );
  return children;
}
