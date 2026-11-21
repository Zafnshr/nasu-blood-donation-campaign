"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent, RefObject } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { BLOOD_TYPE_TITLES } from "@/data/blood-types";
import { CAMPAIGN_INFO, STAMPS_META } from "@/data/campaign";
import {
  formatBloodType,
  redCellDonors,
  redCellRecipients,
} from "@/lib/blood";
import type { DonorCardData, Progress } from "@/types";
import { StampBadge } from "@/components/ui/stamp-badge";

function formatShortDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "Today";
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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
  const typeMeta = BLOOD_TYPE_TITLES[card.bloodType];
  const displayType = formatBloodType(card.bloodType);

  return (
    <div
      ref={exportRef}
      style={{
        background:
          "linear-gradient(135deg, #9f1239 0%, #e11d48 56%, #fb7185 100%)",
        ...style,
      }}
      className={`relative overflow-hidden rounded-[22px] p-5 text-white shadow-[0_18px_40px_rgba(159,18,57,0.3)] ${
        fixedExport ? "h-[228px] w-[360px]" : "h-full w-full"
      } ${className}`}
    >
      {/* Subtle holographic shimmer stripe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-12 h-48 w-48 rounded-full bg-white/15 blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-14 w-12 -skew-x-12 bg-gradient-to-b from-white/15 via-white/5 to-transparent"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.5C12 2.5 5 10.4 5 15.2a7 7 0 0 0 14 0C19 10.4 12 2.5 12 2.5Z" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-wide text-white/95 uppercase">
              {CAMPAIGN_INFO.brand}
            </span>
          </div>

          {card.donatedToday && (
            <span className="rounded-full bg-amber-300 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-950 shadow-2xs">
              Donated today · Hero
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wide text-rose-100 uppercase">
              {typeMeta.title}
            </p>
            <p className="mt-0.5 truncate text-xl font-extrabold tracking-tight text-white">
              {card.name}
            </p>
          </div>
          <p className="shrink-0 text-[58px] leading-none font-extrabold tracking-tight text-white drop-shadow-xs">
            {displayType}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-2.5 text-[11px] font-semibold text-rose-100">
          <span>ID: {card.id}</span>
          <span>{formatShortDate(card.createdAt)}</span>
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
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 60%)`;

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
  const giveTo = isKnown ? redCellRecipients(card.bloodType as Exclude<typeof card.bloodType, "unknown">) : [];
  const receiveFrom = isKnown ? redCellDonors(card.bloodType as Exclude<typeof card.bloodType, "unknown">) : [];

  return (
    <div
      className="mx-auto w-full max-w-[360px]"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={
          flipped
            ? "Donor card back shown. Tap or press Enter to flip to front."
            : "Donor card front shown. Tap or press Enter to flip to back."
        }
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
        className="relative aspect-[340/215] w-full cursor-pointer select-none rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-4"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: reduced ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
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
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] border border-blood-200 bg-white p-4 text-ink shadow-[0_18px_40px_rgba(76,5,25,0.12)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                {isKnown ? (
                  <>
                    <div>
                      <p className="text-[10px] font-bold tracking-wide text-stone-500 uppercase">
                        Can give red cells to
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {giveTo.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-blood-50 px-1.5 py-0.5 text-[10px] font-bold text-blood-700"
                          >
                            {formatBloodType(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wide text-stone-500 uppercase">
                        Can receive from
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {receiveFrom.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-700"
                          >
                            {formatBloodType(t)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold tracking-wide text-blood-600 uppercase">
                      Future Hero
                    </p>
                    <p className="mt-1 text-xs leading-snug text-stone-600">
                      {BLOOD_TYPE_TITLES.unknown.subtitle}
                    </p>
                  </div>
                )}
              </div>

              {origin && (
                <div className="shrink-0 rounded-xl border border-blood-100 bg-cream p-1.5">
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
              <p className="mb-1.5 text-[10px] font-bold tracking-wide text-stone-500 uppercase">
                Campaign Stamps
              </p>
              <div className="flex flex-wrap gap-1">
                {STAMPS_META.map((stamp) => (
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
