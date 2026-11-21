"use client";

import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#e11d48", "#fbbf24", "#10b981", "#f43f5e", "#a78bfa", "#fb7185"];

const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180);
  const spread = 80 + ((i * 29) % 160);
  const dx = Math.round(Math.cos(angle) * spread);
  const dy = Math.round(Math.sin(angle) * spread - 60);
  const rotate = (i % 2 === 0 ? 1 : -1) * (180 + ((i * 47) % 360));
  const delay = (i % 8) * 0.03;
  const size = 6 + (i % 5);
  return {
    id: i,
    dx,
    dy,
    rotate,
    delay,
    size,
    color: COLORS[i % COLORS.length],
    isCircle: i % 3 === 0,
  };
});

export function Confetti({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  if (!active || reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
            animate={{
              x: p.dx,
              y: p.dy + 220,
              scale: [0.6, 1.1, 0.9],
              opacity: [1, 1, 0],
              rotate: p.rotate,
            }}
            transition={{
              duration: 1.5,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.isCircle ? p.size : p.size * 1.4,
              backgroundColor: p.color,
              borderRadius: p.isCircle ? "9999px" : "2px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
