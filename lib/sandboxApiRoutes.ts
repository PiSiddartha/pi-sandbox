/**
 * Paths for pi-sandbox-api (HTTP API stage `api`).
 * Full URL = `getSandboxApiBase()` + path — base must have no trailing slash
 * (e.g. https://xxxxx.execute-api.ap-south-1.amazonaws.com/api).
 */
export const SANDBOX_API_ROUTES = {
  authLogin: "/auth/login",
  authCallback: "/auth/callback",
  authLogout: "/auth/logout",
  authCurrentUser: "/auth/current-user",
  authVerifyToken: "/auth/verify-token",
  requestAccess: "/request-access",
  videos: "/videos",
  videoById: (id: string) => `/videos/${encodeURIComponent(id)}`,
  videosWithQuery: (moduleSlug: string) =>
    `/videos?${new URLSearchParams({ module_slug: moduleSlug }).toString()}`,
} as const;
