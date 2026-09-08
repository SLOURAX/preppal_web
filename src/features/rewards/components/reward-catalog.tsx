import {
  SaxArrowRightBulk,
  SaxAwardBulk,
  SaxCoin1Bulk,
  SaxGiftBulk,
} from "@meysam213/iconsax-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DataState } from "@/components/ui";

import { REDEEMABLE_REWARDS } from "../rewards.constants";

interface RewardCatalogProps {
  readonly balance: number;
}

export function RewardCatalog({ balance }: RewardCatalogProps) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-foreground mt-1 text-lg font-semibold">
            Redeem your Preppal Coins
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Convert your learning progress into useful perks.
          </p>
        </div>
        <Link
          className="text-primary text-xs font-semibold hover:underline"
          href="/wallet"
        >
          View wallet
        </Link>
      </div>

      {REDEEMABLE_REWARDS.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {REDEEMABLE_REWARDS.map((reward) => {
            const canRedeem = balance >= reward.cost;
            const RewardIcon =
              reward.type === "plan" ? SaxAwardBulk : SaxGiftBulk;

            return (
              <article
                className="surface-card flex items-center gap-4 p-5"
                key={reward.id}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl",
                    reward.type === "plan"
                      ? "bg-primary/10 text-primary"
                      : "bg-success/10 text-success",
                  )}
                >
                  <RewardIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground text-sm font-semibold">
                    {reward.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {reward.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-foreground flex items-center gap-1 text-xs font-semibold">
                      <SaxCoin1Bulk className="text-primary size-3.5" />
                      {reward.cost.toLocaleString()} P
                    </span>
                    {reward.type === "plan" ? (
                      <Link
                        className="bg-primary text-primary-foreground inline-flex min-h-8 items-center rounded-full px-4 text-xs font-medium transition hover:opacity-90"
                        href="/pricing"
                      >
                        View plans
                      </Link>
                    ) : (
                      <Link
                        className={cn(
                          "inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 text-xs font-bold shadow-sm transition",
                          canRedeem
                            ? "bg-primary text-primary-foreground hover:opacity-90"
                            : "bg-surface-subtle text-muted-foreground",
                        )}
                        href="/marketplace"
                      >
                        Explore marketplace
                        <SaxArrowRightBulk className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-4">
          <DataState
            title="No rewards available yet"
            description="New rewards will appear here when they are ready to redeem."
          />
        </div>
      )}
    </section>
  );
}
