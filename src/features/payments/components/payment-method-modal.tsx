"use client";

import { CreditCard, WalletCards, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

export type PaymentMethod = "BACHS" | "WALLET";

interface PaymentMethodModalProps {
  readonly amountMinor: number;
  readonly currency: string;
  readonly depositedBalanceMinor: number;
  readonly open: boolean;
  readonly planName: string;
  readonly processing: boolean;
  readonly onClose: () => void;
  readonly onSelect: (method: PaymentMethod) => void;
}

const money = (amountMinor: number, currency: string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amountMinor / 100);

export function PaymentMethodModal({
  amountMinor,
  currency,
  depositedBalanceMinor,
  open,
  planName,
  processing,
  onClose,
  onSelect,
}: PaymentMethodModalProps) {
  const titleId = useId();
  const canUseWallet = depositedBalanceMinor >= amountMinor;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !processing) onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open, processing]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[250] grid place-items-center bg-slate-950/40 p-4 backdrop-blur-md">
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="border-border bg-surface relative w-full max-w-md rounded-3xl border p-5 shadow-2xl sm:p-6"
        role="dialog"
      >
        <button
          aria-label="Close payment options"
          className="text-muted-foreground hover:bg-surface-subtle absolute top-4 right-4 grid size-9 place-items-center rounded-xl transition disabled:opacity-40"
          disabled={processing}
          onClick={onClose}
          type="button"
        >
          <X className="size-4" />
        </button>
        <p className="text-primary text-[10px] font-bold tracking-[0.14em] uppercase">
          Payment method
        </p>
        <h2 className="text-foreground mt-1 text-lg font-bold" id={titleId}>
          Subscribe to {planName}
        </h2>
        <p className="text-muted-foreground mt-1 text-xs leading-5">
          Choose how you want to pay {money(amountMinor, currency)}. Earned
          Preppal Coins are kept separate and will never be used.
        </p>

        <div className="mt-5 space-y-3">
          <button
            className="border-border hover:border-primary/40 hover:bg-primary/5 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-55"
            disabled={processing || !canUseWallet}
            onClick={() => onSelect("WALLET")}
            type="button"
          >
            <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-2xl">
              <WalletCards className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-foreground block text-sm font-bold">
                Pay from deposited funds
              </span>
              <span className="text-muted-foreground mt-0.5 block text-[11px]">
                Available: {money(depositedBalanceMinor, currency)}
              </span>
            </span>
            <span className="text-primary text-[11px] font-bold">
              {canUseWallet ? "Use wallet" : "Insufficient"}
            </span>
          </button>

          {!canUseWallet ? (
            <p className="text-muted-foreground px-1 text-[11px] leading-4">
              You need {money(amountMinor - depositedBalanceMinor, currency)} {' '}
              more.{" "}
              <Link
                className="text-primary font-bold"
                href="/dashboard?tab=wallet"
              >
                Add funds
              </Link>
            </p>
          ) : null}

          <button
            className="border-border hover:border-primary/40 hover:bg-primary/5 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition disabled:opacity-55"
            disabled={processing}
            onClick={() => onSelect("BACHS")}
            type="button"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <CreditCard className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-foreground block text-sm font-bold">
                Pay with card or bank transfer
              </span>
              <span className="text-muted-foreground mt-0.5 block text-[11px]">
                Continue securely through Bachs checkout
              </span>
            </span>
            <span className="text-primary text-[11px] font-bold">Continue</span>
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
