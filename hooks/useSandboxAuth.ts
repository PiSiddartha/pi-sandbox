import { useSandboxAuthContext } from "@/providers/SandboxAuthProvider";

export function useSandboxAuth() {
  return useSandboxAuthContext();
}
