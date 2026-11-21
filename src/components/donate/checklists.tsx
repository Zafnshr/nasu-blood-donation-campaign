"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AFTER_CHECKLIST, BEFORE_CHECKLIST } from "@/data/donate";
import { Card } from "@/components/ui/card";

function ChecklistColumn({
  title,
  items,
  checked,
  onToggle,
  footerMessage,
}: {
  title: string;
  items: string[];
  checked: Record<string, boolean>;
  onToggle: (item: string) => void;
  footerMessage?: string;
}) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-ink sm:text-xl">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const isChecked = Boolean(checked[item]);
          return (
            <li key={item}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggle(item)}
                className={`flex min-h-11 w-full items-start gap-3 rounded-2xl border px-3.5 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                  isChecked
                    ? "border-emerald-200 bg-emerald-50/70 text-emerald-950"
                    : "border-stone-200/80 bg-cream/40 text-stone-700 hover:border-blood-200 hover:bg-blood-50/40"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    isChecked
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-stone-300 bg-white"
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
          className="mt-4 rounded-2xl bg-emerald-50 px-4 py-2.5 text-center text-sm font-bold text-emerald-800"
        >
          {footerMessage}
        </p>
      )}
    </Card>
  );
}

export function Checklists() {
  const [beforeChecked, setBeforeChecked] = useState<Record<string, boolean>>(
    {}
  );
  const [afterChecked, setAfterChecked] = useState<Record<string, boolean>>(
    {}
  );

  const allAfterDone = AFTER_CHECKLIST.every((item) => afterChecked[item]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChecklistColumn
        title="Before you donate"
        items={BEFORE_CHECKLIST}
        checked={beforeChecked}
        onToggle={(item) =>
          setBeforeChecked((prev) => ({ ...prev, [item]: !prev[item] }))
        }
      />
      <ChecklistColumn
        title="After you donate"
        items={AFTER_CHECKLIST}
        checked={afterChecked}
        onToggle={(item) =>
          setAfterChecked((prev) => ({ ...prev, [item]: !prev[item] }))
        }
        footerMessage={
          allAfterDone ? "You're a pro at aftercare ✨" : undefined
        }
      />
    </div>
  );
}
