/**
 * Pi Sandbox — Cognito tokens from OAuth callback (query params → sessionStorage).
 * API calls use Bearer access_token; matches pi-sandbox-api JWT authorizer (client hub).
 */

import { SANDBOX_API_BASE_URL } from "@/lib/env";

const PREFIX = "pi_sandbox_";

export const STORAGE_ACCESS = `${PREFIX}access_token`;
export const STORAGE_ID = `${PREFIX}id_token`;
export const STORAGE_REFRESH = `${PREFIX}refresh_token`;

export function getSandboxApiBase(): string {
  if (!SANDBOX_API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_SANDBOX_API_URL is not set. Copy .env.example to .env.local and add your Pi Sandbox API base URL."
    );
  }
  return SANDBOX_API_BASE_URL;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_ACCESS);
}

export function persistTokensFromSearchParams(searchParams: URLSearchParams): void {
  const access = searchParams.get("access_token");
  const id = searchParams.get("id_token");
  const refresh = searchParams.get("refresh_token");
  if (access) sessionStorage.setItem(STORAGE_ACCESS, access);
  if (id) sessionStorage.setItem(STORAGE_ID, id);
  if (refresh) sessionStorage.setItem(STORAGE_REFRESH, refresh);
}

export function clearSandboxSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_ACCESS);
  sessionStorage.removeItem(STORAGE_ID);
  sessionStorage.removeItem(STORAGE_REFRESH);
}

export function isSandboxLoggedIn(): boolean {
  return !!getAccessToken();
}

export function loginUrl(): string {
  return `${getSandboxApiBase()}/auth/login`;
}

export function logoutUrl(): string {
  return `${getSandboxApiBase()}/auth/logout`;
}
