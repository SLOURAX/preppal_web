"use client";

import {
  BadgePlus,
  CalendarCheck2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

const CURRENT_DAY = 2;
const CHECK_IN_REWARD = 10;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function DailyCheckInCard() {
  const balance = useAuthStore((state) => state.preppalBalance);
  const setBalance = useAuthStore((state) => state.setBalance);
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date(2026, 8, 1));
  const [hasCheckedIn, setHasCheckedIn] = useState<boolean>(false);
  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const mondayOffset = (visibleMonth.getDay() + 6) % 7;

  const moveMonth = (offset: number): void => {
    setVisibleMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + offset, 1),
    );
  };

  const checkIn = (): void => {
    if (hasCheckedIn) return;
    setBalance(balance + CHECK_IN_REWARD);
    setHasCheckedIn(true);
  };

  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-xl">
            <CalendarCheck2 className="size-5" />
          </span>
          <div>
            <h2 className="text-foreground font-semibold">Daily check-in</h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Build consistency and earn a daily bonus.
            </p>
          </div>
        </div>
        <span className="bg-surface-subtle text-foreground flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
          <ChartNoAxesCombined className="text-primary size-3.5" /> 1 day
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          aria-label="Previous month"
          className="hover:bg-surface-subtle grid size-8 place-items-center rounded-full"
          onClick={() => moveMonth(-1)}
          type="button"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold">{monthLabel}</p>
        <button
          aria-label="Next month"
          className="hover:bg-surface-subtle grid size-8 place-items-center rounded-full"
          onClick={() => moveMonth(1)}
          type="button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS.map((weekday) => (
          <span
            className="text-muted-foreground text-[10px] font-medium"
            key={weekday}
          >
            {weekday}
          </span>
        ))}
        {Array.from({ length: mondayOffset }, (_, index) => (
          <span aria-hidden="true" key={`blank-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day) => {
            const isCurrentMonth =
              visibleMonth.getFullYear() === 2026 &&
              visibleMonth.getMonth() === 8;
            const isComplete = isCurrentMonth && day === 1;
            const isToday = isCurrentMonth && day === CURRENT_DAY;
            return (
              <span
                className={cn(
                  "mx-auto grid size-7 place-items-center rounded-full text-xs",
                  isComplete && "bg-success/10 text-success font-semibold",
                  isToday && "bg-primary text-primary-foreground font-semibold",
                )}
                key={day}
              >
                {isComplete ? <Check className="size-3.5" /> : day}
              </span>
            );
          },
        )}
      </div>

      <div className="bg-surface-subtle mt-5 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="text-muted-foreground">Next milestone</span>
          <span className="text-foreground font-semibold">7-day streak</span>
        </div>
        <div className="bg-border/60 mt-3 h-1.5 overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[14%] rounded-full" />
        </div>
      </div>

      <Button
        className="mt-4 w-full gap-2"
        disabled={hasCheckedIn}
        onClick={checkIn}
      >
        {hasCheckedIn ? (
          <Check className="size-4" />
        ) : (
          <BadgePlus className="size-4" />
        )}
        {hasCheckedIn ? "Checked in" : `Check in · +${CHECK_IN_REWARD} P`}
      </Button>
    </section>
  );
}
