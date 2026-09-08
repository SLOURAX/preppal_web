"use client";

import { Bell, Check, Info, AlertTriangle, Zap, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/ui";
import { NOTIFICATIONS, type NotificationIconName } from "@/constants/notifications";

const ICONS: Record<NotificationIconName, typeof Zap> = {
  zap: Zap,
  info: Info,
  warning: AlertTriangle,
};

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([...NOTIFICATIONS]);
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
                    const Icon = ICONS[notification.icon];
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
                <div className="text-muted-foreground flex flex-col items-center p-6 text-center">
                  <Mascot mood="wave" size="sm" />
                  <Bell className="mt-2 mb-2 h-6 w-6 opacity-20" />
                  <p className="text-sm font-medium">No notifications yet</p>
                  <p className="mt-1 max-w-[14rem] text-xs">
                    We&apos;ll let you know when there&apos;s something new.
                  </p>
                </div>
              )}
            </div>
            <div className="border-border bg-surface-subtle/50 border-t p-3 text-center">
              <a
                className="text-foreground hover:text-primary text-sm font-semibold transition-colors"
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
