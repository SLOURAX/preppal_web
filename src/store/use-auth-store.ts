import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_FINANCE_BALANCES, XP_TO_COIN_RATE } from "@/constants/finance";
import { apiClient } from "@/lib/api/client";
import type { LoginInput } from "@/features/auth/auth.schemas";
import { loginSchema } from "@/features/auth/auth.schemas";

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

export interface LevelProgress {
  current: {
    number: number;
    name: string;
    minXp: number;
    description: string;
  };
  experiencePoints: number;
  lifetimeExperiencePoints: number;
  nextLevelXp: number | null;
  xpToNext: number;
  progressPercent: number;
  maxLevel: number;
  xpPerLevel: number;
}

interface AuthUserPayload {
  fullName: string;
  email: string;
  experiencePoints: number;
  referralCode: string;
  referralLink: string;
  wallet?: { availableBalanceMinor: number } | null;
  progress: LevelProgress;
}

interface AuthState {
  isAuthenticated: boolean;
  sessionChecked: boolean;
  preppalBalance: number;
  depositedFunds: number;
  experiencePoints: number;
  userName: string;
  userEmail: string;
  userPlan: string;
  levelProgress: LevelProgress | null;
  referralCode: string;
  referralLink: string;
  weeklyGoal: number | null;
  weeklyActivity: boolean[];
  quizAttempts: QuizAttempt[];
  lastCheckIn: string | null;
  notificationSettings: Record<string, boolean>;
  isSignOutModalOpen: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  restoreSession: () => Promise<void>;
  logout: () => Promise<void>;
  clearSession: () => void;
  setBalance: (balance: number) => void;
  setRewardBalances: (balances: {
    experiencePoints: number;
    preppalBalance: number;
  }) => void;
  setLevelProgress: (progress: LevelProgress) => void;
  setDepositedFunds: (amount: number) => void;
  setUserName: (userName: string) => void;
  setWeeklyGoal: (goal: number) => void;
  convertExperienceToCoins: (amount: number) => Promise<boolean>;
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
      sessionChecked: false,
      ...INITIAL_FINANCE_BALANCES,
      userName: "Solomon Udumizi",
      userEmail: "",
      userPlan: "Level 1",
      levelProgress: null,
      referralCode: "",
      referralLink: "",
      weeklyGoal: null,
      weeklyActivity: initialActivity,
      quizAttempts: [],
      lastCheckIn: null,
      notificationSettings: {
        "Quiz reminders": true,
        "Leaderboard updates": true,
      },
      isSignOutModalOpen: false,
      login: async (credentials): Promise<void> => {
        const validated = loginSchema.parse(credentials);
        const response = await apiClient<{
          expiresAt: string;
          user: AuthUserPayload;
        }>("/api/v1/auth/login", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(validated),
        });
        set({
          isAuthenticated: true,
          userName: response.user.fullName,
          userEmail: response.user.email,
          experiencePoints: response.user.experiencePoints,
          preppalBalance: response.user.wallet?.availableBalanceMinor ?? 0,
          referralCode: response.user.referralCode,
          referralLink: response.user.referralLink,
          userPlan: `Level ${response.user.progress.current.number}`,
          levelProgress: response.user.progress,
          sessionChecked: true,
        });
      },
      restoreSession: async (): Promise<void> => {
        try {
          const user = await apiClient<AuthUserPayload>("/api/v1/auth/me");
          set({
            isAuthenticated: true,
            sessionChecked: true,
            userName: user.fullName,
            userEmail: user.email,
            experiencePoints: user.experiencePoints,
            preppalBalance: user.wallet?.availableBalanceMinor ?? 0,
            referralCode: user.referralCode,
            referralLink: user.referralLink,
            userPlan: `Level ${user.progress.current.number}`,
            levelProgress: user.progress,
          });
        } catch {
          get().clearSession();
        }
      },
      logout: async (): Promise<void> => {
        try {
          await apiClient("/api/v1/auth/logout", { method: "POST" });
        } finally {
          get().clearSession();
        }
      },
      clearSession: (): void => {
        set({
          isAuthenticated: false,
          sessionChecked: true,
          userEmail: "",
          userName: "Learner",
          userPlan: "Level 1",
          levelProgress: null,
          ...INITIAL_FINANCE_BALANCES,
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
      setRewardBalances: ({ experiencePoints, preppalBalance }): void => {
        set({ experiencePoints, preppalBalance });
      },
      setLevelProgress: (levelProgress): void => {
        set({
          levelProgress,
          experiencePoints: levelProgress.experiencePoints,
          userPlan: `Level ${levelProgress.current.number}`,
        });
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
      convertExperienceToCoins: async (amount: number): Promise<boolean> => {
        const requestedXp = Math.floor(amount);
        const state = get();
        if (
          requestedXp < XP_TO_COIN_RATE ||
          requestedXp > state.experiencePoints
        )
          return false;
        try {
          const result = await apiClient<{
            experiencePoints: number;
            coins: number;
            progress: LevelProgress;
          }>("/api/v1/rewards/convert-xp", {
            method: "POST",
            body: JSON.stringify({ xp: requestedXp }),
          });
          set({
            experiencePoints: result.experiencePoints,
            preppalBalance: result.coins,
            levelProgress: result.progress,
            userPlan: `Level ${result.progress.current.number}`,
          });
          return true;
        } catch {
          return false;
        }
      },
      recordQuizAttempt: (attempt: QuizAttempt): void => {
        set((state) => ({
          quizAttempts: [
            attempt,
            ...state.quizAttempts.filter((item) => item.id !== attempt.id),
          ].slice(0, 50),
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
      version: 3,
      migrate: (persistedState) => ({
        ...(persistedState as AuthState),
        isAuthenticated: false,
        sessionChecked: false,
        ...INITIAL_FINANCE_BALANCES,
        levelProgress: null,
      }),
      partialize: (state) => ({
        ...state,
        isAuthenticated: false,
        sessionChecked: false,
        isSignOutModalOpen: false,
      }),
    },
  ),
);
