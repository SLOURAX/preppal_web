"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  Info,
  ShieldCheck,
  Snowflake,
  Bot,
  TicketCheck,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout";
import {
  money,
  type MarketplaceProductType,
  useMarketplaceCatalog,
  usePurchaseMarketplaceProduct,
} from "@/features/marketplace/marketplace-api";

const ICONS = {
  STREAK_FREEZE: Snowflake,
  XP_BOOSTER: Zap,
  EXAM_SIMULATION: TicketCheck,
} satisfies Record<MarketplaceProductType, typeof Snowflake>;

export default function MarketplacePage() {
  const catalog = useMarketplaceCatalog();
  const purchase = usePurchaseMarketplaceProduct();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const selected = catalog.data?.products.find(
    (item) => item.slug === selectedSlug,
  );
  const account = catalog.data?.account;
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
          href="/rewards"
        >
          <ArrowLeft className="size-4" /> Back to rewards
        </Link>
        <section className="from-primary/15 via-primary/5 to-surface relative mt-5 overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-9">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(135deg,transparent_25%,color-mix(in_srgb,var(--primary)_8%,transparent)_25%,color-mix(in_srgb,var(--primary)_8%,transparent)_26%,transparent_26%,transparent_75%,color-mix(in_srgb,var(--primary)_8%,transparent)_75%,color-mix(in_srgb,var(--primary)_8%,transparent)_76%,transparent_76%)] [background-size:34px_34px] opacity-40" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold">
                <Bot className="size-3.5" /> Learner tools
              </span>
              <h1 className="text-foreground mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Spend-only marketplace
              </h1>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Protect your streak, boost learning progress, or save exam
                simulation credits. Every purchase is recorded in your Money
                transaction history.
              </p>
            </div>
            <div className="surface-card min-w-56 p-4">
              <p className="text-muted-foreground flex items-center gap-2 text-xs">
                <WalletCards className="size-4" /> Available spend-only funds
              </p>
              <p className="text-foreground mt-1 text-xl font-bold">
                {account
                  ? money(account.depositedBalance, account.currency)
                  : "—"}
              </p>
              <Link
                href="/dashboard?tab=wallet"
                className="text-primary mt-2 inline-flex text-xs font-semibold"
              >
                Add funds or view history →
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatusCard
            icon={Snowflake}
            label="Streak Freezes"
            value={
              account
                ? `${account.streakFreezes} / ${account.maxStreakFreezes}`
                : "—"
            }
            detail="Used automatically after a missed day"
          />
          <StatusCard
            icon={Zap}
            label="Double XP"
            value={account?.booster.active ? "Active" : "Not active"}
            detail={
              account?.booster.expiresAt
                ? `Ends ${new Date(account.booster.expiresAt).toLocaleString()}`
                : "Activate for 24 hours"
            }
          />
          <StatusCard
            icon={TicketCheck}
            label="Simulation credits"
            value={account ? String(account.simulationCredits) : "—"}
            detail="One credit unlocks one attempt"
          />
        </section>
        <section className="mt-8">
          <p className="text-primary text-[11px] font-bold tracking-[.16em] uppercase">
            Available tools
          </p>
          <h2 className="text-foreground mt-1 text-lg font-bold">
            Choose what helps you learn
          </h2>
          {catalog.isLoading ? (
            <div className="surface-card mt-4 p-8 text-center text-sm">
              Loading marketplace…
            </div>
          ) : catalog.isError ? (
            <div className="surface-card mt-4 p-8 text-center text-sm text-red-600">
              We could not load the marketplace. Please try again.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalog.data?.products.map((product) => {
                const Icon = ICONS[product.type];
                return (
                  <article
                    className="surface-card flex min-h-64 flex-col p-5"
                    key={product.id}
                  >
                    <div className="bg-primary/10 text-primary grid size-11 place-items-center rounded-2xl">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-foreground mt-4 text-sm font-bold">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-xs leading-5">
                      {product.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200/70 pt-4 dark:border-white/10">
                      <span className="text-foreground text-base font-bold">
                        {money(product.price, product.currency)}
                      </span>
                      <button
                        className="bg-primary text-primary-foreground rounded-xl px-4 py-2.5 text-xs font-bold disabled:opacity-50"
                        disabled={
                          !account || account.depositedBalance < product.price
                        }
                        onClick={() => {
                          setMessage(null);
                          setSelectedSlug(product.slug);
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        {catalog.data && (
          <section className="surface-card mt-8 p-5 sm:p-6">
            <div className="flex gap-3">
              <Info className="text-primary mt-0.5 size-5 shrink-0" />
              <div>
                <h2 className="text-foreground text-sm font-bold">
                  Know which balance you’re using
                </h2>
                <div className="text-muted-foreground mt-3 grid gap-3 text-xs leading-5 md:grid-cols-3">
                  <p>
                    <strong className="text-foreground block">
                      Spend-only funds
                    </strong>
                    {catalog.data.explanations.depositedFunds}
                  </p>
                  <p>
                    <strong className="text-foreground block">Coins</strong>
                    {catalog.data.explanations.coins}
                  </p>
                  <p>
                    <strong className="text-foreground block">
                      Booster XP
                    </strong>
                    {catalog.data.explanations.booster}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {!!account?.purchases.length && (
          <section className="mt-8">
            <h2 className="text-foreground text-base font-bold">
              Recent purchases
            </h2>
            <div className="surface-card mt-3 divide-y divide-slate-200/70 px-5 dark:divide-white/10">
              {account.purchases.map((item) => (
                <div
                  className="flex items-center justify-between gap-4 py-4"
                  key={item.id}
                >
                  <div>
                    <p className="text-foreground text-xs font-semibold">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-foreground text-xs font-bold">
                    {money(item.amount, item.currency)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="surface-card w-full max-w-md p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-foreground text-lg font-bold">
                  Confirm purchase
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  This is paid from spend-only deposited funds.
                </p>
              </div>
              <button aria-label="Close" onClick={() => setSelectedSlug(null)}>
                <X className="size-5" />
              </button>
            </div>
            <div className="bg-surface-subtle mt-5 rounded-2xl p-4">
              <p className="text-foreground text-sm font-bold">
                {selected.name}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {selected.description}
              </p>
              <p className="text-primary mt-3 text-lg font-bold">
                {money(selected.price, selected.currency)}
              </p>
            </div>
            {message && (
              <p
                className={`mt-4 rounded-xl p-3 text-xs ${purchase.isError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
              >
                {message}
              </p>
            )}
            <button
              className="bg-primary text-primary-foreground mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold disabled:opacity-60"
              disabled={purchase.isPending}
              onClick={() =>
                purchase.mutate(selected.slug, {
                  onSuccess: () => {
                    setMessage(`${selected.name} is ready to use.`);
                    setTimeout(() => setSelectedSlug(null), 900);
                  },
                  onError: (error) =>
                    setMessage(
                      error instanceof Error
                        ? error.message
                        : "Purchase failed",
                    ),
                })
              }
            >
              {purchase.isPending ? (
                <Clock3 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              {purchase.isPending ? "Processing…" : "Pay with spend-only funds"}
            </button>
            <p className="text-muted-foreground mt-3 flex items-center justify-center gap-1.5 text-[10px]">
              <ShieldCheck className="size-3.5" /> Atomic and recorded in
              transaction history
            </p>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function StatusCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Snowflake;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="surface-card flex items-center gap-3 p-4">
      <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
          {label}
        </p>
        <p className="text-foreground mt-0.5 text-sm font-bold">{value}</p>
        <p className="text-muted-foreground mt-0.5 truncate text-[10px]">
          {detail}
        </p>
      </div>
    </article>
  );
}
