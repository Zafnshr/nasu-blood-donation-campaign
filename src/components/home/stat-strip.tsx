"use client";

import { motion } from "framer-motion";
import { HOME_STATS_BY_LOCALE } from "@/data/campaign";
import { usePreferences } from "@/lib/use-preferences";

export function StatStrip() {
  const { locale } = usePreferences();
  const stats = HOME_STATS_BY_LOCALE[locale];

  return (
    <section aria-label="Key blood donation facts" className="mt-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.3,
              delay: idx * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-stone-200/85 bg-white px-4 py-4 shadow-[0_4px_18px_rgba(28,25,23,0.04)] transition-colors dark:border-[#2e2629] dark:bg-[#1c181a] dark:shadow-[0_6px_22px_rgba(0,0,0,0.35)]"
          >
            <p className="text-xl font-extrabold tracking-tight text-blood-600 sm:text-2xl dark:text-rose-400">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-stone-700 dark:text-stone-300">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
