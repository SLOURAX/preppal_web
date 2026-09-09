import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  SaxBag2Bulk,
  SaxGiftBulk,
  SaxInfoCircleBulk,
} from "@meysam213/iconsax-react";

import { AppShell } from "@/components/layout";

const PREVIEW_ITEMS = [
  {
    title: "Study essentials",
    detail: "Notebooks, flashcards, and revision kits",
    icon: SaxBag2Bulk,
  },
  {
    title: "Digital gift cards",
    detail: "Redeem coins with your favourite stores",
    icon: SaxGiftBulk,
  },
] as const;

export default function MarketplacePage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-semibold"
          href="/rewards"
        >
          <ArrowLeft className="size-4" /> Back to rewards
        </Link>
        <section className="from-primary/15 via-primary/5 to-surface relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(135deg,transparent_25%,color-mix(in_srgb,var(--primary)_8%,transparent)_25%,color-mix(in_srgb,var(--primary)_8%,transparent)_26%,transparent_26%,transparent_75%,color-mix(in_srgb,var(--primary)_8%,transparent)_75%,color-mix(in_srgb,var(--primary)_8%,transparent)_76%,transparent_76%)] [background-size:34px_34px] opacity-40" />
          <div className="relative max-w-2xl">
            <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold">
              <SaxInfoCircleBulk className="size-4" /> Coming soon
            </span>
            <h1 className="text-foreground mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              The Preppal Marketplace
            </h1>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Turn your Preppal Coins into study tools, digital rewards, and
              learner perks. We’re curating the first collection now.
            </p>
          </div>
        </section>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PREVIEW_ITEMS.map(({ title, detail, icon: Icon }) => (
            <article
              className="surface-card relative overflow-hidden p-5"
              key={title}
            >
              <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-2xl">
                <Icon className="size-5" />
              </span>
              <h2 className="text-foreground mt-4 text-sm font-semibold">
                {title}
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-5">
                {detail}
              </p>
              <span className="bg-surface-subtle text-muted-foreground mt-4 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold">
                Launching soon
              </span>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
