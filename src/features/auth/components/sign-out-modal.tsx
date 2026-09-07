"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store";

export function SignOutModal() {
  const isOpen = useAuthStore((s) => s.isSignOutModalOpen);
  const closeSignOutModal = useAuthStore((s) => s.closeSignOutModal);
  const logout = useAuthStore((s) => s.logout);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeSignOutModal}
      />

      {/* Modal */}
      <div className="bg-surface relative z-10 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
        <div className="px-6 pt-6 pb-5">
          <div className="mb-5 flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose-500/10">
              <LogOut className="size-5 text-rose-500" />
            </div>
            <div className="pt-1">
              <h2 className="text-foreground text-lg font-bold">Sign out?</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                Are you sure you want to sign out of your account on this
                device?
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              onClick={logout}
              className="bg-primary text-primary-foreground hover:bg-primary-strong w-full rounded-xl font-semibold"
            >
              Yes, sign out
            </Button>
            <button
              onClick={closeSignOutModal}
              className="w-full rounded-xl border border-rose-500 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-500/10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
