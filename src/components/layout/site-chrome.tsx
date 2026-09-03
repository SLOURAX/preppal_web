"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { AuthShell } from "@/features/auth";

import { NavBar } from "../navigation";
import { Footer } from "./footer";

const AUTH_ROUTES: readonly string[] = [
  "/login",
  "/register",
  "/forgot-password",
];

// Routes that render their own full-page chrome (no shared nav/footer)
const STANDALONE_ROUTES: readonly string[] = ["/dashboard", "/quiz/active"];

export function SiteChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));

  if (isStandalone) return <>{children}</>;

  return (
    <>
      <NavBar />
      {isAuthRoute ? (
        <AuthShell>{children}</AuthShell>
      ) : (
        <>
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

