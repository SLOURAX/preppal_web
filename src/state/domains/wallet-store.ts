import { create } from "zustand";

interface WalletState {
  isFundingModalOpen: boolean;
  isWithdrawalModalOpen: boolean;
  setFundingModalOpen: (open: boolean) => void;
  setWithdrawalModalOpen: (open: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isFundingModalOpen: false,
  isWithdrawalModalOpen: false,
  setFundingModalOpen: (isFundingModalOpen) => set({ isFundingModalOpen }),
  setWithdrawalModalOpen: (isWithdrawalModalOpen) =>
    set({ isWithdrawalModalOpen }),
}));
