"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  AFTER_CHECKLIST_BY_LOCALE,
  BEFORE_CHECKLIST_BY_LOCALE,
} from "@/data/donate";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";
import { Card } from "@/components/ui/card";
import { Confetti } from "@/components/ui/confetti";

function ChecklistColumn({
  title,
  items,
  checked,
  onToggle,
  footerMessage,
}: {
  title: string;
  items: string[];
  checked: Record<number, boolean>;
  onToggle: (idx: number) => void;
  footerMessage?: string;
}) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-ink sm:text-xl dark:text-stone-100">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {items.map((item, idx) => {
          const isChecked = Boolean(checked[idx]);
          return (
            <li key={idx}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggle(idx)}
                className={`flex min-h-11 w-full items-start gap-3 rounded-2xl border px-3.5 py-2.5 text-start text-sm leading-relaxed transition-colors sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                  isChecked
                    ? "border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-500/35 dark:bg-emerald-950/40 dark:text-emerald-100"
                    : "border-stone-200/85 bg-[#f6f3ef] text-stone-800 hover:border-blood-300 hover:bg-blood-50/40 dark:border-[#2e2629] dark:bg-[#161214] dark:text-stone-200 dark:hover:border-blood-500/35"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    isChecked
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-stone-300 bg-white dark:border-stone-600 dark:bg-stone-900"
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </span>
                <span className={isChecked ? "line-through opacity-80" : ""}>
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {footerMessage && (
        <p
          aria-live="polite"
          className="mt-4 rounded-2xl bg-emerald-50 px-4 py-2.5 text-center text-sm font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
        >
          {footerMessage}
        </p>
      )}
    </Card>
  );
}

export function Checklists() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].donate.checklists;
  const beforeItems = BEFORE_CHECKLIST_BY_LOCALE[locale];
  const afterItems = AFTER_CHECKLIST_BY_LOCALE[locale];

  const [beforeChecked, setBeforeChecked] = useState<Record<number, boolean>>(
    {}
  );
  const [afterChecked, setAfterChecked] = useState<Record<number, boolean>>({});

  const allAfterDone = afterItems.every((_, idx) => Boolean(afterChecked[idx]));

  return (
    <>
      <Confetti active={allAfterDone} />
      <div className="grid gap-4 md:grid-cols-2">
        <ChecklistColumn
          title={copy.beforeTitle}
          items={beforeItems}
          checked={beforeChecked}
          onToggle={(idx) =>
            setBeforeChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))
          }
        />
        <ChecklistColumn
          title={copy.afterTitle}
          items={afterItems}
          checked={afterChecked}
          onToggle={(idx) =>
            setAfterChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))
          }
          footerMessage={allAfterDone ? copy.proAftercare : undefined}
        />
      </div>
    </>
  );
}
