import { cn } from "@/lib/utils";

interface SectionNumberProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionNumber({ number, label, className }: SectionNumberProps) {
  return (
    <p className={cn("section-number", className)}>
      {`nr ${number} — ${label.toUpperCase()}`}
    </p>
  );
}
