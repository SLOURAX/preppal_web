import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_FINANCE_BALANCES, XP_TO_COIN_RATE } from "@/constants/finance";

export interface QuizAttempt {
  id: string;
  subject: string;
  exam: string;
  mode: "timed" | "untimed";
  path?: "exam" | "subject";
  year?: string;
  score: number;
  total: number;
  correct: number;
  date: string;
  durationSeconds: number;
  answers: Record<number, string>;
  seed?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  preppalBalance: number;
  depositedFunds: number;
  experiencePoints: number;
  userName: string;
  userPlan: string;
  weeklyGoal: number | null;
  weeklyActivity: boolean[];
  quizAttempts: QuizAttempt[];
  lastCheckIn: string | null;
  notificationSettings: Record<string, boolean>;
  isSignOutModalOpen: boolean;
  login: () => void;
  logout: () => void;
  setBalance: (balance: number) => void;
  setDepositedFunds: (amount: number) => void;
  setUserName: (userName: string) => void;
  setWeeklyGoal: (goal: number) => void;
  addExperience: (amount: number) => void;
  convertExperienceToCoins: (amount: number) => boolean;
  completeCheckIn: () => boolean;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  setNotificationPreference: (label: string, enabled: boolean) => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

const initialActivity = [false, false, false, false, false, false, false];

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      ...INITIAL_FINANCE_BALANCES,
      userName: "Solomon Udumizi",
      userPlan: "Level 1",
      weeklyGoal: null,
      weeklyActivity: initialActivity,
      quizAttempts: [],
      lastCheckIn: null,
      notificationSettings: {
        "Quiz reminders": true,
        "Leaderboard updates": true,
      },
      isSignOutModalOpen: false,
      login: (): void => {
        set({ isAuthenticated: true });
      },
      logout: (): void => {
        set({
          isAuthenticated: false,
          isSignOutModalOpen: false,
          weeklyGoal: null,
          weeklyActivity: initialActivity,
          quizAttempts: [],
          lastCheckIn: null,
          notificationSettings: {
            "Quiz reminders": true,
            "Leaderboard updates": true,
          },
        });
      },
      setBalance: (preppalBalance: number): void => {
        set({ preppalBalance });
      },
      setDepositedFunds: (depositedFunds: number): void => {
        set({ depositedFunds: Math.max(0, depositedFunds) });
      },
      setUserName: (userName: string): void => {
        set({ userName: userName.trim() || "Learner" });
      },
      setWeeklyGoal: (weeklyGoal: number): void => {
        set({ weeklyGoal });
      },
      addExperience: (amount: number): void => {
        set((state) => ({
          experiencePoints: Math.max(0, state.experiencePoints + amount),
        }));
      },
      convertExperienceToCoins: (amount: number): boolean => {
        const requestedXp = Math.floor(amount);
        const state = get();
        if (
          requestedXp < XP_TO_COIN_RATE ||
          requestedXp > state.experiencePoints
        )
          return false;
        const coins = Math.floor(requestedXp / XP_TO_COIN_RATE);
        if (!coins) return false;
        set({
          experiencePoints: state.experiencePoints - coins * XP_TO_COIN_RATE,
          preppalBalance: state.preppalBalance + coins,
        });
        return true;
      },
      completeCheckIn: (): boolean => {
        const today = new Date().toISOString().slice(0, 10);
        if (get().lastCheckIn === today) return false;
        const dayIndex = (new Date().getDay() + 6) % 7;
        set((state) => {
          const activity = [...state.weeklyActivity];
          activity[dayIndex] = true;
          return {
            lastCheckIn: today,
            weeklyActivity: activity,
            experiencePoints: state.experiencePoints + 2,
          };
        });
        return true;
      },
      recordQuizAttempt: (attempt: QuizAttempt): void => {
        set((state) => ({
          quizAttempts: [
            attempt,
            ...state.quizAttempts.filter((item) => item.id !== attempt.id),
          ].slice(0, 50),
          experiencePoints: state.experiencePoints + attempt.correct * 10,
        }));
      },
      setNotificationPreference: (label: string, enabled: boolean): void => {
        set((state) => ({
          notificationSettings: {
            ...state.notificationSettings,
            [label]: enabled,
          },
        }));
      },
      openSignOutModal: (): void => {
        set({ isSignOutModalOpen: true });
      },
      closeSignOutModal: (): void => {
        set({ isSignOutModalOpen: false });
      },
    }),
    {
      name: "preppal-auth",
      partialize: (state) => ({ ...state, isSignOutModalOpen: false }),
    },
  ),
);
