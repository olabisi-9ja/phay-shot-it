"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { STORY } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

/**
 * A story told the way a print is made (Playbook §03 "Darkroom" + §18):
 * each frame surfaces out of underexposure while you scroll - pinned,
 * scrubbed, one caption at a time. Reduced-motion readers get a
 * calm vertical sequence of the same frames, fully captioned.
 */
export default function Stories() {
  const rootRef = useRef<HTMLElement>(null);
  const darkroomRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>(".story__frame");
      const capLines = gsap.utils.toArray<HTMLElement>(".story__cap-item");
      const steps = gsap.utils.toArray<HTMLElement>(".story__step-item");
      const counter = rootRef.current?.querySelector<HTMLElement>(".story__counter b");
      const drLabel = darkroomRef.current?.querySelector<HTMLElement>(".lbl-dev");
      const n = frames.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${n * 88}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.floor(self.progress * n));
            if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
            capLines.forEach((cap, i) => {
              cap.style.opacity = i === idx ? "1" : "0";
            });
            steps.forEach((s, i) => {
              s.style.opacity = i === idx ? "1" : "0";
            });
            const fixed = self.progress > 0.985;
            darkroomRef.current?.classList.toggle("is-fixed", fixed);
            if (drLabel) drLabel.textContent = fixed ? "FIXED" : "DEVELOPING";
          },
        },
      });

      frames.forEach((frame, i) => {
        const pos = i * 1.0;
        // the photograph develops out of the tray
        tl.fromTo(
          frame,
          {
            autoAlpha: 0,
            filter: "brightness(0.16) contrast(0.82) saturate(0.35) blur(10px)",
            scale: 1.06,
          },
          {
            autoAlpha: 1,
            filter: "brightness(1) contrast(1) saturate(1) blur(0px)",
            scale: 1,
            ease: "none",
            duration: 0.62,
          },
          pos
        );
        if (i < n - 1) {
          tl.to(frame, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, pos + 0.72);
        }
      });
      // let the final print breathe before release
      tl.to({}, { duration: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={rootRef} aria-label={`Story - ${STORY.title}`}>
      <div className="story__stage">
        {STORY.frames.map((frame, i) => (
          <figure className="story__frame" key={frame.photo.id}>
            <Photo photo={frame.photo} sizes="100vw" />
            <div className="shade" aria-hidden="true" />
            {/* visible caption in the reduced-motion vertical sequence */}
            <figcaption className="story__framecap" aria-hidden={false}>
              <span className="story__line" style={{ fontSize: "clamp(18px,4vw,26px)" }}>
                {frame.line}
              </span>
            </figcaption>
          </figure>
        ))}

        <div className="story__hud">
          <span className="u-mono u-kicker" style={{ color: "rgba(255,255,255,0.75)" }}>
            06 - STORY
          </span>
          <span className="u-mono story__counter" aria-live="polite">
            <span className="story__counter-pre">{STORY.kicker} - </span>FRAME <b>01</b>/0{STORY.frames.length}
          </span>
        </div>

        <div className="story__cap" aria-hidden="true">
          <div style={{ position: "relative", minHeight: "3.2em", flex: "1 1 auto", maxWidth: 640 }}>
            {STORY.frames.map((frame, i) => (
              <p
                key={frame.photo.id}
                className="story__line story__cap-item"
                style={{ position: i === 0 ? "relative" : "absolute", inset: 0, opacity: i === 0 ? 1 : 0 }}
              >
                {frame.line}
              </p>
            ))}
          </div>
          <div style={{ position: "relative", minWidth: 190, minHeight: "2.6em", textAlign: "right" }}>
            {STORY.frames.map((frame, i) => (
              <p
                key={frame.photo.id}
                className="story__step story__step-item"
                style={{ position: i === 0 ? "relative" : "absolute", inset: 0, opacity: i === 0 ? 1 : 0 }}
              >
                {String(i + 1).padStart(2, "0")} - {frame.step} - {frame.time}
              </p>
            ))}
          </div>
        </div>

        <div className="story__darkroom" ref={darkroomRef} aria-hidden="true">
          <span className="blip" />
          <span className="lbl-dev">DEVELOPING</span>
        </div>
      </div>
    </section>
  );
}
