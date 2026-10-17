import { env } from "@/config/env";

export const AI_LIMIT_EVENT = "preppal:ai-limit-reached";

function isAiRequest(path: string): boolean {
  return (
    path.includes("/ai/") ||
    path.includes("/ai-") ||
    path.endsWith("/ai")
  );
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("preppal_token")
      : null;
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${env.apiUrl}${path}`, {
    credentials: "include",
    ...init,
    signal: controller.signal,
    headers,
  });
  window.clearTimeout(timeout);

  if (!response.ok) {
    let message = `API request failed (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (typeof body.message === "string") message = body.message;
      if (Array.isArray(body.message)) message = body.message.join(" ");
    } catch {
      // Keep the status-based message when the server has no JSON response.
    }
    if (response.status === 429 && isAiRequest(path)) {
      window.setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent(AI_LIMIT_EVENT, { detail: { message } }),
        );
      });
    }
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<T>;
}
