import { cn } from "@/lib/utils";

interface RoundStampProps {
  topText?: string;
  bottomText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<NonNullable<RoundStampProps["size"]>, number> = {
  sm: 60,
  md: 80,
  lg: 120,
};

export function RoundStamp({
  topText = "K·K",
  bottomText = "Zał. 2026",
  size = "md",
  className,
}: RoundStampProps) {
  const dimension = sizeMap[size];
  const viewBox = 120;
  const id = `stamp-${topText}-${bottomText}`.replace(/\s+/g, "-").toLowerCase();

  return (
    <div
      aria-label={`${topText} ${bottomText}`}
      role="img"
      className={cn("rotate-[-3deg]", className)}
      style={{ width: dimension, height: dimension }}
    >
      <svg viewBox={`0 0 ${viewBox} ${viewBox}`} className="h-full w-full text-ink">
        <defs>
          <path id={`${id}-top`} d="M 16 60 A 44 44 0 0 1 104 60" />
          <path id={`${id}-bottom`} d="M 104 60 A 44 44 0 0 1 16 60" />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="2 4"
          strokeOpacity="0.65"
        />
        <text
          className="font-archivo"
          fill="currentColor"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
            {topText.toUpperCase()}
          </textPath>
        </text>
        <text
          className="font-archivo"
          fill="currentColor"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
            {bottomText.toUpperCase()}
          </textPath>
        </text>
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          className="font-archivo"
          fill="currentColor"
          letterSpacing="0.08em"
        >
          KK
        </text>
      </svg>
    </div>
  );
}
