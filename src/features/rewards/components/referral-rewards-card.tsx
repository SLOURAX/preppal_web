"use client";

import {
  Check,
  Copy,
  Hash,
  Link as LinkIcon,
  Share2,
  UsersRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui";

import { REFERRAL_CODE, REFERRAL_LINK } from "../rewards.constants";

type CopiedValue = "code" | "link" | null;

const REFERRAL_STATS = [
  { label: "Invited", value: "0" },
  { label: "Activated", value: "0" },
  { label: "Points earned", value: "0 P" },
] as const;

export function ReferralRewardsCard() {
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

  const shareReferralLink = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Preppal",
          text: "Learn, practise, and earn Preppal points with me.",
          url: REFERRAL_LINK,
        });
      } catch {
        return;
      }
      return;
    }

    await copyValue("link", REFERRAL_LINK);
  };

  return (
    <section className="surface-card flex flex-col p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <UsersRound className="size-5" />
        </span>
        <div>
          <h2 className="text-foreground font-semibold">Invite friends</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Earn points when a friend joins and completes their first quiz.
          </p>
        </div>
      </div>

      <dl className="bg-surface-subtle mt-6 grid grid-cols-3 rounded-2xl p-4">
        {REFERRAL_STATS.map((stat) => (
          <div className="text-center" key={stat.label}>
            <dd className="text-foreground text-lg font-semibold">
              {stat.value}
            </dd>
            <dt className="text-muted-foreground mt-0.5 text-[10px] font-medium sm:text-xs">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-2">
        <ReferralValue
          copied={copiedValue === "code"}
          icon={<Hash className="size-4" />}
          label="Referral code"
          onCopy={() => copyValue("code", REFERRAL_CODE)}
          value={REFERRAL_CODE}
        />
        <ReferralValue
          copied={copiedValue === "link"}
          icon={<LinkIcon className="size-4" />}
          label="Referral link"
          onCopy={() => copyValue("link", REFERRAL_LINK)}
          value={REFERRAL_LINK}
        />
      </div>

      <Button className="mt-4 w-full gap-2" onClick={shareReferralLink}>
        <Share2 className="size-4" /> Share invite
      </Button>
    </section>
  );
}

interface ReferralValueProps {
  readonly copied: boolean;
  readonly icon: ReactNode;
  readonly label: string;
  readonly onCopy: () => void;
  readonly value: string;
}

function ReferralValue({
  copied,
  icon,
  label,
  onCopy,
  value,
}: ReferralValueProps) {
  return (
    <div className="bg-surface-subtle flex min-w-0 items-center gap-3 rounded-xl p-2.5">
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
        aria-label={`Copy ${label.toLowerCase()}`}
        className="hover:bg-surface text-muted-foreground hover:text-foreground grid size-9 shrink-0 place-items-center rounded-lg transition-colors"
        onClick={onCopy}
        type="button"
      >
        {copied ? (
          <Check className="text-success size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
