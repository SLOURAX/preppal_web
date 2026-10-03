const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
if (process.env.NODE_ENV === "production" && !configuredApiUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_URL must be configured for production builds",
  );
}

interface PublicEnvironment {
  readonly apiUrl: string;
}

export const env: PublicEnvironment = {
  apiUrl: stripTrailingSlash(configuredApiUrl ?? "http://localhost:4000"),
} as const;
