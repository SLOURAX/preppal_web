import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpenCheck, Sparkles, Trophy } from "lucide-react";

interface TrustPillar {
  readonly title: string;
  readonly detail: string;
  readonly tag: string;
  readonly variant: "content" | "practice" | "rewards";
  readonly icon: typeof BookOpenCheck;
  readonly badgeBg: string;
  readonly borderGlow: string;
  readonly tagColor: string;
}

const TRUST_POINTS: readonly TrustPillar[] = [
  {
    title: "Curated Exam Pathways",
    detail: "JAMB, WAEC & NECO questions authored to syllabus standards with line-by-line working.",
    tag: "Exam Syllabus Aligned",
    variant: "content",
    icon: BookOpenCheck,
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    borderGlow: "hover:border-violet-500/40 hover:shadow-[0_12px_32px_rgba(139,92,246,0.12)]",
    tagColor: "text-violet-700 bg-violet-50 dark:bg-violet-950/50 dark:text-violet-300 border-violet-200 dark:border-violet-900/50",
  },
  {
    title: "Interactive AI Guidance",
    detail: "Instant, friendly breakdowns and guided hints when you get stuck on tricky concepts.",
    tag: "Step-by-step Reasoning",
    variant: "practice",
    icon: Sparkles,
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20",
    borderGlow: "hover:border-fuchsia-500/40 hover:shadow-[0_12px_32px_rgba(217,70,239,0.12)]",
    tagColor: "text-fuchsia-700 bg-fuchsia-50 dark:bg-fuchsia-950/50 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-900/50",
  },
  {
    title: "Transparent XP & Coins",
    detail: "Every quiz and daily streak earns XP that you can convert directly into real perks.",
    tag: "Measurable Milestones",
    variant: "rewards",
    icon: Trophy,
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    borderGlow: "hover:border-amber-500/40 hover:shadow-[0_12px_32px_rgba(245,158,11,0.12)]",
    tagColor: "text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-900/50",
  },
] as const;

const MASCOT_BY_VARIANT = {
  content: "/assets/mascots/thinking.png",
  practice: "/assets/mascots/encouraging.png",
  rewards: "/assets/mascots/proud.png",
} as const;

export function TrustSection() {
  return (
    <section className="overflow-hidden px-4 py-10 sm:px-8 sm:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        {/* Left column: headline & mission statement */}
        <div className="flex flex-col items-start">
          
          <h2 className="text-foreground mt-4 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            Built for the progress that matters most.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-[.85rem] leading-">
            From professionally authored questions to transparent rewards, every
            part of Preppal is designed to make consistent learning feel
            focused, useful, and genuinely rewarding.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              className="bg-primary text-primary-foreground hover:bg-primary-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all hover:gap-3"
              href="/about"
            >
              See how Preppal works <ArrowRight className="size-4" />
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              href="/quiz"
            >
              Try a sample quiz <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right column: 3 interactive frosted pillar cards */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            const mascotSrc = MASCOT_BY_VARIANT[point.variant];
            return (
              <article
                key={point.variant}
                className={`group surface-card border-border/80 relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4.5 transition-all duration-300 hover:-translate-y-0.5 sm:gap-5 sm:p-5 ${point.borderGlow}`}
              >
                {/* Mascot visual avatar frame */}
                <div className="relative shrink-0">
                  <div
                    className={`relative grid size-18 place-items-center rounded-2xl border sm:size-20 ${point.badgeBg}`}
                  >
                    <Image
                      alt=""
                      className={`relative z-10 size-16 object-contain transition-transform duration-300 group-hover:scale-110 sm:size-18 ${
                        point.variant === "content"
                          ? "hue-rotate-[8deg]"
                          : point.variant === "practice"
                            ? "hue-rotate-[55deg] saturate-150"
                            : "hue-rotate-[-18deg] saturate-125"
                      }`}
                      height={76}
                      src={mascotSrc}
                      width={76}
                    />
                  </div>
                  {/* Mini floating category icon bubble */}
                  <span
                    className={`border-background absolute -right-1.5 -bottom-1.5 grid size-6 place-items-center rounded-full border-2 shadow-sm ${point.badgeBg}`}
                  >
                    <Icon className="size-3" />
                  </span>
                </div>

                {/* Card copy & badge */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* <span
                      className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${point.tagColor}`}
                    >
                      {point.tag}
                    </span> */}
                  </div>
                  <h3 className="text-foreground mt-1.5 text-sm font-bold sm:text-base">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-5 sm:text-[.8rem]">
                    {point.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
