import type { Metadata } from "next";
import { MythGame } from "@/components/play/myth-game";

export const metadata: Metadata = {
  title: "Fact or Myth",
  description:
    "Test what you know with 10 quick blood donation Fact or Myth statements.",
};

export default function PlayPage() {
  return (
    <div className="py-2 sm:py-4">
      <MythGame />
    </div>
  );
}
