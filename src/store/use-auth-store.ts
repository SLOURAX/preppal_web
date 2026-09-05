import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  preppalBalance: number;
  experiencePoints: number;
  userName: string;
  userPlan: string;
  login: () => void;
  logout: () => void;
  setBalance: (balance: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  preppalBalance: 200,
  experiencePoints: 1240,
  userName: "Solomon Udumizi",
  userPlan: "Level 1",
  login: (): void => set({ isAuthenticated: true }),
  logout: (): void => set({ isAuthenticated: false }),
  setBalance: (preppalBalance: number): void => set({ preppalBalance }),
}));
