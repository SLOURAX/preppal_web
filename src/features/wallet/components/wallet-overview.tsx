import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Vault,
  Plus,
  Send,
} from "lucide-react";

import { WALLET_TRANSACTIONS } from "../constants";

interface WalletOverviewProps {
  readonly balance: number;
}

export function WalletOverview({ balance }: WalletOverviewProps) {
  return (
    <div className="space-y-6">
      <section className="surface-card bg-primary text-primary-foreground p-6">
        <Vault className="size-8 opacity-90" />
        <p className="mt-6 text-sm font-medium opacity-80">Available balance</p>
        <p className="mt-1 text-4xl font-bold tracking-tight">
          {balance.toLocaleString()} P
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-surface text-foreground hover:bg-surface/90 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-colors">
            <Plus className="size-4" />
            Top up Balance
          </button>
          <button className="bg-primary-strong hover:bg-primary-strong/80 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors">
            <Send className="size-4" />
            Withdraw funds
          </button>
        </div>
      </section>
      <section className="surface-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Coins className="text-primary size-5" />
          <h2 className="font-semibold">Recent transactions</h2>
        </div>
        <div className="divide-border divide-y">
          {WALLET_TRANSACTIONS.map((transaction) => {
            const isCredit = transaction.type === "credit";
            const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
            return (
              <div
                className="flex items-center justify-between gap-4 py-3"
                key={transaction.id}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={
                      isCredit
                        ? "bg-success/10 text-success rounded-full p-2"
                        : "bg-danger/10 text-danger rounded-full p-2"
                    }
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {transaction.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <span
                  className={
                    isCredit
                      ? "text-success text-sm font-semibold"
                      : "text-danger text-sm font-semibold"
                  }
                >
                  {isCredit ? "+" : "-"}
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
