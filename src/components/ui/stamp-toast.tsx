"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getStampsMeta } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { subscribeStampUnlock } from "@/lib/progress-store";
import { usePreferences } from "@/lib/use-preferences";
import type { StampKey } from "@/types";
import { BrandLogo } from "@/components/ui/brand-logo";

export function StampToast() {
  const [unlockedKey, setUnlockedKey] = useState<StampKey | null>(null);
  const { locale } = usePreferences();

  useEffect(() => {
    let timer: number | undefined;
    const unsub = subscribeStampUnlock((key) => {
      setUnlockedKey(key);
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        setUnlockedKey(null);
      }, 3200);
    });

    return () => {
      unsub();
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const stamps = getStampsMeta(locale);
  const meta = unlockedKey ? stamps.find((s) => s.key === unlockedKey) : null;
  const copy = UI_COPY[locale];

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {meta && (
          <motion.div
            key={meta.key}
            initial={{ opacity: 0, y: -18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="flex items-center gap-2.5 rounded-full border border-blood-500/40 bg-blood-950/95 px-4 py-2 text-white shadow-[0_14px_34px_rgba(76,5,25,0.28)] backdrop-blur-md dark:border-rose-400/35 dark:bg-[#221017]/95"
          >
            <BrandLogo variant="light" className="h-8 w-8 shrink-0" />
            <div className="pe-1 text-start">
              <p className="text-[10px] font-bold tracking-wider text-rose-200 uppercase">
                {copy.toast.stampUnlocked}
              </p>
              <p className="text-xs font-extrabold leading-tight text-white sm:text-sm">
                {meta.label}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
