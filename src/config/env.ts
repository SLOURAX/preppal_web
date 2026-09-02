const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

interface PublicEnvironment {
  readonly apiUrl: string;
}

export const env: PublicEnvironment = {
  apiUrl: stripTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  ),
} as const;
