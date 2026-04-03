"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { persistTokensFromSearchParams } from "@/lib/sandboxAuth";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing authentication…");

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (!accessToken) {
      setMessage("No access token received. Try signing in again.");
      return;
    }

    persistTokensFromSearchParams(searchParams);
    setMessage("Success! Redirecting…");
    window.location.href = "/";
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-1 items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
