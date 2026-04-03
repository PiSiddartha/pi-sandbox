import { getAccessToken, getSandboxApiBase } from "@/lib/sandboxAuth";

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

export async function postRequestAccess(body: {
  productSlug: string;
  productName: string;
  name: string;
  email: string;
  reason: string;
}): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await apiFetch("/request-access", {
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
  const q = new URLSearchParams({ module_slug: moduleSlug });
  const res = await apiFetch(`/videos?${q.toString()}`, { method: "GET" });
  if (!res.ok) throw new Error(`Videos list failed: ${res.status}`);
  return res.json();
}

export async function getVideoById(id: string): Promise<unknown> {
  const res = await apiFetch(`/videos/${encodeURIComponent(id)}`, { method: "GET" });
  if (!res.ok) throw new Error(`Video ${id} failed: ${res.status}`);
  return res.json();
}

export async function getCurrentUser(): Promise<unknown> {
  const res = await apiFetch("/auth/current-user", { method: "GET" });
  if (!res.ok) throw new Error(`current-user failed: ${res.status}`);
  return res.json();
}
