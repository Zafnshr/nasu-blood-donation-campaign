"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BLOOD_TYPES_FUN_FACT_BY_LOCALE,
  BLOOD_TYPES_GLOBAL_NOTE_BY_LOCALE,
  BLOOD_TYPES_INTRO_BY_LOCALE,
  BLOOD_TYPES_PLASMA_NOTE_BY_LOCALE,
  BLOOD_TYPE_TITLES_BY_LOCALE,
} from "@/data/blood-types";
import { UI_COPY } from "@/data/translations";
import {
  BLOOD_TYPES,
  formatBloodType,
  getAntigens,
  redCellDonors,
  redCellRecipients,
} from "@/lib/blood";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import type { BloodType } from "@/types";
import { Card } from "@/components/ui/card";

function CellIllustration({ type }: { type: BloodType }) {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.explorer;
  const reduced = useReducedMotion();
  const { a, b, rh } = getAntigens(type);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 180 180"
        className="h-36 w-36"
        role="img"
        aria-label={`Red blood cell diagram for blood type ${type}`}
      >
        <AnimatePresence>
          {a && (
            <motion.g
              key={`a-${type}`}
              initial={reduced ? undefined : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              fill="#f59e0b"
            >
              <circle cx="90" cy="18" r="7" />
              <circle cx="90" cy="162" r="7" />
              <circle cx="18" cy="90" r="7" />
              <circle cx="162" cy="90" r="7" />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {b && (
            <motion.g
              key={`b-${type}`}
              initial={reduced ? undefined : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              fill="#6366f1"
            >
              <rect x="34" y="34" width="12" height="12" rx="3" />
              <rect x="134" y="34" width="12" height="12" rx="3" />
              <rect x="34" y="134" width="12" height="12" rx="3" />
              <rect x="134" y="134" width="12" height="12" rx="3" />
            </motion.g>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {rh && (
            <motion.g
              key={`rh-${type}`}
              initial={reduced ? undefined : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <line x1="142" y1="62" x2="152" y2="56" />
              <line x1="28" y1="124" x2="38" y2="118" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Red cell disc */}
        <circle cx="90" cy="90" r="56" fill="#e11d48" />
        <circle cx="90" cy="90" r="34" fill="#be123c" opacity="0.45" />
        <text
          x="90"
          y="98"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="26"
          fontWeight="800"
          direction="ltr"
        >
          {formatBloodType(type)}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
        {a && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            {copy.markerA}
          </span>
        )}
        {b && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-xs bg-indigo-500" />
            {copy.markerB}
          </span>
        )}
        {rh ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            {copy.markerRhPos}
          </span>
        ) : (
          <span className="text-stone-500 dark:text-stone-400">
            {copy.markerRhNeg}
          </span>
        )}
        {!a && !b && !rh && (
          <span className="text-stone-500 dark:text-stone-400">
            {copy.markerZero}
          </span>
        )}
      </div>
    </div>
  );
}

function CompatibilityGrid({
  title,
  highlighted,
}: {
  title: string;
  highlighted: BloodType[];
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-stone-500 uppercase dark:text-stone-400">
        {title}
      </p>
      <div dir="ltr" className="mt-2 grid grid-cols-4 gap-2">
        {BLOOD_TYPES.map((t) => {
          const match = highlighted.includes(t);
          return (
            <div
              key={t}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-sm font-extrabold transition-colors ${
                match
                  ? "border-blood-600 bg-blood-600 text-white shadow-2xs"
                  : "border-stone-200 bg-stone-50 text-stone-400 opacity-55 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-500"
              }`}
            >
              {formatBloodType(t)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TypeExplorer() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.explorer;
  const intro = BLOOD_TYPES_INTRO_BY_LOCALE[locale];
  const plasmaNote = BLOOD_TYPES_PLASMA_NOTE_BY_LOCALE[locale];
  const globalNote = BLOOD_TYPES_GLOBAL_NOTE_BY_LOCALE[locale];
  const funFact = BLOOD_TYPES_FUN_FACT_BY_LOCALE[locale];
  const titles = BLOOD_TYPE_TITLES_BY_LOCALE[locale];

  const [selected, setSelected] = useState<BloodType>("O+");

  const giveTo = redCellRecipients(selected);
  const receiveFrom = redCellDonors(selected);
  const meta = titles[selected];

  return (
    <Card>
      <p className="text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
        {intro}
      </p>

      <div
        role="group"
        dir="ltr"
        aria-label={copy.chooseAria}
        className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8"
      >
        {BLOOD_TYPES.map((type) => {
          const active = type === selected;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSelected(type);
                trackEvent("blood_type_inspect", { blood_type: type });
              }}
              className={`relative min-h-11 overflow-hidden rounded-2xl border text-sm font-extrabold transition-colors sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                active
                  ? "border-blood-600 text-white shadow-sm"
                  : "border-stone-200 bg-[#f6f3ef] text-ink hover:border-blood-300 hover:bg-blood-50 dark:border-[#2e2629] dark:bg-[#161214] dark:text-[#f5f2f0] dark:hover:bg-blood-950/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="blood-type-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-blood-600"
                />
              )}
              <span className="relative z-10">{formatBloodType(type)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-center gap-6 rounded-2xl border border-stone-200/85 bg-[#f6f3ef] p-5 lg:grid-cols-[240px_1fr] dark:border-[#2e2629] dark:bg-[#161214]">
        <CellIllustration type={selected} />

        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold tracking-wide text-blood-600 uppercase sm:text-sm dark:text-rose-400">
              {meta.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed font-medium text-stone-700 sm:text-base dark:text-stone-300">
              {meta.subtitle}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <CompatibilityGrid title={copy.giveTo} highlighted={giveTo} />
            <CompatibilityGrid
              title={copy.receiveFrom}
              highlighted={receiveFrom}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        <p className="rounded-2xl bg-amber-50/90 px-4 py-3 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200">
          <strong className="font-bold">{copy.plasmaPrefix}</strong>
          {plasmaNote}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <p className="rounded-2xl bg-[#f6f3ef] px-4 py-3 dark:bg-[#161214]">
            <strong className="font-bold text-ink dark:text-[#f5f2f0]">
              {copy.globalPrefix}
            </strong>
            {globalNote}
          </p>
          <p className="rounded-2xl bg-[#f6f3ef] px-4 py-3 dark:bg-[#161214]">
            <strong className="font-bold text-ink dark:text-[#f5f2f0]">
              {copy.funFactPrefix}
            </strong>
            {funFact}
          </p>
        </div>
      </div>
    </Card>
  );
}
