import {
  Atom,
  BookOpenCheck,
  BrainCircuit,
  GraduationCap,
  Landmark,
  Sigma,
} from "lucide-react";

const PATHWAYS = [
  { label: "JAMB", icon: GraduationCap, tone: "text-primary" },
  { label: "WAEC", icon: BookOpenCheck, tone: "text-violet-500" },
  { label: "NECO", icon: Landmark, tone: "text-emerald-500" },
  { label: "Mathematics", icon: Sigma, tone: "text-amber-500" },
  { label: "Science", icon: Atom, tone: "text-cyan-500" },
  { label: "AI practice", icon: BrainCircuit, tone: "text-fuchsia-500" },
] as const;

export function ExamPathwaysMarquee() {
  return (
    <section
      aria-label="Exam pathways supported by Preppal"
      className="overflow-hidden py-7 sm:py-8 mt-10"
    >
      <div className="px-5 text-center sm:px-8">
        <h2 className="text-foreground mt-2 text-[1.1rem] font-semibold tracking-tight sm:text-[1.1rem]">
          Prepare with confidence, wherever you&apos;re starting
        </h2>
      </div>

      <div className="relative mx-auto mt-5 w-[90%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:w-1/2">
        <div className="animate-pathways-marquee flex w-max will-change-transform motion-reduce:animate-none">
          {[0, 1].map((group) => (
            <ul
              aria-hidden={group === 1}
              className="flex shrink-0 items-center gap-2 px-2 sm:gap-3"
              key={group}
            >
              {PATHWAYS.map(({ label, icon: Icon, tone }) => (
                <li className="flex items-center gap-2" key={label}>
                  <div className="flex items-center gap-2 px-1 py-2 whitespace-nowrap">
                    <Icon aria-hidden="true" className={`size-5 ${tone}`} />
                    <span className="text-foreground text-xs font-semibold sm:text-sm">
                      {label}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="border-primary/35 h-px w-5 border-t border-dashed sm:w-8"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
