import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-blood-100/70 bg-white p-5 shadow-[0_8px_30px_rgba(76,5,25,0.06)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
