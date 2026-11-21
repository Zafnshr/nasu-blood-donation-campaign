"use client";

import { Clock } from "lucide-react";
import {
  DONATION_DAY_STEPS_BY_LOCALE,
  DONATION_TOTAL_TIME_BY_LOCALE,
} from "@/data/donate";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";

export function DonationSteps() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].donate.steps;
  const steps = DONATION_DAY_STEPS_BY_LOCALE[locale];
  const totalTime = DONATION_TOTAL_TIME_BY_LOCALE[locale];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <Card key={item.step} className="p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blood-600 text-xs font-extrabold text-white">
                {item.step}
              </span>
              <span className="rounded-full bg-blood-50 px-3 py-1 text-xs font-bold text-blood-700 dark:bg-blood-950/70 dark:text-rose-200">
                {item.duration}
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-ink sm:text-lg dark:text-[#f5f2f0]">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
              {item.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-stone-200/85 bg-[#f6f3ef] px-4 py-3 text-sm font-semibold text-ink sm:text-base dark:border-[#2e2629] dark:bg-[#161214] dark:text-[#f5f2f0]">
        <Clock
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-blood-600 dark:text-rose-400"
        />
        <span>
          {copy.totalPrefix} {totalTime}
        </span>
      </div>
    </div>
  );
}
