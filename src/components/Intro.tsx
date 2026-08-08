"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";

export default function Intro() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".intro__line > span").forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.15,
            ease: "power4.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: line.closest(".intro__line"), start: "top 88%" },
          }
        );
      });
      gsap.fromTo(
        ".intro__aside, .intro__stats",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".intro__grid", start: "top 82%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--dark intro" id="intro" ref={rootRef} aria-label="Introduction">
      <div className="sec__head">
        <span className="u-kicker">02 — THE IDEA</span>
        <span className="u-mono">MANIFESTO, BRIEFLY</span>
      </div>

      <h2 className="intro__lines">
        <span className="intro__line"><span className="intro__big">Photographs</span></span>
        <span className="intro__line"><span className="intro__big">of people, places</span></span>
        <span className="intro__line"><span className="intro__big--serif">&amp; time.</span></span>
      </h2>

      <div className="intro__grid">
        <div aria-hidden="true" />
        <div>
          <p className="intro__aside">
            I work on film because film requires <span className="serif-i">faith</span> — you
            compose, you expose, and you let go. This site is built the same way: not a feed
            to scroll past, but a darkroom, an archive and a walk home at midnight. Every frame
            here is an object with a history — its light, its coordinates, its second of time.
          </p>
          <ul className="intro__stats" role="list">
            <li><span>YEARS SHOOTING</span><b>08</b></li>
            <li><span>COUNTRIES</span><b>14</b></li>
            <li><span>ROLLS DEVELOPED</span><b>316 +</b></li>
            <li><span>CAMERAS LOST TO RAIN</span><b>02</b></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
