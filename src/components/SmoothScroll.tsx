"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { bus, EVENTS } from "@/lib/bus";
import { prefersReducedMotion } from "@/lib/motion";

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export function scrollToTarget(target: string | number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function stopScroll() {
  lenisInstance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function startScroll() {
  lenisInstance?.start();
  document.documentElement.style.overflow = "";
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    if (reduced) {
      document.documentElement.classList.add("rm");
      bus.emit(EVENTS.scrollReady);
      return;
    }

    document.documentElement.classList.add("anim-ready");
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // keep touch native - iOS/Android scrolling must stay trustworthy
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    bus.emit(EVENTS.scrollReady);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
