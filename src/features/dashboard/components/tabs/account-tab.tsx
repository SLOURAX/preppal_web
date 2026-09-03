"use client";

import { useState } from "react";

import { ProfileTab } from "./profile-tab";
import { SettingsTab } from "./settings-tab";

type AccountMode = "profile" | "settings";

export function AccountTab() {
  const [mode, setMode] = useState<AccountMode>("profile");

  return (
    <section className="space-y-6">
      <div className="bg-surface-subtle flex w-fit gap-1 rounded-xl p-1">
        <button
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "profile" ? "bg-surface text-primary shadow-sm" : "text-muted-foreground"}`}
          onClick={() => setMode("profile")}
          type="button"
        >
          Profile
        </button>
        <button
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "settings" ? "bg-surface text-primary shadow-sm" : "text-muted-foreground"}`}
          onClick={() => setMode("settings")}
          type="button"
        >
          Settings
        </button>
      </div>
      {mode === "profile" ? <ProfileTab /> : <SettingsTab />}
    </section>
  );
}
