import type { ComponentType, SVGProps } from "react";
import {
  SaxAwardBulk,
  SaxChartSuccessBulk,
  SaxCrown1Bulk,
  SaxMedalStarBulk,
  SaxRanking1Bulk,
} from "@meysam213/iconsax-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  readonly rank: 1 | 2 | 3 | 4 | 5;
  readonly name: string;
  readonly score: string;
  readonly streak: number;
}

const LEADERBOARD: readonly LeaderboardEntry[] = [
  { rank: 1, name: "Alex M.", score: "15,240 XP", streak: 14 },
  { rank: 2, name: "Sarah K.", score: "14,800 XP", streak: 9 },
  { rank: 3, name: "David L.", score: "12,950 XP", streak: 7 },
  { rank: 4, name: "Emma R.", score: "11,100 XP", streak: 5 },
  { rank: 5, name: "Michael T.", score: "10,500 XP", streak: 3 },
] as const;

interface RankStyle {
  readonly icon: ComponentType<SVGProps<SVGSVGElement>>;
  readonly label: string;
  readonly rankClass: string;
  readonly badgeClass: string;
  readonly avatarClass: string;
  readonly scoreClass: string;
}

const RANK_CONFIG: Record<1 | 2 | 3 | 4 | 5, RankStyle> = {
  1: {
    icon: SaxCrown1Bulk,
    label: "Gold",
    rankClass: "text-amber-400 font-black text-base",
    badgeClass: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
    avatarClass:
      "bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-md shadow-amber-900/50",
    scoreClass: "text-amber-400",
  },
  2: {
    icon: SaxMedalStarBulk,
    label: "Silver",
    rankClass: "text-violet-400 font-black text-base",
    badgeClass: "bg-violet-400/10 text-violet-300 border border-violet-400/20",
    avatarClass:
      "bg-gradient-to-br from-violet-400 to-indigo-600 text-white shadow-md shadow-violet-900/50",
    scoreClass: "text-violet-400",
  },
  3: {
    icon: SaxRanking1Bulk,
    label: "Bronze",
    rankClass: "text-rose-400 font-black text-base",
    badgeClass: "bg-rose-400/10 text-rose-300 border border-rose-400/20",
    avatarClass:
      "bg-gradient-to-br from-rose-400 to-orange-600 text-white shadow-md shadow-rose-900/50",
    scoreClass: "text-rose-400",
  },
  4: {
    icon: SaxRanking1Bulk,
    label: "",
    rankClass: "text-slate-500 font-bold",
    badgeClass: "",
    avatarClass: "bg-white/5 text-slate-300",
    scoreClass: "text-white",
  },
  5: {
    icon: SaxRanking1Bulk,
    label: "",
    rankClass: "text-slate-500 font-bold",
    badgeClass: "",
    avatarClass: "bg-white/5 text-slate-300",
    scoreClass: "text-white",
  },
};

