import Link from "next/link";
import Image from "next/image";
import {
  SaxAwardBulk,
  SaxChartSuccessBulk,
  SaxCoinBulk,
  SaxCpuChargeBulk,
  SaxCrown1Bulk,
  SaxGameBulk,
  SaxGiftBulk,
  SaxMagicStarBulk,
  SaxStar1Bulk,
} from "@meysam213/iconsax-react";
import { AppShell } from "@/components/layout";
import { AppDownloadButtons } from "@/components/ui/app-download-buttons";
import { FINANCE_PREVIEW } from "@/constants/finance";
import {
  AiQuizSection,
  MomentumSection,
  ReferralSection,
  LiveLeaderboardSection,
  FaqSection,
  WhatsAppSection,
} from "@/features/home";

interface Capability {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly detail: string;
  readonly color: string;
}

const capabilities: readonly Capability[] = [
  {
    icon: <SaxCpuChargeBulk className="h-6 w-6" />,
    title: "Learn smarter",
    detail:
      "Build mastery with professionally authored and AI-powered questions, instant explanations, and smart insights.",
    color: "text-[#8659d3] bg-[#e6e2f8] dark:bg-[#8659d3]/20",
  },
  {
    icon: <SaxCoinBulk className="h-6 w-6" />,
    title: "Earn & withdraw",
    detail:
      "Complete quizzes and learning activities to earn XP. Convert your XP into withdrawable Preppal Coins.",
    color: "text-[#f28e2b] bg-[#ebd6c8] dark:bg-[#f28e2b]/20",
  },
  {
    icon: <SaxGiftBulk className="h-6 w-6" />,
    title: "Redeem rewards",
    detail:
      "Use your Preppal Coins for gift cards, premium plans, and exclusive prizes.",
    color: "text-[#1ba472] bg-[#d0e5d9] dark:bg-[#1ba472]/20",
  },
];

