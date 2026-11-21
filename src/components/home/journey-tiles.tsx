"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  HeartHandshake,
  IdCard,
} from "lucide-react";
import { JOURNEY_TILES, STAMPS_META } from "@/data/campaign";
import { useProgress } from "@/lib/use-progress";
import { StampBadge } from "@/components/ui/stamp-badge";

const TILE_ICONS = {
  Play: Gamepad2,
  Learn: BookOpen,
  Donate: HeartHandshake,
  Card: IdCard,
} as const;

export function JourneyTiles() {
  const progress = useProgress();

  return (
    <section aria-labelledby="journey-heading" className="mt-10">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2
          id="journey-heading"
          className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          Your journey
        </h2>
        <span className="text-xs font-semibold text-stone-500">
          ~5 min total
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {JOURNEY_TILES.map((tile) => {
          const Icon =
            TILE_ICONS[tile.tab as keyof typeof TILE_ICONS] ?? Gamepad2;
          const stampMeta = tile.stampKey
            ? STAMPS_META.find((s) => s.key === tile.stampKey)
            : null;
          const earned = tile.stampKey ? progress.stamps[tile.stampKey] : false;
          const hasCard = tile.href === "/card" && progress.card !== null;

          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="group flex min-h-28 flex-col justify-between rounded-3xl border border-blood-100/80 bg-white p-5 shadow-[0_8px_30px_rgba(76,5,25,0.05)] transition-all duration-150 hover:-translate-y-0.5 hover:border-blood-300 hover:shadow-[0_12px_34px_rgba(225,29,72,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blood-50 text-blood-600 transition-colors group-hover:bg-blood-600 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                  {tile.duration}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blood-600">
                      {tile.tab}
                    </p>
                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {tile.title}
                    </h3>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blood-600"
                  />
                </div>

                {stampMeta && (
                  <div className="mt-3">
                    <StampBadge
                      label={stampMeta.label}
                      earned={earned}
                      compact
                    />
                  </div>
                )}

                {tile.href === "/card" && (
                  <div className="mt-3">
                    <StampBadge
                      label={hasCard ? "Card created" : "Collect reward"}
                      earned={hasCard}
                      compact
                    />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
