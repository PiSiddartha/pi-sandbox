"use client";

import { Video } from "lucide-react";

interface TutorialVideoCardProps {
  title: string;
  videoSrc?: string;
  videoTitle?: string;
}

/** Right column: tutorial video or empty state. Reused on every sandbox page. */
export function TutorialVideoCard({
  title,
  videoSrc,
  videoTitle = "Tutorial",
}: TutorialVideoCardProps) {
  return (
    <aside
      className="shrink-0 w-full lg:w-[min(100%,28rem)] xl:w-[30rem]"
      aria-label="Tutorial video"
    >
      <div className="sticky top-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden aspect-video">
        {videoSrc ? (
          <video
            src={videoSrc}
            title={videoTitle}
            controls
            className="w-full h-full object-contain bg-muted/20"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[240px] px-6 py-8 bg-muted/20">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted border border-border mb-4">
              <Video className="w-7 h-7 text-muted-foreground" aria-hidden />
            </div>
            <p className="text-sm font-medium text-foreground text-center">
              Tutorial video
            </p>
            <p className="text-sm text-muted-foreground text-center mt-1 max-w-[260px]">
              A short video demonstrating {title.toLowerCase()} will appear here.
            </p>
            <p className="text-xs text-muted-foreground/80 text-center mt-2">
              Add a video URL or file in page props when ready.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
