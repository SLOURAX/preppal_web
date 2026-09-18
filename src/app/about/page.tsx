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
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-14">
        <section className="overflow-hidden p-6 sm:p-12">
          <div className="max-w-2xl">
            <h1 className="text-foreground mt-5 text-4xl leading-[4rem] font-bold tracking-[-0.04em] sm:text-6xl">
              Prepare with confidence.{" "}
              <span className="text-primary">Go further.</span>
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-7 sm:text-[1rem]">
              Preppal is a focused learning companion for students who want
              better practice, clearer feedback, and meaningful progress toward
              their goals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                href="/register"
              >
                Start learning <ArrowRight className="size-4" />
              </Link>
              <Link
                className="border-border text-foreground hover:bg-surface-subtle inline-flex items-center rounded-xl border px-5 py-3 text-sm font-semibold"
                href="/quiz"
              >
                Explore practice
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <article className="surface-card p-5 sm:p-6" key={title}>
              <span className="bg-primary/10 text-primary grid size-11 place-items-center rounded-2xl">
                <Icon className="size-5" />
              </span>
              <h2 className="text-foreground mt-5 text-base font-bold">
                {title}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {text}
              </p>
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
