import Link from "next/link";
import Image from "next/image";

const TRUST_POINTS = [
  {
    title: "Professional content",
    detail: "Questions authored for real exam pathways.",
    variant: "content",
  },
  {
    title: "AI-powered practice",
    detail: "Helpful explanations when you need them.",
    variant: "practice",
  },
  {
    title: "Transparent rewards",
    detail: "See exactly how XP becomes Coins.",
    variant: "rewards",
  },
] as const;

const MASCOT_BY_VARIANT = {
  content: "/assets/mascots/thinking.png",
  practice: "/assets/mascots/encouraging.png",
  rewards: "/assets/mascots/proud.png",
} as const;

export function TrustSection() {
  return (
    <section className="overflow-hidden px-5 py-10 sm:px-10 sm:py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-foreground mt-4 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            Built for the progress that matters most.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-6">
            From professionally authored questions to transparent rewards, every
            part of Preppal is designed to make consistent learning feel
            focused, useful, and rewarding.
          </p>
          <Link
            className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            href="/about"
          >
            See how Preppal works <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mx-auto grid w-full max-w-xl grid-cols-2 justify-items-center gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10">
          {TRUST_POINTS.map(({ variant }, index) => (
            <div
              className={`flex w-full flex-col items-center text-center ${index === 2 ? "col-span-2 max-w-[calc(50%-0.75rem)] sm:max-w-[calc(50%-1.25rem)]" : "max-w-52"}`}
              key={variant}
            >
              <div
                className={`relative grid size-32 place-items-center rounded-full border shadow-[0_8px_30px_rgb(79_46_180/0.08)] sm:size-36 ${variant === "content" ? "border-violet-200 bg-violet-50" : variant === "practice" ? "border-fuchsia-200 bg-fuchsia-50" : "border-amber-200 bg-amber-50"}`}
              >
                <div
                  className={`absolute inset-2 rounded-full border ${variant === "content" ? "border-violet-200" : variant === "practice" ? "border-fuchsia-200" : "border-amber-200"}`}
                />
                <Image
                  alt=""
                  className={`relative z-10 size-30 object-contain sm:size-34 ${variant === "content" ? "hue-rotate-[8deg]" : variant === "practice" ? "hue-rotate-[55deg] saturate-150" : "hue-rotate-[-18deg] saturate-125"}`}
                  height={110}
                  src={MASCOT_BY_VARIANT[variant]}
                  width={110}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
