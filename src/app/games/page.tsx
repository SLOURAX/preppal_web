"use client";

import {
  SaxChartSuccessBulk,
  SaxGameBulk,
  SaxLock1Bulk,
  SaxMedalStarBulk,
  SaxTimer1Bulk,
  SaxWallet3Bulk,
} from "@meysam213/iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store";

const COMING_SOON = [
  {
    title: "Word Blitz",
    detail: "Build vocabulary under pressure.",
    icon: SaxChartSuccessBulk,
  },
  {
    title: "Memory Match",
    detail: "Train recall with exam facts.",
    icon: SaxMedalStarBulk,
  },
] as const;

export default function GamesPage() {
  const experiencePoints = useAuthStore((state) => state.experiencePoints);
  const preppalBalance = useAuthStore((state) => state.preppalBalance);

  return (
    <main className="bg-background min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="to-primary shadow-primary/20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24145f] via-[#4023ad] p-6 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
          <div className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold tracking-wide">
              <SaxLock1Bulk className="size-4" /> GAMES ARE COMING SOON
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              New games are on the way.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              New learning games are in the works. Check back soon for short,
              focused challenges built around your exam goals.
            </p>
          </div>
          <div className="relative mt-7 flex flex-wrap gap-3 text-xs font-semibold text-white/85">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
              <SaxLock1Bulk className="size-4 text-amber-300" /> New challenges
              coming soon
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
              <SaxTimer1Bulk className="size-4 text-cyan-200" /> Made for quick
              study breaks
            </span>
          </div>
          <div className="relative mt-6 flex w-full max-w-xs items-center gap-3 rounded-2xl border border-white/15 bg-[#21194d]/70 px-4 py-3 backdrop-blur-sm sm:absolute sm:right-8 sm:bottom-8 sm:mt-0 sm:w-auto">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-violet-200">
              <SaxWallet3Bulk className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-wide text-white/60 uppercase">
                Game wallet
              </p>
              <div className="mt-0.5 flex items-center gap-3 text-sm font-bold">
                <span>{experiencePoints.toLocaleString()} XP</span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1">
                  <Image
                    alt=""
                    className="size-4 object-contain"
                    height={16}
                    src="/assets/coins/preppal-coin.png"
                    width={16}
                  />{" "}
                  {preppalBalance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="surface-card mt-6 overflow-hidden p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-2xl">
                <SaxGameBulk className="size-5" />
              </span>
              <div>
                <p className="text-primary text-[10px] font-bold tracking-[0.18em] uppercase">
                  Coming soon
                </p>
                <h2 className="text-foreground mt-1 text-xl font-bold">
                  Quick Math Sprint
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  A fast, friendly number challenge is being prepared.
                </p>
              </div>
            </div>
            <span className="bg-surface-subtle text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
              <SaxLock1Bulk className="size-3.5" /> Not available yet
            </span>
          </div>

          <div className="from-primary/5 to-surface-subtle mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-r p-5 text-center sm:flex-row sm:p-6 sm:text-left">
            <div>
              <p className="text-foreground text-sm font-semibold">
                We’re getting the first challenge ready.
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Games will appear here when they’re ready to play.
              </p>
            </div>
            <Link
              className="bg-surface text-foreground border-border inline-flex min-h-10 items-center gap-2 rounded-full border px-5 text-sm font-bold"
              href="/dashboard"
            >
              Back to dashboard
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-[11px] font-bold tracking-[0.18em] uppercase">
                In development
              </p>
              <h2 className="text-foreground mt-1 text-xl font-bold">
                Coming soon
              </h2>
            </div>
            <SaxLock1Bulk className="text-muted-foreground size-5" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {COMING_SOON.map(({ title, detail, icon: Icon }) => (
              <article
                className="surface-card flex items-center gap-4 p-5 opacity-80"
                key={title}
              >
                <span className="bg-surface-subtle text-muted-foreground grid size-11 place-items-center rounded-2xl">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="blur-sm select-none" aria-hidden="true">
                    <h3 className="text-foreground text-sm font-semibold">
                      {title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {detail}
                    </p>
                  </div>
                  <span className="text-muted-foreground mt-2 inline-block text-[10px] font-bold tracking-wide uppercase">
                    Coming soon
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
