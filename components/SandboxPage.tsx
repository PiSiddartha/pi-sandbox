"use client";

import { ReactNode } from "react";
import { RequestAccessButton } from "./RequestAccessButton";
import {
  PageHeader,
  ContentSection,
  TutorialVideoCard,
} from "./sandbox";

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

const SUBTITLE_PRODUCT =
  "Explore in sandbox. Request access for the full product.";
const SUBTITLE_DEFAULT = "Learn how this works in the Pi platform.";

export default function SandboxPage({
  title,
  description,
  videoSrc,
  videoTitle = "Feature overview",
  productSlug,
  productName,
  children,
}: SandboxPageProps) {
  const subtitle = productSlug ? SUBTITLE_PRODUCT : SUBTITLE_DEFAULT;
  const action =
    productSlug && productName ? (
      <RequestAccessButton
        productSlug={productSlug}
        productName={productName}
      />
    ) : undefined;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          <ContentSection>
            <PageHeader
              title={title}
              subtitle={subtitle}
              action={action}
            />
            {description.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
                {para}
              </p>
            ))}
            {children}
          </ContentSection>
          <TutorialVideoCard
            title={title}
            videoSrc={videoSrc}
            videoTitle={videoTitle}
          />
        </div>
      </div>
    </div>
  );
}
