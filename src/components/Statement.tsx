"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";

/** The last words before the credits (Playbook §26.10). */
export default function Statement() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".statement__line > span");
      lines.forEach((line, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          line,
          { yPercent: 110, xPercent: dir * 4 },
          {
            yPercent: 0,
            xPercent: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: line, start: "top 92%" },
          }
        );
        gsap.to(line, {
          xPercent: dir * -3,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
      gsap.fromTo(
        ".statement__foot",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: ".statement__foot", start: "top 96%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--dark statement" aria-label="Final statement">
      <h2 className="statement__lines">
        <span className="statement__line"><span className="anton">SOME</span></span>
        <span className="statement__line"><span className="anton ghost">MOMENTS</span></span>
        <span className="statement__line"><span className="anton">DESERVE</span></span>
        <span className="statement__line"><span className="serifbig">to&nbsp;stay.</span></span>
      </h2>
      <div className="statement__foot u-mono">
        <span>— VOL. II, MMXXVI —</span>
      </div>
    </section>
  );
}
