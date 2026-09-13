"use client";

import {
  BadgeCent,
  ChevronLeft,
  ChevronRight,
  Crown,
  Medal,
} from "lucide-react";
import { useState } from "react";
import { DataState } from "@/components/ui";

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

const PAGE_SIZE = 10;

export function LeaderboardOverview({ userName }: LeaderboardOverviewProps) {
  const [selectedRange, setSelectedRange] = useState<LeaderboardRange>("week");
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-09");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const podium = [
    LEADERBOARD_ENTRIES[1],
    LEADERBOARD_ENTRIES[0],
    LEADERBOARD_ENTRIES[2],
  ] as const;
  const remaining = LEADERBOARD_ENTRIES.slice(3);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredEntries = normalizedQuery
    ? remaining.filter((entry) =>
        entry.name.toLowerCase().includes(normalizedQuery),
      )
    : remaining;
  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, pageCount);
  const visibleEntries = filteredEntries.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
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
        onMonthChange={(month) => {
          setSelectedMonth(month);
          setCurrentPage(1);
        }}
        onRangeChange={(range) => {
          setSelectedRange(range);
          setCurrentPage(1);
        }}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        selectedMonth={selectedMonth}
        selectedRange={selectedRange}
      />
      <section className="surface-card from-primary/10 via-surface to-surface overflow-hidden bg-gradient-to-br px-4 pt-5 sm:px-7 sm:pt-6">
        <div className="text-center">
          <h2 className="text-foreground text-xl font-bold">{championLabel}</h2>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Top performers earning XP through eligible activities
          </p>
        </div>
        <div className="relative mx-auto mt-5 grid max-w-[400px] grid-cols-3 items-end gap-5 sm:mt-4 sm:gap-7">
          {podium.map((entry) => {
            const isWinner = entry.rank === 1;
            const isSecond = entry.rank === 2;
            const MedalIcon = isWinner ? Crown : Medal;
            return (
              <div
                className={`flex min-w-0 flex-col items-center justify-self-center ${
                  isWinner ? "w-full max-w-28" : "w-full max-w-24"
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
                <p className="text-foreground mt-2 w-full truncate text-center text-xs font-semibold sm:text-sm">
                  {entry.name}
                </p>
                <p className="text-primary mt-0.5 flex items-center gap-1 text-xs font-bold">
                  <BadgeCent className="size-3.5" />
                  {entry.score.toLocaleString()} XP
                </p>
                <div
                  className={`podium-grid relative z-10 mt-2 flex w-full items-start justify-center rounded-2xl border border-white/25 pt-3 font-bold text-white/90 shadow-inner ${
                    isWinner
                      ? "from-primary to-primary-strong h-24 bg-gradient-to-b sm:h-28"
                      : isSecond
                        ? "h-[4.5rem] bg-gradient-to-b from-slate-400 to-slate-500 sm:h-20"
                        : "h-14 bg-gradient-to-b from-orange-400 to-orange-600 sm:h-16"
                  }`}
                >
                  <span>
                    {entry.rank === 1
                      ? "1st"
                      : entry.rank === 2
                        ? "2nd"
                        : "3rd"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="surface-card p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-[.9rem] font-semibold">
            {normalizedQuery ? "Search results" : "Leaderboard rankings"}
          </h3>
          <span className="text-muted-foreground text-xs">
            {filteredEntries.length} player
            {filteredEntries.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="divide-border divide-y">
          {visibleEntries.map((entry) => (
            <div
              className="flex items-center justify-between gap-4 py-3"
              key={entry.rank}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-muted-foreground w-5 text-[.85rem] font-bold">
                  {entry.rank}
                </span>
                <span className="bg-primary/10 text-primary grid size-8 place-items-center rounded-full text-xs font-bold">
                  {entry.name.slice(0, 1)}
                </span>
                <span className="truncate text-[.8rem] font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="text-muted-foreground text-[.8rem] font-semibold">
                {entry.score.toLocaleString()} XP
              </span>
            </div>
          ))}
          {visibleEntries.length === 0 ? (
            <DataState
              title="No players found"
              description={`No leaderboard entries match “${searchQuery}”. Try a different name or change the time range.`}
            />
          ) : null}
        </div>
        {filteredEntries.length > PAGE_SIZE ? (
          <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
            <button
              aria-label="Previous leaderboard page"
              className="text-muted-foreground hover:bg-surface-subtle hover:text-foreground inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              type="button"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <div
              className="flex items-center gap-1"
              aria-label="Leaderboard pages"
            >
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    aria-label={`Go to leaderboard page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                    className={`grid size-8 place-items-center rounded-lg text-xs font-semibold transition-colors ${safePage === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface-subtle"}`}
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    type="button"
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
            <button
              aria-label="Next leaderboard page"
              className="text-muted-foreground hover:bg-surface-subtle hover:text-foreground inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40"
              disabled={safePage === pageCount}
              onClick={() =>
                setCurrentPage((page) => Math.min(pageCount, page + 1))
              }
              type="button"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </section>
      <section className="bg-primary text-primary-foreground flex items-center justify-between gap-4 rounded-2xl p-5 shadow-sm">
        <div>
          <p className="text-sm opacity-80">Your current rank</p>
          <p className="text-2xl font-bold">#{userEntry?.rank ?? "—"}</p>
        </div>
        <p className="text-right text-[.8rem] font-medium opacity-90">
          Keep completing quizzes
          <br />
          to climb the board.
        </p>
      </section>
    </div>
  );
}
