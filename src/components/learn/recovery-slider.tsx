"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  RECOVERY_ITEMS_BY_LOCALE,
  RECOVERY_NOTE_BY_LOCALE,
} from "@/data/blood-basics";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";

const PRESET_DAYS = [1, 7, 14, 56, 84];

export function RecoverySlider() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.slider;
  const items = RECOVERY_ITEMS_BY_LOCALE[locale];
  const note = RECOVERY_NOTE_BY_LOCALE[locale];

  const [day, setDay] = useState(14);

  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl dark:text-[#f5f2f0]">
            {copy.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
            {copy.sub}
          </p>
        </div>
        <span
          aria-live="polite"
          className="rounded-full bg-blood-100 px-3.5 py-1 text-sm font-extrabold text-blood-800 dark:bg-blood-950 dark:text-rose-200"
        >
          {copy.dayLabel(day)}
        </span>
      </div>

      <div className="mt-5">
        <label htmlFor="recovery-day-slider" className="sr-only">
          {copy.sliderAria}
        </label>
        <input
          id="recovery-day-slider"
          type="range"
          min={0}
          max={84}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="h-11 w-full cursor-pointer accent-blood-600"
        />
        <div className="mt-1 flex flex-wrap gap-2">
          {PRESET_DAYS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setDay(preset)}
              className={`min-h-11 rounded-xl border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                day === preset
                  ? "border-blood-400 bg-blood-50 text-blood-700 dark:border-rose-400/60 dark:bg-blood-950/70 dark:text-rose-100"
                  : "border-stone-200 bg-white text-stone-600 hover:border-blood-200 dark:border-stone-700 dark:bg-[#140d10] dark:text-stone-300"
              }`}
            >
              {copy.dayLabel(preset)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const ratio = Math.min(1, day / item.fullDay);
          const done = day >= item.fullDay;

          return (
            <div key={item.id}>
              <div className="mb-1.5 flex items-center justify-between gap-2 text-sm sm:text-base">
                <div className="flex items-center gap-2 font-bold text-ink dark:text-[#f5f2f0]">
                  <span>{item.label}</span>
                  {done && (
                    <motion.span
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 360, damping: 24 }}
                      className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200"
                    >
                      <Check aria-hidden="true" className="h-3 w-3" />
                      {copy.restored}
                    </motion.span>
                  )}
                </div>
                <span className="text-xs font-medium text-stone-600 sm:text-sm dark:text-stone-300">
                  {item.timeframe}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-800">
                <motion.div
                  animate={{ scaleX: ratio }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`h-full w-full origin-left rounded-full rtl:origin-right ${
                    done ? "bg-emerald-500" : "bg-blood-500"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 rounded-2xl bg-[#f6f3ef] px-4 py-3 text-xs leading-relaxed text-stone-700 sm:text-sm dark:bg-[#161214] dark:text-stone-300">
        {note}
      </p>
    </Card>
  );
}
