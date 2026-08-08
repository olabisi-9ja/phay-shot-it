/**
 * The motion language of the site (Playbook §16).
 * Images are slow, type is fast, transitions are decisive,
 * micro-interactions are instant, ambience is glacial.
 */
export const MOTION = {
  image: { dur: 1.1 },
  type: { dur: 0.6 },
  transition: { dur: 0.8 },
  micro: { dur: 0.22 },
  ambient: { dur: 14 },
} as const;

export const EASE = {
  /** weighted expo */
  out: "expo.out",
  /** editorial ease */
  io: "power3.inOut",
  /** soft settle */
  soft: "power2.out",
  /** snap */
  back: "back.out(1.4)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
