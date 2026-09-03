"use client";

import { useAuthStore } from "@/store";
import { LeaderboardOverview } from "@/features/leaderboard";

export function LeaderboardTab() {
  const userName = useAuthStore((s) => s.userName);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-foreground text-xl font-bold">Leaderboard</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          See how you stack up against the Preppal community.
        </p>
      </div>
      <LeaderboardOverview userName={userName} />
    </div>
  );
}
