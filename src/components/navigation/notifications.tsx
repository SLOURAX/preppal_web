"use client";

import { Bell, Check, Info, AlertTriangle, Zap, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Level Up!",
    message: "You've reached level 5. Keep going to unlock more rewards.",
    type: "success",
    time: "2h ago",
    read: false,
    icon: Zap,
  },
  {
    id: 2,
    title: "New AI Quiz Available",
    message:
      "A new biology mock exam is now available based on your weak areas. Try it now!",
    type: "info",
    time: "5h ago",
    read: false,
    icon: Info,
  },
  {
    id: 3,
    title: "Streak Warning",
    message:
      "You haven't completed a quiz today. Don't lose your 7-day streak!",
    type: "warning",
    time: "1d ago",
    read: true,
    icon: AlertTriangle,
  },
];

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

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
          {/* Mobile Overlay to catch outside clicks if needed (though full screen catches everything) */}
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
                    onClick={markAllAsRead}
                    className="text-primary hover:text-primary-strong flex items-center gap-1 text-xs font-semibold transition-colors"
                  >
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
                {/* Close button for mobile */}
                <button
                  className="text-muted-foreground hover:bg-surface-subtle rounded-full p-1 sm:hidden"
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
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "hover:bg-surface-subtle flex cursor-pointer gap-3 p-4 transition-colors",
                          !notification.read && "bg-primary/5",
                        )}
                        onClick={() => {
                          setNotifications(
                            notifications.map((n) =>
                              n.id === notification.id
                                ? { ...n, read: true }
                                : n,
                            ),
                          );
                        }}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                            notification.type === "success"
                              ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20"
                              : notification.type === "warning"
                                ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-500/20",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={cn(
                                "truncate text-[.85rem]",
                                notification.read
                                  ? "text-foreground font-medium"
                                  : "text-foreground font-bold",
                              )}
                            >
                              {notification.title}
                            </p>
                            <span className="text-muted-foreground text-[.75rem] font-medium whitespace-nowrap">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[.75rem]">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="bg-primary mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-muted-foreground p-8 text-center">
                  <Bell className="mx-auto mb-3 h-8 w-8 opacity-20" />
                  <p className="text-sm font-medium">No notifications yet</p>
                </div>
              )}
            </div>
            <div className="border-border bg-surface-subtle/50 border-t p-3 text-center">
              <button className="text-foreground hover:text-primary text-sm font-semibold transition-colors">
                View all notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
