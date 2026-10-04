"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export interface NotificationPreferences {
  quizReminders: boolean;
  leaderboardUpdates: boolean;
}

const queryKey = ["users", "me", "notification-preferences"] as const;

export function useNotificationPreferences() {
  return useQuery({
    queryKey,
    queryFn: () =>
      apiClient<NotificationPreferences>(
        "/api/v1/users/me/notification-preferences",
      ),
    staleTime: 5 * 60_000,
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (update: Partial<NotificationPreferences>) =>
      apiClient<NotificationPreferences>(
        "/api/v1/users/me/notification-preferences",
        { method: "PATCH", body: JSON.stringify(update) },
      ),
    onSuccess: (preferences) => {
      queryClient.setQueryData(queryKey, preferences);
    },
  });
}
