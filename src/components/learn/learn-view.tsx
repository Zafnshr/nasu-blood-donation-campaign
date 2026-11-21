"use client";

import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { AnchorTabs } from "@/components/ui/anchor-tabs";
import { BrandLockup } from "@/components/ui/brand-logo";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { CentrifugeTube } from "@/components/learn/centrifuge-tube";
import { MarrowFlow } from "@/components/learn/marrow-flow";
import { RecoverySlider } from "@/components/learn/recovery-slider";
import { ComponentsCards } from "@/components/learn/components-cards";
import { CollectionJourney } from "@/components/learn/collection-journey";
import { TypeExplorer } from "@/components/learn/type-explorer";
import { MatchGame } from "@/components/learn/match-game";

export function LearnView() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  const tabs = [
    { id: "blood-101", label: copy.tabs.blood101 },
    { id: "recovery", label: copy.tabs.recovery },
    { id: "components", label: copy.tabs.components },
    { id: "blood-types", label: copy.tabs.bloodTypes },
    { id: "match", label: copy.tabs.match },
  ];

  return (
    <div>
      <AnchorTabs items={tabs} />

      <div className="mb-5 inline-flex items-center rounded-full border border-stone-200/80 bg-white/90 px-3 py-1.5 shadow-2xs dark:border-[#2e2629] dark:bg-[#1c181a]">
        <BrandLockup
          title={info.fullTitle}
          logoClassName="h-7 w-7 shrink-0"
          dividerClassName="h-4 w-px shrink-0 bg-stone-300/90 dark:bg-[#3a2f33]"
          titleClassName="text-xs font-bold text-ink sm:text-sm dark:text-[#f5f2f0]"
        />
      </div>

      <div className="space-y-12">
        <section id="blood-101" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.blood101} />
          <Reveal>
            <CentrifugeTube />
          </Reveal>
        </section>

        <section id="recovery" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.recovery} />
          <Reveal>
            <MarrowFlow />
          </Reveal>
          <Reveal delay={0.05}>
            <RecoverySlider />
          </Reveal>
        </section>

        <section id="components" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.components} />
          <Reveal>
            <ComponentsCards />
          </Reveal>
          <Reveal delay={0.05}>
            <CollectionJourney />
          </Reveal>
        </section>

        <section id="blood-types" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.bloodTypes} />
          <Reveal>
            <TypeExplorer />
          </Reveal>
        </section>

        <section id="match" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.match} />
          <Reveal>
            <MatchGame />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
