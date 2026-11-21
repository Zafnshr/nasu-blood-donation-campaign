import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "crimson" | "amber" | "violet" | "emerald";
  className?: string;
}

const STYLES: Record<NonNullable<ChipProps["variant"]>, string> = {
  default: "bg-stone-100 text-stone-700 border-stone-200/80",
  crimson: "bg-blood-50 text-blood-700 border-blood-200",
  amber: "bg-plasma-100 text-amber-900 border-amber-200",
  violet: "bg-violet-50 text-violet-800 border-violet-200",
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export function Chip({
  children,
  variant = "default",
  className = "",
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
