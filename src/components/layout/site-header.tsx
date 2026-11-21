"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Globe, Moon, Sun } from "lucide-react";
import { CAMPAIGN_INFO_BY_LOCALE } from "@/data/campaign";
import { UI_COPY } from "@/data/translations";
import { toggleLocale, toggleTheme } from "@/lib/preferences-store";
import { usePreferences } from "@/lib/use-preferences";
import { BrandLogo } from "@/components/ui/brand-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, isDark } = usePreferences();
  const copy = UI_COPY[locale];
  const info = CAMPAIGN_INFO_BY_LOCALE[locale];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { href: "/", label: copy.nav.home },
    { href: "/play", label: copy.nav.play },
    { href: "/learn", label: copy.nav.learn },
    { href: "/donate", label: copy.nav.donate },
    { href: "/card", label: copy.nav.card },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-cream/90 backdrop-blur-md transition-colors duration-200 dark:border-[#2e2629] dark:bg-[#121011]/90">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4 sm:h-[68px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl font-bold tracking-tight text-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:text-[#f5f2f0] dark:focus-visible:ring-offset-[#121011]"
        >
          <BrandLogo className="h-11 w-11 shrink-0 transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12" />
          <span
            aria-hidden="true"
            className="h-7 w-[1.5px] shrink-0 bg-stone-300/90 dark:bg-[#3a2f33]"
          />
          <div className="min-w-0 text-start">
            <span className="block truncate text-base font-extrabold leading-tight sm:text-lg">
              {info.brand}
            </span>
            <span className="hidden truncate text-[11px] font-semibold leading-tight text-stone-500 lg:block dark:text-stone-400">
              {info.university}
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121011] ${
                    active
                      ? "text-blood-700 dark:text-rose-200"
                      : "text-stone-700 hover:bg-blood-50/70 hover:text-blood-700 dark:text-stone-300 dark:hover:bg-blood-950/50 dark:hover:text-rose-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="header-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-xl bg-blood-100/80 dark:bg-blood-500/20"
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Compact tablet nav (640px-767px) */}
          <nav
            aria-label="Tablet navigation"
            className="hidden items-center gap-0.5 sm:flex md:hidden"
          >
            {navLinks.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-xl px-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-blood-100/80 text-blood-700 dark:bg-blood-500/20 dark:text-rose-200"
                      : "text-stone-700 hover:text-blood-700 dark:text-stone-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label={copy.nav.switchLangAria}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-bold text-ink shadow-2xs transition-colors hover:border-blood-400 hover:bg-blood-50 active:scale-[0.97] sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#1c181a] dark:text-[#f5f2f0] dark:hover:bg-blood-950/60"
          >
            <Globe
              aria-hidden="true"
              className="h-4 w-4 text-blood-600 dark:text-rose-400"
            />
            <span>{copy.nav.switchToOtherLang}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? copy.nav.toLightAria : copy.nav.toDarkAria}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-stone-200 bg-white text-ink shadow-2xs transition-colors hover:border-blood-400 hover:bg-blood-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 dark:border-[#2e2629] dark:bg-[#1c181a] dark:text-amber-300 dark:hover:bg-blood-950/60"
          >
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Sun aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Moon aria-hidden="true" className="h-4 w-4 text-blood-700" />
              )}
            </motion.span>
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2.5px] w-full origin-left bg-gradient-to-r from-blood-500 via-blood-600 to-plasma-400 rtl:origin-right"
      />
    </header>
  );
}
