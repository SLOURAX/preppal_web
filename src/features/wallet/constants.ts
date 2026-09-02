export const WALLET_TRANSACTIONS = [
  {
    id: "quiz-001",
    label: "Quiz completion bonus",
    date: "Today",
    amount: 50,
    type: "credit",
  },
  {
    id: "streak-001",
    label: "Weekly streak reward",
    date: "Yesterday",
    amount: 120,
    type: "credit",
  },
  {
    id: "redeem-001",
    label: "Premium question pack",
    date: "Aug 28",
    amount: 250,
    type: "debit",
  },
] as const;
