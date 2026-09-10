"use client";

import {
  Globe2,
  GraduationCap,
  Mail,
  Phone,
  Crosshair,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { ListSelect } from "@/components/ui/list-select";
import {
  AuthHeader,
  CheckboxField,
  COUNTRIES,
  EXAM_GOALS,
  FormField,
  LEARNING_LEVELS,
  PasswordField,
  GoogleAuthButton,
  AppleAuthButton,
  AuthDivider,
} from "@/features/auth";
import { useAuthStore } from "@/store";

export default function RegisterPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") ? requestedReturnTo : "/";
  const [country, setCountry] = useState("Nigeria");
  const [learningLevel, setLearningLevel] = useState("");
  const [examGoal, setExamGoal] = useState("");

  useEffect(() => {
    if (isAuthenticated) router.replace(returnTo);
  }, [isAuthenticated, returnTo, router]);

  if (isAuthenticated) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!learningLevel || !examGoal) return;
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
        description="Tell us what you are preparing for so quizzes can match your goals."
        title="Create your learner profile"
      />

      <div className="mt-8 mb-6 grid grid-cols-2 gap-3">
        <GoogleAuthButton text="Google" onClick={handleSocialLogin} />
        <AppleAuthButton text="Apple" onClick={handleSocialLogin} />
      </div>

      <AuthDivider />

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <FormField
            autoComplete="given-name"
            icon={UserRound}
            id="first-name"
            label="First name"
            placeholder="Your first name"
            required
          />
          <FormField
            autoComplete="family-name"
            icon={UserRound}
            id="surname"
            label="Surname"
            placeholder="Your surname"
            required
          />
          <FormField
            autoComplete="email"
            icon={Mail}
            id="register-email"
            label="Email address"
            placeholder="you@example.com"
            required
            type="email"
          />
          <FormField
            autoComplete="tel"
            icon={Phone}
            id="phone"
            label="Phone number"
            placeholder="0801 234 5678"
            type="tel"
          />
          <ListSelect
            icon={Globe2}
            id="country"
            label="Country"
            onChange={setCountry}
            options={COUNTRIES.map((option) => ({
              value: option,
              label: option,
            }))}
            placeholder="Choose your country"
            compact
            value={country}
          />
          <ListSelect
            icon={GraduationCap}
            id="learning-level"
            label="Learning level"
            onChange={setLearningLevel}
            options={LEARNING_LEVELS.map((option) => ({
              value: option,
              label: option,
            }))}
            placeholder="Choose your level"
            compact
            value={learningLevel}
          />
          <ListSelect
            icon={Crosshair}
            id="exam-goal"
            label="Primary exam goal"
            onChange={setExamGoal}
            options={EXAM_GOALS.map((option) => ({
              value: option,
              label: option,
            }))}
            placeholder="Choose an exam"
            compact
            value={examGoal}
          />
          <PasswordField
            autoComplete="new-password"
            id="new-password"
            label="Password"
            minLength={8}
            placeholder="At least 8 characters"
            required
          />
          <PasswordField
            autoComplete="new-password"
            id="confirm-password"
            label="Confirm password"
            minLength={8}
            placeholder="Repeat your password"
            required
          />
        </div>
        <CheckboxField
          id="terms"
          required
          variant="panel"
          label={
            <>
              I agree to the{" "}
              <Link
                className="text-primary-strong font-semibold hover:underline"
                href="terms"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="text-primary-strong font-semibold hover:underline"
                href="privacy"
              >
                Privacy Policy
              </Link>
              .
            </>
          }
        />
        <Button className="h-11 w-full rounded-xl" type="submit">
          Create account
        </Button>
      </form>
    </>
  );
}
