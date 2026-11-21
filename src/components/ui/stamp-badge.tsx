import { Award, Lock } from "lucide-react";

interface StampBadgeProps {
  label: string;
  earned: boolean;
  compact?: boolean;
}

export function StampBadge({
  label,
  earned,
  compact = false,
}: StampBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      } ${
        earned
          ? "bg-gradient-to-br from-blood-600 to-blood-700 text-white shadow-xs"
          : "border border-dashed border-stone-300 bg-stone-50 text-stone-500"
      }`}
    >
      {earned ? (
        <Award aria-hidden="true" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      ) : (
        <Lock aria-hidden="true" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      )}
      <span>{label}</span>
    </span>
  );
}
