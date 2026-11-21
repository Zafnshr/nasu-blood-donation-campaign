"use client";

import { useState } from "react";
import {
  BLOOD_TYPES_FUN_FACT,
  BLOOD_TYPES_GLOBAL_NOTE,
  BLOOD_TYPES_INTRO,
  BLOOD_TYPES_PLASMA_NOTE,
  BLOOD_TYPE_TITLES,
} from "@/data/blood-types";
import {
  BLOOD_TYPES,
  formatBloodType,
  getAntigens,
  redCellDonors,
  redCellRecipients,
} from "@/lib/blood";
import type { BloodType } from "@/types";
import { Card } from "@/components/ui/card";

function CellIllustration({ type }: { type: BloodType }) {
  const { a, b, rh } = getAntigens(type);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 180 180"
        className="h-36 w-36"
        role="img"
        aria-label={`Red blood cell diagram for blood type ${type}`}
      >
        {/* Outer antigens */}
        {a && (
          <g fill="#f59e0b">
            <circle cx="90" cy="18" r="7" />
            <circle cx="90" cy="162" r="7" />
            <circle cx="18" cy="90" r="7" />
            <circle cx="162" cy="90" r="7" />
          </g>
        )}
        {b && (
          <g fill="#6366f1">
            <rect x="34" y="34" width="12" height="12" rx="3" />
            <rect x="134" y="34" width="12" height="12" rx="3" />
            <rect x="34" y="134" width="12" height="12" rx="3" />
            <rect x="134" y="134" width="12" height="12" rx="3" />
          </g>
        )}
        {rh && (
          <g stroke="#10b981" strokeWidth="3.5" strokeLinecap="round">
            <line x1="142" y1="62" x2="152" y2="56" />
            <line x1="28" y1="124" x2="38" y2="118" />
          </g>
        )}

        {/* Red cell disc */}
        <circle cx="90" cy="90" r="56" fill="#e11d48" />
        <circle cx="90" cy="90" r="34" fill="#be123c" opacity="0.45" />
        <text
          x="90"
          y="98"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="26"
          fontWeight="800"
        >
          {formatBloodType(type)}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-stone-600">
        {a && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />A marker
          </span>
        )}
        {b && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-xs bg-indigo-500" />B marker
          </span>
        )}
        {rh ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            RhD (+)
          </span>
        ) : (
          <span className="text-stone-500">No RhD (–)</span>
        )}
        {!a && !b && !rh && (
          <span className="text-stone-500">Zero A, B or RhD markers</span>
        )}
      </div>
    </div>
  );
}

function CompatibilityGrid({
  title,
  highlighted,
}: {
  title: string;
  highlighted: BloodType[];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
        {title}
      </p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {BLOOD_TYPES.map((t) => {
          const match = highlighted.includes(t);
          return (
            <div
              key={t}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-sm font-extrabold transition-colors ${
                match
                  ? "border-blood-600 bg-blood-600 text-white shadow-2xs"
                  : "border-stone-200 bg-stone-50 text-stone-400 opacity-55"
              }`}
            >
              {formatBloodType(t)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TypeExplorer() {
  const [selected, setSelected] = useState<BloodType>("O+");

  const giveTo = redCellRecipients(selected);
  const receiveFrom = redCellDonors(selected);
  const meta = BLOOD_TYPE_TITLES[selected];

  return (
    <Card>
      <p className="text-sm leading-relaxed text-stone-600">
        {BLOOD_TYPES_INTRO}
      </p>

      <div
        role="group"
        aria-label="Choose a blood type to explore"
        className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8"
      >
        {BLOOD_TYPES.map((type) => {
          const active = type === selected;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(type)}
              className={`min-h-11 rounded-2xl border text-sm font-extrabold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                active
                  ? "border-blood-600 bg-blood-600 text-white shadow-sm"
                  : "border-blood-100 bg-blood-50/50 text-ink hover:border-blood-300 hover:bg-blood-50"
              }`}
            >
              {formatBloodType(type)}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-center gap-6 rounded-2xl border border-blood-100 bg-cream/60 p-5 sm:grid-cols-[190px_1fr]">
        <CellIllustration type={selected} />

        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blood-600">
              {meta.title}
            </p>
            <p className="mt-1 text-sm font-medium text-stone-700">
              {meta.subtitle}
            </p>
          </div>

          <CompatibilityGrid
            title="Can give red cells to"
            highlighted={giveTo}
          />
          <CompatibilityGrid
            title="Can receive red cells from"
            highlighted={receiveFrom}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2.5 text-xs leading-relaxed text-stone-600 sm:text-sm">
        <p className="rounded-2xl bg-amber-50/80 px-4 py-3 text-amber-950">
          <strong className="font-bold">Plasma works in reverse: </strong>
          {BLOOD_TYPES_PLASMA_NOTE}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <p className="rounded-2xl bg-stone-50 px-4 py-3">
            <strong className="font-bold text-ink">Global note: </strong>
            {BLOOD_TYPES_GLOBAL_NOTE}
          </p>
          <p className="rounded-2xl bg-stone-50 px-4 py-3">
            <strong className="font-bold text-ink">Did you know? </strong>
            {BLOOD_TYPES_FUN_FACT}
          </p>
        </div>
      </div>
    </Card>
  );
}
