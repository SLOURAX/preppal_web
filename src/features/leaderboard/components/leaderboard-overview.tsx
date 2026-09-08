"use client";

import { BadgeCent, Crown, Medal } from "lucide-react";
import { useState } from "react";

import { LEADERBOARD_ENTRIES } from "../constants";
import {
  LeaderboardFilters,
  type LeaderboardRange,
} from "./leaderboard-filters";

interface LeaderboardOverviewProps {
  readonly userName: string;
}

const RANGE_LABELS: Readonly<Record<LeaderboardRange, string>> = {
  today: "Today’s",
  week: "This week’s",
  month: "This month’s",
  all: "All-time",
};

export function LeaderboardOverview({ userName }: LeaderboardOverviewProps) {
  const [selectedRange, setSelectedRange] = useState<LeaderboardRange>("week");
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-09");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const podium = [
    LEADERBOARD_ENTRIES[1],
    LEADERBOARD_ENTRIES[0],
    LEADERBOARD_ENTRIES[2],
  ] as const;
  const remaining = LEADERBOARD_ENTRIES.slice(3);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleEntries = normalizedQuery
    ? LEADERBOARD_ENTRIES.filter((entry) =>
        entry.name.toLowerCase().includes(normalizedQuery),
      )
    : remaining;
  const userEntry = LEADERBOARD_ENTRIES.find(
    (entry) => entry.name === userName,
  );
  const selectedMonthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${selectedMonth}-01T00:00:00`));
  const championLabel =
    selectedRange === "month"
      ? `${selectedMonthLabel} champions`
      : `${RANGE_LABELS[selectedRange]} champions`;

  return (
    <div className="space-y-5">
      <LeaderboardFilters
        onMonthChange={setSelectedMonth}
        onRangeChange={setSelectedRange}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedRange={selectedRange}
      />
      <section className="surface-card from-primary/10 via-surface to-surface overflow-hidden bg-gradient-to-br px-4 pt-6 sm:px-7 sm:pt-7">
        <div className="text-center">
          <h2 className="text-foreground text-xl font-bold">{championLabel}</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Top performers earning XP through eligible activities
          </p>
        </div>
        <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 items-end gap-2 sm:gap-4">
          {podium.map((entry) => {
            const isWinner = entry.rank === 1;
            const isSecond = entry.rank === 2;
            const MedalIcon = isWinner ? Crown : Medal;
            return (
              <div
                className={`flex min-w-0 flex-col items-center justify-self-center ${
                  isWinner ? "w-full max-w-36" : "w-full max-w-32"
                }`}
                key={entry.rank}
              >
                <div className="relative">
                  <div
                    className={`grid place-items-center rounded-full font-bold text-white shadow-lg ring-4 ring-white/80 dark:ring-white/10 ${
                      isWinner
                        ? "from-primary to-primary-strong size-20 bg-gradient-to-br text-2xl sm:size-24 sm:text-3xl"
                        : isSecond
                          ? "size-16 bg-slate-400 text-xl sm:size-20 sm:text-2xl"
                          : "size-16 bg-orange-500 text-xl sm:size-20 sm:text-2xl"
                    }`}
                  >
                    {entry.name.slice(0, 1)}
                  </div>
                  <span
                    className={`absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-white shadow-md ${entry.accent}`}
                  >
                    <MedalIcon className="size-4" />
                  </span>
                </div>
                <p className="text-foreground mt-3 w-full truncate text-center text-xs font-semibold sm:text-sm">
                  {entry.name}
                </p>
                <p className="text-primary mt-1 flex items-center gap-1 text-xs font-bold">
                  <BadgeCent className="size-3.5" />
                  {entry.score.toLocaleString()} P
                </p>
                <div
                  className={`mt-4 flex w-full items-start justify-center rounded-t-2xl pt-4 font-bold text-white/90 ${
                    isWinner
                      ? "from-primary to-primary-strong h-28 bg-gradient-to-b sm:h-32"
                      : isSecond
                        ? "h-20 bg-gradient-to-b from-slate-400 to-slate-500 sm:h-24"
                        : "h-16 bg-gradient-to-b from-orange-400 to-orange-600 sm:h-20"
                  }`}
                >
                  {entry.rank === 1 ? "1st" : entry.rank === 2 ? "2nd" : "3rd"}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="surface-card p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold">
            {normalizedQuery ? "Search results" : "More top learners"}
          </h3>
          <span className="text-muted-foreground text-xs">
            {visibleEntries.length} player
            {visibleEntries.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="divide-border divide-y">
          {visibleEntries.map((entry) => (
            <div
              className="flex items-center justify-between gap-4 py-3"
              key={entry.rank}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-muted-foreground w-5 text-sm font-bold">
                  {entry.rank}
                </span>
                <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-full text-xs font-bold">
                  {entry.name.slice(0, 1)}
                </span>
                <span className="truncate text-sm font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="text-muted-foreground text-sm font-semibold">
                {entry.score.toLocaleString()} P
              </span>
            </div>
          ))}
          {visibleEntries.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No players match “{searchQuery}”.
            </p>
          ) : null}
        </div>
      </section>
      <section className="bg-primary text-primary-foreground flex items-center justify-between gap-4 rounded-2xl p-5 shadow-sm">
        <div>
          <p className="text-sm opacity-80">Your current rank</p>
          <p className="text-2xl font-bold">#{userEntry?.rank ?? "—"}</p>
        </div>
        <p className="text-right text-sm font-medium opacity-90">
          Keep completing quizzes
          <br />
          to climb the board.
        </p>
      </section>
    </div>
  );
}
