"use client";

import { ReactNode } from "react";

interface ContentSectionProps {
  children: ReactNode;
}

/** Left column: readable content with constrained line length. */
export function ContentSection({ children }: ContentSectionProps) {
  return (
    <section
      className="flex-1 min-w-0 max-w-2xl"
      aria-label="Page content"
    >
      <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}
