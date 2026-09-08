"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Coins,
  CreditCard,
  History,
  LoaderCircle,
  Plus,
  Send,
  PiggyBank,
  Vault,
} from "lucide-react";
import { ConfirmationModal, DataState } from "@/components/ui";
import { SaxSecuritySafeBulk } from "@meysam213/iconsax-react";

import { WALLET_TRANSACTIONS } from "../constants";
import { XP_TO_COIN_RATE } from "@/constants/finance";
import { useAuthStore } from "@/store";

interface WalletOverviewProps {
  readonly balance: number;
}

const BANKS = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "Kuda",
  "Opay",
  "UBA",
  "Zenith Bank",
] as const;

export function WalletOverview({ balance }: WalletOverviewProps) {
  const [xp, setXp] = useState<string>("500");
  const [pendingAction, setPendingAction] = useState<
    "deposit" | "withdraw" | "convert" | null
  >(null);
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankDetails, setBankDetails] = useState({ bank: "", account: "" });
  const [accountName, setAccountName] = useState("");
  const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
  const depositedFunds = useAuthStore((state) => state.depositedFunds);
  const experiencePoints = useAuthStore((state) => state.experiencePoints);
  const convertExperienceToCoins = useAuthStore(
    (state) => state.convertExperienceToCoins,
  );
  useEffect(() => {
    if (!bankDetails.bank || bankDetails.account.length !== 10) return;
    const verification = window.setTimeout(() => {
      setAccountName("Solomon Udumizi");
      setIsVerifyingAccount(false);
    }, 900);
    return () => window.clearTimeout(verification);
  }, [bankDetails.account, bankDetails.bank]);
  const requestedXp = useMemo(() => {
    const parsed = Number(xp);
    return Number.isFinite(parsed)
      ? Math.max(0, Math.floor(parsed / XP_TO_COIN_RATE) * XP_TO_COIN_RATE)
      : 0;
  }, [xp]);
  const convertedCoins = useMemo(
    () => Math.floor(requestedXp / XP_TO_COIN_RATE),
    [requestedXp],
  );
  const transactionTotals = useMemo(
    () =>
      WALLET_TRANSACTIONS.reduce(
        (totals, transaction) => {
          if (transaction.type === "credit")
            totals.earned += transaction.amount;
          else totals.redeemed += transaction.amount;
          return totals;
        },
        { earned: 0, redeemed: 0 },
      ),
    [],
  );
  const actionCopy =
    pendingAction === "convert"
      ? {
          title: "Convert XP to Coins?",
          description: `This will convert ${requestedXp.toLocaleString()} XP into ${convertedCoins.toLocaleString()} Preppal Coins. XP is your learning progress; coins are the withdrawable value.`,
          confirmLabel: "Convert",
        }
      : pendingAction === "withdraw"
        ? {
            title: "Withdraw funds?",
            description:
              "Withdrawable Preppal coins only. Deposited funds cannot be withdrawn through rewards.",
            confirmLabel: "Continue",
          }
        : {
            title: "Deposit funds?",
            description:
              "You’re about to start a deposit into your Preppal wallet.",
            confirmLabel: "Continue",
          };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-[#21194d] p-5 text-white shadow-[0_20px_50px_rgb(52_31_140/0.2)] sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.55) 47% 48%, transparent 49% 100%), linear-gradient(45deg, transparent 0 46%, rgba(255,255,255,.35) 47% 48%, transparent 49% 100%)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="pointer-events-none absolute -right-16 -bottom-20 -z-10 size-64 rounded-full bg-violet-400/25 blur-3xl" />
          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col justify-center gap-4">
              <span className="grid size-16 place-items-center rounded-2xl bg-white/10">
                <Vault className="size-10 text-violet-200" />
              </span>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-violet-200">
                  Withdrawable Preppal Coins
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                  {balance.toLocaleString()}{" "}
                  <span className="text-base text-violet-200 sm:text-lg">
                    coins
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-start gap-2.5">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-[.8rem] font-semibold text-[#21194d] transition-transform hover:-translate-y-0.5"
                type="button"
                onClick={() => setPendingAction("deposit")}
              >
                <Plus className="size-4" />
                Deposit funds
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-2.5 text-[.8rem] font-semibold text-white ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/15"
                type="button"
                onClick={() =>
                  isBankLinked
                    ? setPendingAction("withdraw")
                    : setShowBankModal(true)
                }
              >
                <Send className="size-4" />
                Withdraw funds
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-violet-200">Preppal coins</p>
                <p className="mt-1 font-bold">
                  {balance.toLocaleString()} coins
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-violet-200">Experience points</p>
                <p className="mt-1 font-bold">
                  {experiencePoints.toLocaleString()} XP
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-violet-200">Deposited funds</p>
                <p className="mt-1 font-bold">
                  {depositedFunds.toLocaleString()} NGN
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
            <span className="text-violet-200">Wallet status</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              Active & secure
            </span>
          </div> */}
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
              Convert your learning XP into withdrawable coins at a simple 10 XP
              = 1 coin rate.
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
                  max={experiencePoints}
                  min={XP_TO_COIN_RATE}
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
                {convertedCoins.toLocaleString()} coins
              </span>
            </div>
            <p className="text-muted-foreground mt-2 text-[10px] leading-4">
              Only complete 10 XP blocks convert. Any remainder stays in your XP
              balance.
            </p>
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
              disabled={
                requestedXp < XP_TO_COIN_RATE || requestedXp > experiencePoints
              }
              type="button"
              onClick={() => setPendingAction("convert")}
            >
              Convert XP <ChevronRight className="size-4" />
            </button>
          </div>
        </section>
        {pendingAction ? (
          <ConfirmationModal
            title={actionCopy.title}
            description={actionCopy.description}
            confirmLabel={actionCopy.confirmLabel}
            onCancel={() => setPendingAction(null)}
            onConfirm={() => {
              if (pendingAction === "convert") {
                convertExperienceToCoins(requestedXp);
              }
              setPendingAction(null);
            }}
          />
        ) : null}
      </div>

      {showBankModal ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            aria-label="Close bank account dialog"
            className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
            onClick={() => setShowBankModal(false)}
            type="button"
          />
          <form
            className="bg-surface relative z-10 w-full max-w-md space-y-5 rounded-3xl p-6 shadow-2xl sm:p-7"
            onSubmit={(event) => {
              event.preventDefault();
              if (
                !bankDetails.bank ||
                bankDetails.account.length !== 10 ||
                !accountName
              )
                return;
              setIsBankLinked(true);
              setShowBankModal(false);
              setPendingAction("withdraw");
            }}
          >
            <div>
              <div className="bg-primary/10 text-primary mb-3 flex size-10 items-center justify-center rounded-xl">
                <SaxSecuritySafeBulk className="size-5" />
              </div>
              <h2 className="text-foreground text-base font-bold">
                Link a bank account
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                Link an account securely before withdrawing your coins.
              </p>
            </div>
            <label className="text-foreground block text-xs font-semibold">
              Select bank
              <select
                className="border-border bg-surface focus:border-primary mt-1.5 h-10 w-full rounded-xl border px-3 text-[.8rem] outline-none"
                onChange={(event) => {
                  setAccountName("");
                  setIsVerifyingAccount(bankDetails.account.length === 10);
                  setBankDetails((value) => ({
                    ...value,
                    bank: event.target.value,
                  }));
                }}
                required
                value={bankDetails.bank}
              >
                <option value="">Choose your bank</option>
                {BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-foreground block text-xs font-semibold">
              Account number
              <input
                className="border-border bg-surface focus:border-primary mt-1.5 h-10 w-full rounded-xl border px-3 text-[.8rem] outline-none"
                inputMode="numeric"
                maxLength={10}
                onChange={(event) => {
                  setAccountName("");
                  setIsVerifyingAccount(
                    event.target.value.replace(/\D/g, "").length === 10 &&
                      Boolean(bankDetails.bank),
                  );
                  setBankDetails((value) => ({
                    ...value,
                    account: event.target.value.replace(/\D/g, ""),
                  }));
                }}
                placeholder="Enter 10-digit account number"
                required
                value={bankDetails.account}
              />
            </label>
            {isVerifyingAccount ? (
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <LoaderCircle className="text-primary size-4 animate-spin" />{" "}
                Verifying account details…
              </div>
            ) : accountName ? (
              <div className="rounded-xl bg-emerald-500/10 px-3 py-2.5 text-xs">
                <p className="text-muted-foreground">Account name</p>
                <p className="text-foreground mt-0.5 font-bold">
                  {accountName}
                </p>
              </div>
            ) : null}
            <div className="flex gap-2 pt-1">
              <button
                className="flex-1 rounded-xl border !border-rose-600 px-3 py-2 text-xs font-semibold text-rose-600"
                onClick={() => setShowBankModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-primary text-primary-foreground flex-1 rounded-xl px-3 py-2 text-xs font-semibold"
                disabled={!accountName || isVerifyingAccount}
                type="submit"
              >
                Link account
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <section className="surface-card flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
            <CreditCard className="size-5" />
          </span>
          <div>
            <h2 className="text-foreground text-sm font-bold">
              Withdrawal account
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {isBankLinked
                ? `Linked · ${bankDetails.bank}`
                : "Link a bank account to withdraw funds"}
            </p>
          </div>
        </div>
        <button
          className="border-border text-primary hover:bg-primary/5 rounded-xl border px-4 py-2 text-xs font-bold transition-colors"
          onClick={() => setShowBankModal(true)}
          type="button"
        >
          {isBankLinked ? "Update account" : "Link account"}
        </button>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <CreditCard className="text-primary size-5" />
          <div>
            <p className="text-muted-foreground text-xs">This month</p>
            <p className="text-foreground text-sm font-bold">
              +{transactionTotals.earned.toLocaleString()} coins earned
            </p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <ArrowUpRight className="size-5 text-rose-500" />
          <div>
            <p className="text-muted-foreground text-xs">Redeemed</p>
            <p className="text-foreground text-sm font-bold">
              {transactionTotals.redeemed.toLocaleString()} coins
            </p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <Coins className="size-5 text-amber-500" />
          <div>
            <p className="text-muted-foreground text-xs">Conversion rate</p>
            <p className="text-foreground text-sm font-bold">10 XP = 1 coin</p>
          </div>
        </div>
      </div>

      <section className="surface-card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
              <History className="size-5" />
            </span>
            <div>
              <h2 className="text-foreground text-[.9rem] font-semibold">
                Transaction history
              </h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Your latest wallet activity
              </p>
            </div>
          </div>
          <Link
            className="text-primary inline-flex items-center gap-1 text-xs font-bold"
            href="/dashboard?view=wallet-history"
          >
            View all <ChevronRight className="size-3.5" />
          </Link>
        </div>
        {WALLET_TRANSACTIONS.length ? (
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
                      <p className="text-foreground truncate text-[.8rem] font-semibold">
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
        ) : (
          <DataState
            title="No wallet activity yet"
            description="Your XP conversions and coin activity will appear here after you start earning."
          />
        )}
      </section>
    </div>
  );
}
