"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Button } from "@/components/ui/button";
import { HeroDrop } from "@/components/home/hero-drop";
import { ImpactMarquee } from "@/components/home/impact-marquee";
import { StatStrip } from "@/components/home/stat-strip";
import { JourneyTiles } from "@/components/home/journey-tiles";
import { StampProgress } from "@/components/home/stamp-progress";

export function HomeView() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].home;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-3xl border border-stone-200/85 bg-white px-6 py-8 shadow-[0_8px_30px_rgba(28,25,23,0.05)] transition-colors sm:px-9 sm:py-11 dark:border-[#2e2629] dark:bg-[#1c181a] dark:shadow-[0_14px_40px_rgba(0,0,0,0.42)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-20 h-64 w-64 rounded-full bg-blood-100/50 blur-3xl dark:bg-blood-700/12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -start-16 h-56 w-56 rounded-full bg-amber-100/45 blur-3xl dark:bg-amber-600/8"
        />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-bold tracking-wide text-blood-600 uppercase dark:text-rose-400">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2.5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl sm:leading-[1.16] dark:text-[#f5f2f0]">
              {copy.heroLine1}{" "}
              <span className="text-blood-600 dark:text-rose-400">
                {copy.heroHighlight}
              </span>
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-stone-700 sm:text-lg dark:text-stone-300">
              {copy.heroSub}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/play">{copy.ctaChallenge}</Button>
              <Button href="/card" variant="secondary">
                {copy.ctaCard}
              </Button>
            </div>
          </div>

          <div className="order-first md:order-last">
            <HeroDrop />
          </div>
        </div>
      </section>

      <ImpactMarquee />
      <StatStrip />
      <JourneyTiles />
      <StampProgress />

      <section className="pt-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-blood-600 to-blood-800 px-6 py-6 text-center text-white shadow-lg shadow-blood-700/15 sm:flex-row sm:text-start">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Heart
                aria-hidden="true"
                className="animate-heartbeat h-5 w-5 fill-white text-white"
              />
            </span>
            <p className="text-base font-semibold leading-relaxed sm:text-lg">
              {info.closingLine}
            </p>
          </div>
          <Link
            href="/donate"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-blood-700 shadow-xs transition-all duration-150 hover:bg-blood-50 active:scale-[0.98] sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blood-700"
          >
            {info.closingCtaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
