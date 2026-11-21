"use client";

import Link from "next/link";
import { STAMPS_META } from "@/data/campaign";
import { countStamps } from "@/lib/progress-store";
import { useProgress } from "@/lib/use-progress";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StampBadge } from "@/components/ui/stamp-badge";
import { Button } from "@/components/ui/button";

export function StampProgress() {
  const progress = useProgress();
  const collected = countStamps(progress);

  return (
    <section aria-labelledby="stamps-heading" className="mt-8">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="stamps-heading"
              className="text-lg font-bold tracking-tight text-ink sm:text-xl"
            >
              You&apos;ve collected {collected}/4 stamps
            </h2>
            <p className="mt-1 text-xs text-stone-600 sm:text-sm">
              Explore each section to unlock all four stamps on the back of your
              donor card.
            </p>
          </div>
          {progress.card && (
            <Button href="/card" variant="secondary" size="sm">
              View my card
            </Button>
          )}
        </div>

        <div className="mt-4">
          <ProgressBar
            value={collected}
            max={4}
            label="Campaign stamps collected"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {STAMPS_META.map((stamp) => {
            const earned = progress.stamps[stamp.key];
            return (
              <Link
                key={stamp.key}
                href={stamp.href}
                title={stamp.hint}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2"
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
