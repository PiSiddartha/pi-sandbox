"use client";

import { useEffect, useState, useRef } from "react";
import {
  clearSandboxSession,
  decodeJWT,
  loginUrl,
} from "@/lib/sandboxAuth";
import { isSandboxApiConfigured } from "@/lib/env";

/**
 * Same flow as pi-admin-dashboard /login: valid tokens → home; else redirect to API /auth/login → Cognito.
 */
export default function LoginPage() {
  const [isChecking, setIsChecking] = useState(true);
  const [authStatus, setAuthStatus] = useState<
    "unknown" | "authenticated" | "unauthenticated"
  >("unknown");
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkExistingAuth = () => {
      if (hasRedirected.current) return;

      const authToken = localStorage.getItem("authToken");
      const idToken = localStorage.getItem("idToken");

      if (authToken && idToken) {
        const idPayload = decodeJWT(idToken);
        const accessPayload = decodeJWT(authToken);
        const now = Math.floor(Date.now() / 1000);
        const expired =
          (idPayload?.exp != null && idPayload.exp < now) ||
          (accessPayload?.exp != null && accessPayload.exp < now);

        if (expired) {
          clearSandboxSession();
          setAuthStatus("unauthenticated");
        } else {
          hasRedirected.current = true;
          window.location.href = "/";
          return;
        }
      } else {
        setAuthStatus("unauthenticated");
      }

      setIsChecking(false);
    };

    const t = setTimeout(checkExistingAuth, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isChecking || authStatus !== "unauthenticated" || hasRedirected.current) {
      return;
    }

    if (!isSandboxApiConfigured()) {
      alert(
        "NEXT_PUBLIC_SANDBOX_API_URL is missing. Copy .env.example to .env.local."
      );
      return;
    }

    hasRedirected.current = true;
    window.location.replace(loginUrl());
  }, [isChecking, authStatus]);

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">
          {isChecking ? "Checking authentication…" : "Redirecting to sign in…"}
        </p>
      </div>
    </div>
  );
}
