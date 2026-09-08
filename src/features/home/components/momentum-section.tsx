"use client";

import {
  SaxAwardBulk,
  SaxCalendarTickBulk,
  SaxChartSuccessBulk,
  SaxCrown1Bulk,
  SaxFlag2Bulk,
} from "@meysam213/iconsax-react";
import Link from "next/link";

const MOMENTUM_STATS = [
  {
    label: "Current streak",
    value: "7 days",
    icon: SaxChartSuccessBulk,
    color: "text-orange-500 bg-orange-500/10",
  },
  {
    label: "Weekly goal",
    value: "4 of 6",
    icon: SaxFlag2Bulk,
    color: "text-success bg-success/10",
  },
  {
    label: "Weekly rank",
    value: "#4",
    icon: SaxCrown1Bulk,
    color: "text-amber-500 bg-amber-500/10",
  },
] as const;

export function MomentumSection() {
  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.035em]">
          Small wins. Consistent progress.
        </h2>
        <p className="text-muted-foreground text-sm leading-6">
          Check in, keep your streak alive, and turn consistent practice into
          XP, ranks, and rewards.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="surface-card from-primary to-primary-strong text-primary-foreground bg-gradient-to-br p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium opacity-80">Today’s check-in</p>
              <h3 className="mt-2 text-2xl font-bold">
                Keep your momentum going
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 opacity-80">
                Come back each day to grow your streak and unlock better bonus
                rewards.
              </p>
            </div>
            <SaxCalendarTickBulk className="size-8 shrink-0" />
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-bold">
              <SaxAwardBulk className="size-5 text-amber-300" /> +2 XP today
            </div>
            <Link
              href="/rewards"
              className="bg-surface text-foreground hover:bg-surface-subtle inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              View rewards
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {MOMENTUM_STATS.map(({ label, value, icon: Icon, color }) => (
            <div
              className="surface-card flex items-center gap-4 p-4"
              key={label}
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ${color}`}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-foreground font-semibold">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
