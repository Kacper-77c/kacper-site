import { cn } from "@/lib/utils";

interface VerticalMetaProps {
  segments: string[];
  position?: "left" | "right";
  dark?: boolean;
  className?: string;
}

export function VerticalMeta({
  segments,
  position = "right",
  dark = false,
  className,
}: VerticalMetaProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "vertical-meta hidden md:block fixed top-1/2 -translate-y-1/2 z-20",
        dark ? "text-earth/80" : "text-earth",
        position === "right" ? "right-4" : "left-4",
        className
      )}
    >
      {segments.join(" · ")}
    </div>
  );
}
