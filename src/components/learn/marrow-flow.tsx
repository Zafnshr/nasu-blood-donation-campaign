import { ArrowDown, ArrowRight } from "lucide-react";
import { MARROW_STEPS } from "@/data/blood-basics";
import { Card } from "@/components/ui/card";

export function MarrowFlow() {
  return (
    <Card>
      <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
        Blood is made inside your bones
      </h3>
      <p className="mt-1 text-sm text-stone-600">
        Right after you donate, your body automatically triggers a rebuild loop.
      </p>

      <div className="mt-5 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {MARROW_STEPS.map((item, idx) => (
          <div
            key={item.step}
            className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center"
          >
            <div className="flex-1 rounded-2xl border border-blood-100 bg-cream/70 p-3.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blood-600 text-xs font-bold text-white">
                {item.step}
              </span>
              <p className="mt-2 text-xs font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-stone-600">
                {item.text}
              </p>
            </div>

            {idx < MARROW_STEPS.length - 1 && (
              <div
                aria-hidden="true"
                className="flex items-center justify-center text-blood-400"
              >
                <ArrowDown className="h-4 w-4 md:hidden" />
                <ArrowRight className="hidden h-4 w-4 md:block" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
