"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Heart } from "lucide-react";
import { UI_COPY } from "@/data/translations";
import { trackEvent } from "@/lib/track";
import { usePreferences } from "@/lib/use-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";

export function HeroDrop() {
  const { locale } = usePreferences();
  const copy = UI_COPY[locale].home;
  const reduced = useReducedMotion();
  const [pulseCount, setPulseCount] = useState(0);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 22,
  });

  function handlePointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60 lg:h-64 lg:w-64"
        style={{ perspective: "900px" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-full bg-blood-200/55 blur-3xl dark:bg-blood-600/25"
        />
        <div
          aria-hidden="true"
          className="animate-pulse-ring pointer-events-none absolute inset-6 rounded-full border border-blood-400/40 dark:border-rose-400/30"
        />

        {/* Expanding concentric ripple rings on tap */}
        <AnimatePresence>
          {pulseCount > 0 && !reduced && (
            <motion.span
              key={pulseCount}
              aria-hidden="true"
              initial={{ scale: 0.72, opacity: 0.7 }}
              animate={{ scale: 1.45, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-4 rounded-full border-2 border-blood-500/70 dark:border-rose-400/70"
            />
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => {
            if (pulseCount === 0) {
              trackEvent("hero_drop_tap", { pulse_count: 1 });
            }
            setPulseCount((c) => c + 1);
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          whileTap={reduced ? undefined : { scale: 0.92 }}
          animate={
            pulseCount > 0 && !reduced
              ? { scale: [1, 1.07, 1] }
              : undefined
          }
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? undefined : { rotateX, rotateY }}
          aria-label={copy.tapDrop}
          className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1a1114]"
        >
          <BrandLogo className="animate-heartbeat h-full w-full drop-shadow-[0_20px_32px_rgba(163,22,47,0.32)]" />
        </motion.button>
      </div>

      <motion.span
        key={pulseCount}
        initial={reduced ? undefined : { scale: 0.94, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-blood-200/80 bg-blood-50/90 px-3 py-1 text-xs font-bold text-blood-700 dark:border-blood-500/30 dark:bg-blood-950/70 dark:text-rose-200"
      >
        <Heart
          aria-hidden="true"
          className={`h-3 w-3 ${
            pulseCount > 0 ? "fill-blood-600 text-blood-600 dark:fill-rose-400 dark:text-rose-400" : ""
          }`}
        />
        <span>
          {pulseCount > 0 ? copy.pulseSynced(pulseCount) : copy.tapDrop}
        </span>
      </motion.span>
    </div>
  );
}
