"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { WalletOverview } from "@/features/wallet";
import { useAuthStore } from "@/store";

export default function WalletPage() {
  const balance = useAuthStore((state) => state.preppalBalance);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-10">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          href="/dashboard"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <div className="mt-8">
          <WalletOverview balance={balance} />
        </div>
      </main>
    </AppShell>
  );
}
