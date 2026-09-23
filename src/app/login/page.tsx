"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { useFeedback } from "@/components/ui";
import {
  AuthBenefits,
  AuthHeader,
  CheckboxField,
  FormField,
  MEMBER_BENEFITS,
  PasswordField,
  GoogleAuthButton,
  AppleAuthButton,
  AuthDivider,
} from "@/features/auth";
import { useAuthStore } from "@/store";
import { loginSchema } from "@/features/auth/auth.schemas";

function LoginContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") ? requestedReturnTo : "/";
  const [formError, setFormError] = useState("");
  const { showFeedback } = useFeedback();

  useEffect(() => {
    if (isAuthenticated) router.replace(returnTo);
  }, [isAuthenticated, returnTo, router]);

  if (isAuthenticated) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const identifier = String(
      form.querySelector<HTMLInputElement>("#email")?.value ?? "",
    ).trim();
    const password = String(
      form.querySelector<HTMLInputElement>("#password")?.value ?? "",
    );
    const parsed = loginSchema.safeParse({ identifier, password });
    if (!parsed.success)
      return setFormError(
        parsed.error.issues[0]?.message ?? "Enter valid login details.",
      );
    setFormError("");
    void login(parsed.data)
      .then(() => router.push(returnTo))
      .catch((error: unknown) => {
        showFeedback({
          kind: "error",
          title: "Sign in failed",
          message:
            error instanceof Error
              ? error.message
              : "Unable to sign in. Please try again.",
        });
      });
  };

  const handleSocialLogin = () =>
    showFeedback({
      kind: "info",
      title: "Social sign-in unavailable",
      message: "Use your email and password to sign in.",
    });

  return (
    <>
      <AuthHeader
        description="Continue learning, earning, and growing."
        title="Welcome back"
      />

      <div className="mt-8 mb-6 grid grid-cols-2 gap-3">
        <GoogleAuthButton text="Google" onClick={handleSocialLogin} />
        <AppleAuthButton text="Apple" onClick={handleSocialLogin} />
      </div>

      <AuthDivider />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          icon={Mail}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          required
          type="email"
        />
        <PasswordField
          autoComplete="current-password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        {formError && (
          <p className="text-danger -mt-2 text-xs font-medium" role="alert">
            {formError}
          </p>
        )}
        <div className="flex items-center justify-between gap-4 text-[.8rem]">
          <CheckboxField id="remember" label="Remember me" name="remember" />
          <Link
            className="text-primary-strong font-semibold hover:underline"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <Button className="h-11 w-full rounded-xl" type="submit">
          Sign in
        </Button>
      </form>

      <AuthBenefits items={MEMBER_BENEFITS} />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
