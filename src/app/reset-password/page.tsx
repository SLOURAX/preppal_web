"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";
import { AuthHeader, PasswordField } from "@/features/auth";
import { Button, useFeedback } from "@/components/ui";
import { apiClient } from "@/lib/api/client";

function ResetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { showFeedback } = useFeedback();
  const token = params.get("token") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");
    if (!token) return setError("This password reset link is incomplete.");
    if (password.length < 8)
      return setError("Your password must contain at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Your passwords do not match.");
    setError("");
    setIsSubmitting(true);
    void apiClient("/api/v1/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    })
      .then(() => {
        showFeedback({
          kind: "success",
          title: "Password reset complete",
          message: "You can now sign in with your new password.",
        });
        router.replace("/login");
      })
      .catch((requestError: unknown) =>
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to reset your password.",
        ),
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AuthHeader
        title="Choose a new password"
        description="Use at least eight characters and keep it unique to Preppal."
      />
      <form className="mt-6 space-y-4" onSubmit={submit}>
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
        {error ? <p className="text-danger text-xs">{error}</p> : null}
        <Button className="w-full" loading={isSubmitting} type="submit">
          Reset password
        </Button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
