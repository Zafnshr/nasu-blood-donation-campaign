"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Gamepad2,
  HeartHandshake,
  House,
  IdCard,
  QrCode,
} from "lucide-react";
import { UI_COPY } from "@/data/translations";
import { usePreferences } from "@/lib/use-preferences";

export function BottomNav() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  const nav = UI_COPY[locale].nav;

  const tabs = [
    { href: "/", label: nav.home, Icon: House },
    { href: "/play", label: nav.play, Icon: Gamepad2 },
    { href: "/learn", label: nav.learn, Icon: BookOpen },
    { href: "/donate", label: nav.donate, Icon: HeartHandshake },
    { href: "/card", label: nav.card, Icon: IdCard },
    { href: "/share", label: nav.share, Icon: QrCode },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-stone-200/90 bg-white/92 pb-[env(safe-area-inset-bottom)] shadow-[0_10px_28px_rgba(28,25,23,0.12)] backdrop-blur-lg transition-colors sm:hidden dark:border-[#2e2629] dark:bg-[#1c181a]/95 dark:shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
    >
      <div className="mx-auto grid grid-cols-6 p-1">
        {tabs.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${active
                ? "text-blood-700 dark:text-rose-200"
                : "text-stone-600 hover:text-blood-600 dark:text-stone-300 dark:hover:text-rose-300"
                }`}
            >
              {active && (
                <motion.span
                  layoutId="mobile-nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-xl bg-blood-50 dark:bg-blood-500/20"
                />
              )}
              <Icon
                aria-hidden="true"
                className={`h-5 w-5 ${active ? "stroke-[2.4]" : "stroke-[1.9]"}`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
