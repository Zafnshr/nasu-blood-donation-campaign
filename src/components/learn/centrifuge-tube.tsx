"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCw } from "lucide-react";
import {
  BLOOD_QUICK_FACTS,
  TUBE_LAYERS,
  type TubeLayer,
} from "@/data/blood-basics";
import { awardStamp } from "@/lib/progress-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CentrifugeTube() {
  const [spun, setSpun] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedId, setSelectedId] = useState<TubeLayer["id"]>("plasma");

  const activeLayer =
    TUBE_LAYERS.find((layer) => layer.id === selectedId) ?? TUBE_LAYERS[0];

  function handleSpin() {
    if (spinning) return;
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
          <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            What&apos;s inside your blood?
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {spun
              ? "Separated! Tap any layer to see what it does."
              : "Whole blood looks solid red until a centrifuge spins it apart."}
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
            ? "Spinning..."
            : spun
              ? "Spin again 🌀"
              : "Spin the tube 🌀"}
        </Button>
      </div>

      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[150px_1fr]">
        <div className="flex flex-col items-center">
          <motion.div
            animate={
              spinning
                ? { rotate: [0, 360, 720] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Tube cap */}
            <div className="h-4 w-14 rounded-t-lg border border-blood-800/30 bg-blood-700 shadow-xs" />

            {/* Tube glass body */}
            <div className="relative flex h-64 w-20 flex-col justify-end overflow-hidden rounded-b-[2.5rem] border-2 border-stone-300 bg-stone-50 p-1 shadow-inner">
              {!spun ? (
                <div className="flex h-[90%] w-full items-center justify-center rounded-b-[2rem] bg-gradient-to-b from-blood-500 via-blood-600 to-blood-800">
                  <span className="text-[11px] font-bold tracking-wide text-white/90 uppercase [writing-mode:vertical-rl] rotate-180">
                    Whole blood
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
                    aria-label="Inspect Plasma layer (55%)"
                    aria-pressed={selectedId === "plasma"}
                    className={`flex basis-[54%] w-full items-center justify-center bg-gradient-to-b from-amber-200 to-plasma-400 text-[11px] font-extrabold text-amber-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      selectedId === "plasma"
                        ? "ring-2 ring-inset ring-amber-950/60"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    55%
                  </button>

                  {/* Buffy coat <1% (rendered at least 12px tall so clearly visible) */}
                  <button
                    type="button"
                    onClick={() => setSelectedId("buffy")}
                    aria-label="Inspect White cells and platelets layer (less than 1%)"
                    aria-pressed={selectedId === "buffy"}
                    className={`flex min-h-[12px] w-full items-center justify-center bg-violet-300 text-[9px] font-bold text-violet-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      selectedId === "buffy"
                        ? "ring-2 ring-inset ring-violet-950/60"
                        : "opacity-95 hover:opacity-100"
                    }`}
                  >
                    &lt;1%
                  </button>

                  {/* Red blood cells ~44% */}
                  <button
                    type="button"
                    onClick={() => setSelectedId("rbc")}
                    aria-label="Inspect Red blood cells layer (~44%)"
                    aria-pressed={selectedId === "rbc"}
                    className={`flex basis-[44%] w-full items-center justify-center bg-gradient-to-b from-blood-600 to-blood-800 text-[11px] font-extrabold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      selectedId === "rbc"
                        ? "ring-2 ring-inset ring-white/80"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    ~44%
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
                {TUBE_LAYERS.map((layer) => {
                  const active = layer.id === selectedId;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedId(layer.id)}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 sm:text-sm ${
                        active
                          ? "border-blood-400 bg-blood-50 text-blood-900 shadow-xs"
                          : "border-stone-200 bg-white text-stone-600 hover:border-blood-200"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: layer.accentHex }}
                      />
                      <span>{layer.label}</span>
                      <span className="opacity-70">{layer.percentage}</span>
                    </button>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                aria-live="polite"
                className="rounded-2xl border border-blood-100 bg-cream p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-ink">
                    {activeLayer.label}
                  </p>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-extrabold text-blood-700 shadow-2xs">
                    {activeLayer.percentage}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                  {activeLayer.description}
                </p>
              </div>

              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                Blood Scholar stamp unlocked!
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-blood-200 bg-cream/80 p-5 text-sm leading-relaxed text-stone-600">
              Press <strong className="text-ink">Spin the tube</strong> to watch
              centrifuge gravity split whole blood into plasma, white cells &amp;
              platelets, and red blood cells.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 border-t border-blood-100 pt-5 sm:grid-cols-3">
        {BLOOD_QUICK_FACTS.map((fact) => (
          <div
            key={fact.value}
            className="rounded-2xl bg-blood-50/60 px-4 py-3"
          >
            <p className="text-sm font-extrabold text-blood-700">{fact.value}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-700">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
