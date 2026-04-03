"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/sandboxApi";
import { isSandboxApiConfigured } from "@/lib/env";
import {
  clearSandboxSession,
  decodeJWT,
  getAccessToken,
} from "@/lib/sandboxAuth";
import type { SandboxUser } from "@/types/sandboxUser";

interface SandboxAuthContextType {
  user: SandboxUser | null;
  isLoading: boolean;
  error: string | null;
  signOutLocal: () => void;
}

const SandboxAuthContext = createContext<SandboxAuthContextType | undefined>(
  undefined
);

export function SandboxAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SandboxUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signOutLocal = () => {
    clearSandboxSession();
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!isSandboxApiConfigured()) {
        setIsLoading(false);
        setError("NEXT_PUBLIC_SANDBOX_API_URL is not configured.");
        return;
      }

      const authToken = getAccessToken();
      const idToken =
        typeof window !== "undefined" ? localStorage.getItem("idToken") : null;

      if (!authToken || !idToken) {
        setIsLoading(false);
        return;
      }

      const idPayload = decodeJWT(idToken);
      const accessPayload = decodeJWT(authToken);
      const now = Math.floor(Date.now() / 1000);

      if (
        (idPayload?.exp && idPayload.exp < now) ||
        (accessPayload?.exp && accessPayload.exp < now)
      ) {
        signOutLocal();
        return;
      }

      try {
        const u = await getCurrentUser();
        setUser(u);
        setError(null);
      } catch (err: unknown) {
        const status = typeof err === "object" && err !== null && "status" in err
          ? (err as { status: number }).status
          : 0;
        if (status === 401 || status === 403) {
          signOutLocal();
          setError("Authentication failed. Please log in again.");
        } else {
          setError(err instanceof Error ? err.message : "Failed to verify authentication");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, []);

  return (
    <SandboxAuthContext.Provider
      value={{ user, isLoading, error, signOutLocal }}
    >
      {children}
    </SandboxAuthContext.Provider>
  );
}

export function useSandboxAuthContext() {
  const ctx = useContext(SandboxAuthContext);
  if (ctx === undefined) {
    throw new Error("useSandboxAuth must be used within SandboxAuthProvider");
  }
  return ctx;
}
