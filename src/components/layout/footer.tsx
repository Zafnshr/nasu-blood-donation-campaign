"use client";

import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { usePreferences } from "@/lib/use-preferences";

export function Footer() {
  const { locale } = usePreferences();
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  return (
    <footer className="mx-auto max-w-5xl px-4 pb-28 pt-6 text-center sm:px-6 sm:pb-12 lg:px-8">
      <div className="border-t border-stone-200/80 pt-6 dark:border-[#2e2629]">
        <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
          {info.footerMadeWith} <span aria-hidden="true">❤</span>
          <span className="sr-only">{info.footerLoveWord}</span>{" "}
          {info.footerFor}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-stone-400">
          {info.disclaimer}
        </p>
      </div>
    </footer>
  );
}
