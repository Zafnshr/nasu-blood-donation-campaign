import { Clock } from "lucide-react";
import { DONATION_DAY_STEPS, DONATION_TOTAL_TIME } from "@/data/donate";
import { Card } from "@/components/ui/card";

export function DonationSteps() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DONATION_DAY_STEPS.map((item) => (
          <Card key={item.step} className="p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blood-600 text-xs font-extrabold text-white">
                {item.step}
              </span>
              <span className="rounded-full bg-blood-50 px-3 py-1 text-xs font-bold text-blood-700">
                {item.duration}
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-ink sm:text-lg">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">
              {item.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-blood-200/80 bg-blood-50/70 px-4 py-3 text-sm font-semibold text-blood-900">
        <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-blood-600" />
        <span>Total time from walk-in to snack: {DONATION_TOTAL_TIME}</span>
      </div>
    </div>
  );
}
