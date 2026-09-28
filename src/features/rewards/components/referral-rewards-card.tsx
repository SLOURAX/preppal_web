"use client";

import { CheckCircle2, Copy, Hash, Link2, Share2, Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import Link from "next/link";

import { DataState } from "@/components/ui";

type CopiedValue = "code" | "link" | null;

export const REFERRALS = [
  { name: "Amaka O.", status: "Completed first quiz", reward: "+50 XP" },
  { name: "Daniel K.", status: "Invite sent", reward: "Pending" },
  { name: "Fatima A.", status: "Invite sent", reward: "Pending" },
] as const;

export function ReferralRewardsCard({ summary }: { summary: any }) {
  const [copiedValue, setCopiedValue] = useState<CopiedValue>(null);

  const copyValue = async (
    kind: Exclude<CopiedValue, null>,
    value: string,
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(kind);
      window.setTimeout(() => setCopiedValue(null), 1800);
    } catch {
      setCopiedValue(null);
    }
  };

  const shareValue = async (label: string, value: string): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Preppal ${label}`, text: value });
      } catch {
        return;
      }
      return;
    }
    await copyValue(label === "Referral code" ? "code" : "link", value);
  };

  return (
    <section className="surface-card flex flex-col p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <Users className="size-5" />
        </span>
        <div>
          <h2 className="text-foreground text-[.85rem] font-bold">
            Invite friends
          </h2>
          <p className="text-muted-foreground mt-0.5 text-[.75rem]">
            Earn 50 XP when a friend joins and completes their first quiz.
          </p>
        </div>
      </div>

      <dl className="bg-surface mt-6 grid grid-cols-3 rounded-2xl p-4">
        {[
          { label: "Invited", value: summary?.referrals?.length ?? 0 },
          {
            label: "Activated",
            value:
              summary?.referrals?.filter(
                (item: any) => item.status === "ACTIVATED",
              ).length ?? 0,
          },
          {
            label: "XP earned",
            value:
              summary?.referrals?.reduce(
                (total: number, item: any) => total + (item.rewardPoints ?? 0),
                0,
              ) ?? 0,
          },
        ].map((stat) => (
          <div className="text-center" key={stat.label}>
            <dd className="text-primary text-[.9rem] font-semibold">
              {stat.value}
            </dd>
            <dt className="text-muted-foreground mt-0.5 text-[.75rem] font-medium sm:text-[.75rem]">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-foreground text-[.85rem] font-semibold">
            Your invites
          </p>
          <div className="flex items-center gap-3">
            <Link
              className="text-primary inline-flex items-center text-[12px] font-bold"
              href="/rewards/referrals"
            >
              View all
            </Link>
          </div>
        </div>
        {(summary?.referrals?.length ?? 0) ? (
          <div className="divide-y !divide-[#e5e5e5] rounded-xl border !border-[#e5e5e5] px-3 dark:divide-white/10 dark:border-white/10">
            {summary.referrals.slice(0, 3).map((referral: any) => (
              <div
                className="flex items-center justify-between gap-5 py-4"
                key={referral.name}
              >
                <div className="min-w-0">
                  <p className="text-foreground truncate text-[.75rem] font-semibold">
                    {referral.name}
                  </p>
                </div>
                <span
                  className={
                    referral.status === "ACTIVATED"
                      ? "text-success text-[10px] font-bold"
                      : "text-muted-foreground text-[10px] font-medium"
                  }
                >
                  {referral.status === "ACTIVATED" ? "+50 XP" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <DataState
            title="No invites yet"
            description="Your invited friends and XP rewards will appear here."
          />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <ReferralValue
          copied={copiedValue === "code"}
          icon={<Hash className="size-4" />}
          label="Referral code"
          onCopy={() => copyValue("code", summary?.referralCode ?? "")}
          onShare={() =>
            shareValue("Referral code", summary?.referralCode ?? "")
          }
          value={summary?.referralCode ?? ""}
        />
        <ReferralValue
          copied={copiedValue === "link"}
          icon={<Link2 className="size-4" />}
          label="Referral link"
          onCopy={() => copyValue("link", summary?.referralLink ?? "")}
          onShare={() =>
            shareValue("Referral link", summary?.referralLink ?? "")
          }
          value={summary?.referralLink ?? ""}
        />
      </div>
    </section>
  );
}

interface ReferralValueProps {
  readonly copied: boolean;
  readonly icon: ReactNode;
  readonly label: string;
  readonly onCopy: () => void;
  readonly onShare: () => void;
  readonly value: string;
}

function ReferralValue({
  copied,
  icon,
  label,
  onCopy,
  onShare,
  value,
}: ReferralValueProps) {
  return (
    <div className="bg-surface flex min-w-0 items-center gap-3 rounded-xl border !border-[#e5e5e5] p-2.5 dark:border-white/10">
      <span className="text-muted-foreground grid size-8 shrink-0 place-items-center">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
          {label}
        </p>
        <p className="text-foreground truncate text-xs font-semibold">
          {value}
        </p>
      </div>
      <button
        aria-label={`Share ${label.toLowerCase()}`}
        className="hover:bg-surface text-muted-foreground hover:text-foreground grid size-9 shrink-0 place-items-center rounded-lg transition-colors"
        onClick={onShare}
        type="button"
      >
        <Share2 className="size-4" />
      </button>
      <button
        aria-label={`Copy ${label.toLowerCase()}`}
        className="hover:bg-surface text-muted-foreground hover:text-foreground grid size-9 shrink-0 place-items-center rounded-lg transition-colors"
        onClick={onCopy}
        type="button"
      >
        {copied ? (
          <CheckCircle2 className="text-success size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
