import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuizAttempt {
  id: string;
  subject: string;
  exam: string;
  mode: "timed" | "untimed";
  score: number;
  total: number;
  correct: number;
  date: string;
  durationSeconds: number;
  answers: Record<number, string>;
}

interface AuthState {
  isAuthenticated: boolean;
  preppalBalance: number;
  experiencePoints: number;
  userName: string;
  userPlan: string;
  weeklyGoal: number | null;
  weeklyActivity: boolean[];
  quizAttempts: QuizAttempt[];
  lastCheckIn: string | null;
  isSignOutModalOpen: boolean;
  login: () => void;
  logout: () => void;
  setBalance: (balance: number) => void;
  setUserName: (userName: string) => void;
  setWeeklyGoal: (goal: number) => void;
  addExperience: (amount: number) => void;
  completeCheckIn: () => boolean;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  openSignOutModal: () => void;
  closeSignOutModal: () => void;
}

const initialActivity = [false, false, false, false, false, false, false];

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      preppalBalance: 200,
      experiencePoints: 1240,
      userName: "Solomon Udumizi",
      userPlan: "Level 1",
      weeklyGoal: null,
      weeklyActivity: initialActivity,
      quizAttempts: [],
      lastCheckIn: null,
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
        });
      },
      setBalance: (preppalBalance: number): void => {
        set({ preppalBalance });
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