export function LiveLeaderboardSection() {
  return (
    <section className="relative right-[50%] left-[50%] my-10 -mr-[50vw] -ml-[50vw] w-[100vw] overflow-hidden border-y border-white/5 bg-[#0A0A0C] py-10 sm:py-10 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.25), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Top scholars <span className="text-violet-400">this week</span>
            </h2>
            <p className="mt-2 text-[.9rem] leading-relaxed text-slate-400">
              Compete with thousands of students, climb the ranks, and earn
              bigger rewards the higher you go. Will you claim the crown?
            </p>
          </div>

          <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-md">
            <div className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="w-7 text-center text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                #
              </span>
              <span className="flex-1 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Student
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Streak
              </span>
              <span className="w-20 text-right text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Coins
              </span>
            </div>

            <ul className="relative z-10 divide-y divide-white/5">
              {LEADERBOARD.map((entry) => {
                const config = RANK_CONFIG[entry.rank];
                const Icon = config.icon;
                const isTopThree = entry.rank <= 3;
                const initials = entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <li
                    key={entry.rank}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <div
                      className={cn(
                        "w-7 text-center text-sm",
                        config.rankClass,
                      )}
                    >
                      {entry.rank}
                    </div>

                    <div className="flex flex-1 items-center gap-3">
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold",
                          config.avatarClass,
                        )}
                      >
                        {initials}
                      </span>
                      <span className="text-[.8rem] font-medium text-slate-200">
                        {entry.name}
                      </span>
                      {isTopThree && (
                        <span
                          className={cn(
                            "hidden items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold sm:flex",
                            config.badgeClass,
                          )}
                        >
                          <Icon className="size-3" />
                          {config.label}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <SaxAwardBulk className="size-3.5 text-orange-400" />
                      <span className="text-xs font-medium text-slate-300">
                        {entry.streak}d
                      </span>
                    </div>

                    <div className="w-20 text-right">
                      <span
                        className={cn(
                          "text-[.8rem] font-bold",
                          config.scoreClass,
                        )}
                      >
                        {entry.score}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-400">
                Updated weekly · Join to claim your spot
              </p>
              <a
                href="/leaderboard"
                className="text-xs font-medium text-violet-400 transition-colors hover:text-violet-300 hover:underline"
              >
                Full leaderboard →
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="pointer-events-none absolute top-1/2 left-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative aspect-square w-[90%] max-w-xs sm:w-[92%] sm:max-w-sm lg:max-w-md xl:max-w-lg">
            <svg
              className="pointer-events-none absolute inset-0 z-10 overflow-visible"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <filter id="glow-dot">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-line">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M10,74 C150,20 280,40 396,120 C430,170 430,240 388,280 C320,360 220,420 124,384 C60,380 -40,200 10,74"
                fill="none"
                stroke="rgba(167,139,250,0.10)"
                strokeWidth="1.5"
              />

              {/* Animated dashed stream */}
              <path
                d="M10,74 C150,20 280,40 396,120 C430,170 430,240 388,280 C320,360 220,420 124,384 C60,380 -40,200 10,74"
                fill="none"
                stroke="rgba(167,139,250,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#glow-line)"
                style={{
                  strokeDasharray: "10 22",
                  animation: "circuit-flow 3s linear infinite",
                }}
              />

              <circle
                r="5"
                fill="rgba(196,181,253,0.95)"
                filter="url(#glow-dot)"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M10,74 C150,20 280,40 396,120 C430,170 430,240 388,280 C320,360 220,420 124,384 C60,380 -40,200 10,74"
                />
              </circle>

              <circle
                r="3"
                fill="rgba(251,191,36,0.80)"
                filter="url(#glow-dot)"
              >
                <animateMotion
                  dur="6s"
                  begin="-1.5s"
                  repeatCount="indefinite"
                  path="M10,74 C150,20 280,40 396,120 C430,170 430,240 388,280 C320,360 220,420 124,384 C60,380 -40,200 10,74"
                />
              </circle>

              <style>{`
                @keyframes circuit-flow {
                  to { stroke-dashoffset: -128; }
                }
              `}</style>
            </svg>

            <div
              aria-label="Leaderboard and achievement"
              className="absolute top-12 -left-4 z-20 rounded-2xl border border-white/10 bg-white/8 p-3.5 shadow-[0_0_30px_rgba(124,58,237,0.35)] backdrop-blur-xl sm:-left-8 sm:p-4"
              title="Climb the leaderboard"
            >
              <SaxCrown1Bulk className="size-6 text-violet-300 sm:size-8" />
            </div>

            {/* Progress accent — top-right */}
            <div
              aria-label="Progress tracking"
              className="absolute top-1/4 -right-4 z-20 rounded-xl border border-white/10 bg-white/8 p-2.5 shadow-[0_0_28px_rgba(99,102,241,0.3)] backdrop-blur-xl sm:-right-8 sm:p-3"
              title="Track your progress"
            >
              <SaxChartSuccessBulk className="size-5 text-indigo-300 sm:size-6" />
            </div>

            {/* Achievement accent — bottom-right */}
            <div
              aria-label="Achievement rewards"
              className="absolute -right-2 bottom-1/4 z-20 rounded-2xl border border-white/10 bg-white/8 p-2.5 shadow-[0_0_24px_rgba(167,139,250,0.25)] backdrop-blur-xl sm:-right-6 sm:p-3"
              title="Unlock achievements"
            >
              <SaxAwardBulk className="size-5 text-violet-400 sm:size-6" />
            </div>

            {/* Medal accent — bottom-center */}
            <div
              aria-label="Leaderboard medals"
              className="absolute -bottom-2 left-1/4 z-20 rounded-full border border-white/10 bg-white/8 p-3 shadow-[0_0_36px_rgba(124,58,237,0.3)] backdrop-blur-xl sm:-bottom-6 sm:p-4"
              title="Earn medals"
            >
              <SaxMedalStarBulk className="size-6 text-violet-300 sm:size-8" />
            </div>

            <div className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-wide whitespace-nowrap text-violet-100 shadow-lg backdrop-blur-md sm:bottom-9 sm:px-4 sm:py-2 sm:text-xs">
              Practice <span className="mx-1 text-violet-300">→</span> Earn XP
              <span className="mx-1 text-violet-300">→</span> Climb
            </div>

            <Image
              src="/mascot-leaderboard.png"
              alt="Preppal Mascot"
              fill
              className="scale-[0.75] animate-[pulse_4s_ease-in-out_infinite] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
