import { cn } from "@/lib/utils";

interface PerforatedEdgeProps {
  side?: "left" | "right" | "top" | "bottom";
  density?: number;
  className?: string;
}

const sideClasses: Record<NonNullable<PerforatedEdgeProps["side"]>, string> = {
  left: "fixed left-6 top-0 bottom-0 flex-col justify-around",
  right: "fixed right-6 top-0 bottom-0 flex-col justify-around",
  top: "fixed top-6 left-0 right-0 flex-row justify-around",
  bottom: "fixed bottom-6 left-0 right-0 flex-row justify-around",
};

export function PerforatedEdge({
  side = "left",
  density = 20,
  className,
}: PerforatedEdgeProps) {
  const dots = Array.from({ length: density });

  return (
    <div
      aria-hidden="true"
      className={cn("hidden md:flex pointer-events-none z-10", sideClasses[side], className)}
    >
      {dots.map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-earth/40" />
      ))}
    </div>
  );
}
