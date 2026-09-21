import { create } from "zustand";

interface AccountState {
  isProfileOpen: boolean;
  isSignOutModalOpen: boolean;
  setProfileOpen: (isProfileOpen: boolean) => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  isProfileOpen: false,
  isSignOutModalOpen: false,
  setProfileOpen: (isProfileOpen) => set({ isProfileOpen }),
  openSignOutModal: () => set({ isSignOutModalOpen: true }),
  closeSignOutModal: () => set({ isSignOutModalOpen: false }),
}));
