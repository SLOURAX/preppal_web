"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import { AuthShell } from "@/features/auth";
import { RequireAuth } from "@/components/auth";

import { NavBar } from "../navigation";
import { Footer } from "./footer";

const AUTH_ROUTES: readonly string[] = [
  "/login",
  "/register",
  "/forgot-password",
];

// Routes that render their own full-page chrome (no shared nav/footer)
const STANDALONE_ROUTES: readonly string[] = [
  "/dashboard",
  "/quiz/active",
  "/quiz/preview",
  "/quiz/review",
  "/quiz/results",
];

const AUTH_REQUIRED_ROUTES: readonly string[] = [
  "/dashboard",
  "/wallet",
  "/notifications",
  "/marketplace",
  "/games",
  "/rewards/referrals",
  "/quiz/active",
  "/quiz/preview",
  "/quiz/results",
  "/quiz/review",
];

export function SiteChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isStandalone = STANDALONE_ROUTES.some((r) => pathname.startsWith(r));
  const requiresAuth = AUTH_REQUIRED_ROUTES.some((r) => pathname.startsWith(r));

  const protectedChildren = requiresAuth ? (
    <RequireAuth>{children}</RequireAuth>
  ) : (
    children
  );

  if (isStandalone)
    return (
      <>
        {protectedChildren}
        {/* Floating support temporarily disabled. */}
      </>
    );

  return (
    <>
      <NavBar />
      {isAuthRoute ? (
        <AuthShell>{children}</AuthShell>
      ) : (
        <>
          {protectedChildren}
          <Footer />
          {/* Floating support temporarily disabled. */}
        </>
      )}
    </>
  );
}
