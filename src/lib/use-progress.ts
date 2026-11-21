"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/progress-store";
import type { Progress } from "@/types";

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

function getOriginSnapshot(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

function getOriginServerSnapshot(): string {
  return "";
}

export function useOrigin(): string {
  return useSyncExternalStore(
    noopSubscribe,
    getOriginSnapshot,
    getOriginServerSnapshot
  );
}
