"use client";

import { ArrowDownLeft, ArrowLeft, ArrowUpRight, History } from "lucide-react";
import Link from "next/link";

import { WALLET_TRANSACTIONS } from "@/features/wallet/constants";

export function WalletHistoryTab() {
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
          A complete record of your wallet activity.
        </p>
      </header>
      <section className="surface-card overflow-hidden p-5 sm:p-6">
        <div className="divide-border divide-y">
          {WALLET_TRANSACTIONS.map((transaction) => {
            const isCredit = transaction.type === "credit";
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
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-sm font-bold ${isCredit ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {isCredit ? "+" : "−"}
                  {transaction.amount} P
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
