"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { StampToast } from "@/components/ui/stamp-toast";
import { usePreferences } from "@/lib/use-preferences";

export function Providers({ children }: { children: ReactNode }) {
  const { locale, isAr, isDark } = usePreferences();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.lang = locale;
    root.dir = isAr ? "rtl" : "ltr";
  }, [locale, isAr, isDark]);

  return (
    <MotionConfig reducedMotion="user">
      <AnalyticsTracker />
      <StampToast />
      {children}
    </MotionConfig>
  );
}
