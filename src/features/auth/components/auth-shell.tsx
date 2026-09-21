import { Suspense, type PropsWithChildren } from "react";

import { AuthToggle } from "./auth-toggle";

export function AuthShell({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-7 sm:px-6 md:min-h-[calc(100dvh-7rem)]">
      <section
        className="w-full max-w-3xl lg:w-[45%]"
        aria-label="Preppal account access"
      >
        <div className="p-5 sm:p-7">
          <div className="mb-8">
            <Suspense fallback={null}>
              <AuthToggle />
            </Suspense>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
