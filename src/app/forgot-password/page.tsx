"use client";

import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { AuthHeader, FormField } from "@/features/auth";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center space-y-6 py-8 text-center">
        <div className="bg-success/10 rounded-full p-4">
          <CheckCircle2 className="text-success h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-muted-foreground max-w-sm">
            We sent a password reset link to your email address. Please click
            the link to reset your password.
          </p>
        </div>
        <Link
          href="/login"
          className="text-primary mt-4 flex items-center gap-2 font-semibold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to log in
        </Link>
      </div>
    );
  }

  return (
    <>
      <AuthHeader
        description="Enter your email address and we'll send you a link to reset your password."
        title="Reset your password"
      />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          icon={Mail}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          required
          type="email"
        />
        <Button className="h-11 w-full rounded-xl" type="submit">
          Send reset link
        </Button>
      </form>
      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to log in
        </Link>
      </div>
    </>
  );
}
