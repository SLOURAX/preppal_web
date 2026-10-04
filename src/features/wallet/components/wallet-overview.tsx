"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  History,
  LoaderCircle,
  Plus,
  Send,
  PiggyBank,
  Calculator,
} from "lucide-react";
import { ConfirmationModal, DataState, useFeedback } from "@/components/ui";
import { SaxSecuritySafeBulk } from "@meysam213/iconsax-react";
import { useQueryClient } from "@tanstack/react-query";

import { COIN_VALUE_NGN, XP_TO_COIN_RATE } from "@/constants/finance";
import { useAuthStore } from "@/store";
import {
  formatWalletDate,
  useWalletActivity,
  type WalletAsset,
  type WalletRange,
} from "../wallet-api";

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
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedback();
  const [xp, setXp] = useState<string>("50");
  const [coinAmount, setCoinAmount] = useState<string>("1");
  const [pendingAction, setPendingAction] = useState<
    "deposit" | "withdraw" | "convert" | null
  >(null);
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankDetails, setBankDetails] = useState({ bank: "", account: "" });
  const [accountName, setAccountName] = useState("");
  const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [asset, setAsset] = useState<WalletAsset>("coin");
  const [range, setRange] = useState<WalletRange>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const depositedFunds = useAuthStore((state) => state.depositedFunds);
  const experiencePoints = useAuthStore((state) => state.experiencePoints);
  const convertExperienceToCoins = useAuthStore(
    (state) => state.convertExperienceToCoins,
  );
  const activityQuery = useWalletActivity({
    asset,
    range,
    from: range === "custom" ? customFrom : undefined,
    to: range === "custom" ? customTo : undefined,
    limit: 5,
  });
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
  const xpNeededToConvert = Math.max(0, XP_TO_COIN_RATE - experiencePoints);
  const canStartConverting = experiencePoints >= XP_TO_COIN_RATE;
  const activity = activityQuery.data;
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
      <div className="grid gap-4">
        <section className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-[#21194d] p-5 text-white shadow-[0_20px_50px_rgb(52_31_140/0.2)] sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.38) 47% 48%, transparent 49% 100%), linear-gradient(45deg, transparent 0 46%, rgba(255,255,255,.24) 47% 48%, transparent 49% 100%)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="pointer-events-none absolute -right-16 -bottom-20 -z-10 size-64 rounded-full bg-violet-400/25 blur-3xl" />
          <div className="relative z-10 flex w-full flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-violet-100">
                  <Image
                    alt=""
                    height={22}
                    src="/assets/coins/preppal-coin.png"
                    width={22}
                  />
                </span>
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
            </div>

            <p className="max-w-xl text-xs leading-5 text-violet-200/85">
              Only Preppal Coins can be withdrawn. Deposited funds stay in your
              wallet for premium plans and other eligible in-app purchases.
            </p>

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
                Withdraw coins
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-violet-200">Experience points</p>
                <p className="mt-1 font-bold">
                  {experiencePoints.toLocaleString()} XP
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-violet-200">Spend-only deposits</p>
                <p className="mt-1 font-bold">
                  {depositedFunds.toLocaleString()} NGN
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="surface-card overflow-hidden p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
                <Calculator className="size-5" />
              </span>
              <div>
                <p className="text-foreground text-sm font-bold">
                  Coin calculator
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  See the cash value of your Preppal Coins. One coin is worth ₦
                  {COIN_VALUE_NGN.toLocaleString()}.
                </p>
              </div>
            </div>
            <div className="bg-surface-subtle flex w-full items-center gap-2 rounded-2xl p-3 sm:w-auto">
              <div className="border-border bg-surface flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 sm:w-32 sm:flex-none">
                <Image
                  alt=""
                  height={18}
                  src="/assets/coins/preppal-coin.png"
                  width={18}
                />
                <input
                  aria-label="Coins to calculate"
                  className="text-foreground w-full bg-transparent py-2 text-right text-sm font-bold outline-none"
                  inputMode="decimal"
                  min="0"
                  onChange={(event) => setCoinAmount(event.target.value)}
                  type="number"
                  value={coinAmount}
                />
              </div>
              <span className="text-muted-foreground text-xs font-semibold">
                equals
              </span>
              <span className="text-foreground min-w-24 text-right text-base font-black">
                ₦{((Number(coinAmount) || 0) * COIN_VALUE_NGN).toLocaleString()}
              </span>
            </div>
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
              Save your learning points, then turn them into withdrawable
              Preppal Coins.
            </p>
            <div
              className={`mt-4 rounded-2xl border p-4 ${
                canStartConverting
                  ? "border-emerald-500/25 bg-emerald-500/10"
                  : "border-amber-500/30 bg-amber-500/10"
              }`}
            >
              <p className="text-foreground text-base font-black">
                You need at least 50 XP to convert.
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5 font-semibold">
                {canStartConverting
                  ? `You have ${experiencePoints.toLocaleString()} XP, so you can convert now.`
                  : `You currently have ${experiencePoints.toLocaleString()} XP. Earn ${xpNeededToConvert.toLocaleString()} more XP to unlock conversion.`}
              </p>
              <p className="text-primary mt-2 text-sm font-black">
                50 XP = 1 Preppal Coin
              </p>
            </div>
            <label
              className="text-muted-foreground mt-5 block text-[11px] font-semibold"
              htmlFor="xp-amount"
            >
              XP to convert
            </label>
            <div className="mt-1 flex items-center gap-2">
              <div className="bg-surface-subtle flex flex-1 items-center gap-2 rounded-xl px-3">
                <Image
                  alt=""
                  className="size-[18px] object-contain"
                  height={18}
                  src="/assets/coins/preppal-coin.png"
                  width={18}
                />
                <input
                  className="text-foreground w-full bg-transparent py-2.5 text-sm font-bold outline-none"
                  disabled={!canStartConverting}
                  id="xp-amount"
                  inputMode="numeric"
                  max={experiencePoints}
                  min={XP_TO_COIN_RATE}
                  onChange={(event) => setXp(event.target.value)}
                  type="number"
                  value={xp}
                />
              </div>
              <span className="text-primary w-12 text-center text-[.95rem] font-bold">
                XP
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-muted-foreground text-[.8rem] font-semibold">
                You receive
              </span>
              <span className="text-foreground text-lg font-black">
                {convertedCoins.toLocaleString()} coins
              </span>
            </div>
            {/* <p className="text-muted-foreground mt-2 text-[11px] leading-4 font-semibold">
              We convert complete groups of 50 XP. Any XP left over stays safely
              in your balance.
            </p> */}
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
              disabled={
                requestedXp < XP_TO_COIN_RATE || requestedXp > experiencePoints
              }
              type="button"
              onClick={() => setPendingAction("convert")}
            >
              {canStartConverting
                ? "Convert XP"
                : `Earn ${xpNeededToConvert.toLocaleString()} more XP`}{" "}
              <ChevronRight className="size-4" />
            </button>
          </div>
        </section>

        {pendingAction ? (
          <ConfirmationModal
            title={actionCopy.title}
            description={actionCopy.description}
            confirmLabel={actionCopy.confirmLabel}
            loading={pendingAction === "convert" && isConverting}
            onCancel={() => setPendingAction(null)}
            onConfirm={() => {
              if (pendingAction === "convert") {
                setIsConverting(true);
                void convertExperienceToCoins(requestedXp)
                  .then(async (converted) => {
                    if (converted) {
                      await queryClient.invalidateQueries({
                        queryKey: ["wallet", "activity"],
                      });
                      setPendingAction(null);
                    } else {
                      showFeedback({
                        kind: "error",
                        title: "Conversion failed",
                        message:
                          "Your XP could not be converted. Refresh your balance and try again.",
                      });
                    }
                  })
                  .finally(() => setIsConverting(false));
                return;
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

      <section className="surface-card space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-foreground text-sm font-bold">
              Coin and XP activity
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Switch between your withdrawable Coins and learning XP ledger.
            </p>
          </div>
          <div className="bg-surface-subtle grid grid-cols-2 rounded-xl p-1">
            {(["coin", "xp"] as const).map((option) => (
              <button
                className={`rounded-lg px-5 py-2 text-xs font-bold transition-colors ${
                  asset === option
                    ? "bg-surface text-primary shadow-sm"
                    : "text-muted-foreground"
                }`}
                key={option}
                onClick={() => setAsset(option)}
                type="button"
              >
                {option === "coin" ? "Preppal Coins" : "Experience points"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
              onClick={() => setRange(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        {range === "custom" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-muted-foreground text-[11px] font-semibold">
              From
              <input
                className="border-border bg-surface text-foreground mt-1 block h-10 w-full rounded-xl border px-3 text-xs"
                max={customTo || undefined}
                onChange={(event) => setCustomFrom(event.target.value)}
                type="date"
                value={customFrom}
              />
            </label>
            <label className="text-muted-foreground text-[11px] font-semibold">
              To
              <input
                className="border-border bg-surface text-foreground mt-1 block h-10 w-full rounded-xl border px-3 text-xs"
                min={customFrom || undefined}
                onChange={(event) => setCustomTo(event.target.value)}
                type="date"
                value={customTo}
              />
            </label>
          </div>
        ) : null}
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <CreditCard className="text-primary size-5" />
          <div>
            <p className="text-muted-foreground text-xs">Earned</p>
            <p className="text-foreground text-sm font-bold">
              +{(activity?.earned ?? 0).toLocaleString()}{" "}
              {asset === "coin" ? "coins" : "XP"}
            </p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <ArrowUpRight className="size-5 text-rose-500" />
          <div>
            <p className="text-muted-foreground text-xs">Redeemed</p>
            <p className="text-foreground text-sm font-bold">
              {(activity?.redeemed ?? 0).toLocaleString()}{" "}
              {asset === "coin" ? "coins" : "XP"}
            </p>
          </div>
        </div>
        <div className="surface-card flex items-center gap-3 rounded-2xl p-4 sm:p-5">
          <Image
            alt=""
            className="size-[22px] object-contain"
            height={22}
            src="/assets/coins/preppal-coin.png"
            width={22}
          />
          <div>
            <p className="text-muted-foreground text-xs">Conversion rate</p>
            <p className="text-foreground text-sm font-bold">
              {XP_TO_COIN_RATE} XP = 1 coin
            </p>
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
              <h2 className="text-foreground text-[.9rem] font-bold">
                Transaction history
              </h2>
              <p className="text-muted-foreground text-xs">
                Your latest wallet activity
              </p>
            </div>
          </div>
          <Link
            className="text-primary inline-flex items-center gap-1 text-xs font-bold"
            href={`/dashboard?view=wallet-history&asset=${asset}&range=${range}${customFrom ? `&from=${customFrom}` : ""}${customTo ? `&to=${customTo}` : ""}`}
          >
            View all <ChevronRight className="size-3.5" />
          </Link>
        </div>
        {activityQuery.isLoading ? (
          <div className="text-muted-foreground flex min-h-28 items-center justify-center gap-2 text-xs">
            <LoaderCircle className="text-primary size-5 animate-spin" />{" "}
            Loading activity…
          </div>
        ) : activityQuery.isError ? (
          <DataState
            title="Could not load wallet activity"
            description="Please try again shortly."
          />
        ) : activity?.transactions.length ? (
          <div className="divide-border divide-y">
            {activity.transactions.map((transaction) => {
              const isCredit = transaction.direction === "credit";
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
                      <p className="text-foreground truncate text-[.75rem] font-semibold">
                        {transaction.label}
                      </p>
                      <p className="text-muted-foreground text-[.7rem]">
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
