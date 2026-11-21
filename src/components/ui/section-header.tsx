interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-wide text-blood-600 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-stone-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
