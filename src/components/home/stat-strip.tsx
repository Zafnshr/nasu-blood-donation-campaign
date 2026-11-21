import { HOME_STATS } from "@/data/campaign";

export function StatStrip() {
  return (
    <section aria-label="Key blood donation facts" className="mt-8">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {HOME_STATS.map((stat) => (
          <div
            key={stat.label}
            className="min-w-[148px] shrink-0 snap-start rounded-2xl border border-blood-100/80 bg-white px-4 py-3.5 shadow-[0_4px_18px_rgba(76,5,25,0.04)] sm:min-w-0"
          >
            <p className="text-lg font-extrabold tracking-tight text-blood-600 sm:text-xl">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium leading-snug text-stone-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
