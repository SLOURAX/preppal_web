"use client";

import {
  GraduationCap,
  Mail,
  Crosshair,
  Megaphone,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { useFeedback } from "@/components/ui";
import { ListSelect } from "@/components/ui/list-select";
import {
  AuthHeader,
  CheckboxField,
  EXAM_GOALS,
  FormField,
  LEARNING_LEVELS,
  PasswordField,
  GoogleAuthButton,
  AppleAuthButton,
  AuthDivider,
} from "@/features/auth";
import { useAuthStore } from "@/store";

function RegisterContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedReturnTo = searchParams.get("returnTo");
  const returnTo = requestedReturnTo?.startsWith("/") ? requestedReturnTo : "/";
  const [countryCode, setCountryCode] = useState("+234");
  const [learningLevel, setLearningLevel] = useState("");
  const [examGoal, setExamGoal] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [formError, setFormError] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const { showFeedback } = useFeedback();

  useEffect(() => {
    if (isAuthenticated) router.replace(returnTo);
  }, [isAuthenticated, returnTo, router]);

  if (isAuthenticated) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = (id: string) =>
      String(
        form.querySelector<HTMLInputElement>(`#${id}`)?.value ?? "",
      ).trim();
    const firstName = value("first-name");
    const surname = value("surname");
    const email = value("register-email");
    const phone = value("phone");
    if (!firstName || !surname)
      return setFormError("Enter your first name and surname.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setFormError("Enter a valid email address.");
    if (!countryCode || !phone)
      return setFormError("Choose a country code and enter your phone number.");
    if (!learningLevel || !examGoal)
      return setFormError("Choose your learning level and exam goal.");
    const password = value("new-password");
    const confirmPassword = value("confirm-password");
    if (password.length < 8)
      return setFormError("Your password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setFormError("Your passwords do not match.");
    if (!form.querySelector<HTMLInputElement>("#terms")?.checked)
      return setFormError("Accept the Terms and Privacy Policy to continue.");
    setFormError("");
    setRegistrationEmail(email);
    setIsReferralModalOpen(true);
  };

  if (verificationEmail)
    return (
      <VerificationStep
        email={verificationEmail}
        onVerified={() => {
          router.push(returnTo);
        }}
        onBack={() => setVerificationEmail("")}
      />
    );

  const handleSocialLogin = () => {
    showFeedback({
      kind: "info",
      title: "Social sign-up unavailable",
      message: "Use the registration form to create your account.",
    });
  };

  return (
    <>
      <AuthHeader
        description="Start with the basics so we can personalize your learning journey."
        title="Create your learner profile"
      />

      <div className="mt-8 mb-6 grid grid-cols-2 gap-3">
        <GoogleAuthButton text="Google" onClick={handleSocialLogin} />
        <AppleAuthButton text="Apple" onClick={handleSocialLogin} />
      </div>

      <AuthDivider />

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {formError && (
          <p
            className="bg-danger/10 text-danger rounded-xl px-3 py-2 text-xs font-medium"
            role="alert"
          >
            {formError}
          </p>
        )}
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
          <div className="space-y-1.5">
            <label
              className="text-foreground text-sm font-medium"
              htmlFor="phone"
            >
              Phone number
            </label>
            <div className="border-border bg-surface/90 focus-within:border-primary focus-within:ring-primary/10 flex h-11 items-center overflow-hidden rounded-xl border transition-[border-color,box-shadow] focus-within:ring-4">
              <select
                aria-label="Country code"
                className="text-foreground h-full w-max min-w-16 shrink-0 appearance-none bg-transparent px-3 text-[13px] font-medium outline-none"
                onChange={(event) => setCountryCode(event.target.value)}
                value={countryCode}
              >
                {["+234", "+233", "+44", "+1"].map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <span className="bg-border h-5 w-px" aria-hidden="true" />
              <input
                autoComplete="tel-national"
                className="text-foreground placeholder:text-muted-foreground/60 h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                id="phone"
                placeholder="801 234 5678"
                required
                type="tel"
              />
            </div>
          </div>
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
          name="terms"
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
      {isReferralModalOpen && (
        <ReferralModal
          value={referralSource}
          onChange={setReferralSource}
          onContinue={() => {
            if (!referralSource) return;
            setIsReferralModalOpen(false);
            setVerificationEmail(registrationEmail);
          }}
        />
      )}
    </>
  );
}

function ReferralModal({
  value,
  onChange,
  onContinue,
}: {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <div
        aria-hidden="true"
        className="bg-background/70 absolute inset-0 backdrop-blur-md"
      />
      <div className="bg-surface/80 border-border/70 relative z-10 w-full max-w-md rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="bg-primary/10 text-primary mx-auto mb-4 grid size-14 place-items-center rounded-2xl">
          <Megaphone className="size-7" />
        </div>
        <h2 className="text-foreground text-center text-[1.2rem] font-bold tracking-tight">
          Help us meet you where you are
        </h2>
        <p className="text-muted-foreground text-center text-[.8rem] leading-4">
          Your answer helps us improve the Preppal experience for learners like
          you.
        </p>
        <div className="mt-6">
          <ListSelect
            id="referral-source-modal"
            label="Where did you hear about us?"
            onChange={onChange}
            options={[
              "A friend or family member",
              "Social media",
              "Google search",
              "School or community",
              "Online advert",
              "Other",
            ].map((option) => ({ value: option, label: option }))}
            placeholder="Choose an option"
            value={value}
          />
        </div>
        <Button
          className="mt-6 h-11 w-full rounded-xl"
          disabled={!value}
          onClick={onContinue}
          type="button"
        >
          Register now
        </Button>
      </div>
    </div>
  );
}

function VerificationStep({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const updateCode = (value: string, index: number) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    if (digits.length > 1) setCode(digits);
    else
      setCode(
        (current) =>
          `${current.slice(0, index)}${digits}${current.slice(index + 1)}`,
      );
    setError("");
  };
  const verify = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code))
      return setError("Enter the six-digit code from your email.");
    onVerified();
  };
  return (
    <div className="space-y-6">
      <AuthHeader
        description={`We sent a six-digit verification code to ${email}.`}
        title="Verify your email"
      />
      <form className="space-y-4" onSubmit={verify}>
        <fieldset>
          <legend className="text-foreground text-sm font-medium">
            Verification code
          </legend>
          <div
            className="mt-2 grid w-full grid-cols-6 gap-2 sm:gap-3"
            onPaste={(event) => {
              event.preventDefault();
              updateCode(event.clipboardData.getData("text"), 0);
            }}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              if (
                target.value &&
                target.nextElementSibling instanceof HTMLInputElement
              )
                target.nextElementSibling.focus();
            }}
            onKeyDown={(event) => {
              const target = event.target as HTMLInputElement;
              if (
                event.key === "Backspace" &&
                !target.value &&
                target.previousElementSibling instanceof HTMLInputElement
              )
                target.previousElementSibling.focus();
            }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <input
                aria-label={`Verification digit ${index + 1}`}
                autoFocus={index === 0}
                className="border-border bg-surface focus:border-primary focus:ring-primary/15 h-14 min-w-0 flex-1 rounded-xl border text-center text-lg font-semibold outline-none focus:ring-4 sm:h-16 sm:text-xl"
                inputMode="numeric"
                key={index}
                maxLength={1}
                onChange={(event) => updateCode(event.target.value, index)}
                type="text"
                value={code[index] ?? ""}
              />
            ))}
          </div>
        </fieldset>
        {error && (
          <p className="text-danger text-xs" role="alert">
            {error}
          </p>
        )}
        <Button className="h-11 w-full rounded-xl" type="submit">
          Verify email
        </Button>
        <button
          className="text-muted-foreground hover:text-primary mx-auto mt-3 flex items-center gap-1 border-b border-transparent py-1 text-sm font-medium transition-colors hover:border-current"
          onClick={onBack}
          type="button"
        >
          <span aria-hidden="true">←</span> Use a different email
        </button>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}
