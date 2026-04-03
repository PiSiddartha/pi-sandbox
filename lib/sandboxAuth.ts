/**
 * Pi Sandbox auth — same token storage pattern as pi-admin-dashboard (localStorage).
 * API: Bearer access token against pi-sandbox-api JWT authorizer (Client Hub).
 */

import { SANDBOX_API_BASE_URL } from "@/lib/env";
import { SANDBOX_API_ROUTES } from "@/lib/sandboxApiRoutes";

/** Match pi-admin-dashboard localStorage keys */
export const STORAGE_ACCESS = "authToken";
export const STORAGE_ID = "idToken";
export const STORAGE_REFRESH = "refreshToken";

/** JWT payload decode (client-side expiry check only; API validates). */
export function decodeJWT(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 =
      base64Url.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (base64Url.length % 4)) % 4);
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

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
  return localStorage.getItem(STORAGE_ACCESS);
}

export function persistTokensFromSearchParams(searchParams: URLSearchParams): void {
  const access = searchParams.get("access_token");
  const id = searchParams.get("id_token");
  const refresh = searchParams.get("refresh_token");
  if (access) localStorage.setItem(STORAGE_ACCESS, access);
  if (id) localStorage.setItem(STORAGE_ID, id);
  if (refresh) localStorage.setItem(STORAGE_REFRESH, refresh);
}

export function clearSandboxSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_ACCESS);
  localStorage.removeItem(STORAGE_ID);
  localStorage.removeItem(STORAGE_REFRESH);
}

export function isSandboxLoggedIn(): boolean {
  return !!getAccessToken();
}

/** API Gateway → Lambda → Cognito Hosted UI authorize URL */
export function loginUrl(): string {
  return `${getSandboxApiBase()}${SANDBOX_API_ROUTES.authLogin}`;
}

/** API Gateway → Lambda → Cognito logout */
export function logoutUrl(): string {
  return `${getSandboxApiBase()}${SANDBOX_API_ROUTES.authLogout}`;
}
