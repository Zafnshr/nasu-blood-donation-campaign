interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  colorClass?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  colorClass = "bg-blood-600",
}: ProgressBarProps) {
  const safeMax = max <= 0 ? 1 : max;
  const pct = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));

  return (
    <div
      role="progressbar"
      aria-label={label ?? "Progress"}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={Math.min(safeMax, Math.max(0, value))}
      className="h-2.5 w-full overflow-hidden rounded-full bg-blood-100 dark:bg-blood-950/80"
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ease-out ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
