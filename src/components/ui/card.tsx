import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-stone-200/85 bg-white p-5 shadow-[0_6px_24px_rgba(28,25,23,0.05)] transition-colors sm:p-6 dark:border-[#2e2629] dark:bg-[#1c181a] dark:shadow-[0_10px_30px_rgba(0,0,0,0.38)] ${className}`}
    >
      {children}
    </div>
  );
}
