"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api/client";
import type { RewardSummary } from "../reward.types";

const CHECK_IN_REWARD = 2;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function DailyCheckInCard({
  summary,
  onUpdated,
}: {
  summary: RewardSummary | null;
  onUpdated: () => void;
}) {
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const checkInDates = new Set<string>(
    (summary?.checkIns ?? []).map((item) =>
      String(item.checkInDate).slice(0, 10),
    ),
  );
  const hasCheckedIn = checkInDates.has(today);
  const streak = (() => {
    const localKey = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    let count = 0;
    const cursor = new Date(`${today}T00:00:00`);
    while (checkInDates.has(localKey(cursor))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  })();
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
    setIsCheckingIn(true);
    void apiClient("/api/v1/rewards/check-in", {
      method: "POST",
      credentials: "include",
    })
      .then(() => onUpdated())
      .finally(() => setIsCheckingIn(false));
  };

  return (
    <section className="surface-card w-full max-w-full min-w-0 overflow-hidden p-3.5 sm:p-6">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-xl">
            <CalendarCheck2 className="size-5" />
          </span>
          <div>
            <h2 className="text-foreground text-[.85rem] font-bold">
              Daily check-in
            </h2>
            {/* <p className="text-muted-foreground mt-0.5 text-[.75rem]">
              Check in every day to earn experience points.
            </p> */}
          </div>
        </div>
        <span className="bg-surface text-primary flex h-9 w-fit shrink-0 items-center justify-center self-start rounded-full px-4 py-1 text-[.75rem] font-semibold whitespace-nowrap sm:h-10 sm:self-auto sm:px-5">
          {streak} {streak === 1 ? "day" : "days"}
        </span>
      </div>

      <div className="mt-5 flex min-w-0 items-center justify-between gap-2 sm:mt-6">
        <button
          aria-label="Previous month"
          className="hover:bg-surface-subtle grid size-8 place-items-center rounded-full"
          onClick={() => moveMonth(-1)}
          type="button"
        >
          <ArrowLeft className="size-4" />
        </button>
        <p className="min-w-0 truncate text-center text-[.8rem] font-semibold sm:text-[.85rem]">
          {monthLabel}
        </p>
        <button
          aria-label="Next month"
          className="hover:bg-surface-subtle grid size-8 place-items-center rounded-full"
          onClick={() => moveMonth(1)}
          type="button"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="mt-4 grid min-w-0 grid-cols-7 gap-x-0 gap-y-2 text-center">
        {WEEKDAYS.map((weekday) => (
          <span
            className="text-muted-foreground text-[9px] font-medium"
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
            const dateKey = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isComplete = checkInDates.has(dateKey);
            const isToday = dateKey === today;
            return (
              <span
                className={cn(
                  "mx-auto grid size-6 place-items-center rounded-full text-[11px] sm:size-7 sm:text-xs",
                  isComplete && "bg-success/10 text-success font-semibold",
                  isToday && "bg-primary text-primary-foreground font-semibold",
                )}
                key={day}
              >
                {isComplete ? <CheckCircle2 className="size-3.5" /> : day}
              </span>
            );
          },
        )}
      </div>

      <div className="bg-surface mt-5 rounded-2xl p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground font-semibold">
            Next milestone
          </span>
          <span className="text-foreground font-semibold">7-day streak</span>
        </div>
        <div className="bg-border/60 mt-3 h-1.5 overflow-hidden rounded-full">
          <div className="bg-primary h-full w-[14%] rounded-full" />
        </div>
      </div>

      <Button
        className="mt-4 w-full gap-2"
        disabled={hasCheckedIn || isCheckingIn}
        loading={isCheckingIn}
        onClick={checkIn}
      >
        {hasCheckedIn
          ? "Checked in today"
          : `Check in · +${CHECK_IN_REWARD} XP`}

        {/* {hasCheckedIn ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <CirclePlus className="size-4" />
        )} */}
      </Button>
    </section>
  );
}
