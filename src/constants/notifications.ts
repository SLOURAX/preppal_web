export type NotificationType = "success" | "info" | "warning";
export type NotificationIconName = "zap" | "info" | "warning";

export interface NotificationItem {
  readonly id: number;
  readonly title: string;
  readonly message: string;
  readonly type: NotificationType;
  readonly time: string;
  readonly read: boolean;
  readonly icon: NotificationIconName;
}

export const NOTIFICATIONS: readonly NotificationItem[] = [
  {
    id: 1,
    title: "Level Up!",
    message: "You've reached level 5. Keep going to unlock more rewards.",
    type: "success",
    time: "2h ago",
    read: false,
    icon: "zap",
  },
  {
    id: 2,
    title: "New AI Quiz Available",
    message:
      "A new biology mock exam is now available based on your weak areas. Try it now!",
    type: "info",
    time: "5h ago",
    read: false,
    icon: "info",
  },
  {
    id: 3,
    title: "Streak Warning",
    message:
      "You haven't completed a quiz today. Don't lose your 7-day streak!",
    type: "warning",
    time: "1d ago",
    read: true,
    icon: "warning",
  },
] as const;
