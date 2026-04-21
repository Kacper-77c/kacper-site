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
  const positionClasses = position === "right" ? "right-4" : "left-4";
  const colorClass = dark ? "text-earth/70" : "text-earth";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20",
        "hidden md:flex",
        "font-archivo font-bold uppercase",
        "text-[10px] tracking-[0.12em] leading-none",
        "whitespace-nowrap",
        positionClasses,
        colorClass,
        className
      )}
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      {segments.join(" · ")}
    </div>
  );
}
