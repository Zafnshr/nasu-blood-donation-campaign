"use client";

import { BLOOD_COMPONENTS_BY_LOCALE } from "@/data/blood-basics";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

export function ComponentsCards() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.components;
  const components = BLOOD_COMPONENTS_BY_LOCALE[locale];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {components.map((comp) => (
        <Card
          key={comp.id}
          className={`flex flex-col justify-between border last:md:col-span-2 last:lg:col-span-1 ${comp.borderClass}`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-full"
                  style={{ backgroundColor: comp.accentHex }}
                />
                <h3 className="text-lg font-bold text-ink dark:text-stone-100">
                  {comp.name}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${comp.badgeClass}`}
              >
                {copy.shelfLife} {comp.shelfLife}
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
              {copy.usedFor}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {comp.usedFor.map((use) => (
                <Chip key={use}>{use}</Chip>
              ))}
            </div>
          </div>

          <p className="mt-4 border-t border-stone-100 pt-3 text-sm font-medium text-stone-700 dark:border-stone-800 dark:text-stone-300">
            {comp.storage}
          </p>
        </Card>
      ))}
    </div>
  );
}
