import type { Locale, Preferences, ThemeMode } from "@/types";
import { trackEvent } from "@/lib/track";

const PREFS_KEY = "nasu-blood-prefs-v1";

export const DEFAULT_PREFERENCES: Preferences = {
  theme: "light",
  locale: "ar",
};

const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined = undefined;
let cachedSnapshot: Preferences = DEFAULT_PREFERENCES;
let storageBound = false;

function parsePreferences(raw: string | null): Preferences {
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return {
      theme: parsed.theme === "dark" ? "dark" : "light",
      locale: parsed.locale === "en" ? "en" : "ar",
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== PREFS_KEY) return;
  cachedRaw = undefined;
  notify();
}

export function subscribePreferences(cb: () => void): () => void {
  listeners.add(cb);
  if (typeof window !== "undefined" && !storageBound) {
    window.addEventListener("storage", handleStorage);
    storageBound = true;
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && typeof window !== "undefined" && storageBound) {
      window.removeEventListener("storage", handleStorage);
      storageBound = false;
    }
  };
}

export function getPreferencesSnapshot(): Preferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PREFS_KEY);
  } catch {
    return cachedSnapshot;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = parsePreferences(raw);
  }
  return cachedSnapshot;
}

export function getPreferencesServerSnapshot(): Preferences {
  return DEFAULT_PREFERENCES;
}

function writePreferences(next: Preferences): void {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedSnapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PREFS_KEY, raw);
    } catch {
      // Ignore quota / privacy mode errors
    }
  }
  notify();
}

export function setTheme(theme: ThemeMode): void {
  const cur = getPreferencesSnapshot();
  if (cur.theme === theme) return;
  writePreferences({ ...cur, theme });
}

export function toggleTheme(): void {
  const cur = getPreferencesSnapshot();
  const nextTheme: ThemeMode = cur.theme === "dark" ? "light" : "dark";
  writePreferences({
    ...cur,
    theme: nextTheme,
  });
  trackEvent("theme_toggle", { to: nextTheme });
}

export function setLocale(locale: Locale): void {
  const cur = getPreferencesSnapshot();
  if (cur.locale === locale) return;
  writePreferences({ ...cur, locale });
}

export function toggleLocale(): void {
  const cur = getPreferencesSnapshot();
  const nextLocale: Locale = cur.locale === "ar" ? "en" : "ar";
  writePreferences({
    ...cur,
    locale: nextLocale,
  });
  trackEvent("locale_toggle", { to: nextLocale });
}
