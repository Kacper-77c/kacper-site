import { cn } from "@/lib/utils";

interface SectionNumberProps {
  number: string;
  label: string;
  dark?: boolean;
  className?: string;
}

export function SectionNumber({ number, label, dark = false, className }: SectionNumberProps) {
  return (
    <p className={cn("section-number", dark ? "text-earth/90" : "text-earth", className)}>
      {`nr ${number} — ${label.toUpperCase()}`}
    </p>
  );
}
