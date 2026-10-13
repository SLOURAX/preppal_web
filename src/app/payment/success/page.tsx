"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Crown,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { getCheckoutStatus, type Membership } from "@/features/payments";
import { useAuthStore } from "@/store";

function PaymentSuccessContent() {
  const params = useSearchParams();
  const checkoutId = params.get("checkout_id");
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const [status, setStatus] = useState<
    "PENDING" | "SUCCEEDED" | "FAILED" | "EXPIRED"
  >(checkoutId ? "PENDING" : "FAILED");
  const [purpose, setPurpose] = useState<
    "WALLET_DEPOSIT" | "PLAN_PURCHASE" | null
  >(null);
  const [confirmedMembership, setConfirmedMembership] =
    useState<Membership | null>(null);

  useEffect(() => {
    if (!checkoutId) return;
    let stopped = false;
    let attempts = 0;
    const check = async () => {
      try {
        const result = await getCheckoutStatus(checkoutId);
        if (stopped) return;
        setPurpose(result.purpose);
        if (result.status === "SUCCEEDED") {
          await restoreSession();
          if (stopped) return;
          setConfirmedMembership(useAuthStore.getState().membership);
          setStatus("SUCCEEDED");
          return;
        }
        if (result.status === "FAILED" || result.status === "EXPIRED") {
          setStatus(result.status);
          return;
        }
      } catch {
        // The webhook can arrive just after the redirect; retry briefly.
      }
      attempts += 1;
      if (!stopped && attempts < 15) window.setTimeout(check, 2_000);
    };
    void check();
    return () => {
      stopped = true;
    };
  }, [checkoutId, restoreSession]);

  const succeeded = status === "SUCCEEDED";
  const failed = status === "FAILED" || status === "EXPIRED";
  const isPlanPurchase = succeeded && purpose === "PLAN_PURCHASE";
  const accessEnd = confirmedMembership?.currentPeriodEnd
    ? new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(confirmedMembership.currentPeriodEnd))
    : null;
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-16">
      <section className="surface-card w-full max-w-md p-7 text-center sm:p-9">
        <span
          className={`mx-auto grid size-14 place-items-center rounded-2xl ${succeeded ? "bg-emerald-500/10 text-emerald-600" : failed ? "bg-rose-500/10 text-rose-600" : "bg-primary/10 text-primary"}`}
        >
          {succeeded ? (
            isPlanPurchase ? (
              <Crown className="size-7" />
            ) : (
              <CheckCircle2 className="size-7" />
            )
          ) : failed ? (
            <ShieldCheck className="size-7" />
          ) : (
            <LoaderCircle className="size-7 animate-spin" />
          )}
        </span>
        <h1 className="text-foreground mt-5 text-xl font-black">
          {succeeded
            ? isPlanPurchase
              ? `${confirmedMembership?.plan.name ?? "Premium"} is active`
              : "Payment confirmed"
            : failed
              ? "Payment was not completed"
              : "Confirming your payment"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          {succeeded
            ? isPlanPurchase
              ? "Your subscription was confirmed and your premium access is ready."
              : "Your Preppal wallet has been updated."
            : failed
              ? "No account balance or plan access was changed."
              : "Bachs is securely confirming the transaction. You can leave this page; your account will be updated automatically once the payment is confirmed."}
        </p>
        {isPlanPurchase && confirmedMembership ? (
          <div className="border-border bg-surface-subtle/70 mt-6 rounded-2xl border p-4 text-left">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground text-xs font-semibold">
                Your plan
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                Active
              </span>
            </div>
            <p className="text-foreground mt-2 text-base font-black">
              {confirmedMembership.plan.name}
            </p>
            {accessEnd ? (
              <p className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                <CalendarDays className="text-primary size-4" />
                Access ends on {accessEnd}
              </p>
            ) : null}
          </div>
        ) : null}
        <Link
          className="bg-primary text-primary-foreground mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl text-sm font-bold"
          href={
            succeeded
              ? isPlanPurchase
                ? "/dashboard?tab=account"
                : "/wallet"
              : "/pricing"
          }
        >
          {succeeded
            ? isPlanPurchase
              ? "View subscription"
              : "View wallet"
            : "Back to pricing"}
        </Link>
      </section>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
