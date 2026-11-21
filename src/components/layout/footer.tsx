import { CAMPAIGN_INFO } from "@/data/campaign";

export function Footer() {
  return (
    <footer className="mx-auto max-w-3xl px-4 pb-28 pt-6 text-center sm:pb-12">
      <div className="border-t border-blood-100/80 pt-6">
        <p className="text-sm font-medium text-stone-700">
          Made with <span aria-hidden="true">❤</span>
          <span className="sr-only">love</span> for the{" "}
          {CAMPAIGN_INFO.fullTitle}
        </p>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-stone-500">
          {CAMPAIGN_INFO.disclaimer}
        </p>
      </div>
    </footer>
  );
}
