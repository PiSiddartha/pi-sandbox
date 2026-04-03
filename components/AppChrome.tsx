"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import { useSandboxAuth } from "@/hooks/useSandboxAuth";

const PUBLIC_PREFIXES = ["/login", "/auth/success", "/auth/error"];

function isPublicRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

/** Protected area: same pattern as pi-admin-dashboard — no chrome until user is validated. */
function ProtectedShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useSandboxAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Authenticating…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <main className="relative z-[1] flex min-h-screen flex-1 flex-col overflow-auto bg-background/95">
        {children}
      </main>
    </>
  );
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = isPublicRoute(pathname);

  if (isPublic) {
    return (
      <div className="flex min-h-screen w-full flex-1 flex-col">{children}</div>
    );
  }

  return <ProtectedShell>{children}</ProtectedShell>;
}
