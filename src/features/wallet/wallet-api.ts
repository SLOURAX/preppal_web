import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export type WalletAsset = "coin" | "xp";
export type WalletRange = "7d" | "month" | "all" | "custom";

export interface WalletActivityTransaction {
  id: string;
  reference: string;
  asset: WalletAsset;
  direction: "credit" | "debit";
  amount: number;
  label: string;
  source: string;
  createdAt: string;
}

export interface WalletActivity {
  asset: WalletAsset;
  balance: number;
  earned: number;
  redeemed: number;
  conversionRate: number;
  coinValueNgn: number;
  total: number;
  hasMore: boolean;
  transactions: WalletActivityTransaction[];
}

export interface WalletActivityFilters {
  asset: WalletAsset;
  range: WalletRange;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export function useWalletActivity(filters: WalletActivityFilters) {
  return useQuery({
    queryKey: ["wallet", "activity", filters],
    queryFn: () => {
      const params = new URLSearchParams({
        asset: filters.asset,
        range: filters.range,
        limit: String(filters.limit ?? 5),
        offset: String(filters.offset ?? 0),
      });
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      return apiClient<WalletActivity>(
        `/api/v1/wallets/activity?${params.toString()}`,
      );
    },
    staleTime: 30_000,
    enabled: filters.range !== "custom" || Boolean(filters.from && filters.to),
  });
}

export function formatWalletDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value));
}
