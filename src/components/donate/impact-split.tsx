"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Ambulance,
  Baby,
  Droplets,
  Flame,
  HeartPulse,
  Ribbon,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import {
  SPLIT_TARGETS_BY_LOCALE,
  WHO_NEEDS_BLOOD_BY_LOCALE,
  WHY_IT_MATTERS_BY_LOCALE,
  type WhoNeedsBloodItem,
} from "@/data/donate";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PATIENT_ICONS: Record<
  WhoNeedsBloodItem["icon"],
  typeof Ambulance
> = {
  ambulance: Ambulance,
  baby: Baby,
  "heart-pulse": HeartPulse,
  ribbon: Ribbon,
  stethoscope: Stethoscope,
  flame: Flame,
};

export function ImpactSplit() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].donate.split;
  const targets = SPLIT_TARGETS_BY_LOCALE[locale];
  const why = WHY_IT_MATTERS_BY_LOCALE[locale];
  const whoNeeds = WHO_NEEDS_BLOOD_BY_LOCALE[locale];
  const reduced = useReducedMotion();

  const [split, setSplit] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <div className="flex flex-col items-center">
          {!split ? (
            <div className="relative inline-flex items-center justify-center">
              {!reduced && (
                <span
                  aria-hidden="true"
                  className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-3xl border-2 border-blood-500/60"
                />
              )}
              <button
                type="button"
                onClick={() => setSplit(true)}
                className="group relative inline-flex min-h-14 items-center gap-3 rounded-3xl bg-gradient-to-br from-blood-600 to-blood-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blood-700/25 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1a1114]"
              >
                <Droplets
                  aria-hidden="true"
                  className="h-6 w-6 transition-transform group-hover:scale-110"
                />
                <span>{copy.tapBtn}</span>
              </button>
            </div>
          ) : (
            <div className="w-full space-y-3">
              {/* Animated SVG 1-to-3 branching connector on tablet/desktop */}
              <div
                aria-hidden="true"
                className="mx-auto hidden max-w-xl sm:block"
              >
                <svg viewBox="0 0 600 64" className="h-14 w-full">
                  <circle cx="300" cy="8" r="6" fill="#e11d48" />
                  <motion.path
                    d="M300 10 C300 38, 100 22, 100 60"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M300 10 L300 60"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <motion.path
                    d="M300 10 C300 38, 500 22, 500 60"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </svg>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {targets.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={
                      reduced
                        ? undefined
                        : { opacity: 0, y: -14, scale: 0.92 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                      delay: idx * 0.1,
                    }}
                    className={`rounded-2xl border p-4 text-start ${item.cardBorder}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${item.colorClass}`}
                    >
                      <Droplets aria-hidden="true" className="h-3.5 w-3.5" />
                      {item.component}
                    </span>
                    <p className="mt-3 text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
                      {copy.helpsLabel}
                    </p>
                    <p className="mt-0.5 text-base font-bold text-ink dark:text-stone-100">
                      {item.recipient}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <p className="text-base font-extrabold text-blood-700 sm:text-lg dark:text-rose-300">
                  {copy.oneToThree}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSplit(false)}
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  {copy.replay}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2.5 border-t border-stone-200/80 pt-5 text-start dark:border-[#2e2629]">
          <p className="text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
            {why.lead}
          </p>
          <p className="rounded-2xl bg-[#f6f3ef] px-4 py-3 text-sm font-semibold leading-relaxed text-blood-900 sm:text-base dark:bg-[#161214] dark:text-rose-200">
            {why.whoStat}
          </p>
        </div>
      </Card>

      <div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl dark:text-[#f5f2f0]">
          {copy.whoNeedsTitle}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whoNeeds.map((patient) => {
            const Icon = PATIENT_ICONS[patient.icon];
            return (
              <Card key={patient.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blood-50 text-blood-600 dark:bg-blood-950/80 dark:text-rose-300">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-ink dark:text-[#f5f2f0]">
                      {patient.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {patient.detail}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
