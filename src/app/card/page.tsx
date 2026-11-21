import type { Metadata } from "next";
import { CardBuilder } from "@/components/card/card-builder";

export const metadata: Metadata = {
  title: "Donor Card · بطاقة المتبرع",
  description:
    "Create, flip, download, and share your personalized interactive NASU blood donor card.",
};

export default function CardPage() {
  return (
    <div className="py-2 sm:py-4">
      <CardBuilder />
    </div>
  );
}
