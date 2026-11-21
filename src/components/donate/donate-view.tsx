"use client";

import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { AnchorTabs } from "@/components/ui/anchor-tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ImpactSplit } from "@/components/donate/impact-split";
import { EligibilityCheck } from "@/components/donate/eligibility-check";
import { DonationSteps } from "@/components/donate/donation-steps";
import { Checklists } from "@/components/donate/checklists";

export function DonateView() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].donate;

  const tabs = [
    { id: "why-it-matters", label: copy.tabs.why },
    { id: "eligibility", label: copy.tabs.eligibility },
    { id: "donation-day", label: copy.tabs.day },
    { id: "aftercare", label: copy.tabs.aftercare },
  ];

  return (
    <div>
      <AnchorTabs items={tabs} />

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
