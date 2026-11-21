import type { Metadata } from "next";
import { AnchorTabs } from "@/components/ui/anchor-tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { CentrifugeTube } from "@/components/learn/centrifuge-tube";
import { MarrowFlow } from "@/components/learn/marrow-flow";
import { RecoverySlider } from "@/components/learn/recovery-slider";
import { ComponentsCards } from "@/components/learn/components-cards";
import { CollectionJourney } from "@/components/learn/collection-journey";
import { TypeExplorer } from "@/components/learn/type-explorer";
import { MatchGame } from "@/components/learn/match-game";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Explore what is inside your blood, how your body restores it, blood components, and blood group compatibility.",
};

const LEARN_TABS = [
  { id: "blood-101", label: "Blood 101" },
  { id: "recovery", label: "Made & Restored" },
  { id: "components", label: "Components" },
  { id: "blood-types", label: "Blood Types" },
  { id: "match", label: "Match Game" },
];

export default function LearnPage() {
  return (
    <div>
      <AnchorTabs items={LEARN_TABS} />

      <div className="space-y-12">
        <section id="blood-101" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Blood 101"
            title="Meet what flows through you"
            subtitle="Whole blood is more than red liquid — it's three lifesaving parts working together."
          />
          <Reveal>
            <CentrifugeTube />
          </Reveal>
        </section>

        <section id="recovery" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Made & Restored"
            title="How your body replaces every drop"
            subtitle="From your bone marrow factory to day-by-day recovery after donating."
          />
          <Reveal>
            <MarrowFlow />
          </Reveal>
          <Reveal delay={0.05}>
            <RecoverySlider />
          </Reveal>
        </section>

        <section id="components" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Components & Processing"
            title="One bag, three different rescues"
            subtitle="After collection, blood is tested and separated so each component goes where it helps most."
          />
          <Reveal>
            <ComponentsCards />
          </Reveal>
          <Reveal delay={0.05}>
            <CollectionJourney />
          </Reveal>
        </section>

        <section id="blood-types" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Blood Groups"
            title="Explore blood types & compatibility"
            subtitle="Pick any blood type to see its markers and who it can safely give to or receive from."
          />
          <Reveal>
            <TypeExplorer />
          </Reveal>
        </section>

        <section id="match" className="scroll-mt-28 space-y-5">
          <SectionHeader
            eyebrow="Mini-Game"
            title="Put your compatibility skills to work"
            subtitle="Can you match a safe red-cell donor to the patient in five quick rounds?"
          />
          <Reveal>
            <MatchGame />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
