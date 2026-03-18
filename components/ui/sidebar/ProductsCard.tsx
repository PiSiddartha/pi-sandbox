"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductsCardProps {
  title: string;
  desc: string;
  href: string;
  selected?: boolean;
  icon?: LucideIcon;
  collapsed: boolean;
  /** Dark sidebar variant (PI repo style: left bar + highlight) */
  darkSidebar?: boolean;
}

export default function ProductsCard({
  title,
  desc,
  href,
  selected,
  icon: Icon,
  collapsed,
  darkSidebar = true,
}: ProductsCardProps) {
  return (
    <Link
      href={href}
      title={collapsed ? title : undefined}
      className={cn(
        "rounded-lg transition-all duration-150 group relative",
        darkSidebar
          ? cn(
              "text-sidebar-foreground",
              collapsed
                ? cn(
                    "w-10 h-10 flex items-center justify-center mx-auto",
                    selected
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/70"
                  )
                : cn(
                    "flex items-center gap-3 p-2 w-full pl-3",
                    selected
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold border-l-4 border-sidebar-primary border-solid"
                      : "hover:bg-sidebar-accent/70"
                  )
            )
          : cn(
              collapsed
                ? cn(
                    "w-10 h-10 flex items-center justify-center mx-auto",
                    selected
                      ? "bg-accent text-foreground shadow-inner"
                      : "hover:bg-accent text-foreground"
                  )
                : cn(
                    "flex items-center gap-3 py-2 pr-2 w-full",
                    selected
                      ? "bg-accent text-accent-foreground font-semibold shadow-sm border-l-4 border-sidebar-primary border-solid pl-2"
                      : "hover:bg-accent text-foreground pl-3"
                  )
            )
      )}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {!collapsed && (
        <div className="flex flex-col justify-center">
          <div className="text-sm font-medium leading-tight">{title}</div>
          {desc && (
            <div
              className={cn(
                "text-xs overflow-hidden transition-all duration-300 ease-in-out block",
                darkSidebar ? "text-sidebar-foreground/80" : "",
                selected ? "max-h-20" : "max-h-0 group-hover:max-h-20"
              )}
            >
              {desc}
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
