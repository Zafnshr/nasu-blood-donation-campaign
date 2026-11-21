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
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors ${compact
        ? "px-2.5 py-1 text-xs"
        : "px-3.5 py-1.5 text-xs sm:text-sm"
        } ${earned
          ? "bg-gradient-to-br from-blood-600 to-blood-700 text-white shadow-xs"
          : "border border-dashed border-stone-300 bg-[#f6f3ef] text-stone-600 dark:border-stone-700 dark:bg-[#161214] dark:text-stone-300"
        }`}
    >
      {earned ? (
        <Award aria-hidden="true" className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      ) : (
        <Lock aria-hidden="true" className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      )}
      <span>{label}</span>
    </span>
  );
}
