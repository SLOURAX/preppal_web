"use client";

import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  History,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DataState } from "@/components/ui";
import {
  formatWalletDate,
  useWalletActivity,
  type WalletAsset,
  type WalletRange,
} from "@/features/wallet/wallet-api";

export function WalletHistoryTab() {
  const params = useSearchParams();
  const initialAsset = params.get("asset") === "xp" ? "xp" : "coin";
  const requestedRange = params.get("range");
  const initialRange: WalletRange =
    requestedRange === "7d" ||
    requestedRange === "month" ||
    requestedRange === "custom"
      ? requestedRange
      : "all";
  const [asset, setAsset] = useState<WalletAsset>(initialAsset);
  const [range, setRange] = useState<WalletRange>(initialRange);
  const [from, setFrom] = useState(params.get("from") ?? "");
  const [to, setTo] = useState(params.get("to") ?? "");
  const [page, setPage] = useState(0);
  const pageSize = 25;
  const activityQuery = useWalletActivity({
    asset,
    range,
    from: range === "custom" ? from : undefined,
    to: range === "custom" ? to : undefined,
    limit: pageSize,
    offset: page * pageSize,
  });
  const activity = activityQuery.data;

  return (
    <div className="space-y-6">
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs"
        href="/dashboard?tab=wallet"
      >
        <ArrowLeft className="size-4" /> Back to wallet
      </Link>
      <header>
        <div className="bg-primary/10 text-primary mb-4 grid size-12 place-items-center rounded-2xl">
          <History className="size-6" />
        </div>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          All transactions
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          A complete, server-backed record of your Coin and XP activity.
        </p>
      </header>

      <section className="surface-card space-y-4 p-4 sm:p-5">
        <div className="bg-surface-subtle grid max-w-md grid-cols-2 rounded-xl p-1">
          {(["coin", "xp"] as const).map((option) => (
            <button
              className={`rounded-lg px-4 py-2 text-xs font-bold ${
                asset === option
                  ? "bg-surface text-primary shadow-sm"
                  : "text-muted-foreground"
              }`}
              key={option}
              onClick={() => {
                setAsset(option);
                setPage(0);
              }}
              type="button"
            >
              {option === "coin" ? "Preppal Coins" : "Experience points"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["7d", "7 days"],
              ["month", "This month"],
              ["all", "All time"],
              ["custom", "Custom"],
            ] as const
          ).map(([value, label]) => (
            <button
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                range === value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
              key={value}
              onClick={() => {
                setRange(value);
                setPage(0);
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        {range === "custom" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              aria-label="Transactions from date"
              className="border-border bg-surface h-10 rounded-xl border px-3 text-xs"
              max={to || undefined}
              onChange={(event) => {
                setFrom(event.target.value);
                setPage(0);
              }}
              type="date"
              value={from}
            />
            <input
              aria-label="Transactions to date"
              className="border-border bg-surface h-10 rounded-xl border px-3 text-xs"
              min={from || undefined}
              onChange={(event) => {
                setTo(event.target.value);
                setPage(0);
              }}
              type="date"
              value={to}
            />
          </div>
        ) : null}
      </section>

      <section className="surface-card overflow-hidden p-5 sm:p-6">
        <div className="border-border mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <p className="text-foreground text-sm font-semibold">
            {activity?.total ?? 0} transactions
          </p>
          <div className="text-muted-foreground flex gap-4 text-xs">
            <span>Earned: {activity?.earned.toLocaleString() ?? 0}</span>
            <span>Redeemed: {activity?.redeemed.toLocaleString() ?? 0}</span>
          </div>
        </div>
        {activityQuery.isLoading ? (
          <div className="text-muted-foreground flex min-h-40 items-center justify-center gap-2 text-xs">
            <LoaderCircle className="text-primary size-5 animate-spin" />{" "}
            Loading transactions…
          </div>
        ) : activityQuery.isError ? (
          <DataState
            title="Could not load transactions"
            description="Please try again shortly."
          />
        ) : activity?.transactions.length ? (
          <div className="divide-border divide-y">
            {activity.transactions.map((transaction) => {
              const isCredit = transaction.direction === "credit";
              const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
              return (
                <div
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  key={transaction.id}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-xl ${isCredit ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-foreground truncate text-sm font-semibold">
                        {transaction.label}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatWalletDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-bold ${isCredit ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {isCredit ? "+" : "−"}
                    {transaction.amount.toLocaleString()}{" "}
                    {asset === "coin" ? "coins" : "XP"}
                  </span>
                </div>
              );
            })}
            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                className="border-border text-foreground rounded-xl border px-4 py-2 text-xs font-semibold disabled:opacity-40"
                disabled={page === 0 || activityQuery.isFetching}
                onClick={() => setPage((value) => Math.max(0, value - 1))}
                type="button"
              >
                Previous
              </button>
              <span className="text-muted-foreground text-xs">
                Page {page + 1} of{" "}
                {Math.max(1, Math.ceil(activity.total / pageSize))}
              </span>
              <button
                className="border-border text-foreground rounded-xl border px-4 py-2 text-xs font-semibold disabled:opacity-40"
                disabled={!activity.hasMore || activityQuery.isFetching}
                onClick={() => setPage((value) => value + 1)}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <DataState
            title="No transactions found"
            description="No activity exists for this asset and date range."
          />
        )}
      </section>
    </div>
  );
}
