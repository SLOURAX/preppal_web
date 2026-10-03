"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { queryKeys } from "@/lib/query-keys";

export interface AppNotification {
  id: string;
  type: "success" | "info" | "warning";
  icon: "zap" | "info" | "warning";
  title: string;
  message: string;
  read: boolean;
  time: string;
}

interface NotificationResponse {
  notifications: AppNotification[];
  unreadCount: number;
}

export function useNotifications(enabled = true) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => apiClient<NotificationResponse>("/api/v1/notifications"),
    enabled,
    staleTime: 30_000,
  });
  const read = useMutation({
    mutationFn: (id: string) =>
      apiClient<NotificationResponse>(`/api/v1/notifications/${id}/read`, {
        method: "PATCH",
      }),
    onSuccess: (data) =>
      queryClient.setQueryData(queryKeys.notifications, data),
  });
  const readAll = useMutation({
    mutationFn: () =>
      apiClient<NotificationResponse>("/api/v1/notifications/read-all", {
        method: "PATCH",
      }),
    onSuccess: (data) =>
      queryClient.setQueryData(queryKeys.notifications, data),
  });
  return {
    ...query,
    notifications: query.data?.notifications ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    read,
    readAll,
  };
}
