"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const TESTIMONIALS = [
  {
    quote: "Phay didn't just take pictures; he directed the entire experience. The final images look like an editorial spread.",
    client: "Sarah O.",
    type: "Convocation Session \u00b7 Ilorin",
  },
  {
    quote: "Professional, punctual, and an incredible eye for detail. The lighting in our portraits was absolutely flawless.",
    client: "Tobi M.",
    type: "Portrait Session \u00b7 Lagos",
  },
  {
    quote: "We hired Phay for our brand campaign and he exceeded all expectations. He understands visual storytelling perfectly.",
    client: "Vibe Studios",
    type: "Brand Campaign \u00b7 Lagos",
  },
];

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testim", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--light2 testimonials" id="testimonials" ref={rootRef}>
      <div className="sec__head">
        <span className="u-kicker">08 - CLIENT WORDS</span>
        <span className="u-mono">HAPPY CLIENTS \u221e</span>
      </div>

      <div className="testimonials__list">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testim">
            <p className="testim__quote serif-i">"{t.quote}"</p>
            <div className="testim__meta">
              <span className="testim__name">{t.client}</span>
              <span className="testim__type u-mono">{t.type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
