const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown; token?: string };

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, token, headers, ...requestInit } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...requestInit,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof payload === "object" && payload && "message" in payload ? String(payload.message) : "Request failed";
    throw new ApiError(message, response.status, payload);
  }
  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: Omit<ApiOptions, "method" | "body">) => apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<ApiOptions, "method" | "body">) => apiRequest<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<ApiOptions, "method" | "body">) => apiRequest<T>(path, { ...options, method: "PATCH", body }),
};
