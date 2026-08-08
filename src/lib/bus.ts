/** Microscopic pub/sub for cross-component choreography. */
type Handler = (payload?: unknown) => void;

const registry = new Map<string, Set<Handler>>();

export const bus = {
  on(event: string, fn: Handler) {
    if (!registry.has(event)) registry.set(event, new Set());
    registry.get(event)!.add(fn);
    return () => registry.get(event)?.delete(fn);
  },
  emit(event: string, payload?: unknown) {
    registry.get(event)?.forEach((fn) => fn(payload));
  },
};

export const EVENTS = {
  /** fired once the loader's shutter has opened */
  loaded: "psi:loaded",
  /** lenis instance became available */
  scrollReady: "psi:scroll-ready",
} as const;
