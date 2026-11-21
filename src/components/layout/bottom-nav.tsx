"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Gamepad2,
  HeartHandshake,
  House,
  IdCard,
} from "lucide-react";

const TABS = [
  { href: "/", label: "Home", Icon: House },
  { href: "/play", label: "Play", Icon: Gamepad2 },
  { href: "/learn", label: "Learn", Icon: BookOpen },
  { href: "/donate", label: "Donate", Icon: HeartHandshake },
  { href: "/card", label: "Card", Icon: IdCard },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-blood-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 px-1 py-1">
        {TABS.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 ${
                active
                  ? "bg-blood-50 text-blood-700"
                  : "text-stone-500 hover:text-blood-600"
              }`}
            >
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
