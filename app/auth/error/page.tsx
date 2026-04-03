"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ErrorContent() {
  const searchParams = useSearchParams();
  const err = searchParams.get("error") ?? "unknown_error";
  const details = searchParams.get("details");

  return (
    <div className="mx-auto max-w-md flex-1 p-8">
      <h1 className="text-lg font-semibold text-foreground">Sign-in failed</h1>
      <p className="mt-2 text-sm text-muted-foreground break-words">{err}</p>
      {details ? (
        <pre className="mt-4 max-h-48 overflow-auto rounded-md border border-border bg-muted/50 p-3 text-xs whitespace-pre-wrap">
          {details}
        </pre>
      ) : null}
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
