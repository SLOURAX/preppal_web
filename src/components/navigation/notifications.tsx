"use client";

import { AlertTriangle, Bell, Check, Info, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/ui";
import { useNotifications } from "@/features/notifications/use-notifications";
import type { AppNotification } from "@/features/notifications/use-notifications";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth-store";

const ICONS: Record<AppNotification["icon"], typeof Zap> = {
  zap: Zap,
  info: Info,
  warning: AlertTriangle,
};
const formatTime = (value: string) => {
  const date = new Date(value);
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { notifications, unreadCount, read, readAll } =
    useNotifications(isAuthenticated);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:bg-surface-subtle hover:text-foreground focus:ring-primary relative rounded-full p-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="bg-danger ring-surface absolute top-1.5 right-1.5 h-2 w-2 animate-pulse rounded-full ring-2" />
        )}
      </button>
      {isOpen && (
        <>
          <div
            className="bg-background/80 fixed inset-0 z-[60] backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="border-border bg-surface fixed inset-x-0 top-16 bottom-0 z-[60] flex flex-col overflow-hidden rounded-t-3xl border-t shadow-2xl sm:absolute sm:inset-auto sm:top-auto sm:right-0 sm:mt-2 sm:w-96 sm:max-w-sm sm:rounded-2xl sm:border">
            <div className="border-border flex items-center justify-between border-b p-4">
              <h3 className="text-foreground font-bold">Notifications</h3>
              <div className="flex items-center gap-4">
                {unreadCount > 0 && (
                  <button
                    onClick={() => readAll.mutate()}
                    className="text-primary flex items-center gap-1 text-xs font-semibold"
                  >
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
                <button
                  className="text-muted-foreground rounded-full p-1 sm:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto sm:max-h-[400px]">
              {notifications.length > 0 ? (
                <div className="divide-border divide-y">
                  {notifications.map((notification) => {
                    const Icon = ICONS[notification.icon];
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "hover:bg-surface-subtle flex cursor-pointer gap-3 p-4",
                          !notification.read && "bg-primary/5",
                        )}
                        onClick={() =>
                          !notification.read && read.mutate(notification.id)
                        }
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                            notification.type === "success"
                              ? "bg-amber-100 text-amber-600"
                              : notification.type === "warning"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-100 text-blue-600",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2">
                            <p
                              className={cn(
                                "truncate text-[.85rem]",
                                notification.read ? "font-medium" : "font-bold",
                              )}
                            >
                              {notification.title}
                            </p>
                            <span className="text-muted-foreground text-[.75rem] whitespace-nowrap">
                              {formatTime(notification.time)}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[.75rem]">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="bg-primary mt-1.5 h-2 w-2 rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center p-6 text-center">
                  <Mascot mood="disappointed" size="md" animated={false} />
                  <p className="text-sm font-medium">No notifications yet</p>
                </div>
              )}
            </div>
            <div className="border-border border-t p-3 text-center">
              <a
                className="text-foreground text-sm font-semibold"
                href="/notifications"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
