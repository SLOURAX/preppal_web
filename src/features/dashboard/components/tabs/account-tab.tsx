"use client";

import {
  BadgeCent,
  BadgeCheck,
  Pencil,
  Bell,
  KeyRound,
  LogOut,
  Moon,
  Shield,
  Sun,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useAuthStore } from "@/store";
import { ConfirmationModal } from "@/components/ui";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { PasswordField } from "@/features/auth";
import {
  SaxSecuritySafeBulk,
  SaxTickCircleBulk,
} from "@meysam213/iconsax-react";

const NOTIFICATION_PREFS = [
  {
    label: "Quiz reminders",
    description: "Daily nudge to maintain your streak",
    defaultOn: true,
  },
  {
    label: "Leaderboard updates",
    description: "Get notified about your rank and progress",
    defaultOn: true,
  },
] as const;

export function AccountTab() {
  const { resolvedTheme } = useTheme();
  const userName = useAuthStore((s) => s.userName);
  const userPlan = useAuthStore((s) => s.userPlan);
  const preppalBalance = useAuthStore((s) => s.preppalBalance);
  const weeklyGoal = useAuthStore((s) => s.weeklyGoal);
  const setWeeklyGoal = useAuthStore((s) => s.setWeeklyGoal);
  const openSignOutModal = useAuthStore((s) => s.openSignOutModal);
  const setUserName = useAuthStore((s) => s.setUserName);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(userName);
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      NOTIFICATION_PREFS.map((pref) => [pref.label, pref.defaultOn]),
    ),
  );

  const submitPasswordChange = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    if (!passwords.current)
      return setPasswordError("Enter your current password.");
    if (passwords.next.length < 8)
      return setPasswordError(
        "Your new password must be at least 8 characters.",
      );
    if (passwords.next !== passwords.confirm)
      return setPasswordError("Your new passwords do not match.");
    setPasswordError(null);
    setPasswordChanged(true);
    setPasswords({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 md:pb-0">
      {/* Profile card */}
      <div className="surface-card flex items-center gap-5 rounded-3xl p-6 shadow-sm">
        <div className="bg-primary text-primary-foreground relative grid size-16 shrink-0 place-items-center rounded-2xl text-2xl font-black shadow-md sm:size-20">
          {userName.slice(0, 1).toUpperCase()}
          <button
            className="bg-surface hover:bg-surface-subtle absolute -right-2 -bottom-2 grid size-7 place-items-center rounded-full border shadow-sm transition-colors"
            onClick={() => {
              setDraftName(userName);
              setEditingName(true);
            }}
            type="button"
          >
            <Pencil className="text-muted-foreground size-3.5" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-foreground mt-1 text-lg font-bold sm:text-xl">
            {userName}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
              {userPlan} plan
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
              <BadgeCent className="size-4" />
              {preppalBalance} P
            </span>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="surface-card divide-border divide-y overflow-hidden rounded-3xl p-0 shadow-sm">
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Account
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Display name
            </p>
            {editingName ? (
              <div className="mt-1 flex items-center gap-2">
                <input
                  className="border-border bg-surface focus:border-primary h-8 min-w-0 rounded-lg border px-2 text-xs outline-none"
                  onChange={(event) => setDraftName(event.target.value)}
                  value={draftName}
                />
                <button
                  className="text-primary text-xs font-bold"
                  onClick={() => {
                    setUserName(draftName);
                    setEditingName(false);
                  }}
                  type="button"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-muted-foreground mt-1 text-xs">{userName}</p>
            )}
          </div>
          {!editingName ? (
            <button
              className="border-border hover:bg-surface-subtle rounded-full border px-4 py-1.5 text-xs font-medium transition-colors"
              onClick={() => {
                setDraftName(userName);
                setEditingName(true);
              }}
              type="button"
            >
              Edit
            </button>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">Password</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Last changed never
            </p>
          </div>
          <button
            className="border-border hover:bg-surface-subtle rounded-full border px-4 py-1.5 text-xs font-medium transition-colors"
            onClick={() => setShowPasswordModal(true)}
            type="button"
          >
            Change
          </button>
        </div>
      </div>

      {/* Study Goals */}
      <div className="surface-card divide-border divide-y overflow-hidden rounded-3xl p-0 shadow-sm">
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Study Goals
          </p>
        </div>
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Weekly target
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {weeklyGoal
                ? "Days per week you aim to practice"
                : "No weekly goal yet — choose one to get started"}
            </p>
          </div>
          <div className="bg-surface-subtle/80 flex w-fit items-center gap-1 rounded-full p-1">
            {[3, 5, 7].map((days) => {
              const isSelected = weeklyGoal === days;
              const labels: Record<number, string> = {
                3: "Casual",
                5: "Regular",
                7: "Intense",
              };
              return (
                <button
                  key={days}
                  onClick={() => setWeeklyGoal(days)}
                  className={`flex flex-col items-center justify-center rounded-full px-4 py-1.5 transition-all ${
                    isSelected
                      ? "bg-surface text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-xs font-bold">{days} days</span>
                  <span className="text-[9px] font-medium opacity-70">
                    {labels[days]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="surface-card divide-border divide-y overflow-hidden rounded-3xl p-0 shadow-sm">
        <div className="px-5 py-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Appearance
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            {resolvedTheme === "dark" ? (
              <Moon className="size-5 text-amber-500" />
            ) : (
              <Sun className="size-5 text-amber-500" />
            )}
            <div>
              <p className="text-foreground text-sm font-semibold">Theme</p>
              <p className="text-muted-foreground mt-1 text-xs capitalize">
                {resolvedTheme ?? "light"} mode
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Notifications */}
      <div className="surface-card divide-border divide-y overflow-hidden rounded-3xl p-0 shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4">
          <Bell className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Notifications
          </p>
        </div>
        {NOTIFICATION_PREFS.map((pref) => (
          <div
            key={pref.label}
            className="flex items-center justify-between gap-4 px-5 py-5"
          >
            <div>
              <p className="text-foreground text-sm font-semibold">
                {pref.label}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {pref.description}
              </p>
            </div>
            <button
              aria-label={`Toggle ${pref.label}`}
              aria-pressed={notificationSettings[pref.label]}
              onClick={() =>
                setNotificationSettings((settings) => ({
                  ...settings,
                  [pref.label]: !settings[pref.label],
                }))
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                notificationSettings[pref.label]
                  ? "bg-primary"
                  : "bg-surface-subtle"
              }`}
              type="button"
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  notificationSettings[pref.label]
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="surface-card divide-border divide-y overflow-hidden rounded-3xl border-rose-500/20 p-0 shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4">
          <Shield className="size-4 text-rose-500" />
          <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
            Danger zone
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">Sign out</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Sign out of your account on this device.
            </p>
          </div>
          <button
            onClick={openSignOutModal}
            className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-500/20"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-foreground text-sm font-semibold">
              Delete account
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Permanently delete your account and all data.
            </p>
          </div>
          <button
            className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-500/20"
            onClick={() => setShowDeleteConfirmation(true)}
            type="button"
          >
            <Trash2 className="size-3.5" />
            Delete
          </button>
        </div>
      </div>
      {showPasswordModal ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            aria-label="Close password dialog"
            className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
            type="button"
          />
          <div
            aria-modal="true"
            className="bg-surface relative z-10 w-full max-w-sm rounded-3xl p-4 shadow-2xl sm:p-5"
            role="dialog"
          >
            {passwordChanged ? (
              <div className="py-4 text-center">
                <div className="bg-success/10 mx-auto flex size-12 items-center justify-center rounded-2xl">
                  <SaxTickCircleBulk className="text-success size-7" />
                </div>
                <h2 className="text-foreground mt-3 text-base font-bold">
                  Password updated
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  Your password has been changed successfully.
                </p>
                <button
                  className="bg-primary text-primary-foreground mt-4 rounded-xl px-5 py-2 text-xs font-bold"
                  onClick={() => {
                    setPasswordChanged(false);
                    setShowPasswordModal(false);
                  }}
                  type="button"
                >
                  Done
                </button>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={submitPasswordChange}>
                <div className="border-border flex items-start gap-3 border-b pb-3">
                  <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
                    <SaxSecuritySafeBulk className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-foreground text-base font-bold">
                      Change password
                    </h2>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Choose a strong password you haven’t used before.
                    </p>
                  </div>
                </div>
                <PasswordField
                  id="current-password"
                  label="Current password"
                  labelClassName="text-xs"
                  icon={KeyRound}
                  value={passwords.current}
                  onChange={(event) =>
                    setPasswords((value) => ({
                      ...value,
                      current: event.target.value,
                    }))
                  }
                  autoComplete="current-password"
                />
                <PasswordField
                  id="new-password"
                  label="New password"
                  labelClassName="text-xs"
                  icon={ShieldCheck}
                  value={passwords.next}
                  onChange={(event) =>
                    setPasswords((value) => ({
                      ...value,
                      next: event.target.value,
                    }))
                  }
                  autoComplete="new-password"
                />
                <PasswordField
                  id="confirm-new-password"
                  label="Confirm new password"
                  labelClassName="text-xs"
                  icon={BadgeCheck}
                  value={passwords.confirm}
                  onChange={(event) =>
                    setPasswords((value) => ({
                      ...value,
                      confirm: event.target.value,
                    }))
                  }
                  autoComplete="new-password"
                />
                {passwordError ? (
                  <p className="text-danger text-xs font-medium" role="alert">
                    {passwordError}
                  </p>
                ) : null}
                <div className="flex gap-2 pt-1">
                  <button
                    className="border-border text-muted-foreground hover:text-foreground flex-1 rounded-xl border px-3 py-2 text-[.8rem] font-semibold"
                    onClick={() => setShowPasswordModal(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-primary-foreground flex-1 rounded-xl px-3 py-2 text-[.8rem] font-semibold"
                    type="submit"
                  >
                    Update password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
      {showDeleteConfirmation ? (
        <ConfirmationModal
          title="Delete your account?"
          description="This action permanently removes your account, quiz history, and rewards."
          confirmLabel="Delete account"
          destructive
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={() => setShowDeleteConfirmation(false)}
        />
      ) : null}
    </div>
  );
}
