"use client";

import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { AnchorTabs } from "@/components/ui/anchor-tabs";
import { BrandLockup } from "@/components/ui/brand-logo";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ImpactSplit } from "@/components/donate/impact-split";
import { EligibilityCheck } from "@/components/donate/eligibility-check";
import { DonationSteps } from "@/components/donate/donation-steps";
import { Checklists } from "@/components/donate/checklists";

export function DonateView() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].donate;
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  const tabs = [
    { id: "why-it-matters", label: copy.tabs.why },
    { id: "eligibility", label: copy.tabs.eligibility },
    { id: "donation-day", label: copy.tabs.day },
    { id: "aftercare", label: copy.tabs.aftercare },
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
        <section id="why-it-matters" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.why} />
          <Reveal>
            <ImpactSplit />
          </Reveal>
        </section>

        <section id="eligibility" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.eligibility} />
          <Reveal>
            <EligibilityCheck />
          </Reveal>
        </section>

        <section id="donation-day" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.day} />
          <Reveal>
            <DonationSteps />
          </Reveal>
        </section>

        <section id="aftercare" className="scroll-mt-28 space-y-5">
          <SectionHeader {...copy.sections.aftercare} />
          <Reveal>
            <Checklists />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
