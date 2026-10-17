import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_FINANCE_BALANCES, XP_TO_COIN_RATE } from "@/constants/finance";
import { apiClient } from "@/lib/api/client";
import type { LoginInput } from "@/features/auth/auth.schemas";
import { loginSchema } from "@/features/auth/auth.schemas";
import { getMembership, type Membership } from "@/features/payments";

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
  context?: {
    examId?: string;
    subjectId?: string;
    examName?: string;
    subjectName?: string;
    yearLink?: string;
    difficulty?: string;
    topicIds?: string;
    topics?: string;
  };
  questions?: Array<{
    id: number;
    sourceQuestionId: string;
    text: string;
    passage?: string;
    options: readonly string[];
    correctAnswer: string;
    explanation: string;
  }>;
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
  wallet?: {
    availableBalanceMinor: number;
    depositedBalanceMinor: number;
  } | null;
  progress: LevelProgress;
}

interface StoredQuizSession {
  id: string;
  subject: string;
  examType: string;
  mode: "timed" | "untimed";
  path?: "exam" | "subject" | null;
  examYear?: string | null;
  scorePercent: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  durationSeconds?: number | null;
  answers?: Record<string, string> | null;
  simulationSeed?: number | null;
  selectionContext?: QuizAttempt["context"] | null;
  reviewQuestions?: QuizAttempt["questions"];
}

const getQuizHistory = async (): Promise<QuizAttempt[]> => {
  const sessions = await apiClient<StoredQuizSession[]>(
    "/api/v1/learning/quiz-sessions",
  );
  return sessions.map((session) => ({
    id: session.id,
    subject: session.subject,
    exam: session.examType,
    mode: session.mode,
    path: session.path ?? undefined,
    year: session.examYear ?? undefined,
    score: session.scorePercent,
    total: session.totalQuestions,
    correct: session.correctAnswers,
    date: session.completedAt,
    durationSeconds: session.durationSeconds ?? 0,
    answers: Object.fromEntries(
      Object.entries(session.answers ?? {}).map(([key, value]) => [
        Number(key),
        value,
      ]),
    ),
    seed: session.simulationSeed ?? undefined,
    context: session.selectionContext ?? undefined,
    questions: session.reviewQuestions,
  }));
};

interface AuthState {
  isAuthenticated: boolean;
  sessionChecked: boolean;
  preppalBalance: number;
  depositedFunds: number;
  experiencePoints: number;
  userName: string;
  userEmail: string;
  userPlan: string;
  membership: Membership | null;
  levelProgress: LevelProgress | null;
  referralCode: string;
  referralLink: string;
  quizAttempts: QuizAttempt[];
  lastCheckIn: string | null;
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
  convertExperienceToCoins: (amount: number) => Promise<boolean>;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      sessionChecked: false,
      ...INITIAL_FINANCE_BALANCES,
      userName: "Learner",
      userEmail: "",
      userPlan: "Starter",
      membership: null,
      levelProgress: null,
      referralCode: "",
      referralLink: "",
      quizAttempts: [],
      lastCheckIn: null,
      isSignOutModalOpen: false,
      login: async (credentials): Promise<void> => {
        const validated = loginSchema.parse(credentials);
        const response = await apiClient<{
          accessToken?: string;
          expiresAt: string;
          user: AuthUserPayload;
        }>("/api/v1/auth/login", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(validated),
        });
        if (response.accessToken && typeof window !== "undefined") {
          window.localStorage.setItem("preppal_token", response.accessToken);
        }
        const [membership, quizAttempts] = await Promise.all([
          getMembership().catch(() => null),
          getQuizHistory().catch(() => []),
        ]);
        set({
          isAuthenticated: true,
          userName: response.user.fullName,
          userEmail: response.user.email,
          experiencePoints: response.user.experiencePoints,
          preppalBalance: response.user.wallet?.availableBalanceMinor ?? 0,
          referralCode: response.user.referralCode,
          referralLink: response.user.referralLink,
          depositedFunds:
            (response.user.wallet?.depositedBalanceMinor ?? 0) / 100,
          userPlan: membership?.plan.name ?? "Starter",
          membership,
          levelProgress: response.user.progress,
          quizAttempts,
          sessionChecked: true,
        });
      },
      restoreSession: async (): Promise<void> => {
        try {
          const user = await apiClient<AuthUserPayload>("/api/v1/auth/me");
          const [membership, quizAttempts] = await Promise.all([
            getMembership().catch(() => null),
            getQuizHistory().catch(() => []),
          ]);
          set({
            isAuthenticated: true,
            sessionChecked: true,
            userName: user.fullName,
            userEmail: user.email,
            experiencePoints: user.experiencePoints,
            preppalBalance: user.wallet?.availableBalanceMinor ?? 0,
            referralCode: user.referralCode,
            referralLink: user.referralLink,
            depositedFunds: (user.wallet?.depositedBalanceMinor ?? 0) / 100,
            userPlan: membership?.plan.name ?? "Starter",
            membership,
            levelProgress: user.progress,
            quizAttempts,
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
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("preppal_token");
        }
        set({
          isAuthenticated: false,
          sessionChecked: true,
          userEmail: "",
          userName: "Learner",
          userPlan: "Starter",
          membership: null,
          levelProgress: null,
          ...INITIAL_FINANCE_BALANCES,
          isSignOutModalOpen: false,
          quizAttempts: [],
          lastCheckIn: null,
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
        });
      },
      setDepositedFunds: (depositedFunds: number): void => {
        set({ depositedFunds: Math.max(0, depositedFunds) });
      },
      setUserName: (userName: string): void => {
        set({ userName: userName.trim() || "Learner" });
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
      openSignOutModal: (): void => {
        set({ isSignOutModalOpen: true });
      },
      closeSignOutModal: (): void => {
        set({ isSignOutModalOpen: false });
      },
    }),
    {
      name: "preppal-auth",
      version: 5,
      migrate: (persistedState) => ({
        ...(persistedState as AuthState),
        userPlan: (persistedState as AuthState).userPlan ?? "Starter",
        membership: (persistedState as AuthState).membership ?? null,
        isAuthenticated: (persistedState as AuthState).isAuthenticated ?? false,
        sessionChecked: false,
      }),
      partialize: (state) => ({
        ...state,
        sessionChecked: false,
        isSignOutModalOpen: false,
      }),
    },
  ),
);
