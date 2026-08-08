"use client";

import { useEffect, useRef } from "react";
import { bus, EVENTS } from "@/lib/bus";
import { prefersReducedMotion } from "@/lib/motion";

const MIN_TIME = 1250; // never artificially long — the curtain lifts when ready (Playbook §26)
const PRELOADS = [
  "/images/lagos-rain-neon-nocturne-1376w.webp",
  "/images/lagos-rain-neon-nocturne-800w.webp",
  "/images/lagos-shrine-concert-hands-1376w.webp",
  "/images/lagos-studio-red-portrait-928w.webp",
];

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (prefersReducedMotion()) {
      html.classList.add("is-loaded");
      bus.emit(EVENTS.loaded);
      rootRef.current?.remove();
      return;
    }

    const start = performance.now();
    let loadedCount = 0;
    let display = 0;
    let raf = 0;
    let finished = false;

    PRELOADS.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
      };
      img.src = src;
    });
    let fontsReady = false;
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });

    const finish = () => {
      if (finished) return;
      finished = true;
      if (countRef.current) countRef.current.textContent = "100";
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      window.setTimeout(() => {
        rootRef.current?.classList.add("is-done");
        html.classList.add("is-loaded");
        bus.emit(EVENTS.loaded);
        window.setTimeout(() => rootRef.current?.remove(), 1400);
      }, 300);
    };

    const tick = () => {
      const assetProgress = loadedCount / PRELOADS.length;
      const elapsed = performance.now() - start;
      const timeProgress = Math.min(1, elapsed / MIN_TIME);
      const target = Math.min(assetProgress, timeProgress, fontsReady || elapsed > 2600 ? 1 : 0.94);
      display += (target * 100 - display) * 0.09 + 0.12;
      display = Math.min(99.6, display);
      const shown = Math.floor(display);
      if (countRef.current) countRef.current.textContent = String(shown).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${display / 100})`;
      if (frameRef.current)
        frameRef.current.textContent = `FRAME ${String(shown).padStart(3, "0")}`;
      if (display >= 99 && assetProgress >= 1 && elapsed >= MIN_TIME && (fontsReady || elapsed > 2600)) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // hard fail-safe — never trap the visitor behind the curtain
    const failsafe = window.setTimeout(finish, 7000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div className="loader" ref={rootRef} role="status" aria-label="Loading PHAY SHOT IT">
      <div className="loader__panel loader__panel--top" aria-hidden="true" />
      <div className="loader__panel loader__panel--bottom" aria-hidden="true" />
      <div className="loader__inner">
        <div className="loader__row">
          <span className="loader__brand">PHAY SHOT IT</span>
          <span className="u-mono loader__hint">A PHOTOGRAPHIC MEMORY</span>
        </div>
        <div className="loader__row" style={{ alignItems: "flex-end" }}>
          <span className="u-mono loader__hint">
            <span ref={frameRef}>FRAME 000</span>
            {" — "}LAGOS / EVERYWHERE
          </span>
          <span className="loader__count" ref={countRef}>
            000
          </span>
        </div>
        <div className="loader__bar" aria-hidden="true">
          <i ref={barRef} />
        </div>
      </div>
    </div>
  );
}
