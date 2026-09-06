import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  preppalBalance: number;
  experiencePoints: number;
  userName: string;
  userPlan: string;
  weeklyGoal: number | null;
  weeklyActivity: boolean[];
  isSignOutModalOpen: boolean;
  login: () => void;
  logout: () => void;
  setBalance: (balance: number) => void;
  setWeeklyGoal: (goal: number) => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  preppalBalance: 200,
  experiencePoints: 1240,
  userName: "Solomon Udumizi",
  userPlan: "Level 1",
  weeklyGoal: null,
  weeklyActivity: [false, false, false, false, false, false, false],
  isSignOutModalOpen: false,
  login: (): void => set({ isAuthenticated: true }),
  logout: (): void =>
    set({
      isAuthenticated: false,
      isSignOutModalOpen: false,
      weeklyGoal: null,
      weeklyActivity: [false, false, false, false, false, false, false],
    }),
  setBalance: (preppalBalance: number): void => set({ preppalBalance }),
  setWeeklyGoal: (weeklyGoal: number): void => set({ weeklyGoal }),
  openSignOutModal: (): void => set({ isSignOutModalOpen: true }),
  closeSignOutModal: (): void => set({ isSignOutModalOpen: false }),
}));
