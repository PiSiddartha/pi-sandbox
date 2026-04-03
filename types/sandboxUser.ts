/** Shape returned by GET /auth/current-user (sandbox-auth Lambda). */
export interface SandboxUser {
  id: string;
  email: string;
  cognitoSub?: string;
  claims?: Record<string, unknown>;
}
