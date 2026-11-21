"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { BrandLockup } from "@/components/ui/brand-logo";

export function Footer() {
  const { locale } = usePreferences();
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];
  const shareLabel = UI_COPY[locale].share.footerShareLink;

  return (
    <footer className="mx-auto max-w-5xl px-4 pb-28 pt-6 text-center sm:px-6 sm:pb-12 lg:px-8">
      <div className="border-t border-stone-200/80 pt-7 dark:border-[#2e2629]">
          <div className="mb-3 flex justify-center">
            <BrandLockup
              title={info.fullTitle}
              subtitle={info.university}
              logoClassName="h-11 w-11 shrink-0"
              dividerClassName="h-7 w-[1.5px] shrink-0 bg-stone-300/90 dark:bg-[#3a2f33]"
              titleClassName="text-sm font-extrabold text-ink sm:text-base dark:text-[#f5f2f0]"
              subtitleClassName="text-xs font-semibold text-stone-500 dark:text-stone-400"
            />
          </div>
          <div className="mb-4 flex justify-center">
            <Link
              href="/share"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-stone-200/90 bg-white px-3.5 py-1 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-blood-300 hover:bg-blood-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#1c181a] dark:text-stone-200 dark:hover:bg-blood-950/60"
            >
              <QrCode
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-blood-600 dark:text-rose-400"
              />
              <span>{shareLabel}</span>
            </Link>
          </div>
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
