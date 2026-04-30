"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  type: "desktop" | "tablet" | "phone";
  src: string;
  alt: string;
  className?: string;
  placeholderText?: string;
  placeholderGradient?: string;
}

const DEVICE_RATIOS = {
  desktop: "16 / 10",
  tablet: "3 / 4",
  phone: "9 / 19.5",
};

const DEVICE_SIZES = {
  desktop: "max-w-[min(760px,50vw)]",
  tablet: "max-w-[280px]",
  phone: "max-w-[200px]",
};

const FRAME_RADIUS = {
  desktop: "rounded-md",
  tablet: "rounded-xl",
  phone: "rounded-[28px]",
};

const FRAME_PADDING = {
  desktop: "p-2",
  tablet: "p-1.5",
  phone: "p-1",
};

const INNER_RADIUS = {
  desktop: "rounded-sm",
  tablet: "rounded-lg",
  phone: "rounded-[22px]",
};

export function DeviceFrame({
  type,
  src,
  alt,
  className,
  placeholderText,
  placeholderGradient,
}: DeviceFrameProps) {
  const isPlaceholder = !src || src === "" || src.startsWith("placeholder:");

  return (
    <div
      className={cn(
        "relative w-full",
        DEVICE_SIZES[type],
        FRAME_RADIUS[type],
        FRAME_PADDING[type],
        "border border-earth/40 bg-paper/5",
        "shadow-2xl shadow-black/60",
        className
      )}
      style={{
        aspectRatio: DEVICE_RATIOS[type],
      }}
    >
      <div
        className={cn("h-full w-full overflow-hidden bg-ink/20", INNER_RADIUS[type])}
        style={{
          background: isPlaceholder && placeholderGradient ? placeholderGradient : undefined,
        }}
      >
        {isPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            {placeholderText ? (
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink/80 md:text-xs">
                {placeholderText}
              </div>
            ) : null}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 760px"
          />
        )}
      </div>
    </div>
  );
}
