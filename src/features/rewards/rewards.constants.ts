export interface RedeemableReward {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly cost: number;
  readonly type: "plan" | "gift";
}

export const REDEEMABLE_REWARDS: readonly RedeemableReward[] = [
  {
    id: "premium-plan",
    title: "Premium plan",
    description:
      "Unlock advanced analytics and the complete exam library for one month.",
    cost: 5000,
    type: "plan",
  },
  {
    id: "gift-card",
    title: "Digital gift cards",
    description:
      "Redeem your withdrawable Preppal Coins for shopping and other gifts.",
    cost: 7500,
    type: "gift",
  },
];

export const REFERRAL_CODE = "5D091517";
export const REFERRAL_LINK = `https://preppal.app/r/${REFERRAL_CODE}`;
