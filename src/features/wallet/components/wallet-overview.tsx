"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Coins,
  CreditCard,
  History,
  Plus,
  Send,
  PiggyBank,
  Vault,
} from "lucide-react";

import { WALLET_TRANSACTIONS } from "../constants";

interface WalletOverviewProps {
  readonly balance: number;
}

export function WalletOverview({ balance }: WalletOverviewProps) {
  const [xp, setXp] = useState<string>("500");
  const convertedCoins = useMemo(() => Math.floor(Number(xp || 0) / 10), [xp]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="relative isolate overflow-hidden rounded-3xl bg-[#21194d] p-6 text-white shadow-[0_20px_50px_rgb(52_31_140/0.2)] sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.55) 47% 48%, transparent 49% 100%), linear-gradient(45deg, transparent 0 46%, rgba(255,255,255,.35) 47% 48%, transparent 49% 100%)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="pointer-events-none absolute -right-16 -bottom-20 -z-10 size-64 rounded-full bg-violet-400/25 blur-3xl" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-violet-200">
                Available balance
              </p>
              <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {balance.toLocaleString()}{" "}
                <span className="text-xl text-violet-200">P</span>
              </p>
            </div>
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
              <Vault className="size-6 text-violet-200" />
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-[.8rem] font-semibold text-[#21194d] transition-transform hover:-translate-y-0.5"
              type="button"
            >
              <Plus className="size-4" />
              Deposit funds
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-2.5 text-[.8rem] font-semibold text-white ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/15"
              type="button"
            >
              <Send className="size-4" />
              Withdraw funds
            </button>
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
            <span className="text-violet-200">Wallet status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              Active & secure
            </span>
          </div>
        </section>

        <section className="surface-card relative overflow-hidden p-5 sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 0 48%, hsl(var(--primary) / .12) 49% 50%, transparent 51% 100%)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  XP converter
                </p>
                <h3 className="text-foreground mt-1 text-lg font-bold">
                  Turn XP into coins
                </h3>
              </div>
              <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
                <PiggyBank className="size-5" />
              </span>
            </div>
            <p className="text-muted-foreground mt-3 text-xs leading-5">
              Exchange your learning XP at a simple 10 XP = 1 P rate.
            </p>
            <label
              className="text-muted-foreground mt-5 block text-[11px] font-semibold"
              htmlFor="xp-amount"
            >
              XP to convert
            </label>
            <div className="mt-1 flex items-center gap-2">
              <div className="bg-surface-subtle flex flex-1 items-center gap-2 rounded-xl px-3">
                <Coins className="text-primary size-4" />
                <input
                  className="text-foreground w-full bg-transparent py-2.5 text-sm font-bold outline-none"
                  id="xp-amount"
                  inputMode="numeric"
                  min="0"
                  onChange={(event) => setXp(event.target.value)}
                  type="number"
                  value={xp}
                />
              </div>
              <span className="text-muted-foreground text-xs font-bold">
                XP
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-muted-foreground text-xs">You receive</span>
              <span className="text-foreground text-lg font-black">
                {convertedCoins.toLocaleString()} P
              </span>
            </div>
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors"
              type="button"
            >
              Convert XP <ChevronRight className="size-4" />
            </button>
          </div>
        </section>
      </div>

      <section className="surface-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
              <History className="size-5" />
            </span>
            <div>
              <h2 className="text-foreground font-semibold">
                Transaction history
              </h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Your latest wallet activity
              </p>
            </div>
          </div>
          <button
            className="text-primary inline-flex items-center gap-1 text-xs font-bold"
            type="button"
          >
            View all <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="divide-border divide-y">
          {WALLET_TRANSACTIONS.map((transaction) => {
            const isCredit = transaction.type === "credit";
            const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
            return (
              <div
                className="flex items-center justify-between gap-4 py-3.5"
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

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="surface-card flex items-center gap-3 p-4">
          <CreditCard className="text-primary size-5" />
          <div>
            <p className="text-muted-foreground text-xs">This month</p>
            <p className="text-foreground font-bold">+1,240 P earned</p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 p-4">
          <ArrowUpRight className="size-5 text-rose-500" />
          <div>
            <p className="text-muted-foreground text-xs">Redeemed</p>
            <p className="text-foreground font-bold">250 P</p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 p-4">
          <Coins className="size-5 text-amber-500" />
          <div>
            <p className="text-muted-foreground text-xs">Conversion rate</p>
            <p className="text-foreground font-bold">10 XP = 1 P</p>
          </div>
        </div>
      </div>
    </div>
  );
}
