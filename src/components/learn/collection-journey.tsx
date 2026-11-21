"use client";

import { COLLECTION_JOURNEY_BY_LOCALE } from "@/data/blood-basics";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";

export function CollectionJourney() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.journey;
  const steps = COLLECTION_JOURNEY_BY_LOCALE[locale];

  return (
    <Card>
      <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl dark:text-[#f5f2f0]">
        {copy.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
        {copy.sub}
      </p>

      <ol className="mt-5 space-y-4">
        {steps.map((item, idx) => (
          <li key={item.step} className="relative flex gap-4">
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-9 bottom-[-18px] start-4 w-0.5 bg-stone-200 dark:bg-[#2e2629]"
              />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blood-600 text-xs font-extrabold text-white shadow-xs">
              {item.step}
            </span>
            <div className="pb-1">
              <p className="text-base font-bold text-ink dark:text-[#f5f2f0]">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