const floatingStats = [
  {
    label: "Coins earned",
    value: `${FINANCE_PREVIEW.coinsEarned.toLocaleString()} coins`,
    icon: <SaxCoinBulk className="h-3.5 w-3.5 text-amber-400" />,
  },
  {
    label: "Top rank",
    value: "#4 🏆",
    icon: <SaxCrown1Bulk className="h-3.5 w-3.5 text-violet-400" />,
  },
  {
    label: "Day streak",
    value: "7 days",
    icon: <SaxChartSuccessBulk className="h-3.5 w-3.5 text-orange-400" />,
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
                <SaxStar1Bulk className="h-4 w-4" /> Get Started Free
              </Link>
              <Link
                href="/quiz"
                className="bg-surface-subtle hover:bg-border text-foreground border-border inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all"
              >
                <SaxCpuChargeBulk className="h-4 w-4" /> Try a Quiz
              </Link>
            </div>
            <div className="mt-1">
              <AppDownloadButtons />
            </div>

            <p className="text-muted-foreground mt-2 text-xs">
              Join{" "}
              <span className="text-foreground font-semibold">10,000+</span>{" "}
              students already earning while they learn
            </p>
          </div>

          <div className="relative flex h-[420px] items-center justify-center lg:h-[480px]">
            {/* ── Orthogonal circuit — connects all 9 nodes ──────── */}
            <svg
              className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
              viewBox="0 0 600 420"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <filter id="hero-glow-dot">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/*
                Node centres (viewBox 600×420, circle at 300,210):
                  Star         : 164, 74   top-left icon
                  BrainCircuit : 444, 74   top-right icon
                  Coins card   : 555, 34   far top-right stat
                  Gamepad2     : 460, 210  mid-right icon
                  DayStreak    : 545, 340  far bottom-right stat
                  Gift         : 444, 354  bottom-right icon
                  Crown        : 164, 354  bottom-left icon
                  TopRank card :  42, 210  far left stat
                  Chart        : 144, 210  mid-left icon

                Routing (right-angle segments):
                  Star → BrainCircuit  : horizontal y=74
                  BrainCircuit → Coins : up to y=34, right to x=555
                  Coins → Gamepad2     : down to y=210, left to x=460
                  Gamepad2 → DayStreak : right to x=545, down to y=340
                  DayStreak → Gift     : down to y=354, left to x=444
                  Gift → Crown         : horizontal y=354
                  Crown → TopRank      : left to x=42, up to y=210
                  TopRank → Chart      : right to x=144
                  Chart → Star         : up to y=74, right to x=164
              */}

              {/* Faint static track */}
              <path
                d="
                  M164,74 L444,74
                  L444,34 L555,34
                  L555,210 L460,210
                  L460,340 L545,340
                  L545,354 L444,354
                  L164,354
                  L42,354 L42,210
                  L144,210
                  L144,74 L164,74
                "
                fill="none"
                stroke="rgba(124,58,237,0.12)"
                strokeWidth="1"
                strokeLinejoin="round"
              />

              {/* Animated dashed stream */}
              <path
                d="
                  M164,74 L444,74
                  L444,34 L555,34
                  L555,210 L460,210
                  L460,340 L545,340
                  L545,354 L444,354
                  L164,354
                  L42,354 L42,210
                  L144,210
                  L144,74 L164,74
                "
                fill="none"
                stroke="rgba(124,58,237,0.55)"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  strokeDasharray: "6 16",
                  animation: "hero-circuit-flow 6s linear infinite",
                }}
              />

              {/* Node endpoint dots */}
              {[
                [164, 74], // Star
                [444, 74], // BrainCircuit
                [555, 34], // Coins stat
                [460, 210], // Gamepad2
                [545, 340], // DayStreak stat
                [444, 354], // Gift
                [164, 354], // Crown
                [42, 210], // TopRank stat
                [144, 210], // Chart
              ].map(([cx, cy]) => (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="white"
                  stroke="rgba(124,58,237,0.6)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Travelling orb */}
              <circle
                r="4"
                fill="rgba(124,58,237,0.95)"
                filter="url(#hero-glow-dot)"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M164,74 L444,74 L444,34 L555,34 L555,210 L460,210 L460,340 L545,340 L545,354 L444,354 L164,354 L42,354 L42,210 L144,210 L144,74 Z"
                />
              </circle>

              {/* Trailing orb */}
              <circle
                r="2.5"
                fill="rgba(245,158,11,0.9)"
                filter="url(#hero-glow-dot)"
              >
                <animateMotion
                  dur="6s"
                  begin="-3s"
                  repeatCount="indefinite"
                  path="M164,74 L444,74 L444,34 L555,34 L555,210 L460,210 L460,340 L545,340 L545,354 L444,354 L164,354 L42,354 L42,210 L144,210 L144,74 Z"
                />
              </circle>

              <style>{`
                @keyframes hero-circuit-flow {
                  to { stroke-dashoffset: -88; }
                }
              `}</style>
            </svg>

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
                    <SaxAwardBulk className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs font-bold">
                      +{FINANCE_PREVIEW.activityXp} XP earned!
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface border-border absolute -top-4 -right-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxCpuChargeBulk className="text-primary h-5 w-5" />
              </div>
              <div className="bg-surface border-border absolute top-1/2 -right-8 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxGameBulk className="h-5 w-5 text-violet-500" />
              </div>
              <div className="bg-surface border-border absolute -right-4 -bottom-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxGiftBulk className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="bg-surface border-border absolute -bottom-4 -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxCrown1Bulk className="h-5 w-5 text-amber-500" />
              </div>
              <div className="bg-surface border-border absolute top-1/2 -left-8 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxChartSuccessBulk className="h-5 w-5 text-orange-500" />
              </div>
              <div className="bg-surface border-border absolute -top-4 -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg">
                <SaxMagicStarBulk className="h-5 w-5 text-yellow-500" />
              </div>
            </div>

            {floatingStats.map((stat, i) => (
              <div
                key={i}
                className="bg-surface border-border absolute z-20 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-semibold shadow-lg"
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
              <h2 className="text-foreground text-base font-semibold mt-2">
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
        <WhatsAppSection />
        <FaqSection />
      </main>
    </AppShell>
  );
}
