"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CAMPAIGN_INFO } from "@/data/campaign";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/learn", label: "Learn" },
  { href: "/donate", label: "Donate" },
  { href: "/card", label: "Card" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-blood-100/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-xl pr-2 font-bold tracking-tight text-ink transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blood-600 to-blood-700 shadow-sm shadow-blood-600/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 text-white"
              fill="currentColor"
            >
              <path d="M12 2.5C12 2.5 5 10.4 5 15.2a7 7 0 0 0 14 0C19 10.4 12 2.5 12 2.5Z" />
            </svg>
          </span>
          <span className="text-sm sm:text-base">{CAMPAIGN_INFO.brand}</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 sm:flex"
        >
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-xl px-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2 ${
                  active
                    ? "bg-blood-100/90 text-blood-700"
                    : "text-stone-600 hover:bg-blood-50 hover:text-blood-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
