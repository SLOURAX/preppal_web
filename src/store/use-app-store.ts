import { create } from "zustand";

interface AppState {
  pointsPreview: number;
  setPointsPreview: (points: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  pointsPreview: 0,
  setPointsPreview: (pointsPreview) => set({ pointsPreview }),
}));
