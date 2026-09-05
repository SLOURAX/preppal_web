"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useState } from "react";

import { createQueryClient } from "@/lib/query-client";

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState<QueryClient>(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
