import type { Metadata } from "next";
import { ShareCampaignSection } from "@/components/home/share-campaign";

export const metadata: Metadata = {
  title: "Share · شارك الحملة",
  description:
    "Share the NASU Blood Donation Campaign by scanning the framed QR code or sending the link in one tap.",
};

export default function SharePage() {
  return (
    <div className="py-2 sm:py-4">
      <ShareCampaignSection />
    </div>
  );
}
