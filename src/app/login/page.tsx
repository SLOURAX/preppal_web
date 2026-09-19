"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
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

function LoginContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") ? requestedReturnTo : "/";
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isAuthenticated) router.replace(returnTo);
  }, [isAuthenticated, returnTo, router]);

  if (isAuthenticated) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(
      form.querySelector<HTMLInputElement>("#email")?.value ?? "",
    ).trim();
    const password = String(
      form.querySelector<HTMLInputElement>("#password")?.value ?? "",
    );
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setFormError("Enter a valid email address.");
    if (!password) return setFormError("Enter your password.");
    setFormError("");
    login();
    router.push(returnTo);
  };

  const handleSocialLogin = () => {
    login();
    router.push(returnTo);
  };

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
        {formError && (
          <p
            className="bg-danger/10 text-danger rounded-xl px-3 py-2 text-xs font-medium"
            role="alert"
          >
            {formError}
          </p>
        )}
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
        <div className="flex items-center justify-between gap-4 text-sm">
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
