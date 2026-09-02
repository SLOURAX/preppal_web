"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui";
import {
  AuthBenefits,
  AuthHeader,
  CheckboxField,
  FormField,
  MEMBER_BENEFITS,
  PasswordField,
} from "@/features/auth";
import { useAuthStore } from "@/store";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login();
    router.push("/");
  };

  return (
    <>
      <AuthHeader
        description="Continue learning, earning, and growing."
        title="Welcome back"
      />
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
