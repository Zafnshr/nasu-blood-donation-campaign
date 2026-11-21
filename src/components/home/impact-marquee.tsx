"use client";

import { useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";

export function ImpactMarquee() {
  const { locale, isAr } = usePreferences();
  const items = UI_COPY[locale].home.marqueeItems;
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {items.map((text) => (
          <span
            key={text}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-800 dark:border-[#2e2629] dark:bg-[#1c181a] dark:text-stone-200"
          >
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-blood-500" />
            <span>{text}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      aria-label="Campaign highlights"
      className="marquee-wrap relative mt-5 overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 py-2.5 shadow-2xs dark:border-[#2e2629] dark:bg-[#1c181a]/90"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent dark:from-[#121011]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent dark:from-[#121011]"
      />

      <div className="animate-marquee flex w-max items-center gap-3">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1 || undefined}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {items.map((text) => (
              <span
                key={`${dup}-${text}`}
                dir={isAr ? "rtl" : "ltr"}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200/80 bg-[#f6f3ef] px-4 py-1.5 text-xs font-semibold text-stone-800 sm:text-sm dark:border-[#3a2f33] dark:bg-[#251f22] dark:text-stone-200"
              >
                <Sparkles
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-blood-600 dark:text-rose-400"
                />
                <span>{text}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
