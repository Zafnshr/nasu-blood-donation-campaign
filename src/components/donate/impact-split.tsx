"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  Baby,
  Droplets,
  Flame,
  HeartPulse,
  Ribbon,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import {
  SPLIT_TARGETS,
  WHO_NEEDS_BLOOD,
  WHY_IT_MATTERS,
  type WhoNeedsBloodItem,
} from "@/data/donate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PATIENT_ICONS: Record<
  WhoNeedsBloodItem["icon"],
  typeof Ambulance
> = {
  ambulance: Ambulance,
  baby: Baby,
  "heart-pulse": HeartPulse,
  ribbon: Ribbon,
  stethoscope: Stethoscope,
  flame: Flame,
};

export function ImpactSplit() {
  const [split, setSplit] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <div className="flex flex-col items-center">
          {!split ? (
            <button
              type="button"
              onClick={() => setSplit(true)}
              className="group inline-flex min-h-14 items-center gap-3 rounded-3xl bg-gradient-to-br from-blood-600 to-blood-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blood-700/25 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2"
            >
              <Droplets
                aria-hidden="true"
                className="h-6 w-6 transition-transform group-hover:scale-110"
              />
              <span>Tap to split one donation</span>
            </button>
          ) : (
            <div className="w-full space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {SPLIT_TARGETS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -16, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`rounded-2xl border p-4 text-left ${item.cardBorder}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${item.colorClass}`}
                    >
                      <Droplets aria-hidden="true" className="h-3.5 w-3.5" />
                      {item.component}
                    </span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Helps
                    </p>
                    <p className="mt-0.5 text-base font-bold text-ink">
                      {item.recipient}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <p className="text-base font-extrabold text-blood-700 sm:text-lg">
                  One donation &rarr; up to 3 lives.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSplit(false)}
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  Replay
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2 border-t border-blood-100 pt-5 text-left">
          <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
            {WHY_IT_MATTERS.lead}
          </p>
          <p className="rounded-2xl bg-blood-50/70 px-4 py-3 text-xs font-semibold leading-relaxed text-blood-900 sm:text-sm">
            {WHY_IT_MATTERS.whoStat}
          </p>
        </div>
      </Card>

      <div>
        <h3 className="mb-3 text-lg font-bold tracking-tight text-ink sm:text-xl">
          Who needs donated blood?
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WHO_NEEDS_BLOOD.map((patient) => {
            const Icon = PATIENT_ICONS[patient.icon];
            return (
              <Card key={patient.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blood-50 text-blood-600">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink sm:text-base">
                      {patient.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
                      {patient.detail}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
