"use client";

import {
  SaxCopyBulk,
  SaxCopySuccessBulk,
  SaxGiftBulk,
  SaxPeopleBulk,
  SaxProfileAddBulk,
  SaxShareBulk,
} from "@meysam213/iconsax-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui";
import { useAuthStore } from "@/store";

const REFERRAL_STEPS = [
  "Share your personal invite link",
  "Your friend joins and completes a quiz",
  "You both receive Preppal points",
] as const;

const REFERRAL_MILESTONES = [
  { friends: 1, reward: "100 P" },
  { friends: 3, reward: "400 P" },
  { friends: 5, reward: "800 P" },
] as const;

export function ReferralSection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.userName);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const referralCode = `${userName.split(" ")[0]?.toUpperCase() ?? "PREPPAL"}50`;
  const referralUrl = `https://preppal.app/invite/${referralCode}`;

  const copyReferralLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(referralUrl);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 1800);
  };

  const shareReferralLink = async (): Promise<void> => {
    if (navigator.share) {
      await navigator.share({
        title: "Join me on Preppal",
        text: "Practise smarter, earn points, and learn with me on Preppal.",
        url: referralUrl,
      });
      return;
    }
    await copyReferralLink();
  };

  return (
    <section className="surface-card overflow-hidden">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.035em]">
            Learn together. Earn together.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-6">
            Invite your friends to practise with Preppal. Once they complete
            their first quiz, you both earn bonus points.
          </p>

          <ol className="mt-6 space-y-3">
            {REFERRAL_STEPS.map((step, index) => (
              <li className="flex items-center gap-3 text-sm" key={step}>
                <span className="bg-primary/10 text-primary grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>

          {isAuthenticated ? (
            <div className="mt-7">
              <div className="bg-surface-subtle flex min-w-0 items-center justify-between gap-3 rounded-2xl p-2 pl-4">
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[11px]">
                    Your invite link
                  </p>
                  <p className="text-foreground truncate text-sm font-semibold">
                    {referralUrl}
                  </p>
                </div>
                <button
                  aria-label="Copy referral link"
                  className="bg-surface text-primary grid size-10 shrink-0 place-items-center rounded-xl shadow-sm"
                  onClick={copyReferralLink}
                  type="button"
                >
                  {hasCopied ? (
                    <SaxCopySuccessBulk className="size-4" />
                  ) : (
                    <SaxCopyBulk className="size-4" />
                  )}
                </button>
              </div>
              <Button className="mt-3 gap-2" onClick={shareReferralLink}>
                <SaxShareBulk className="size-4" /> Invite friends
              </Button>
            </div>
          ) : (
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary-strong mt-7 inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors"
              href="/register"
            >
              <SaxProfileAddBulk className="size-4" /> Create an account to
              invite
            </Link>
          )}
        </div>

        <div className="from-primary/15 via-primary/5 to-surface flex flex-col justify-center bg-gradient-to-br p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm">Referral progress</p>
              <p className="text-foreground mt-1 text-2xl font-bold">
                2 of 5 friends
              </p>
            </div>
            <span className="bg-primary text-primary-foreground grid size-12 place-items-center rounded-2xl">
              <SaxPeopleBulk className="size-6" />
            </span>
          </div>
          <div className="bg-surface-subtle mt-5 h-2 overflow-hidden rounded-full">
            <div className="bg-primary h-full w-2/5 rounded-full" />
          </div>
          <ul className="divide-border mt-6 divide-y">
            {REFERRAL_MILESTONES.map((milestone) => (
              <li
                className="flex items-center justify-between gap-4 py-3"
                key={milestone.friends}
              >
                <span className="text-muted-foreground text-sm">
                  Invite {milestone.friends} friend
                  {milestone.friends === 1 ? "" : "s"}
                </span>
                <span className="text-foreground flex items-center gap-1.5 text-sm font-semibold">
                  <SaxGiftBulk className="text-primary size-4" />{" "}
                  {milestone.reward}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-xs">
            Reward values are examples and can be configured before launch.
          </p>
        </div>
      </div>
    </section>
  );
}
