import { Heart } from "lucide-react";
import { CAMPAIGN_INFO } from "@/data/campaign";
import { Button } from "@/components/ui/button";
import { HeroDrop } from "@/components/home/hero-drop";
import { StatStrip } from "@/components/home/stat-strip";
import { JourneyTiles } from "@/components/home/journey-tiles";
import { StampProgress } from "@/components/home/stamp-progress";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-blood-100/80 bg-white px-6 py-7 shadow-[0_12px_36px_rgba(76,5,25,0.06)] sm:px-8 sm:py-10">
        <div className="grid items-center gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-xs font-bold tracking-wide text-blood-600 uppercase">
              {CAMPAIGN_INFO.fullTitle}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl sm:leading-[1.08]">
              One donation.{" "}
              <span className="text-blood-600">Up to three lives.</span>
            </h1>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-stone-600 sm:text-base">
              Bust the myths, meet your blood, and walk away with your own donor
              card, all in about 5 minutes.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/play">Start the 2-min challenge</Button>
              <Button href="/card" variant="secondary">
                Make my donor card
              </Button>
            </div>
          </div>

          <div className="order-first md:order-last">
            <HeroDrop />
          </div>
        </div>
      </section>

      <StatStrip />
      <JourneyTiles />
      <StampProgress />

      <section className="pt-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-blood-600 to-blood-800 px-6 py-6 text-center text-white shadow-lg shadow-blood-700/20 sm:flex-row sm:text-left">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Heart
                aria-hidden="true"
                className="animate-heartbeat h-5 w-5 fill-white text-white"
              />
            </span>
            <p className="text-sm font-semibold leading-snug sm:text-base">
              {CAMPAIGN_INFO.closingLine}
            </p>
          </div>
          <Button
            href="/donate"
            variant="secondary"
            size="sm"
            className="shrink-0 border-white/20 bg-white text-blood-700 hover:bg-blood-50"
          >
            Check eligibility
          </Button>
        </div>
      </section>
    </div>
  );
}
