import { BLOOD_COMPONENTS } from "@/data/blood-basics";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

export function ComponentsCards() {
  return (
    <div className="space-y-4">
      {BLOOD_COMPONENTS.map((comp) => (
        <Card key={comp.id} className={`border ${comp.borderClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: comp.accentHex }}
              />
              <h3 className="text-lg font-bold text-ink sm:text-xl">
                {comp.name}
              </h3>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${comp.badgeClass}`}
            >
              Shelf life: {comp.shelfLife}
            </span>
          </div>

          <p className="mt-3 text-xs font-semibold tracking-wide text-stone-500 uppercase">
            Used for
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {comp.usedFor.map((use) => (
              <Chip key={use}>{use}</Chip>
            ))}
          </div>

          <p className="mt-4 text-sm font-medium text-stone-600">
            {comp.storage}
          </p>
        </Card>
      ))}
    </div>
  );
}
