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
        <p className="text-sm font-bold tracking-wide text-blood-600 uppercase dark:text-rose-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1.5 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl dark:text-[#f5f2f0]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 max-w-[65ch] text-base leading-relaxed text-stone-700 sm:text-lg dark:text-stone-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}
