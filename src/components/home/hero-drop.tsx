"use client";

import { motion } from "framer-motion";

export function HeroDrop() {
  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56">
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-full bg-blood-200/45 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full items-center justify-center"
      >
        <svg
          viewBox="0 0 200 220"
          className="animate-heartbeat h-full w-full drop-shadow-[0_18px_28px_rgba(190,18,60,0.25)]"
          role="img"
          aria-label="Pulsing crimson blood drop with heartbeat line"
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
      </motion.div>
    </div>
  );
}
