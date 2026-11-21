import type { Metadata } from "next";
import { DonateView } from "@/components/donate/donate-view";

export const metadata: Metadata = {
  title: "Donate · تبرّع",
  description:
    "See who your donation helps, run a 30-second eligibility check, and prepare for donation day.",
};

export default function DonatePage() {
  return <DonateView />;
}
