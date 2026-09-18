import Link from "next/link";
import { ArrowRight, BookOpenCheck, Coins, BarChart } from "lucide-react";
import { AppShell } from "@/components/layout";

export const metadata = {
  title: "About Preppal",
  description: "Learn how Preppal helps learners prepare, progress, and earn.",
};

const PRINCIPLES = [
  {
    icon: BookOpenCheck,
    title: "Learn with purpose",
    text: "Practice with professionally authored and AI-powered questions built around real exam pathways.",
  },
  {
    icon: BarChart,
    title: "See your progress",
    text: "Get clear explanations, build streaks, and understand where every improvement comes from.",
  },
  {
    icon: Coins,
    title: "Earn as you grow",
    text: "Eligible learning activities earn XP, which can be converted into withdrawable Preppal Coins.",
  },
];

export default function AboutPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-3xl p-1 sm:p-12">
          <div className="max-w-2xl">
            <h1 className="text-foreground mt-5 text-[2.1rem] leading-[1.08] font-bold tracking-[-0.04em] sm:text-6xl">
              <span className="whitespace-nowrap">Prepare with confidence.</span>{" "}
              <span className="text-primary block text-[1em] sm:inline sm:text-inherit">Go further.</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6 sm:text-base sm:leading-7">
              Preppal is a focused learning companion for students who want
              better practice, clearer feedback, and meaningful progress toward
              their goals.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                href="/register"
              >
                Start learning <ArrowRight className="size-4" />
              </Link>
              <Link
                className="border-border text-foreground hover:bg-surface-subtle inline-flex min-h-11 items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold"
                href="/quiz"
              >
                Explore practice
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <article className="surface-card flex items-start gap-4 p-4 sm:block sm:p-6" key={title}>
              <span className="bg-primary/10 text-primary grid size-11 shrink-0 aspect-square place-items-center rounded-2xl">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0"><h2 className="text-foreground text-base font-bold sm:mt-5">
                {title}
              </h2>
              <p className="text-muted-foreground mt-1 text-[.78rem] leading-5 sm:mt-2 sm:text-sm sm:leading-6">
                {text}
              </p>
              </div>
            </article>
          ))}
        </section>
        <p className="text-muted-foreground mx-auto mt-10 max-w-2xl text-center text-sm leading-6 sm:mt-14">
          We’re building a more motivating way to prepare: one useful question,
          one clear explanation, and one small win at a time.
        </p>
      </main>
    </AppShell>
  );
}
