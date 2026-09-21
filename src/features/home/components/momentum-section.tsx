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
      <div className="mx-auto mt-10 max-w-2xl text-center">
        <h2 className="text-foreground mt-4 text-[1.5rem] font-black tracking-[-0.035em] sm:text-[2rem]">
          Small wins. Consistent progress.
        </h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          Check in, keep your streak alive, and turn consistent practice into
          XP, ranks, and rewards.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="surface-card from-primary to-primary-strong text-primary-foreground relative overflow-hidden bg-linear-to-br p-6 sm:p-7">
          <div className="pointer-events-none absolute -right-16 -bottom-20 z-0 size-56 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -bottom-12 z-0 size-40 rounded-full border border-white/10" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase">
                {/* <span className="size-1.5 rounded-full bg-emerald-300" />{" "} */}
                Today’s check-in
              </span>
              <h3 className="mt-4 text-[1.4rem] font-bold sm:text-2xl">
                Keep your momentum going
              </h3>
              <p className="max-w-sm text-sm leading-6 opacity-80">
                Come back each day to grow your streak and unlock better bonus
                rewards.
              </p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/15">
              <SaxCalendarTickBulk className="size-6" />
            </span>
          </div>
          <div className="relative z-10 mt-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-bold">
                <SaxAwardBulk className="size-5 text-amber-300" /> +2 XP today
              </div>
              <div className="mt-3 h-1.5 w-44 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-4/5 rounded-full bg-amber-300" />
              </div>
              <p className="mt-1.5 text-[10px] opacity-70">
                One check-in away from your next bonus
              </p>
            </div>
            <Link
              href="/rewards"
              className="bg-surface text-foreground hover:bg-surface-subtle relative z-20 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[.8rem] font-semibold shadow-sm transition-colors"
            >
              View rewards
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {MOMENTUM_STATS.map(({ label, value, icon: Icon, color }) => (
            <div
              className="surface-card flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5"
              key={label}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-2xl ${color}`}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-foreground text-[1rem] leading-none font-bold">
                  {value}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
