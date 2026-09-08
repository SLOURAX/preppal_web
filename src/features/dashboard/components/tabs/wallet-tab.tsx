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
          Track your XP, convert it into withdrawable Preppal Coins, and manage
          your wallet.
        </p>
      </div>
      <WalletOverview balance={preppalBalance} />
    </div>
  );
}
