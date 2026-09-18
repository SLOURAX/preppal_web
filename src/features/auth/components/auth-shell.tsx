import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PropsWithChildren } from "react";

export function AuthShell({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-7 sm:px-6 md:min-h-[calc(100dvh-7rem)]">
      <section
        className="w-full max-w-3xl lg:w-[45%]"
        aria-label="Preppal account access"
      >
        <div className="p-5 sm:p-7">
          <Link className="text-muted-foreground hover:text-foreground mb-5 inline-flex items-center gap-2 text-sm font-medium transition-colors" href="/"><ArrowLeft className="size-4" /> Back</Link>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
