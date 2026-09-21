"use client";

import { useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";

export function useQueryController() {
  const queryClient = useQueryClient();

  return {
    invalidateAccount: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.account.all }),
    invalidateWallet: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all }),
    invalidateRewards: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.rewards.all }),
    invalidateQuiz: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.quiz.all }),
    invalidateAll: () => queryClient.invalidateQueries(),
  };
}
