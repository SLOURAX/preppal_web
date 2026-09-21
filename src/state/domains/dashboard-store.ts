import { create } from "zustand";

export type DashboardTab =
  | "home"
  | "learn"
  | "wallet"
  | "analytics"
  | "account"
  | "quiz-history"
  | "wallet-history";

interface DashboardState {
  activeTab: DashboardTab;
  setActiveTab: (activeTab: DashboardTab) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: "home",
  setActiveTab: (activeTab) => set({ activeTab }),
}));
