import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">{children}</div>
  );
}
