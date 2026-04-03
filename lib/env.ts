/**
 * Public environment for Pi Sandbox.
 *
 * Set `NEXT_PUBLIC_SANDBOX_API_URL` in `.env.local` (copy from `.env.example`).
 * Next.js inlines `NEXT_PUBLIC_*` at build time — restart `next dev` after changing env files.
 */

function normalizeApiBase(raw: string | undefined): string {
  if (!raw?.trim()) return "";
  return raw.trim().replace(/\/$/, "");
}

/** Base URL of pi-sandbox-api (HTTP API stage `api`), no trailing slash. */
export const SANDBOX_API_BASE_URL = normalizeApiBase(
  process.env.NEXT_PUBLIC_SANDBOX_API_URL
);

export function isSandboxApiConfigured(): boolean {
  return SANDBOX_API_BASE_URL.length > 0;
}
