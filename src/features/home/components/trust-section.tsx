import Link from "next/link";
import Image from "next/image";

const TRUST_POINTS = [
  {
    title: "Professional content",
    detail: "Questions authored for real exam pathways.",
  },
  {
    title: "AI-powered practice",
    detail: "Helpful explanations when you need them.",
  },
  {
    title: "Transparent rewards",
    detail: "See exactly how XP becomes Coins.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="overflow-hidden px-5 py-10 sm:px-10 sm:py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
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
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-10">
          {TRUST_POINTS.map(({ title, detail }) => (
            <div
              className="flex w-[calc(50%-0.5rem)] min-w-32 flex-1 basis-36 flex-col items-center text-center sm:basis-40"
              key={title}
            >
              <div className="border-primary/10 bg-surface relative grid size-28 place-items-center rounded-full border shadow-[0_8px_30px_rgb(79_46_180/0.08)] sm:size-32">
                <div className="border-primary/10 absolute inset-2 rounded-full border" />
                <Image
                  alt=""
                  className="relative z-10 size-26 object-contain sm:size-28"
                  height={85}
                  src="/owl-mascot.png"
                  width={85}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
