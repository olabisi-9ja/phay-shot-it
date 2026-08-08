"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PHOTOS } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo, { ExifChips } from "@/components/Photo";
import { useLightbox } from "@/components/Lightbox";

const PHOTO = PHOTOS.shrine;

/**
 * The emotional peak (Playbook §33): one photograph owns the whole viewport,
 * pinned while the visitor scrolls through its slow push-in.
 */
export default function Featured() {
  const rootRef = useRef<HTMLElement>(null);
  const { open } = useLightbox();

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=135%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
      // slow push into the crowd
      tl.fromTo(
        ".peak__media img",
        { scale: 1.16 },
        { scale: 1.02, ease: "none", duration: 1 },
        0
      );
      tl.fromTo(
        ".peak__cap",
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.34 },
        0.3
      );
      tl.fromTo(
        ".peak__hud",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        0.12
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="peak" id="peak" ref={rootRef} aria-label={`Featured photograph — ${PHOTO.title}`}>
      <div
        className="peak__stage"
        onClick={() => open([PHOTO], 0, "PEAK FRAME")}
        data-cursor="VIEW"
        role="button"
        tabIndex={0}
        aria-label={`View photograph: ${PHOTO.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open([PHOTO], 0, "PEAK FRAME");
          }
        }}
      >
        <div className="peak__media">
          <Photo photo={PHOTO} sizes="100vw" />
        </div>
        <div className="peak__scrim" aria-hidden="true" />

        <div className="peak__hud u-mono">
          <span>03 — PEAK FRAME</span>
          <span className="peak__live">FIELD RECORDING</span>
          <span>01 / 08</span>
        </div>

        <div className="peak__cap">
          <div>
            <p className="u-mono" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>
              {PHOTO.location} — {PHOTO.date}
            </p>
            <h2 className="peak__title">{PHOTO.title}</h2>
            <p className="peak__sub serif-i">the Shrine, two fourteen in the morning</p>
          </div>
          <div className="peak__chips">
            <ExifChips photo={PHOTO} />
          </div>
        </div>
      </div>
    </section>
  );
}
