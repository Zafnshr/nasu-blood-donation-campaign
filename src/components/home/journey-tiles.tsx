"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  HeartHandshake,
  IdCard,
} from "lucide-react";
import {
  JOURNEY_TILES_BY_LOCALE,
  getStampsMeta,
  type JourneyTileItem,
} from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { useProgress } from "@/lib/use-progress";
import { StampBadge } from "@/components/ui/stamp-badge";

const TILE_ICONS = {
  play: Gamepad2,
  learn: BookOpen,
  donate: HeartHandshake,
  card: IdCard,
} as const;

function JourneyTileCard({
  tile,
  earned,
  hasCard,
  stampLabel,
  cardCreatedLabel,
  cardCollectLabel,
}: {
  tile: JourneyTileItem;
  earned: boolean;
  hasCard: boolean;
  stampLabel: string | null;
  cardCreatedLabel: string;
  cardCollectLabel: string;
}) {
  const Icon = TILE_ICONS[tile.iconKey];
  const reduced = useReducedMotion();
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(196, 30, 58, 0.08), transparent 70%)`;

  function handlePointerMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  function handlePointerLeave() {
    mx.set(-200);
    my.set(-200);
  }

  return (
    <Link
      href={tile.href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex min-h-34 flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/85 bg-white p-5 shadow-[0_6px_24px_rgba(28,25,23,0.05)] transition-all duration-150 hover:-translate-y-0.5 hover:border-blood-300 hover:shadow-[0_12px_30px_rgba(196,30,58,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:border-[#2e2629] dark:bg-[#1c181a] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:hover:border-blood-400/50 dark:focus-visible:ring-offset-[#121011]"
    >
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blood-50 text-blood-600 transition-colors group-hover:bg-blood-600 group-hover:text-white dark:bg-blood-950/70 dark:text-rose-300">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-[#f6f3ef] px-3 py-1 text-xs font-semibold text-stone-700 dark:bg-[#251f22] dark:text-stone-300">
          {tile.duration}
        </span>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold tracking-wide text-blood-600 uppercase sm:text-sm dark:text-rose-400">
              {tile.tab}
            </p>
            <h3 className="text-lg font-bold text-ink sm:text-xl dark:text-[#f5f2f0]">
              {tile.title}
            </h3>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blood-600 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 dark:group-hover:text-rose-400"
          />
        </div>

        {stampLabel && (
          <div className="mt-3">
            <StampBadge label={stampLabel} earned={earned} compact />
          </div>
        )}

        {tile.iconKey === "card" && (
          <div className="mt-3">
            <StampBadge
              label={hasCard ? cardCreatedLabel : cardCollectLabel}
              earned={hasCard}
              compact
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export function JourneyTiles() {
  const progress = useProgress();
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].home;
  const tiles = JOURNEY_TILES_BY_LOCALE[locale];
  const stampsMeta = getStampsMeta(locale);

  return (
    <section aria-labelledby="journey-heading" className="mt-10">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2
          id="journey-heading"
          className="text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-[#f5f2f0]"
        >
          {copy.journeyHeading}
        </h2>
        <span className="text-sm font-semibold text-stone-600 dark:text-stone-400">
          {copy.journeyDuration}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => {
          const stampMeta = tile.stampKey
            ? stampsMeta.find((s) => s.key === tile.stampKey)
            : null;
          const earned = tile.stampKey
            ? progress.stamps[tile.stampKey]
            : false;
          const hasCard = tile.iconKey === "card" && progress.card !== null;

          return (
            <JourneyTileCard
              key={tile.href}
              tile={tile}
              earned={earned}
              hasCard={hasCard}
              stampLabel={stampMeta ? stampMeta.label : null}
              cardCreatedLabel={copy.cardCreatedBadge}
              cardCollectLabel={copy.cardCollectBadge}
            />
          );
        })}
      </div>
    </section>
  );
}
