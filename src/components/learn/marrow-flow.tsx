"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { MARROW_STEPS_BY_LOCALE } from "@/data/blood-basics";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";

export function MarrowFlow() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.marrow;
  const steps = MARROW_STEPS_BY_LOCALE[locale];

  return (
    <Card>
      <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl dark:text-[#f5f2f0]">
        {copy.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
        {copy.sub}
      </p>

      <div className="mt-5 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center"
          >
            <div className="flex-1 rounded-2xl border border-stone-200/85 bg-[#f6f3ef] p-4 dark:border-[#2e2629] dark:bg-[#161214]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blood-600 text-xs font-bold text-white">
                {item.step}
              </span>
              <p className="mt-2.5 text-sm font-bold text-ink dark:text-[#f5f2f0]">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-stone-700 sm:text-sm dark:text-stone-300">
                {item.text}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex items-center justify-center text-blood-400"
              >
                <ArrowDown className="h-4 w-4 md:hidden" />
                <ArrowRight className="hidden h-4 w-4 md:block rtl:rotate-180" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
