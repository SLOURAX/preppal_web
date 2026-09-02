"use client";

import { Bell, Check, Info, AlertTriangle, Zap } from "lucide-react";
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
    message: "A new biology mock exam is now available based on your weak areas. Try it now!",
    type: "info",
    time: "5h ago",
    read: false,
    icon: Info,
  },
  {
    id: 3,
    title: "Streak Warning",
    message: "You haven't completed a quiz today. Don't lose your 7-day streak!",
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
        className="relative p-2 text-muted-foreground hover:bg-surface-subtle hover:text-foreground rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-surface animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden z-[60]">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-primary hover:text-primary-strong transition-colors flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 flex gap-3 hover:bg-surface-subtle transition-colors cursor-pointer",
                        !notification.read && "bg-primary/5"
                      )}
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) =>
                            n.id === notification.id ? { ...n, read: true } : n
                          )
                        );
                      }}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          notification.type === "success"
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20"
                            : notification.type === "warning"
                            ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-500/20"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={cn(
                              "text-[.85rem] truncate",
                              notification.read
                                ? "font-medium text-foreground"
                                : "font-bold text-foreground"
                            )}
                          >
                            {notification.title}
                          </p>
                          <span className="text-[.75rem] font-medium text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-[.75rem] text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-border bg-surface-subtle/50 text-center">
            <button className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
