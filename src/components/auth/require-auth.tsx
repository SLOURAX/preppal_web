"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store";

export function RequireAuth({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }
    setChecked(true);
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <main className="bg-background flex min-h-[60vh] items-center justify-center px-5 py-16">
        <section className="surface-card w-full max-w-sm p-6 text-center">
          <h1 className="text-foreground text-lg font-bold">Sign in to continue</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Your learning progress and account activity are private to you.
          </p>
          <Link
            className="bg-primary text-primary-foreground mt-5 inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold"
            href={`/login?returnTo=${encodeURIComponent(pathname)}`}
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  return checked ? children : null;
}
