import type { LevelProgress } from "@/store/use-auth-store";

export interface RewardReferral {
  id: string;
  status: "PENDING" | "ACTIVATED";
  rewardPoints: number;
  createdAt: string;
  referredUser: {
    firstName: string | null;
    surname: string | null;
    emailVerifiedAt: string | null;
  };
}

export interface RewardSummary {
  experiencePoints: number;
  coins: number;
  referralCode?: string;
  referralLink?: string | null;
  progress: LevelProgress | null;
  checkIns: Array<{ checkInDate: string; xpAwarded: number }>;
  referrals: RewardReferral[];
}
