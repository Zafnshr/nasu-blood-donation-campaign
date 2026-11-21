"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RECOVERY_ITEMS, RECOVERY_NOTE } from "@/data/blood-basics";
import { Card } from "@/components/ui/card";

const PRESET_DAYS = [1, 7, 14, 56, 84];

export function RecoverySlider() {
  const [day, setDay] = useState(14);

  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            Your body after donating
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Slide through the days to see how fast each part bounces back.
          </p>
        </div>
        <span
          aria-live="polite"
          className="rounded-full bg-blood-100 px-3.5 py-1 text-sm font-extrabold text-blood-800"
        >
          Day {day}
        </span>
      </div>

      <div className="mt-5">
        <label htmlFor="recovery-day-slider" className="sr-only">
          Days since blood donation
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
                  ? "border-blood-400 bg-blood-50 text-blood-700"
                  : "border-stone-200 bg-white text-stone-600 hover:border-blood-200"
              }`}
            >
              Day {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {RECOVERY_ITEMS.map((item) => {
          const ratio = Math.min(1, day / item.fullDay);
          const pct = Math.round(ratio * 100);
          const done = day >= item.fullDay;

          return (
            <div key={item.id}>
              <div className="mb-1.5 flex items-center justify-between gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <span>{item.label}</span>
                  {done && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      <Check aria-hidden="true" className="h-3 w-3" />
                      Restored
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-stone-500">
                  {item.timeframe}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${
                    done ? "bg-emerald-500" : "bg-blood-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 rounded-2xl bg-blood-50/70 px-4 py-3 text-xs leading-relaxed text-stone-700">
        {RECOVERY_NOTE}
      </p>
    </Card>
  );
}
