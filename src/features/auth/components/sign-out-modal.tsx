"use client";

import Image from "next/image";
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
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl">
        <div className="px-6 pt-6 pb-5">
          <div className="mx-auto mb-3 grid size-24 place-items-center rounded-full bg-rose-500/10">
            <Image
              alt="Preppal mascot waving goodbye"
              className="size-20 object-contain"
              height={80}
              src="/assets/mascots/encouraging.png"
              width={80}
            />
          </div>
          <div className="text-center">
            <h2 className="text-foreground text-base font-bold">Sign out?</h2>
            <p className="text-muted-foreground mx-auto mt-1 max-w-[18rem] text-xs leading-relaxed">
              Are you sure you want to sign out of your account on this device?
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={closeSignOutModal}
              className="w-full rounded-xl border border-rose-600! py-2 text-[.8rem] font-semibold text-rose-600 transition-colors"
            >
              Cancel
            </button>
            <Button
              onClick={logout}
              className="bg-primary text-primary-foreground hover:bg-primary-strong w-full rounded-xl text-[.8rem] font-semibold"
            >
              Yes, sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
