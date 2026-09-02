export function getSafeReturnTo(search: string, fallback = "/"): string {
  const requestedPath = new URLSearchParams(search).get("returnTo");

  if (!requestedPath?.startsWith("/") || requestedPath.startsWith("//")) {
    return fallback;
  }

  return requestedPath;
}

export function withReturnTo(path: string, returnTo: string): string {
  if (returnTo === "/") return path;
  return `${path}?returnTo=${encodeURIComponent(returnTo)}`;
}
