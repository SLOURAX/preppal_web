import { apiClient } from "@/lib/api/client";

export interface Membership {
  plan: {
    slug: "free" | "monthly" | "annual";
    name: string;
    interval: "FREE" | "MONTH" | "YEAR";
    amountMinor: number;
    currency: string;
  };
  status: "ACTIVE" | "CANCELED" | "EXPIRED" | "PAST_DUE";
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  isPremium: boolean;
}

export interface CheckoutResult {
  paymentId: string;
  checkoutId: string;
  checkoutUrl: string;
  expiresAt: string | null;
}

export interface PayoutAccount {
  bankCode: string;
  bankName: string;
  accountNumberLast4: string;
  accountName: string;
  providerStatus: string | null;
  statusReason: string | null;
  reviewedAt: string | null;
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  isUsable: boolean;
}

export const getMembership = () =>
  apiClient<Membership>("/api/v1/payments/membership");

export const createPlanCheckout = (plan: "monthly" | "annual") =>
  apiClient<CheckoutResult>("/api/v1/payments/checkout/plan", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });

export const createDepositCheckout = (amountNgn: number) =>
  apiClient<CheckoutResult>("/api/v1/payments/checkout/deposit", {
    method: "POST",
    body: JSON.stringify({ amountNgn }),
  });

export const getPayoutAccount = () =>
  apiClient<PayoutAccount | null>("/api/v1/payments/payouts/account");

export const getNigerianBanks = () =>
  apiClient<Array<{ name: string; code: string }>>(
    "/api/v1/payments/payouts/banks",
  );

export const linkPayoutAccount = (input: {
  bankCode: string;
  accountNumber: string;
}) =>
  apiClient<PayoutAccount>("/api/v1/payments/payouts/account", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const resolveNigerianBankAccount = (input: {
  bankCode: string;
  accountNumber: string;
}) =>
  apiClient<{ bankCode: string; bankName: string; accountNumber: string; accountName: string }>(
    "/api/v1/payments/payouts/resolve-account",
    { method: "POST", body: JSON.stringify(input) },
  );

export const createPayout = (coins: number) =>
  apiClient<{ id: string; status: string }>("/api/v1/payments/payouts", {
    method: "POST",
    body: JSON.stringify({ coins }),
  });

export const getPaymentStatus = (paymentId: string) =>
  apiClient<{ status: string }>(`/api/v1/payments/${paymentId}/status`);

export const getCheckoutStatus = (checkoutId: string) =>
  apiClient<{
    id: string;
    purpose: "WALLET_DEPOSIT" | "PLAN_PURCHASE";
    status: "PENDING" | "SUCCEEDED" | "FAILED" | "EXPIRED" | "REFUNDED";
    completedAt: string | null;
  }>(`/api/v1/payments/checkout/${encodeURIComponent(checkoutId)}/status`);
