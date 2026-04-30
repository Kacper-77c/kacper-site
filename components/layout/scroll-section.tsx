"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionNumber } from "@/components/ui/section-number";
import { VerticalMeta } from "@/components/ui/vertical-meta";
import { PerforatedEdge } from "@/components/ui/perforated-edge";

interface ScrollSectionProps {
  id: string;
  number: string;
  label: string;
  background: "paper" | "navy" | "red" | "turquoise" | "ink";
  transition?: "hard" | "peek";
  children: ReactNode;
  verticalMetaSegments?: string[];
  showPerforation?: boolean;
  compact?: boolean;
  className?: string;
}

export function ScrollSection({
  id,
  number,
  label,
  background,
  transition = "hard",
  children,
  verticalMetaSegments,
  showPerforation = true,
  compact = false,
  className,
}: ScrollSectionProps) {
  const isDark =
    background === "navy" ||
    background === "red" ||
    background === "turquoise" ||
    background === "ink";

  const bgClass = {
    paper: "bg-paper text-ink",
    navy: "bg-matchbox-navy text-paper",
    red: "bg-matchbox-red text-paper",
    turquoise: "bg-matchbox-turquoise text-paper",
    ink: "bg-[#0a0a0a] text-paper",
  }[background];

  return (
    <section
      id={id}
      className={cn("relative w-full min-h-screen overflow-hidden", bgClass, className)}
      style={{ marginTop: transition === "peek" ? "-8vh" : 0 }}
      data-theme={isDark ? "dark" : "light"}
    >
      {showPerforation ? <PerforatedEdge side="left" dark={isDark} /> : null}
      {verticalMetaSegments ? (
        <VerticalMeta segments={verticalMetaSegments} position="right" dark={isDark} />
      ) : null}

      <div
        className={cn(
          "relative z-10 px-6 md:px-20",
          compact ? "pt-8 md:pt-12 pb-12 md:pb-16" : "pt-16 md:pt-24 pb-24 md:pb-32"
        )}
      >
        <SectionNumber number={number} label={label} dark={isDark} className="mb-12 md:mb-16" />
        {children}
      </div>
    </section>
  );
}
