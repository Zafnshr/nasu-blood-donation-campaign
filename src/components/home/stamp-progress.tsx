"use client";

import Link from "next/link";
import { getStampsMeta } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { countStamps } from "@/lib/progress-store";
import { usePreferences } from "@/lib/use-preferences";
import { useProgress } from "@/lib/use-progress";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StampBadge } from "@/components/ui/stamp-badge";
import { Button } from "@/components/ui/button";

export function StampProgress() {
  const progress = useProgress();
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].home;
  const stampsMeta = getStampsMeta(locale);
  const collected = countStamps(progress);

  return (
    <section aria-labelledby="stamps-heading" className="mt-8">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="stamps-heading"
              className="text-xl font-bold tracking-tight text-ink sm:text-2xl dark:text-[#f5f2f0]"
            >
              {copy.stampsHeading(collected)}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
              {copy.stampsSub}
            </p>
          </div>
          {progress.card && (
            <Button href="/card" variant="secondary" size="sm">
              {copy.viewMyCard}
            </Button>
          )}
        </div>

        <div className="mt-4">
          <ProgressBar
            value={collected}
            max={4}
            label={copy.stampsHeading(collected)}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stampsMeta.map((stamp) => {
            const earned = progress.stamps[stamp.key];
            return (
              <Link
                key={stamp.key}
                href={stamp.href}
                title={stamp.hint}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1c181a]"
              >
                <StampBadge label={stamp.label} earned={earned} />
              </Link>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
