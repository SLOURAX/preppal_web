"use client";

import { Button } from "@/components/ui";

import { useSystemStatus } from "../hooks/use-system-status";

export function SystemStatusCard({ audience }: { audience: string }) {
  const query = useSystemStatus();
  const status = query.data?.data;
  const connected = status?.status === "ok";

  return (
    <aside className="surface-card p-6" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-primary text-sm font-semibold">{audience}</p>
          <h2 className="mt-1 text-2xl font-semibold">System connection</h2>
        </div>
        <span
          className={`h-3 w-3 rounded-full ${connected ? "bg-success" : "bg-danger"}`}
        />
      </div>
      <p className="text-muted-foreground mt-8 text-sm">
        {query.isPending
          ? "Checking the Preppal API…"
          : status
            ? `Reached ${status.service} (${status.database}).`
            : "API is offline. Start the backend and MongoDB, then retry."}
      </p>
      <Button
        className="mt-5 w-full"
        disabled={query.isFetching}
        onClick={() => query.refetch()}
      >
        {query.isFetching ? "Checking…" : "Check connection"}
      </Button>
    </aside>
  );
}
