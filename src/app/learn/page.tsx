import type { Metadata } from "next";
import { LearnView } from "@/components/learn/learn-view";

export const metadata: Metadata = {
  title: "Learn · تعلّم",
  description:
    "Explore what is inside your blood, how your body restores it, blood components, and blood group compatibility.",
};

export default function LearnPage() {
  return <LearnView />;
}
