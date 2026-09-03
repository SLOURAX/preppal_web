"use client";

import { WalletOverview } from "@/features/wallet";
import { useAuthStore } from "@/store";

export function WalletTab() {
  const preppalBalance = useAuthStore((s) => s.preppalBalance);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-foreground text-xl font-bold">Wallet</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your Preppal coins and track your earnings.
        </p>
      </div>
      <WalletOverview balance={preppalBalance} />
    </div>
  );
}
