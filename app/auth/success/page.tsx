"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { persistTokensFromSearchParams } from "@/lib/sandboxAuth";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    persistTokensFromSearchParams(searchParams);
    router.replace("/");
  }, [router, searchParams]);

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
