import type { Metadata } from "next";
import { AnchorTabs } from "@/components/ui/anchor-tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ImpactSplit } from "@/components/donate/impact-split";
import { EligibilityCheck } from "@/components/donate/eligibility-check";
import { DonationSteps } from "@/components/donate/donation-steps";
import { Checklists } from "@/components/donate/checklists";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "See who your donation helps, run a 30-second eligibility check, and prepare for donation day.",
};

const DONATE_TABS = [
  { id: "why-it-matters", label: "Why it matters" },
  { id: "eligibility", label: "Can I donate?" },
  { id: "donation-day", label: "Donation day" },
  { id: "aftercare", label: "Aftercare" },
];

export default function DonatePage() {
  return (
    <div>
      <AnchorTabs items={DONATE_TABS} />

      <div className="space-y-12">
        <section id="why-it-matters" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Why It Matters"
            title="See how far one donation goes"
            subtitle="Because blood is separated into parts, a single donation can reach up to three different patients."
          />
          <Reveal>
            <ImpactSplit />
          </Reveal>
        </section>

        <section id="eligibility" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Can I Donate?"
            title="30-second quick check"
            subtitle="Answer 7 simple questions to see if today looks like a good day to donate."
          />
          <Reveal>
            <EligibilityCheck />
          </Reveal>
        </section>

        <section id="donation-day" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Donation Day"
            title="What actually happens at the booth"
            subtitle="Four calm, straightforward steps from check-in to snacks."
          />
          <Reveal>
            <DonationSteps />
          </Reveal>
        </section>

        <section id="aftercare" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Before & After"
            title="Your donation-day checklists"
            subtitle="Tap each tip to check it off before you walk up or right after you finish."
          />
          <Reveal>
            <Checklists />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
