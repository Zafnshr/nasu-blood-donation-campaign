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
import { usePreferences } from "@/lib/use-preferences";

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
        className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52 lg:h-56 lg:w-56"
        style={{ perspective: "900px" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-4 rounded-full bg-blood-200/50 blur-2xl dark:bg-blood-600/25"
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
          onClick={() => setPulseCount((c) => c + 1)}
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
          <svg
            viewBox="0 0 200 220"
            className="animate-heartbeat h-full w-full drop-shadow-[0_18px_28px_rgba(190,18,60,0.28)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="hero-drop-grad"
                x1="40"
                y1="20"
                x2="160"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="45%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
            </defs>

            <path
              d="M100 14C100 14 34 86.5 34 136a66 66 0 0 0 132 0C166 86.5 100 14 100 14Z"
              fill="url(#hero-drop-grad)"
            />

            <path
              d="M62 128c0 22 14.5 40.5 34 45.5"
              fill="none"
              stroke="#ffe4e6"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.35"
            />

            <path
              d="M42 136 H72 L83 114 L96 158 L110 96 L123 146 L132 136 H158"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
            />
          </svg>
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
