"use client";

import {
  Globe2,
  GraduationCap,
  Mail,
  Phone,
  Target,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui";
import {
  AuthHeader,
  CheckboxField,
  COUNTRIES,
  EXAM_GOALS,
  FormField,
  getSafeReturnTo,
  LEARNING_LEVELS,
  PasswordField,
  SelectField,
  GoogleAuthButton,
  AuthDivider,
} from "@/features/auth";
import { useAuthStore } from "@/store";

export default function RegisterPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login();
    router.push(getSafeReturnTo(window.location.search));
  };

  return (
    <>
      <AuthHeader
        description="Tell us what you are preparing for so quizzes can match your goals."
        title="Create your learner profile"
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <FormField
            autoComplete="name"
            icon={UserRound}
            id="full-name"
            label="Full name"
            placeholder="Your full name"
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
          <SelectField
            defaultValue="Nigeria"
            icon={Globe2}
            id="country"
            label="Country"
          >
            {COUNTRIES.map((country: string) => (
              <option key={country}>{country}</option>
            ))}
          </SelectField>
          <SelectField
            defaultValue=""
            icon={GraduationCap}
            id="learning-level"
            label="Learning level"
            required
          >
            <option disabled value="">
              Choose your level
            </option>
            {LEARNING_LEVELS.map((level: string) => (
              <option key={level}>{level}</option>
            ))}
          </SelectField>
          <SelectField
            defaultValue=""
            icon={Target}
            id="exam-goal"
            label="Primary exam goal"
            required
          >
            <option disabled value="">
              Choose an exam
            </option>
            {EXAM_GOALS.map((goal: string) => (
              <option key={goal}>{goal}</option>
            ))}
          </SelectField>
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
                href="#"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="text-primary-strong font-semibold hover:underline"
                href="#"
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

      <AuthDivider />

      <div className="mt-6 mb-6">
        <GoogleAuthButton
          text="Sign up with Google"
          onClick={() => {
            login();
            router.push(getSafeReturnTo(window.location.search));
          }}
        />
      </div>
    </>
  );
}
