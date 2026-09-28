"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email…");
  const [code, setCode] = useState("");
  const [isCodeView, setIsCodeView] = useState(false);
  useEffect(() => {
    const token = params.get("token");
    if (!token) { setIsCodeView(true); setMessage("Enter the six-digit code sent to your email."); return; }
    void apiClient("/api/v1/auth/verify-email", { method: "POST", body: JSON.stringify({ token }) })
      .then(() => setMessage("Your email is verified. You can now sign in."))
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "This verification link is invalid or expired."));
  }, [params]);
  const email = params.get("email") ?? "";
  return <main className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-5 text-center"><div><h1 className="text-foreground text-2xl font-bold">Email verification</h1><p className="text-muted-foreground mt-3 text-sm">{message}</p>{isCodeView ? <><input className="border-border mt-6 h-12 w-full rounded-xl border bg-transparent px-4 text-center text-lg tracking-[0.3em]" inputMode="numeric" maxLength={6} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="000000" value={code} /><Button className="mt-4 w-full" disabled={code.length !== 6} onClick={() => { void apiClient("/api/v1/auth/verify-email", { method: "POST", body: JSON.stringify({ token: code }) }).then(() => setMessage("Your email is verified. You can now sign in.")).catch((error: unknown) => setMessage(error instanceof Error ? error.message : "That code is invalid or expired.")); }} type="button">Verify email</Button><button className="text-primary mt-4 text-sm font-semibold" onClick={() => { void apiClient("/api/v1/auth/resend-verification", { method: "POST", body: JSON.stringify({ email }) }); }} type="button">Resend code</button></> : null}<button className="bg-primary text-primary-foreground mt-6 rounded-xl px-6 py-3 text-sm font-semibold" onClick={() => router.push("/login")} type="button">Go to sign in</button></div></main>;
}

export default function VerifyEmailPage() {
  return <Suspense fallback={null}><VerifyEmailContent /></Suspense>;
}
