import type { Progress, StampKey } from "@/types";

const STORAGE_KEY = "nasu-blood-progress-v1";

export const DEFAULT_PROGRESS: Progress = {
  stamps: {
    mythBuster: false,
    bloodScholar: false,
    typeExpert: false,
    donorReady: false,
  },
  bestScore: null,
  card: null,
};

const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined = undefined;
let cachedSnapshot: Progress = DEFAULT_PROGRESS;
let storageBound = false;

function parseProgress(raw: string | null): Progress {
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      stamps: {
        mythBuster: Boolean(parsed.stamps?.mythBuster),
        bloodScholar: Boolean(parsed.stamps?.bloodScholar),
        typeExpert: Boolean(parsed.stamps?.typeExpert),
        donorReady: Boolean(parsed.stamps?.donorReady),
      },
      bestScore:
        typeof parsed.bestScore === "number" ? parsed.bestScore : null,
      card: parsed.card && typeof parsed.card.name === "string" ? parsed.card : null,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  cachedRaw = undefined;
  notify();
}

export function subscribe(cb: () => void): () => void {
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

export function getSnapshot(): Progress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedSnapshot;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = parseProgress(raw);
  }
  return cachedSnapshot;
}

export function getServerSnapshot(): Progress {
  return DEFAULT_PROGRESS;
}

export function updateProgress(updater: (prev: Progress) => Progress): void {
  const current = getSnapshot();
  const next = updater(current);
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedSnapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, raw);
    } catch {
      // Ignore quota / privacy mode errors; in-memory snapshot still updates
    }
  }
  notify();
}

export function awardStamp(key: StampKey): void {
  updateProgress((prev) => {
    if (prev.stamps[key]) return prev;
    return {
      ...prev,
      stamps: {
        ...prev.stamps,
        [key]: true,
      },
    };
  });
}

export function countStamps(progress: Progress): number {
  return Object.values(progress.stamps).filter(Boolean).length;
}
