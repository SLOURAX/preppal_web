"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export interface WeeklyGoalDay {
  date: string;
  active: boolean;
}

export interface WeeklyGoal {
  targetDays: number | null;
  completedDays: number;
  achieved: boolean;
  days: WeeklyGoalDay[];
  weekStartsAt: string;
  weekEndsAt: string;
  timezone: string;
}

export const weeklyGoalQueryKey = ["progression", "weekly-goal"] as const;

export function useWeeklyGoal() {
  return useQuery({
    queryKey: weeklyGoalQueryKey,
    queryFn: () => apiClient<WeeklyGoal>("/api/v1/progression/weekly-goal"),
    staleTime: 60_000,
  });
}

export function useUpdateWeeklyGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (days: number) =>
      apiClient<WeeklyGoal>("/api/v1/progression/weekly-goal", {
        method: "PATCH",
        body: JSON.stringify({ days }),
      }),
    onSuccess: (goal) => {
      queryClient.setQueryData(weeklyGoalQueryKey, goal);
    },
  });
}
