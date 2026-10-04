"use client";

import { ArrowLeft, KeyRound, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button, useFeedback } from "@/components/ui";
import { AuthHeader, FormField, PasswordField } from "@/features/auth";
import { useAuthStore } from "@/store";
import { apiClient } from "@/lib/api/client";

type Step = "email" | "code" | "password";

export default function ForgotPasswordPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const { showFeedback } = useFeedback();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const requestCode = async (nextEmail = email): Promise<void> => {
    await apiClient("/api/v1/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: nextEmail }),
    });
  };

  const submitEmail = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextEmail = String(
      new FormData(event.currentTarget).get("email") ?? "",
    )
      .trim()
      .toLowerCase();
    setError("");
    setStatus("Sending your reset code…");
    setIsSubmitting(true);
    void requestCode(nextEmail)
      .then(() => {
        setEmail(nextEmail);
        setStatus("A six-digit code was sent to your email.");
        setStep("code");
      })
      .catch((requestError: unknown) => {
        setStatus("");
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to send a password reset code.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  const verifyCode = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the six-digit code from your email.");
      return;
    }
    setError("");
    setStatus("Verifying your code…");
    setIsSubmitting(true);
    void apiClient<{ resetToken: string }>(
      "/api/v1/auth/verify-password-reset-code",
      {
        method: "POST",
        body: JSON.stringify({ email, code }),
      },
    )
      .then((result) => {
        setResetToken(result.resetToken);
        setStatus("");
        setStep("password");
      })
      .catch((requestError: unknown) => {
        setStatus("");
        setError(
          requestError instanceof Error
            ? requestError.message
            : "That code is invalid or expired.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  const resendCode = (): void => {
    if (isSubmitting || isResending) return;
    setError("");
    setStatus("Sending a fresh code…");
    setIsResending(true);
    void requestCode()
      .then(() => {
        setCode("");
        setStatus("A fresh six-digit code was sent to your email.");
      })
      .catch((requestError: unknown) => {
        setStatus("");
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to resend the code.",
        );
      })
      .finally(() => setIsResending(false));
  };

  const resetPassword = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");
    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }
    setError("");
    setStatus("Updating your password…");
    setIsSubmitting(true);
    void apiClient("/api/v1/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token: resetToken, password }),
    })
      .then(() => {
        showFeedback({
          kind: "success",
          title: "Password reset complete",
          message: "You can now sign in with your new password.",
        });
        router.replace("/login");
      })
      .catch((requestError: unknown) => {
        setStatus("");
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to reset your password.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AuthHeader
        description={
          step === "email"
            ? "Enter your email and we’ll send you a six-digit reset code."
            : step === "code"
              ? `Enter the six-digit code sent to ${email}.`
              : "Choose a secure new password for your account."
        }
        title={
          step === "email"
            ? "Reset your password"
            : step === "code"
              ? "Verify your code"
              : "Choose a new password"
        }
      />

      {step === "email" ? (
        <form className="mt-6 space-y-5" onSubmit={submitEmail}>
          <FormField
            autoComplete="email"
            icon={Mail}
            id="email"
            label="Email address"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <ProcessStatus message={status} />
          {error ? <ErrorMessage message={error} /> : null}
          <Button
            className="h-11 w-full rounded-xl"
            loading={isSubmitting}
            type="submit"
          >
            Send reset code
          </Button>
        </form>
      ) : null}

      {step === "code" ? (
        <form className="mt-6 space-y-4" onSubmit={verifyCode}>
          <fieldset disabled={isSubmitting || isResending}>
            <legend className="text-foreground text-sm font-medium">
              Reset code
            </legend>
            <div
              className="mt-2 grid grid-cols-6 gap-2 sm:gap-3"
              onPaste={(event) => {
                const pastedCode = event.clipboardData
                  .getData("text")
                  .replace(/\D/g, "")
                  .slice(0, 6);
                if (pastedCode) {
                  event.preventDefault();
                  setCode(pastedCode);
                  setError("");
                }
              }}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  aria-label={`Reset code digit ${index + 1}`}
                  autoFocus={index === 0}
                  className="border-border bg-surface focus:border-primary focus:ring-primary/15 h-14 min-w-0 rounded-xl border text-center text-lg font-semibold outline-none focus:ring-4 sm:h-16"
                  inputMode="numeric"
                  key={index}
                  maxLength={1}
                  onChange={(event) => {
                    const digit = event.target.value.replace(/\D/g, "");
                    setCode(
                      (current) =>
                        `${current.slice(0, index)}${digit}${current.slice(index + 1)}`,
                    );
                    setError("");
                    if (
                      digit &&
                      event.target.nextElementSibling instanceof
                        HTMLInputElement
                    )
                      event.target.nextElementSibling.focus();
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Backspace" &&
                      !event.currentTarget.value &&
                      event.currentTarget.previousElementSibling instanceof
                        HTMLInputElement
                    )
                      event.currentTarget.previousElementSibling.focus();
                  }}
                  value={code[index] ?? ""}
                />
              ))}
            </div>
          </fieldset>
          <ProcessStatus message={status} />
          {error ? <ErrorMessage message={error} /> : null}
          <Button
            className="h-11 w-full rounded-xl"
            loading={isSubmitting}
            type="submit"
          >
            Verify code
          </Button>
          <button
            className="text-primary mx-auto flex text-sm font-semibold disabled:opacity-50"
            disabled={isSubmitting || isResending}
            onClick={resendCode}
            type="button"
          >
            {isResending ? "Sending new code…" : "Resend code"}
          </button>
        </form>
      ) : null}

      {step === "password" ? (
        <form className="mt-6 space-y-4" onSubmit={resetPassword}>
          <PasswordField
            autoComplete="new-password"
            icon={KeyRound}
            id="password"
            label="New password"
            name="password"
            required
          />
          <PasswordField
            autoComplete="new-password"
            icon={ShieldCheck}
            id="confirm-password"
            label="Confirm password"
            name="confirmPassword"
            required
          />
          <ProcessStatus message={status} />
          {error ? <ErrorMessage message={error} /> : null}
          <Button
            className="h-11 w-full rounded-xl"
            loading={isSubmitting}
            type="submit"
          >
            Change password
          </Button>
        </form>
      ) : null}

      <div className="mt-7 text-center">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-semibold"
          href="/login"
        >
          <ArrowLeft className="size-4" /> Back to log in
        </Link>
      </div>
    </>
  );
}

function ProcessStatus({ message }: { message: string }) {
  return message ? (
    <p
      aria-live="polite"
      className="text-muted-foreground text-center text-xs font-medium"
      role="status"
    >
      {message}
    </p>
  ) : null;
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-danger text-xs" role="alert">
      {message}
    </p>
  );
}
