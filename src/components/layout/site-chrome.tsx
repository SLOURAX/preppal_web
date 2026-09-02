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

export function SiteChrome({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

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
