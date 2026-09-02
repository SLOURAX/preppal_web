import { BadgeCent, Gift, Trophy } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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
            Use your points
          </h2>
        </div>
        <Link
          className="text-primary text-xs font-semibold hover:underline"
          href="/wallet"
        >
          View wallet
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {REDEEMABLE_REWARDS.map((reward) => {
          const canRedeem = balance >= reward.cost;
          const RewardIcon = reward.type === "plan" ? Trophy : Gift;

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
                    <BadgeCent className="text-primary size-3.5" />
                    {reward.cost.toLocaleString()} P
                  </span>
                  <Button
                    className="min-h-8 px-4 text-xs"
                    disabled={!canRedeem}
                  >
                    {canRedeem ? "Redeem" : "Keep earning"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
