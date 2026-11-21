import { useId } from "react";

export type BrandLogoVariant = "color" | "light" | "crimson" | "watermark";

const DROP_PATH =
  "M 64 10 C 51 29 26 53 26 80 A 38 38 0 1 0 102 80 C 102 53 77 29 64 10 Z";

const DROP_FACET_PATH =
  "M 64 10 C 77 29 102 53 102 80 A 38 38 0 0 1 64 118 Z";

const DROP_GLOSS_PATH = "M 36 81 C 36 93 43.5 103 54 107.5";

const ORBIT_ARC_PATHS = [
  "M 21 51 C 9 70 12 97 29 113 C 40 122.5 52 125.5 64 125 C 52 122.5 41.5 117.5 34 109.5 C 20 95.5 18.5 72.5 21 51 Z",
  "M 85 27 C 103 40 114.5 59 113 83 C 109.5 63 100 46 85 27 Z",
] as const;

const OBELISK_PATHS = [
  "M 64 28 L 56.5 42 L 54.9 56 Q 63.5 50.5 72.0 46 L 71.5 42 Z",
  "M 54.4 61 L 53.4 69.5 Q 63.5 62.5 73.5 59.5 L 72.6 51.5 Q 63.5 55.5 54.4 61 Z",
  "M 52.8 75 L 51.4 87 Q 63 72.5 76.0 82 L 74.2 65.5 Q 63 66.5 52.8 75 Z",
  "M 50.7 93.5 L 49.5 104 L 78.5 104 L 76.7 88 Q 63.5 79.5 50.7 93.5 Z",
] as const;

export function BrandLogo({
  variant = "color",
  className = "h-9 w-9",
}: {
  variant?: BrandLogoVariant;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `nasu-v2-drop-${variant}-${uid}`;

  const isGradient = variant === "color" || variant === "crimson";
  const isLight = variant === "light";
  const isWatermark = variant === "watermark";

  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {isGradient && (
        <defs>
          <linearGradient
            id={gradId}
            x1="28"
            y1="14"
            x2="100"
            y2="118"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="52%" stopColor="#c41e3a" />
            <stop offset="100%" stopColor="#871227" />
          </linearGradient>
        </defs>
      )}

      {/* Sleek tapered kinetic ribbons inspired by NASU's sweeping ribbon motion */}
      <g
        fill={
          isWatermark
            ? "currentColor"
            : isLight
              ? "rgba(255, 255, 255, 0.62)"
              : variant === "crimson"
                ? "#16335b"
                : undefined
        }
        className={
          variant === "color"
            ? "fill-[#16335b] dark:fill-rose-200/85"
            : undefined
        }
      >
        {ORBIT_ARC_PATHS.map((d, idx) => (
          <path key={idx} d={d} />
        ))}
      </g>

      {/* Drop silhouette */}
      <path
        d={DROP_PATH}
        fill={
          isWatermark
            ? "none"
            : isLight
              ? "rgba(255, 255, 255, 0.96)"
              : `url(#${gradId})`
        }
        stroke={isWatermark ? "currentColor" : undefined}
        strokeWidth={isWatermark ? 3.5 : undefined}
      />

      {/* Right-half sculpted facet on crimson/color variants */}
      {isGradient && (
        <path d={DROP_FACET_PATH} fill="#ffffff" opacity="0.09" />
      )}

      {/* Subtle lower-left specular curve */}
      {!isWatermark && (
        <path
          d={DROP_GLOSS_PATH}
          stroke={isLight ? "rgba(196, 30, 58, 0.2)" : "#ffe4e8"}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity={isLight ? 1 : 0.35}
        />
      )}

      {/* Authentic NASU ribbon-sliced Egyptian obelisk */}
      <g
        fill={
          isWatermark ? "currentColor" : isLight ? "#9f1239" : "#ffffff"
        }
      >
        {OBELISK_PATHS.map((d, idx) => (
          <path key={idx} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function BrandLockup({
  title,
  subtitle,
  variant = "color",
  logoClassName = "h-11 w-11 shrink-0",
  dividerClassName = "h-7 w-[1.5px] shrink-0 bg-stone-300/90 dark:bg-[#3a2f33]",
  titleClassName = "text-sm font-extrabold tracking-tight text-ink sm:text-base dark:text-[#f5f2f0]",
  subtitleClassName = "text-[11px] font-semibold leading-tight text-stone-500 dark:text-stone-400",
  className = "",
}: {
  title: string;
  subtitle?: string;
  variant?: BrandLogoVariant;
  logoClassName?: string;
  dividerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      <BrandLogo variant={variant} className={logoClassName} />
      <span aria-hidden="true" className={dividerClassName} />
      <div className="min-w-0 text-start">
        <p className={`truncate ${titleClassName}`}>{title}</p>
        {subtitle && <p className={`truncate ${subtitleClassName}`}>{subtitle}</p>}
      </div>
    </div>
  );
}
