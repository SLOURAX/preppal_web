import { create } from "zustand";

interface RewardsState {
  selectedRewardId: string | null;
  setSelectedRewardId: (selectedRewardId: string | null) => void;
}

export const useRewardsStore = create<RewardsState>((set) => ({
  selectedRewardId: null,
  setSelectedRewardId: (selectedRewardId) => set({ selectedRewardId }),
}));
