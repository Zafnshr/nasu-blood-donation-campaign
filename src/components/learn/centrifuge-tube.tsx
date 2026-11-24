"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, RotateCw } from "lucide-react";
import {
  BLOOD_QUICK_FACTS_BY_LOCALE,
  TUBE_LAYERS_BY_LOCALE,
  type TubeLayer,
} from "@/data/blood-basics";
import { UI_COPY } from "@/data/translations";
import { awardStamp } from "@/lib/progress-store";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CentrifugeTube() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].learn.tube;
  const layers = TUBE_LAYERS_BY_LOCALE[locale];
  const quickFacts = BLOOD_QUICK_FACTS_BY_LOCALE[locale];
  const reduced = useReducedMotion();

  const [spun, setSpun] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedId, setSelectedId] = useState<TubeLayer["id"]>("plasma");

  const activeLayer =
    layers.find((layer) => layer.id === selectedId) ?? layers[0];

  function handleSpin() {
    if (spinning) return;
    trackEvent("centrifuge_spin", { first_spin: !spun });
    setSpinning(true);
    window.setTimeout(() => {
      setSpinning(false);
      setSpun(true);
      awardStamp("bloodScholar");
    }, 950);
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl dark:text-[#f5f2f0]">
            {copy.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
            {spun ? copy.spunSub : copy.idleSub}
          </p>
        </div>

        <Button
          onClick={handleSpin}
          disabled={spinning}
          variant={spun ? "secondary" : "primary"}
          size="sm"
        >
          <RotateCw
            aria-hidden="true"
            className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`}
          />
          {spinning
            ? copy.spinningBtn
            : spun
              ? copy.spinAgainBtn
              : copy.spinBtn}
        </Button>
      </div>

      <div className="mt-6 grid items-center gap-6 md:grid-cols-[200px_1fr]">
        <div className="relative flex flex-col items-center">
          {spinning && !reduced && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 rounded-full bg-blood-400/25 blur-2xl"
            />
          )}

          <motion.div
            animate={spinning ? { rotate: [0, 360, 720] } : { rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Tube cap */}
            <div className="h-4 w-14 rounded-t-lg border border-blood-800/30 bg-blood-700 shadow-xs" />

            {/* Tube glass body */}
            <div className="relative flex h-64 w-20 flex-col justify-end overflow-hidden rounded-b-[2.5rem] border-2 border-stone-300 bg-stone-50 p-1 shadow-inner dark:border-stone-600 dark:bg-stone-900">
              {!spun ? (
                <div className="flex h-[90%] w-full items-center justify-center rounded-b-[2rem] bg-gradient-to-b from-blood-500 via-blood-600 to-blood-800">
                  <span className="rotate-180 text-[11px] font-bold tracking-wide text-white/90 uppercase [writing-mode:vertical-rl]">
                    {copy.wholeBlood}
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.4, scaleY: 0.9 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-[92%] w-full flex-col overflow-hidden rounded-b-[2rem]"
                >
                  {/* Plasma ~55% */}
                  <button
                    type="button"
                    onClick={() => setSelectedId("plasma")}
                    aria-label={layers[0].label}
                    aria-pressed={selectedId === "plasma"}
                    className={`relative flex basis-[54%] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-amber-200 to-plasma-400 text-[11px] font-extrabold text-amber-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${selectedId === "plasma"
                      ? "ring-2 ring-inset ring-amber-950/60"
                      : "opacity-90 hover:opacity-100"
                      }`}
                  >
                    {!reduced && (
                      <motion.span
                        aria-hidden="true"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.4,
                          ease: "easeInOut",
                        }}
                        className="absolute top-3 left-3 h-2 w-2 rounded-full bg-white/45"
                      />
                    )}
                    <span dir="ltr">{layers[0].percentage}</span>
                  </button>

                  {/* Buffy coat <1% */}
                  <button
                    type="button"
                    onClick={() => setSelectedId("buffy")}
                    aria-label={layers[1].label}
                    aria-pressed={selectedId === "buffy"}
                    className={`flex min-h-[14px] w-full items-center justify-center bg-violet-300 text-[9px] font-bold text-violet-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${selectedId === "buffy"
                      ? "ring-2 ring-inset ring-violet-950/60"
                      : "opacity-95 hover:opacity-100"
                      }`}
                  >
                    <span dir="ltr">{layers[1].percentage}</span>
                  </button>

                  {/* Red blood cells ~44% */}
                  <button
                    type="button"
                    onClick={() => setSelectedId("rbc")}
                    aria-label={layers[2].label}
                    aria-pressed={selectedId === "rbc"}
                    className={`relative flex basis-[44%] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-blood-600 to-blood-800 text-[11px] font-extrabold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${selectedId === "rbc"
                      ? "ring-2 ring-inset ring-white/80"
                      : "opacity-90 hover:opacity-100"
                      }`}
                  >
                    {!reduced && (
                      <motion.span
                        aria-hidden="true"
                        animate={{ y: [4, -4, 4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.8,
                          ease: "easeInOut",
                        }}
                        className="absolute right-3 bottom-4 h-2.5 w-2.5 rounded-full bg-rose-300/35"
                      />
                    )}
                    <span dir="ltr">{layers[2].percentage}</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          {spun ? (
            <>
              <div
                role="tablist"
                aria-label="Blood layers"
                className="flex flex-wrap gap-2"
              >
                {layers.map((layer) => {
                  const active = layer.id === selectedId;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedId(layer.id)}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 sm:text-sm ${active
                        ? "border-blood-400 bg-blood-50 text-blood-900 shadow-xs dark:border-rose-400/60 dark:bg-blood-950/70 dark:text-rose-100"
                        : "border-stone-200 bg-white text-stone-600 hover:border-blood-200 dark:border-stone-700 dark:bg-[#140d10] dark:text-stone-300"
                        }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: layer.accentHex }}
                      />
                      <span>{layer.label}</span>
                      <span dir="ltr" className="opacity-70">
                        {layer.percentage}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                aria-live="polite"
                className="rounded-2xl border border-stone-200/85 bg-[#f6f3ef] p-4 dark:border-[#2e2629] dark:bg-[#161214]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-ink sm:text-lg dark:text-[#f5f2f0]">
                    {activeLayer.label}
                  </p>
                  <span
                    dir="ltr"
                    className="rounded-full bg-white px-2.5 py-0.5 text-xs font-extrabold text-blood-700 shadow-2xs sm:text-sm dark:bg-blood-950 dark:text-rose-200"
                  >
                    {activeLayer.percentage}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base dark:text-stone-300">
                  {activeLayer.description}
                </p>
              </div>

              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 sm:text-sm dark:text-emerald-400">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                {copy.unlocked}
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-[#f6f3ef] p-5 text-sm leading-relaxed text-stone-700 sm:text-base dark:border-[#3a2f33] dark:bg-[#161214] dark:text-stone-300">
              {copy.idleHint}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 border-t border-stone-200/80 pt-5 sm:grid-cols-3 dark:border-[#2e2629]">
        {quickFacts.map((fact) => (
          <div
            key={fact.value}
            className="rounded-2xl bg-[#f6f3ef] px-4 py-3.5 dark:bg-[#161214]"
          >
            <p className="text-base font-extrabold text-blood-700 dark:text-rose-300">
              {fact.value}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-stone-700 sm:text-sm dark:text-stone-300">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
