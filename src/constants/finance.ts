/** Shared finance rules and seed values used by the current mock data layer. */
export const XP_TO_COIN_RATE = 10;

export const INITIAL_FINANCE_BALANCES = {
  preppalBalance: 0,
  depositedFunds: 0,
  experiencePoints: 0,
} as const;

/** Values used only in unauthenticated marketing previews until analytics are connected. */
export const FINANCE_PREVIEW = {
  coinsEarned: 12450,
  activityXp: 50,
} as const;
