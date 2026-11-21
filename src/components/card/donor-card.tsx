"use client";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { BLOOD_TYPE_TITLES_BY_LOCALE } from "@/data/blood-types";
import { CAMPAIGN_INFO_BY_LOCALE, getStampsMeta } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import {
  formatBloodType,
  redCellDonors,
  redCellRecipients,
} from "@/lib/blood";
import { usePreferences } from "@/lib/use-preferences";
import type { CardTheme, DonorCardData, Locale, Progress } from "@/types";
import { StampBadge } from "@/components/ui/stamp-badge";

function formatShortDate(iso: string, locale: Locale, fallback: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const THEME_STYLES: Record<
  CardTheme,
  {
    bg: string;
    text: string;
    subText: string;
    border: string;
    iconBox: string;
    heroBadge: string;
    shimmer: string;
  }
> = {
  crimson: {
    bg: "linear-gradient(135deg, #9f1239 0%, #e11d48 56%, #fb7185 100%)",
    text: "text-white",
    subText: "text-rose-100",
    border: "border-white/20",
    iconBox: "bg-white/20 text-white",
    heroBadge: "bg-amber-300 text-amber-950",
    shimmer: "from-white/15 via-white/5 to-transparent",
  },
  midnight: {
    bg: "linear-gradient(135deg, #18080e 0%, #4c0519 52%, #9f1239 100%)",
    text: "text-white",
    subText: "text-rose-200",
    border: "border-rose-300/20",
    iconBox: "bg-rose-400/20 text-rose-200",
    heroBadge: "bg-rose-300 text-rose-950",
    shimmer: "from-rose-200/15 via-white/5 to-transparent",
  },
  pearl: {
    bg: "linear-gradient(135deg, #fff7f5 0%, #ffe4e6 55%, #ffffff 100%)",
    text: "text-ink",
    subText: "text-blood-700",
    border: "border-blood-200",
    iconBox: "bg-blood-600 text-white",
    heroBadge: "bg-blood-600 text-white",
    shimmer: "from-white/60 via-white/20 to-transparent",
  },
};

export function CardFrontFace({
  card,
  exportRef,
  fixedExport = false,
  className = "",
  style,
}: {
  card: DonorCardData;
  exportRef?: RefObject<HTMLDivElement | null>;
  fixedExport?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].card;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];
  const typeMeta = BLOOD_TYPE_TITLES_BY_LOCALE[locale][card.bloodType];
  const displayType = formatBloodType(card.bloodType);
  const themeKey: CardTheme = card.theme ?? "crimson";
  const theme = THEME_STYLES[themeKey];

  return (
    <div
      ref={exportRef}
      style={{
        background: theme.bg,
        ...style,
      }}
      className={`relative overflow-hidden rounded-[22px] p-5 shadow-[0_18px_40px_rgba(159,18,57,0.28)] ${
        themeKey === "pearl" ? "border border-blood-200" : ""
      } ${theme.text} ${
        fixedExport ? "h-[228px] w-[360px]" : "h-full w-full"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -end-12 h-48 w-48 rounded-full bg-white/15 blur-xl"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 end-14 w-12 -skew-x-12 bg-gradient-to-b ${theme.shimmer}`}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme.iconBox}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.5C12 2.5 5 10.4 5 15.2a7 7 0 0 0 14 0C19 10.4 12 2.5 12 2.5Z" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase opacity-95">
              {info.brand}
            </span>
          </div>

          {card.donatedToday && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold shadow-2xs ${theme.heroBadge}`}
            >
              {copy.donatedHeroBadge}
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-[11px] font-semibold tracking-wide uppercase ${theme.subText}`}
            >
              {typeMeta.title}
            </p>
            <p className="mt-0.5 truncate text-xl font-extrabold tracking-tight">
              {card.name}
            </p>
          </div>
          <p
            dir="ltr"
            className={`shrink-0 text-[58px] leading-none font-extrabold tracking-tight drop-shadow-xs ${
              themeKey === "pearl" ? "text-blood-600" : "text-white"
            }`}
          >
            {displayType}
          </p>
        </div>

        <div
          className={`flex items-center justify-between border-t pt-2.5 text-[11px] font-semibold ${theme.border} ${theme.subText}`}
        >
          <span>
            {copy.idLabel}{" "}
            <span dir="ltr" className="inline-block">
              {card.id}
            </span>
          </span>
          <span>
            {formatShortDate(card.createdAt, locale, copy.todayDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface DonorCardProps {
  card: DonorCardData;
  stamps: Progress["stamps"];
  origin: string;
  flipped: boolean;
  onToggleFlip: () => void;
}

export function DonorCard({
  card,
  stamps,
  origin,
  flipped,
  onToggleFlip,
}: DonorCardProps) {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].card;
  const stampsMeta = getStampsMeta(locale);
  const unknownSubtitle = BLOOD_TYPE_TITLES_BY_LOCALE[locale].unknown.subtitle;
  const reduced = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 24 };
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 32%, transparent 64%)`;

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduced || flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    pointerX.set(xRatio - 0.5);
    pointerY.set(yRatio - 0.5);
    glareX.set(Math.round(xRatio * 100));
    glareY.set(Math.round(yRatio * 100));
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  const isKnown = card.bloodType !== "unknown";
  const giveTo = isKnown
    ? redCellRecipients(
        card.bloodType as Exclude<typeof card.bloodType, "unknown">
      )
    : [];
  const receiveFrom = isKnown
    ? redCellDonors(
        card.bloodType as Exclude<typeof card.bloodType, "unknown">
      )
    : [];

  return (
    <div
      className="mx-auto w-full max-w-[360px]"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={locale === "ar" ? "اقلب بطاقة المتبرع" : "Flip donor card"}
        onClick={onToggleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleFlip();
          }
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX: flipped ? 0 : rotateX,
                rotateY: flipped ? 0 : rotateY,
              }
        }
        className="relative aspect-[340/215] w-full cursor-pointer select-none rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0f0a0c]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: reduced ? 0.15 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* Front Face */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0"
          >
            <CardFrontFace card={card} />
            {!reduced && (
              <motion.div
                aria-hidden="true"
                style={{ background: glareBg }}
                className="pointer-events-none absolute inset-0 rounded-[22px]"
              />
            )}
          </div>

          {/* Back Face */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] border border-stone-200 bg-white p-4 text-ink shadow-[0_18px_40px_rgba(28,25,23,0.12)] dark:border-[#2e2629] dark:bg-[#1c181a] dark:text-[#f5f2f0]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                {isKnown ? (
                  <>
                    <div>
                      <p className="text-[10px] font-bold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                        {copy.canGiveTo}
                      </p>
                      <div dir="ltr" className="mt-1 flex flex-wrap gap-1">
                        {giveTo.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-blood-50 px-1.5 py-0.5 text-[10px] font-bold text-blood-700 dark:bg-blood-950/80 dark:text-rose-200"
                          >
                            {formatBloodType(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                        {copy.canReceiveFrom}
                      </p>
                      <div dir="ltr" className="mt-1 flex flex-wrap gap-1">
                        {receiveFrom.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-200"
                          >
                            {formatBloodType(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-blood-600 uppercase dark:text-rose-400">
                      {BLOOD_TYPE_TITLES_BY_LOCALE[locale].unknown.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-stone-600 dark:text-stone-300">
                      {unknownSubtitle}
                    </p>
                  </div>
                )}
              </div>

              {origin && (
                <div className="shrink-0 rounded-xl border border-blood-100 bg-cream p-1.5 dark:border-blood-500/25 dark:bg-white">
                  <QRCodeSVG
                    value={origin}
                    size={54}
                    bgColor="#fff7f5"
                    fgColor="#4c0519"
                    level="L"
                  />
                </div>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                {copy.stampsHeading}
              </p>
              <div className="flex flex-wrap gap-1">
                {stampsMeta.map((stamp) => (
                  <StampBadge
                    key={stamp.key}
                    label={stamp.label}
                    earned={stamps[stamp.key]}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
