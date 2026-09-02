"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { ProfileOverview } from "@/features/profile";
import { useAuthStore } from "@/store";

export default function ProfilePage() {
  const userName = useAuthStore((state) => state.userName);
  const userPlan = useAuthStore((state) => state.userPlan);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-10">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          href="/"
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>
        <div className="mt-8">
          <ProfileOverview userName={userName} userPlan={userPlan} />
        </div>
      </main>
    </AppShell>
  );
}
