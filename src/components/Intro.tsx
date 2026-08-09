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
        <span className="u-kicker">02 - THE IDEA</span>
        <span className="u-mono">MANIFESTO, BRIEFLY</span>
      </div>

      <h2 className="intro__lines">
        <span className="intro__line"><span className="intro__big">Portraits,</span></span>
        <span className="intro__line"><span className="intro__big">moments, culture</span></span>
        <span className="intro__line"><span className="intro__big--serif">&amp; style.</span></span>
      </h2>

      <div className="intro__grid">
        <div aria-hidden="true" />
        <div>
          <p className="intro__aside">
            I shoot because every person has a frame worth holding - a convocation
            milestone, a portrait that speaks, a group moment you&apos;ll never get back.
            This site isn&apos;t a feed to scroll past. It&apos;s an archive, a mood board,
            and an invitation to <span className="serif-i">capture something together</span>.
          </p>
          <ul className="intro__stats" role="list">
            <li><span>FRAMES SHOT</span><b>31 +</b></li>
            <li><span>CITIES</span><b>02</b></li>
            <li><span>SHOOTS</span><b>20 +</b></li>
            <li><span>HAPPY CLIENTS</span><b>30 +</b></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
