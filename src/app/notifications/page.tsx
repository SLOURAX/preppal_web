"use client";

import { AlertTriangle, ArrowLeft, Bell, Check, Info, Zap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { DataState, Mascot } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NOTIFICATIONS, type NotificationIconName, type NotificationItem } from "@/constants/notifications";

const ICONS: Record<NotificationIconName, typeof Zap> = {
  zap: Zap,
  info: Info,
  warning: AlertTriangle,
};

const iconStyles: Record<NotificationItem["type"], string> = {
  success: "bg-amber-100 text-amber-600 dark:bg-amber-500/20",
  info: "bg-blue-100 text-blue-600 dark:bg-blue-500/20",
  warning: "bg-orange-100 text-orange-600 dark:bg-orange-500/20",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    ...NOTIFICATIONS,
  ]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = notifications.filter((item) => !item.read).length;
  const visibleNotifications = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((item) => !item.read)
        : notifications,
    [filter, notifications],
  );

  const markAllAsRead = (): void => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  const markAsRead = (id: number): void => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex items-center justify-between gap-4">
        <Link
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          href="/"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>
        {unreadCount > 0 ? (
          <button
            className="text-primary hover:text-primary-strong inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            onClick={markAllAsRead}
            type="button"
          >
            <Check className="size-3.5" /> Mark all as read
          </button>
        ) : null}
      </div>

      <header className="mt-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Stay up to date with your learning, rewards, and account activity.
          </p>
        </div>
        <span className="bg-primary/10 text-primary hidden rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex">
          {unreadCount} unread
        </span>
      </header>

      <div className="surface-card mt-8 flex items-center gap-2 p-2">
        {(["all", "unread"] as const).map((value) => (
          <button
            aria-pressed={filter === value}
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              filter === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground",
            )}
            key={value}
            onClick={() => setFilter(value)}
            type="button"
          >
            {value === "all" ? "All notifications" : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      <section className="surface-card mt-4 overflow-hidden" aria-live="polite">
        {visibleNotifications.length > 0 ? (
          <div className="divide-border divide-y">
            {visibleNotifications.map((notification) => {
              const Icon = ICONS[notification.icon];
              return (
                <button
                  className={cn(
                    "hover:bg-surface-subtle flex w-full items-start gap-4 p-5 text-left transition-colors sm:p-6",
                    !notification.read && "bg-primary/[0.035]",
                  )}
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-2xl",
                      iconStyles[notification.type],
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "text-sm",
                          notification.read
                            ? "text-foreground font-medium"
                            : "text-foreground font-bold",
                        )}
                      >
                        {notification.title}
                      </span>
                      <span className="text-muted-foreground shrink-0 text-xs font-medium">
                        {notification.time}
                      </span>
                    </span>
                    <span className="text-muted-foreground mt-1 block text-sm leading-6">
                      {notification.message}
                    </span>
                  </span>
                  {!notification.read ? (
                    <span className="bg-primary mt-2 size-2 shrink-0 rounded-full" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-6">
            <DataState
              description="You’re all caught up. New learning and reward updates will appear here."
              icon={<Bell className="size-5" />}
              title="No unread notifications"
            />
          </div>
        )}
      </section>

      {notifications.length === 0 ? (
        <div className="mt-4">
          <Mascot mood="wave" size="sm" />
        </div>
      ) : null}
    </main>
  );
}
