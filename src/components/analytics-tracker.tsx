"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  countStamps,
  getSnapshot,
  subscribeStampUnlock,
} from "@/lib/progress-store";
import { trackEvent } from "@/lib/track";

const SESSION_STARTED_KEY = "nasu-session-started-v1";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const enteredAtRef = useRef<number>(0);
  const activePathRef = useRef<string>(pathname);

  // Fire session_start once per browser session and subscribe to stamp unlocks
  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(SESSION_STARTED_KEY)) {
        window.sessionStorage.setItem(SESSION_STARTED_KEY, "1");
        trackEvent("session_start", {
          landing_path: window.location.pathname || "/",
          screen_w: window.innerWidth,
          screen_h: window.innerHeight,
        });
      }
    } catch {
      // Ignore storage failures
    }

    const unsub = subscribeStampUnlock((stamp) => {
      trackEvent("stamp_unlocked", {
        stamp,
        total_stamps: countStamps(getSnapshot()),
      });
    });

    return unsub;
  }, []);

  // Track every route page_view (deduped for Strict Mode re-mounts)
  useEffect(() => {
    activePathRef.current = pathname;
    if (lastTrackedPathRef.current === pathname) return;
    lastTrackedPathRef.current = pathname;
    enteredAtRef.current = Date.now();
    trackEvent("page_view", { path: pathname });
  }, [pathname]);

  // Track page_leave duration on tab hide / page unload
  useEffect(() => {
    function flushLeave() {
      if (enteredAtRef.current === 0) return;
      const elapsedSec = Math.round((Date.now() - enteredAtRef.current) / 1000);
      if (elapsedSec >= 1) {
        trackEvent("page_leave", {
          path: activePathRef.current,
          duration_sec: elapsedSec,
        });
        enteredAtRef.current = Date.now();
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        flushLeave();
      } else if (document.visibilityState === "visible") {
        enteredAtRef.current = Date.now();
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flushLeave);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flushLeave);
    };
  }, []);

  return null;
}
