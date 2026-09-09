"use client";

import { Button, DataState, LoadingState } from "@/components/ui";

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
      {query.isPending ? (
        <div className="mt-8">
          <LoadingState
            title="Checking the Preppal API"
            description="Connecting securely…"
          />
        </div>
      ) : query.isError ? (
        <div className="mt-6">
          <DataState
            tone="error"
            title="Connection unavailable"
            description="We could not reach the backend service. Check your connection and try again."
            action={
              <Button
                disabled={query.isFetching}
                onClick={() => query.refetch()}
              >
                {query.isFetching ? "Checking…" : "Try again"}
              </Button>
            }
          />
        </div>
      ) : (
        <p className="text-muted-foreground mt-8 text-sm">
          {status
            ? `Reached ${status.service} (${status.database}).`
            : "No status received yet."}
        </p>
      )}
      {!query.isError && !query.isPending ? (
        <Button
          className="mt-5 w-full"
          disabled={query.isFetching}
          onClick={() => query.refetch()}
        >
          {query.isFetching ? "Checking…" : "Check connection"}
        </Button>
      ) : null}
    </aside>
  );
}
