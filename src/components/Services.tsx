"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const SERVICES = [
  {
    category: "PERSONAL",
    items: ["Portraits", "Convocation", "Birthday", "Couple", "Graduation"],
    desc: "Intentional captures of your most important individual milestones.",
  },
  {
    category: "CREATIVE",
    items: ["Fashion", "Lifestyle", "Editorial", "Conceptual"],
    desc: "Artistic direction for creators, models, and individuals with a vision.",
  },
  {
    category: "BUSINESS",
    items: ["Brand Photography", "Campaigns", "Product", "Corporate"],
    desc: "Strategic visual storytelling to elevate your brand's identity.",
  },
  {
    category: "EVENTS",
    items: ["Graduation Ceremonies", "Parties", "Ceremonies", "Social Events"],
    desc: "Comprehensive coverage of celebrations, both large and intimate.",
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
        <span className="u-kicker">05 - SERVICES</span>
        <span className="u-mono">LAGOS / ILORIN</span>
      </div>

      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-item">
            <span className="u-mono" style={{ opacity: 0.5, fontSize: '0.8rem' }}>{s.category}</span>
            <h3 className="service__title" style={{ marginTop: 8 }}>{s.items.join(" · ").toUpperCase()}</h3>
            <p className="service__desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
