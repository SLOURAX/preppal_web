import Link from "next/link";
import Image from "next/image";
import {
  BrainCircuit,
  BrainCog,
  BadgePlus,
  ChartNoAxesCombined,
  Crown,
  Gamepad2,
  Gift,
  HandCoins,
  PartyPopper,
  Star,
} from "lucide-react";
import { AppShell } from "@/components/layout";
import {
  AiQuizSection,
  MomentumSection,
  ReferralSection,
  LiveLeaderboardSection,
  FaqSection,
} from "@/features/home";

interface Capability {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly detail: string;
  readonly color: string;
}

const capabilities: readonly Capability[] = [
  {
    icon: <BrainCog className="h-6 w-6" />,
    title: "Learn smarter",
    detail:
      "Master topics with AI-generated practice exams, instant deep-dive explanations, and smart insights.",
    color: "text-[#8659d3] bg-[#e6e2f8] dark:bg-[#8659d3]/20",
  },
  {
    icon: <HandCoins className="h-6 w-6" />,
    title: "Earn coins",
    detail:
      "Every correct answer earns Preppal coins. Reward yourself for studying.",
    color: "text-[#f28e2b] bg-[#ebd6c8] dark:bg-[#f28e2b]/20",
  },
  {
    icon: <PartyPopper className="h-6 w-6" />,
    title: "Redeem prizes",
    detail: "Swap coins for gift cards, premium plans, and exclusive prizes.",
    color: "text-[#1ba472] bg-[#d0e5d9] dark:bg-[#1ba472]/20",
  },
];

const floatingStats = [
  {
    label: "Coins earned",
    value: "12,450 P",
    icon: <HandCoins className="h-3.5 w-3.5 text-amber-400" />,
  },
  {
    label: "Top rank",
    value: "#4 🏆",
    icon: <Crown className="h-3.5 w-3.5 text-violet-400" />,
  },
  {
    label: "Day streak",
    value: "7 days",
    icon: <ChartNoAxesCombined className="h-3.5 w-3.5 text-orange-400" />,
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-3 py-10 sm:px-5 lg:py-10">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-foreground text-4xl leading-[1.1] font-bold tracking-[-0.04em] sm:text-4xl lg:text-[3.2rem]">
              Prep smarter with AI. <br /> Get rewarded.
              <br />
              <span className="text-primary">Go further.</span>
            </h1>

            <p className="text-muted-foreground max-w-lg text-base leading-7">
              Preppal is your AI-powered study companion that turns exam prep
              into a rewards. Take quizzes with instant explanations, climb the
              leaderboard, and convert your hard work into real-world rewards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/register"
                className="bg-primary hover:bg-primary-strong text-primary-foreground shadow-primary/25 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all active:scale-[0.98]"
              >
                <Star className="h-4 w-4" /> Get Started Free
              </Link>
              <Link
                href="/quiz"
                className="bg-surface-subtle hover:bg-border text-foreground border-border inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all"
              >
                <BrainCircuit className="h-4 w-4" /> Try a Quiz
              </Link>
            </div>

            <p className="text-muted-foreground text-xs">
              Join{" "}
              <span className="text-foreground font-semibold">10,000+</span>{" "}
              students already earning while they learn
            </p>
          </div>

          <div className="relative flex h-[420px] items-center justify-center lg:h-[480px]">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <div className="bg-primary/20 absolute inset-0 scale-110 rounded-full blur-3xl" />
              <div className="from-primary/30 via-primary/10 border-primary/20 relative z-10 flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border bg-gradient-to-br to-transparent shadow-xl backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <Image
                    src="/owl-mascot.png"
                    alt="Preppal mascot"
                    width={112}
                    height={112}
                    className="h-56 w-56 object-contain drop-shadow-xl sm:h-72 sm:w-72"
                  />
                  <div className="bg-surface border-border relative z-20 -mt-8 flex items-center gap-1 rounded-full border px-3 py-1 shadow-sm sm:-mt-12">
                    <BadgePlus className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs font-bold">+50 coins earned!</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface border-border absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <BrainCircuit className="text-primary h-5 w-5" />
              </div>
              <div className="bg-surface border-border absolute top-1/2 -right-8 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <Gamepad2 className="h-5 w-5 text-violet-500" />
              </div>
              <div className="bg-surface border-border absolute -right-4 -bottom-4 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <Gift className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="bg-surface border-border absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <Crown className="h-5 w-5 text-amber-500" />
              </div>
              <div className="bg-surface border-border absolute top-1/2 -left-8 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <ChartNoAxesCombined className="h-5 w-5 text-orange-500" />
              </div>
              <div className="bg-surface border-border absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
            </div>

            {floatingStats.map((stat, i) => (
              <div
                key={i}
                className="bg-surface border-border absolute flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-semibold shadow-lg"
                style={{
                  top: i === 0 ? "8%" : i === 1 ? "50%" : "80%",
                  left: i === 1 ? "0%" : "auto",
                  right: i === 0 ? "0%" : i === 2 ? "5%" : "auto",
                  transform: "translateY(-50%)",
                }}
              >
                {stat.icon}
                <div>
                  <p className="text-muted-foreground mb-0.5 text-[10px] leading-none font-medium">
                    {stat.label}
                  </p>
                  <p className="text-foreground font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="Platform capabilities"
          className="bg-grid-pattern grid gap-4 rounded-[2rem] p-4 sm:p-6 md:grid-cols-3"
        >
          {capabilities.map((capability) => (
            <article
              className="surface-card group flex flex-col gap-2 p-6 transition-transform duration-200 hover:-translate-y-1"
              key={capability.title}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${capability.color}`}
              >
                {capability.icon}
              </div>
              <h2 className="text-foreground text-base font-semibold">
                {capability.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-5">
                {capability.detail}
              </p>
            </article>
          ))}
        </section>

        <AiQuizSection />
        <MomentumSection />
        <LiveLeaderboardSection />
        <ReferralSection />
        <FaqSection />
      </main>
    </AppShell>
  );
}
