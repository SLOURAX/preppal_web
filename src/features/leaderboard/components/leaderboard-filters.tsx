import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Search,
} from "lucide-react";

export type LeaderboardRange = "today" | "week" | "month" | "all";

interface LeaderboardFiltersProps {
  readonly selectedRange: LeaderboardRange;
  readonly selectedMonth: string;
  readonly searchQuery: string;
  readonly onMonthChange: (month: string) => void;
  readonly onRangeChange: (range: LeaderboardRange) => void;
  readonly onSearchChange: (query: string) => void;
}

const DATE_RANGES = [
  { value: "today", label: "Today", icon: CalendarDays },
  { value: "week", label: "This week", icon: CalendarDays },
  { value: "month", label: "This month", icon: CalendarDays },
  { value: "all", label: "All time", icon: Globe2 },
] as const;

export function LeaderboardFilters({
  selectedRange,
  selectedMonth,
  searchQuery,
  onMonthChange,
  onRangeChange,
  onSearchChange,
}: LeaderboardFiltersProps) {
  const moveMonth = (offset: number): void => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const nextMonth = new Date(year, month - 1 + offset, 1);
    const nextYear = nextMonth.getFullYear();
    const nextMonthNumber = String(nextMonth.getMonth() + 1).padStart(2, "0");
    onMonthChange(`${nextYear}-${nextMonthNumber}`);
  };

  return (
    <div className="surface-card flex flex-col gap-3 p-3 sm:p-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DATE_RANGES.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedRange === value;
          return (
            <button
              aria-pressed={isSelected}
              className={
                isSelected
                  ? "bg-primary text-primary-foreground flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm"
                  : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              }
              key={value}
              onClick={() => onRangeChange(value)}
              type="button"
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div>

      {selectedRange === "month" ? (
        <div className="bg-surface-subtle/70 flex items-center justify-center gap-3 rounded-2xl p-2">
          <button
            aria-label="Previous month"
            className="hover:bg-surface grid size-9 place-items-center rounded-full transition-colors"
            onClick={() => moveMonth(-1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          <label className="min-w-0">
            <span className="sr-only">Choose leaderboard month</span>
            <input
              className="text-foreground bg-transparent text-center text-sm font-semibold outline-none"
              onChange={(event) => onMonthChange(event.target.value)}
              type="month"
              value={selectedMonth}
            />
          </label>
          <button
            aria-label="Next month"
            className="hover:bg-surface grid size-9 place-items-center rounded-full transition-colors"
            onClick={() => moveMonth(1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      ) : null}

      <label className="bg-surface-subtle flex min-w-0 items-center gap-2 rounded-full px-4 py-3">
        <Search className="text-muted-foreground size-4 shrink-0" />
        <span className="sr-only">Search for a user</span>
        <input
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search for a user"
          type="search"
          value={searchQuery}
        />
      </label>
    </div>
  );
}
