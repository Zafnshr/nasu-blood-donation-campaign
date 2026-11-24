import { getPreferencesSnapshot } from "@/lib/preferences-store";

const VISITOR_KEY = "nasu-vid-v1";
const SESSION_KEY = "nasu-sid-v1";

function createRandomId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next = createRandomId();
    window.localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return "";
  }
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const next = createRandomId();
    window.sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return "";
  }
}

export type TrackMeta = Record<string, string | number | boolean | null>;

export function trackEvent(event: string, meta?: TrackMeta): void {
  if (typeof window === "undefined") return;
  try {
    const { locale, theme } = getPreferencesSnapshot();
    const payload = JSON.stringify({
      event,
      path: window.location.pathname || "/",
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      locale,
      theme,
      referrer: document.referrer ? document.referrer.slice(0, 200) : "",
      meta: meta ?? {},
    });

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const sent = navigator.sendBeacon(
        "/api/track",
        new Blob([payload], { type: "application/json" })
      );
      if (sent) return;
    }

    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // Never impact user interactions on analytics failures
    });
  } catch {
    // Ignore client storage / serialization errors
  }
}
