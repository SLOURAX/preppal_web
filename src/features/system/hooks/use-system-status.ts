"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { ApiError } from "@/lib/api";
import type { ApiEnvelope, SystemStatus } from "@/types";
import { getSystemStatus } from "../api/get-system-status";

export const useSystemStatus = (): UseQueryResult<
  ApiEnvelope<SystemStatus>,
  ApiError
> =>
  useQuery<ApiEnvelope<SystemStatus>, ApiError>({
    queryKey: ["system", "health"],
    queryFn: getSystemStatus,
  });
