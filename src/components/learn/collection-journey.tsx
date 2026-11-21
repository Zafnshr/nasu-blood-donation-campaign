import { COLLECTION_JOURNEY } from "@/data/blood-basics";
import { Card } from "@/components/ui/card";

export function CollectionJourney() {
  return (
    <Card>
      <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
        What happens after your blood is collected?
      </h3>
      <p className="mt-1 text-sm text-stone-600">
        From the donation chair to a hospital bedside in 5 careful steps.
      </p>

      <ol className="mt-5 space-y-4">
        {COLLECTION_JOURNEY.map((item, idx) => (
          <li key={item.step} className="relative flex gap-4">
            {idx < COLLECTION_JOURNEY.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-9 bottom-[-18px] left-4 w-0.5 bg-blood-100"
              />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blood-600 text-xs font-extrabold text-white shadow-xs">
              {item.step}
            </span>
            <div className="pb-1">
              <p className="text-sm font-bold text-ink sm:text-base">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-stone-600">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
