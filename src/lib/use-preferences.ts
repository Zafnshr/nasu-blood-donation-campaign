"use client";

import { useSyncExternalStore } from "react";
import {
  getPreferencesServerSnapshot,
  getPreferencesSnapshot,
  subscribePreferences,
} from "@/lib/preferences-store";
import type { Locale, ThemeMode } from "@/types";

export interface UsePreferencesResult {
  theme: ThemeMode;
  locale: Locale;
  isAr: boolean;
  isDark: boolean;
}

export function usePreferences(): UsePreferencesResult {
  const prefs = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    getPreferencesServerSnapshot
  );

  return {
    theme: prefs.theme,
    locale: prefs.locale,
    isAr: prefs.locale === "ar",
    isDark: prefs.theme === "dark",
  };
}
