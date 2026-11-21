import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "crimson" | "amber" | "violet" | "emerald";
  className?: string;
}

const STYLES: Record<NonNullable<ChipProps["variant"]>, string> = {
  default:
    "bg-[#f6f3ef] text-stone-800 border-stone-200/90 dark:bg-[#251f22] dark:text-stone-200 dark:border-[#3a2f33]",
  crimson:
    "bg-blood-50 text-blood-800 border-blood-200 dark:bg-blood-950/70 dark:text-rose-200 dark:border-blood-500/30",
  amber:
    "bg-plasma-100 text-amber-950 border-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-500/30",
  violet:
    "bg-violet-50 text-violet-900 border-violet-200 dark:bg-violet-950/60 dark:text-violet-200 dark:border-violet-500/30",
  emerald:
    "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-500/30",
};

export function Chip({
  children,
  variant = "default",
  className = "",
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm ${STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
