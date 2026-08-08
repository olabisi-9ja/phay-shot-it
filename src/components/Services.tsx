"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const SERVICES = [
  {
    title: "PORTRAITS",
    desc: "Portraits that look like you, only intentional. Creative direction, styling consultation, and flawless lighting.",
  },
  {
    title: "CONVOCATION",
    desc: "Your degree deserves more than a quick phone picture. Document this milestone with cinematic quality.",
  },
  {
    title: "BRAND PHOTOGRAPHY",
    desc: "Build a visual identity around your people and products. Campaigns, lookbooks, and corporate lifestyle.",
  },
  {
    title: "EVENTS & LIFESTYLE",
    desc: "Unobtrusive coverage of life's most important moments, capturing raw emotion and authentic interactions.",
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
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
    <section className="sec sec--dark services" id="services" ref={rootRef}>
      <div className="sec__head">
        <span className="u-kicker">03 - WHAT I SHOOT</span>
        <span className="u-mono">LAGOS / ILORIN</span>
      </div>

      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-item">
            <h3 className="service__title">{s.title}</h3>
            <p className="service__desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
