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
import { CheckCircle2 } from "lucide-react";
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
import { BrandLogo } from "@/components/ui/brand-logo";

function formatShortDate(iso: string, locale: Locale, fallback: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface CardThemeStyle {
  frontBg: string;
  frontShadow: string;
  frontBorder: string;
  aura: string;
  text: string;
  subText: string;
  border: string;
  divider: string;
  waveStroke: string;
  watermarkClass: string;
  medallionBox: string;
  medallionText: string;
  heroBadge: string;
  backBg: string;
  backShadow: string;
  backBorder: string;
  backTopBar: string;
  backText: string;
  backLabelText: string;
  backDivider: string;
  backPanel: string;
  backIdPill: string;
  backWatermarkClass: string;
  backGivePill: string;
  backReceivePill: string;
  backStampEarned: string;
  backStampLocked: string;
  backStampDot: string;
}

const THEME_STYLES: Record<CardTheme, CardThemeStyle> = {
  crimson: {
    frontBg:
      "radial-gradient(120% 100% at 88% 8%, rgba(251, 113, 133, 0.42) 0%, rgba(251, 113, 133, 0) 54%), radial-gradient(90% 90% at 10% 96%, rgba(88, 7, 27, 0.72) 0%, rgba(88, 7, 27, 0) 60%), linear-gradient(135deg, #6b0a22 0%, #b51536 48%, #d9264b 100%)",
    frontShadow:
      "0 24px 54px -12px rgba(159, 18, 57, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.34)",
    frontBorder: "1px solid rgba(255, 255, 255, 0.22)",
    aura: "from-blood-500/35 via-rose-500/20 to-amber-400/20",
    text: "text-white",
    subText: "text-rose-100/90",
    border: "border-white/20",
    divider: "bg-white/35",
    waveStroke: "rgba(255, 255, 255, 0.14)",
    watermarkClass: "text-white opacity-[0.08]",
    medallionBox:
      "bg-white/[0.14] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]",
    medallionText: "text-white",
    heroBadge:
      "bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fcd34d] text-[#5c2c06] border border-[#fef3c7]/80",
    backBg: "linear-gradient(145deg, #210910 0%, #3a0d1b 55%, #260a13 100%)",
    backShadow:
      "0 24px 54px -12px rgba(88, 7, 27, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
    backBorder: "1px solid rgba(255, 255, 255, 0.16)",
    backTopBar: "linear-gradient(90deg, #fb7185 0%, #fde68a 50%, #e11d48 100%)",
    backText: "text-white",
    backLabelText: "text-rose-200/80",
    backDivider: "border-white/15",
    backPanel: "bg-white/[0.06] border-white/12",
    backIdPill: "bg-white/10 text-amber-200 ring-1 ring-white/15",
    backWatermarkClass: "text-white opacity-[0.06]",
    backGivePill: "bg-white/16 text-white",
    backReceivePill: "bg-white/[0.08] text-rose-100/90",
    backStampEarned:
      "bg-gradient-to-r from-[#fef3c7] to-[#fcd34d] text-[#5c2c06] shadow-2xs",
    backStampLocked: "border border-white/12 bg-white/[0.05] text-rose-100/80",
    backStampDot: "bg-rose-300/50",
  },
  midnight: {
    frontBg:
      "radial-gradient(100% 95% at 86% 12%, rgba(225, 29, 72, 0.38) 0%, rgba(225, 29, 72, 0) 56%), radial-gradient(80% 80% at 12% 92%, rgba(159, 18, 57, 0.28) 0%, rgba(159, 18, 57, 0) 60%), linear-gradient(140deg, #09080a 0%, #170c11 52%, #290b16 100%)",
    frontShadow:
      "0 24px 54px -12px rgba(15, 6, 10, 0.58), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
    frontBorder: "1px solid rgba(251, 113, 133, 0.22)",
    aura: "from-blood-700/40 via-rose-900/25 to-stone-900/25",
    text: "text-white",
    subText: "text-rose-200/90",
    border: "border-rose-300/20",
    divider: "bg-rose-200/35",
    waveStroke: "rgba(251, 113, 133, 0.16)",
    watermarkClass: "text-white opacity-[0.08]",
    medallionBox:
      "bg-rose-500/[0.14] border border-rose-300/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    medallionText: "text-white",
    heroBadge:
      "bg-gradient-to-r from-rose-200 via-rose-100 to-amber-100 text-[#4c0519] border border-white/50",
    backBg: "linear-gradient(145deg, #0d0b0e 0%, #190e14 60%, #100b0e 100%)",
    backShadow:
      "0 24px 54px -12px rgba(10, 6, 9, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
    backBorder: "1px solid rgba(251, 113, 133, 0.2)",
    backTopBar: "linear-gradient(90deg, #9f1239 0%, #fb7185 50%, #f43f5e 100%)",
    backText: "text-stone-100",
    backLabelText: "text-rose-200/75",
    backDivider: "border-rose-300/15",
    backPanel: "bg-white/[0.04] border-rose-300/15",
    backIdPill: "bg-rose-500/15 text-rose-200 ring-1 ring-rose-300/20",
    backWatermarkClass: "text-rose-200 opacity-[0.06]",
    backGivePill: "bg-rose-500/25 text-rose-100",
    backReceivePill: "bg-white/[0.08] text-stone-200",
    backStampEarned:
      "bg-gradient-to-r from-blood-600 to-rose-500 text-white shadow-2xs",
    backStampLocked: "border border-white/10 bg-white/[0.04] text-stone-300",
    backStampDot: "bg-rose-400/50",
  },
  pearl: {
    frontBg:
      "radial-gradient(110% 95% at 88% 10%, rgba(254, 205, 211, 0.52) 0%, rgba(254, 205, 211, 0) 55%), radial-gradient(85% 85% at 12% 95%, rgba(254, 243, 199, 0.45) 0%, rgba(254, 243, 199, 0) 58%), linear-gradient(135deg, #ffffff 0%, #fff8f7 52%, #fdf0f2 100%)",
    frontShadow:
      "0 22px 48px -12px rgba(196, 30, 58, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
    frontBorder: "1px solid rgba(196, 30, 58, 0.16)",
    aura: "from-rose-200/55 via-blood-200/30 to-amber-100/40 dark:from-rose-400/20 dark:via-blood-500/15 dark:to-transparent",
    text: "text-[#1c1917]",
    subText: "text-blood-700",
    border: "border-blood-200/90",
    divider: "bg-blood-300/80",
    waveStroke: "rgba(196, 30, 58, 0.10)",
    watermarkClass: "text-blood-700 opacity-[0.06]",
    medallionBox:
      "bg-blood-600/[0.07] border border-blood-600/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
    medallionText: "text-blood-600",
    heroBadge:
      "bg-gradient-to-r from-blood-700 via-blood-600 to-blood-500 text-white",
    backBg: "linear-gradient(145deg, #ffffff 0%, #fdf8f7 60%, #fbecef 100%)",
    backShadow:
      "0 22px 48px -12px rgba(196, 30, 58, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
    backBorder: "1px solid rgba(196, 30, 58, 0.16)",
    backTopBar: "linear-gradient(90deg, #871227 0%, #c41e3a 55%, #16335b 100%)",
    backText: "text-[#1c1917]",
    backLabelText: "text-[#16335b]/80",
    backDivider: "border-blood-200/80",
    backPanel: "bg-white/75 border-blood-200/70",
    backIdPill: "bg-blood-600/[0.08] text-blood-700 ring-1 ring-blood-200/80",
    backWatermarkClass: "text-blood-700 opacity-[0.05]",
    backGivePill: "bg-blood-100/95 text-blood-800",
    backReceivePill: "bg-stone-100 text-[#16335b]",
    backStampEarned:
      "bg-gradient-to-r from-blood-700 to-blood-600 text-white shadow-2xs",
    backStampLocked:
      "border border-blood-200/70 bg-white/80 text-stone-600",
    backStampDot: "bg-blood-400/55",
  },
};

export const CARD_AURA_CLASSES: Record<CardTheme, string> = {
  crimson: THEME_STYLES.crimson.aura,
  midnight: THEME_STYLES.midnight.aura,
  pearl: THEME_STYLES.pearl.aura,
};

const GUILLOCHE_PATHS = [
  "M -20 190 C 90 120, 210 240, 440 110",
  "M -20 206 C 95 136, 215 256, 440 126",
  "M -20 222 C 100 152, 220 272, 440 142",
  "M -20 238 C 105 168, 225 288, 440 158",
] as const;

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
        background: theme.frontBg,
        boxShadow: theme.frontShadow,
        border: theme.frontBorder,
        ...style,
      }}
      className={`relative overflow-hidden rounded-[24px] ${
        fixedExport ? "h-[265px] w-[420px] p-6" : "h-full w-full p-5 sm:p-6"
      } ${theme.text} ${className}`}
    >
      {/* Layer 1: Guilloché security contour waves */}
      <svg
        viewBox="0 0 420 265"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {GUILLOCHE_PATHS.map((d, idx) => (
          <path
            key={idx}
            d={d}
            stroke={theme.waveStroke}
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Layer 2: Soft diagonal silk sheen */}
      <div
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 48%, transparent 64%)",
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Layer 3: Embossed NASU watermark crest */}
      <BrandLogo
        variant="watermark"
        className={`pointer-events-none absolute -bottom-12 -end-6 h-52 w-52 ${theme.watermarkClass}`}
      />

      {/* Layer 4: Clean three-row content grid */}
      <div className="relative flex h-full flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <BrandLogo
              variant={themeKey === "pearl" ? "crimson" : "light"}
              className="h-11 w-11 shrink-0"
            />
            <span
              aria-hidden="true"
              className={`h-7 w-[1.5px] shrink-0 ${theme.divider}`}
            />
            <div className="min-w-0 text-start">
              <p className="truncate text-xs font-extrabold leading-tight tracking-wide uppercase opacity-95">
                {info.brand}
              </p>
              <p className="truncate text-[10px] font-semibold leading-tight opacity-80">
                {info.university}
              </p>
            </div>
          </div>

          {card.donatedToday ? (
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-[10px] font-extrabold ${theme.heroBadge}`}
            >
              <CheckCircle2 aria-hidden="true" className="h-3 w-3 shrink-0" />
              <span>{copy.donatedHeroBadge}</span>
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-6 w-6 shrink-0 opacity-45"
            >
              <path
                d="M6.5 16.5A6 6 0 0 1 6.5 7.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M10.5 18.5A9.5 9.5 0 0 1 10.5 5.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M14.5 20.5A13 13 0 0 1 14.5 3.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* Middle row: sculptural focal point */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`text-[11px] font-bold tracking-wide uppercase opacity-85 ${theme.subText}`}
            >
              {typeMeta.title}
            </p>
            <p
              className={`mt-1 truncate font-extrabold leading-tight tracking-tight ${
                fixedExport ? "text-[26px]" : "text-2xl sm:text-[26px]"
              }`}
            >
              {card.name}
            </p>
          </div>

          <div
            className={`shrink-0 rounded-2xl px-4 py-2.5 text-center ${theme.medallionBox}`}
          >
            <span
              dir="ltr"
              className={`block leading-none font-black tracking-tight ${
                fixedExport ? "text-[44px]" : "text-[40px] sm:text-[44px]"
              } ${theme.medallionText}`}
            >
              {displayType}
            </span>
          </div>
        </div>

        {/* Bottom row: precision engraved footer */}
        <div
          className={`flex items-center justify-between border-t pt-3 text-[11px] font-semibold ${theme.border} ${theme.subText}`}
        >
          <span>
            {copy.idLabel}{" "}
            <span
              dir="ltr"
              className="inline-block font-mono font-bold tracking-wider"
            >
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

export function CardBackFace({
  card,
  stamps,
  origin,
  exportRef,
  fixedExport = false,
  className = "",
  style,
}: {
  card: DonorCardData;
  stamps: Progress["stamps"];
  origin: string;
  exportRef?: RefObject<HTMLDivElement | null>;
  fixedExport?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].card;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];
  const stampsMeta = getStampsMeta(locale);
  const unknownSubtitle = BLOOD_TYPE_TITLES_BY_LOCALE[locale].unknown.subtitle;

  const themeKey: CardTheme = card.theme ?? "crimson";
  const theme = THEME_STYLES[themeKey];

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
  const earnedCount = stampsMeta.filter((s) => stamps[s.key]).length;

  return (
    <div
      ref={exportRef}
      style={{
        background: theme.backBg,
        boxShadow: theme.backShadow,
        border: theme.backBorder,
        ...style,
      }}
      className={`relative flex flex-col justify-between overflow-hidden rounded-[24px] ${
        fixedExport
          ? "h-[265px] w-[420px] p-4"
          : "h-full w-full p-3 sm:p-4"
      } ${theme.backText} ${className}`}
    >
      {/* Top 3px metallic accent bar */}
      <div
        aria-hidden="true"
        style={{ background: theme.backTopBar }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
      />

      {/* Subtle matching guilloché contour waves */}
      <svg
        viewBox="0 0 420 265"
        fill="none"
        aria-hidden="true"
        opacity="0.55"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {GUILLOCHE_PATHS.map((d, idx) => (
          <path
            key={idx}
            d={d}
            stroke={theme.waveStroke}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <BrandLogo
        variant="watermark"
        className={`pointer-events-none absolute -bottom-12 -end-8 h-44 w-44 ${theme.backWatermarkClass}`}
      />

      {/* Zone 1: Slim official top pass header */}
      <div
        className={`relative flex items-center justify-between gap-2 border-b pb-1.5 sm:pb-2 ${theme.backDivider}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <BrandLogo
            variant={themeKey === "pearl" ? "crimson" : "light"}
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          />
          <span
            aria-hidden="true"
            className={`h-4 w-px shrink-0 ${
              themeKey === "pearl" ? "bg-blood-200" : "bg-white/25"
            }`}
          />
          <span className="truncate text-[11px] font-extrabold tracking-wide opacity-95">
            {info.brand}
          </span>
        </div>
        <span
          dir="ltr"
          className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${theme.backIdPill}`}
        >
          {card.id}
        </span>
      </div>

      {/* Zone 2: Symmetrical center pass body */}
      <div className="relative flex items-center justify-between gap-2 sm:gap-3">
        <div
          className={`min-w-0 flex-1 rounded-2xl border p-1.5 sm:p-2.5 ${theme.backPanel}`}
        >
          {isKnown ? (
            <div className="space-y-1 sm:space-y-1.5">
              <div>
                <p
                  className={`text-[10px] font-bold tracking-wide uppercase ${theme.backLabelText}`}
                >
                  {copy.canGiveTo}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {giveTo.map((t) => (
                    <span
                      key={t}
                      dir="ltr"
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-bold leading-none sm:text-[10px] ${theme.backGivePill}`}
                    >
                      {formatBloodType(t)}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`border-t pt-1 sm:pt-1.5 ${theme.backDivider}`}>
                <p
                  className={`text-[10px] font-bold tracking-wide uppercase ${theme.backLabelText}`}
                >
                  {copy.canReceiveFrom}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {receiveFrom.map((t) => (
                    <span
                      key={t}
                      dir="ltr"
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-bold leading-none sm:text-[10px] ${theme.backReceivePill}`}
                    >
                      {formatBloodType(t)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p
                className={`text-[10px] font-bold tracking-wide uppercase ${theme.backLabelText}`}
              >
                {BLOOD_TYPE_TITLES_BY_LOCALE[locale].unknown.title}
              </p>
              <p className="mt-1 text-xs leading-snug opacity-85">
                {unknownSubtitle}
              </p>
            </div>
          )}
        </div>

        {origin && (
          <div className="shrink-0 rounded-xl border border-black/10 bg-white p-1 sm:rounded-2xl sm:p-1.5">
            <QRCodeSVG
              value={origin}
              size={54}
              bgColor="#ffffff"
              fgColor={themeKey === "pearl" ? "#16335b" : "#4c0519"}
              level="L"
              className="h-[46px] w-[46px] sm:h-[54px] sm:w-[54px]"
            />
          </div>
        )}
      </div>

      {/* Zone 3: Sleek modern stamp progress dock */}
      <div className="relative">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p
            className={`text-[10px] font-bold tracking-wide uppercase ${theme.backLabelText}`}
          >
            {copy.stampsHeading}
          </p>
          <span
            dir="ltr"
            className={`font-mono text-[10px] font-bold ${theme.backLabelText}`}
          >
            {earnedCount}/{stampsMeta.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-wrap sm:gap-1.5">
          {stampsMeta.map((stamp) => {
            const earned = stamps[stamp.key];
            return (
              <span
                key={stamp.key}
                className={`inline-flex min-w-0 items-center gap-1 rounded-lg px-2 py-1 text-[9.5px] font-semibold leading-none sm:text-[10px] ${
                  earned ? theme.backStampEarned : theme.backStampLocked
                }`}
              >
                {earned ? (
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${theme.backStampDot}`}
                  />
                )}
                <span className="truncate">{stamp.label}</span>
              </span>
            );
          })}
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
  const reduced = useReducedMotion();

  const themeKey: CardTheme = card.theme ?? "crimson";
  const theme = THEME_STYLES[themeKey];

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
  const silkX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 32%, transparent 64%)`;
  const silkBgPos = useMotionTemplate`${silkX}% 50%`;

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

  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient color-matched radial aura glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-3 -z-10 rounded-[32px] bg-gradient-to-br opacity-75 blur-2xl transition-all duration-500 ${theme.aura}`}
      />

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
        className="relative aspect-[420/265] w-full cursor-pointer select-none rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0f0a0c]"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: reduced ? 0.15 : 0.6,
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
              <>
                <motion.div
                  aria-hidden="true"
                  style={{ background: glareBg }}
                  className="pointer-events-none absolute inset-0 rounded-[24px]"
                />
                <motion.div
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(115deg, transparent 22%, rgba(255,255,255,0.22) 45%, rgba(253,230,138,0.12) 52%, transparent 72%)",
                    backgroundSize: "200% 200%",
                    backgroundPosition: silkBgPos,
                  }}
                  className="pointer-events-none absolute inset-0 rounded-[24px] opacity-65"
                />
              </>
            )}
          </div>

          {/* Theme-matched Collector Back Face */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0"
          >
            <CardBackFace card={card} stamps={stamps} origin={origin} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
