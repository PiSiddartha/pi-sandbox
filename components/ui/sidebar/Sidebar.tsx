"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Shield,
  Music,
  ChartColumnBigIcon,
  Settings,
  LogOut,
  LogIn,
  LayoutDashboard,
  CreditCardIcon,
  GitBranch,
  CircleQuestionMark,
  FileSliders,
  LucideIcon,
  FileBarChart,
  Unplug,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductsCard from "@/components/ui/sidebar/ProductsCard";
import { useSidebar } from "./SidebarContext";
import {
  clearSandboxSession,
  getAccessToken,
  loginUrl,
  logoutUrl,
} from "@/lib/sandboxAuth";
import { isSandboxApiConfigured } from "@/lib/env";

const DOCS_URL = "https://docs.payintelli.com";

function renderNavItem(
  title: string,
  href: string,
  icon: LucideIcon,
  desc: string,
  pathname: string,
  collapsed: boolean
) {
  const selected = pathname === href;
  return (
    <div key={title}>
      <ProductsCard
        title={title}
        desc={desc}
        href={href}
        icon={icon}
        collapsed={collapsed}
        selected={selected}
        darkSidebar={false}
      />
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [togglePosition, setTogglePosition] = useState({ x: 0, y: 0 });
  const [loggedIn, setLoggedIn] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const authConfigured = isSandboxApiConfigured();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    setLoggedIn(Boolean(getAccessToken()));
  }, [mounted, pathname]);

  useEffect(() => {
    const onStorage = () => setLoggedIn(Boolean(getAccessToken()));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;
      const rect = sidebar.getBoundingClientRect();
      const edgeZone = 12;
      const isAtEdge =
        e.clientX >= rect.right - edgeZone &&
        e.clientX <= rect.right + edgeZone;
      setShowToggle(isAtEdge);
      if (isAtEdge) setTogglePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [collapsed]);

  const Divider = () => (
    <div className={cn("border-t border-sidebar-border", collapsed ? "" : "my-1")} />
  );

  if (!mounted) return null;

  return (
    <>
      {showToggle && (
        <div
          className="fixed z-50"
          style={{
            top: `${togglePosition.y - 16}px`,
            left: `${togglePosition.x - 16}px`,
          }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-full bg-sidebar-accent text-sidebar-accent-foreground shadow-md flex items-center justify-center hover:opacity-90"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>
      )}

      <div
        ref={sidebarRef}
        className={cn(
          "flex flex-col bg-sidebar text-sidebar-foreground shadow-[0_0px_20px_#00000012] max-h-screen sticky top-0 left-0 z-40 transition-all duration-300 ease-in-out",
          collapsed ? "w-[4.5rem] items-center" : "w-64"
        )}
      >
        <div className="shrink-0 p-3 pb-2 border-b border-sidebar-border">
          {!collapsed ? (
            <>
              <Image
                src="/pi-logo.svg"
                alt="PayIntelli — Payments with Intelligence"
                width={170}
                height={40}
                className="mb-4"
                style={{ width: "auto", height: "auto" }}
                priority
              />
              <div>
                <h2 className="font-bold text-xl text-foreground">Pi Suite</h2>
                <p className="text-xs text-sidebar-foreground-muted mt-0.5">
                  Sandbox
                </p>
              </div>
              <div className="h-0.5 bg-foreground/20 mt-3 w-45" />
            </>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <Image
                src="/pi-logo.svg"
                alt="Pi"
                width={32}
                height={32}
                className="object-contain"
                style={{ width: 32, height: 32 }}
              />
              <div className="h-0.5 bg-foreground/20 w-6 mt-2 mb-2" />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
          <div>
            {!collapsed && (
              <h2 className="font-bold mb-1.5 text-sm text-sidebar-foreground px-2">
                Main
              </h2>
            )}
            <div className="flex flex-col gap-0.5">
              {renderNavItem(
                "Dashboard",
                "/",
                LayoutDashboard,
                "Real-time metrics and KPIs",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Analytics 360",
                "/pi-analytics",
                ChartColumnBigIcon,
                "Comprehensive data insights",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Checkout Designs",
                "/pi-checkout",
                CreditCardIcon,
                "Template gallery and customization",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Reports",
                "/reports",
                FileBarChart,
                "Transaction history and analytics",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Integrations",
                "/pi-APIIntegration",
                Unplug,
                "Payment provider management",
                pathname,
                collapsed
              )}
            </div>
          </div>

          <Divider />

          <div>
            {!collapsed && (
              <h2 className="font-bold mb-1.5 text-sm text-sidebar-foreground px-2">
                Products
              </h2>
            )}
            <div className="flex flex-col gap-0.5">
              {renderNavItem(
                "Pi Symphony",
                "/pi-symphony",
                Music,
                "AI-Powered Orchestration Engine",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Pi Shield",
                "/pi-shield",
                Shield,
                "Fraud Protection and Security",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Pi Recon",
                "/pi-recon",
                GitBranch,
                "AI-Powered Reconciliation Module",
                pathname,
                collapsed
              )}
              {renderNavItem(
                "Pi Deepsearch",
                "/pi-deepsearch",
                Search,
                "AI-Powered Conversational Analytics",
                pathname,
                collapsed
              )}
            </div>
          </div>

          <Divider />

          <div>
            {!collapsed && (
              <h2 className="font-bold mb-1.5 text-sm text-sidebar-foreground px-2">
                Management
              </h2>
            )}
            <div className="flex flex-col gap-0.5">
              {renderNavItem(
                "Help & Support",
                "/help-and-support",
                CircleQuestionMark,
                "Help center and support tickets",
                pathname,
                collapsed
              )}
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-lg transition-all duration-150 flex items-center gap-3 p-2 w-full text-foreground hover:bg-sidebar-accent",
                  collapsed && "w-10 h-10 justify-center mx-auto"
                )}
                title={collapsed ? "Documentation" : undefined}
              >
                <FileSliders size={18} className="shrink-0" />
                {!collapsed && (
                  <div className="flex flex-col justify-center">
                    <div className="text-sm font-medium leading-tight">
                      Documentation
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Comprehensive Documentation
                    </div>
                  </div>
                )}
              </a>
            </div>
          </div>
        </div>

        <Divider />

        <div className="shrink-0 p-2 pt-1 border-t border-sidebar-border">
          <div className="flex flex-col gap-0.5">
            <ProductsCard
              title="Settings"
              desc=""
              href="/settings"
              icon={Settings}
              collapsed={collapsed}
              selected={pathname === "/settings"}
              darkSidebar={false}
            />
            {authConfigured && !loggedIn ? (
              <a
                href={loginUrl()}
                className={cn(
                  "rounded-lg transition-all duration-150 flex items-center gap-3 p-2 w-full text-foreground hover:bg-sidebar-accent",
                  collapsed && "w-10 h-10 justify-center mx-auto"
                )}
                title={collapsed ? "Log in" : undefined}
              >
                <LogIn size={18} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">Log in</span>
                )}
              </a>
            ) : null}
            {authConfigured && loggedIn ? (
              <a
                href={logoutUrl()}
                onClick={() => {
                  clearSandboxSession();
                }}
                className={cn(
                  "rounded-lg transition-all duration-150 flex items-center gap-3 p-2 w-full text-foreground hover:bg-sidebar-accent",
                  collapsed && "w-10 h-10 justify-center mx-auto"
                )}
                title={collapsed ? "Log out" : undefined}
              >
                <LogOut size={18} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">Log out</span>
                )}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
