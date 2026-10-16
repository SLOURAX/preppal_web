"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export type MarketplaceProductType =
  "STREAK_FREEZE" | "XP_BOOSTER" | "EXAM_SIMULATION";
export interface MarketplaceAccount {
  depositedBalance: number;
  currency: string;
  streakFreezes: number;
  maxStreakFreezes: number;
  booster: {
    active: boolean;
    activatedAt: string | null;
    expiresAt: string | null;
  };
  simulationCredits: number;
  purchases: Array<{
    id: string;
    name: string;
    type: MarketplaceProductType;
    amount: number;
    currency: string;
    quantity: number;
    createdAt: string;
  }>;
}
export interface MarketplaceCatalog {
  products: Array<{
    id: string;
    slug: string;
    type: MarketplaceProductType;
    name: string;
    description: string;
    price: number;
    currency: string;
    grantQuantity: number;
    durationMinutes: number | null;
  }>;
  account: MarketplaceAccount;
  explanations: { depositedFunds: string; coins: string; booster: string };
}
export function useMarketplaceCatalog() {
  return useQuery({
    queryKey: ["marketplace", "catalog"],
    queryFn: () => apiClient<MarketplaceCatalog>("/api/v1/marketplace/catalog"),
    staleTime: 30_000,
  });
}
export function usePurchaseMarketplaceProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productSlug: string) =>
      apiClient<MarketplaceAccount>("/api/v1/marketplace/purchases", {
        method: "POST",
        body: JSON.stringify({
          productSlug,
          idempotencyKey: crypto.randomUUID(),
        }),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["marketplace"] }),
        queryClient.invalidateQueries({ queryKey: ["wallet"] }),
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
      ]);
    },
  });
}
export function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
