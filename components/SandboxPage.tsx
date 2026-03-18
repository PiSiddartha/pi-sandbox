"use client";

import { ReactNode } from "react";
import { RequestAccessButton } from "./RequestAccessButton";

export interface SandboxPageProps {
  title: string;
  description: string[];
  videoSrc?: string;
  videoTitle?: string;
  /** For product pages: show Request Access button and pass product name */
  productSlug?: string;
  productName?: string;
  children?: ReactNode;
}

export default function SandboxPage({
  title,
  description,
  videoSrc,
  videoTitle = "Feature overview",
  productSlug,
  productName,
  children,
}: SandboxPageProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 p-5 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1">
        {/* Left: description — match PI repo content layout */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="font-bold text-2xl text-foreground tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {productSlug
                  ? "Explore in sandbox. Request access for the full product."
                  : "Learn how this works in the Pi platform."}
              </p>
            </div>
            {productSlug && productName && (
              <RequestAccessButton
                productSlug={productSlug}
                productName={productName}
              />
            )}
          </div>
          {description.map((para, i) => (
            <p
              key={i}
              className="text-[15px] text-foreground/90 leading-relaxed"
            >
              {para}
            </p>
          ))}
          {children}
        </div>
        {/* Right: video placeholder — match PI repo card style */}
        <div className="shrink-0 w-full lg:w-[420px] xl:w-[480px]">
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)] aspect-video flex items-center justify-center bg-muted/30">
            {videoSrc ? (
              <video
                src={videoSrc}
                title={videoTitle}
                controls
                className="w-full h-full object-contain"
                poster=""
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <p className="text-sm font-semibold text-foreground/80">
                  Tutorial video
                </p>
                <p className="text-sm mt-2">
                  A short video demonstrating {title.toLowerCase()} will appear
                  here.
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  You can add a video URL or file later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
