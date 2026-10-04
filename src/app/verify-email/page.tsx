"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { apiClient } from "@/lib/api/client";
import { LoaderCircle } from "lucide-react";

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const email = params.get("email") ?? "";
  const [message, setMessage] = useState(
    token
      ? "Verifying your email…"
      : "Enter the six-digit code sent to your email.",
  );
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isLinkVerifying, setIsLinkVerifying] = useState(Boolean(token));

  useEffect(() => {
    if (!token || !email) return;
    void apiClient("/api/v1/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, token }),
    })
      .then(() => setMessage("Your email is verified. You can now sign in."))
      .catch((error: unknown) =>
        setMessage(
          error instanceof Error
            ? error.message
            : "This verification link is invalid or expired.",
        ),
      )
      .finally(() => setIsLinkVerifying(false));
  }, [email, token]);

  const verifyCode = (): void => {
    setIsSubmitting(true);
    void apiClient("/api/v1/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, token: code }),
    })
      .then(() => setMessage("Your email is verified. You can now sign in."))
      .catch((error: unknown) =>
        setMessage(
          error instanceof Error
            ? error.message
            : "That code is invalid or expired.",
        ),
      )
      .finally(() => setIsSubmitting(false));
  };

  const resend = (): void => {
    if (isResending || isSubmitting) return;
    if (!email) {
      setMessage("Return to sign in and enter your email address first.");
      return;
    }
    setIsResending(true);
    setMessage("Sending a fresh verification code…");
    void apiClient("/api/v1/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then(() => setMessage("A fresh verification code has been sent."))
      .catch((error: unknown) =>
        setMessage(
          error instanceof Error ? error.message : "Could not resend the code.",
        ),
      )
      .finally(() => setIsResending(false));
  };

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-5 text-center">
      <div className="w-full">
        <h1 className="text-foreground text-2xl font-bold">
          Email verification
        </h1>
        <p className="text-muted-foreground mt-3 text-sm">{message}</p>
        {isLinkVerifying ? (
          <LoaderCircle
            aria-label="Verification in progress"
            className="text-primary mx-auto mt-5 size-6 animate-spin"
          />
        ) : null}
        {!token ? (
          <>
            <input
              aria-label="Six-digit verification code"
              className="border-border mt-6 h-12 w-full rounded-xl border bg-transparent px-4 text-center text-lg tracking-[0.3em]"
              inputMode="numeric"
              maxLength={6}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ""))
              }
              placeholder="000000"
              value={code}
            />
            <Button
              className="mt-4 w-full"
              disabled={code.length !== 6 || !email}
              loading={isSubmitting}
              onClick={verifyCode}
              type="button"
            >
              Verify email
            </Button>
            <button
              className="text-primary mt-4 text-sm font-semibold"
              disabled={isResending || isSubmitting}
              onClick={resend}
              type="button"
            >
              {isResending ? "Sending new code…" : "Resend code"}
            </button>
          </>
        ) : null}
        <button
          className="bg-primary text-primary-foreground mt-6 rounded-xl px-6 py-3 text-sm font-semibold"
          onClick={() => router.push("/login")}
          type="button"
        >
          Go to sign in
        </button>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
