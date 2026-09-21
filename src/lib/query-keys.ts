export const queryKeys = {
  health: ["health"] as const,
  me: ["me"] as const,
  account: { all: ["account"] as const, me: ["account", "me"] as const },
  wallet: { all: ["wallet"] as const, balance: ["wallet", "balance"] as const },
  rewards: {
    all: ["rewards"] as const,
    catalog: ["rewards", "catalog"] as const,
  },
  quiz: { all: ["quiz"] as const, history: ["quiz", "history"] as const },
  quizHistory: ["quiz-history"] as const,
  notifications: ["notifications"] as const,
};
