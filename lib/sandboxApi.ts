import { getAccessToken, getSandboxApiBase } from "@/lib/sandboxAuth";
import { SANDBOX_API_ROUTES } from "@/lib/sandboxApiRoutes";
import type { SandboxUser } from "@/types/sandboxUser";

async function apiFetch(
  path: string,
  init: RequestInit & { skipAuth?: boolean } = {}
): Promise<Response> {
  const { skipAuth, ...rest } = init;
  const base = getSandboxApiBase();
  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers = new Headers(rest.headers);
  if (!headers.has("Content-Type") && rest.body && typeof rest.body === "string") {
    headers.set("Content-Type", "application/json");
  }
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, { ...rest, headers });
}

function httpError(res: Response, fallback: string): Error & { status: number } {
  const err = new Error(fallback) as Error & { status: number };
  err.status = res.status;
  return err;
}

export async function postRequestAccess(body: {
  productSlug: string;
  productName: string;
  name: string;
  email: string;
  reason: string;
}): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await apiFetch(SANDBOX_API_ROUTES.requestAccess, {
    method: "POST",
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

export async function getVideos(moduleSlug: string): Promise<unknown> {
  const res = await apiFetch(SANDBOX_API_ROUTES.videosWithQuery(moduleSlug), {
    method: "GET",
  });
  if (!res.ok) throw httpError(res, `Videos list failed: ${res.status}`);
  return res.json();
}

export async function getVideoById(id: string): Promise<unknown> {
  const res = await apiFetch(SANDBOX_API_ROUTES.videoById(id), { method: "GET" });
  if (!res.ok) throw httpError(res, `Video ${id} failed: ${res.status}`);
  return res.json();
}

export async function getCurrentUser(): Promise<SandboxUser> {
  const res = await apiFetch(SANDBOX_API_ROUTES.authCurrentUser, { method: "GET" });
  if (!res.ok) throw httpError(res, `current-user failed: ${res.status}`);
  return res.json() as Promise<SandboxUser>;
}
