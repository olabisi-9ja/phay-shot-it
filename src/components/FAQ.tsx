"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const FAQS = [
  {
    q: "How does the deposit work?",
    a: "A 50% deposit secures your date. The final balance is due before the final gallery is delivered.",
  },
  {
    q: "How many photos do I receive?",
    a: "This depends on the package you select. Essentials includes 4 polished photos, Signature includes 10, and Legacy includes 20+.",
  },
  {
    q: "How quickly will I receive them?",
    a: "Standard turnaround time is 3-5 days. Expedited 48-hour delivery is available for Legacy packages or as an add-on.",
  },
  {
    q: "Do you travel outside Lagos and Ilorin?",
    a: "Yes! While based between Lagos and Ilorin, I am available for destination shoots and bespoke commissions anywhere in Nigeria.",
  },
  {
    q: "Can I bring multiple outfits?",
    a: "Absolutely. Signature packages allow 2 outfits, and Legacy packages allow up to 3 outfit changes.",
  },
];

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.7,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--dark faq" id="faq" ref={rootRef}>
      <div className="sec__head">
        <span className="u-kicker">09 - FAQ</span>
        <span className="u-mono">COMMON QUESTIONS</span>
      </div>

      <div className="faq__list">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <button 
                className="faq-item__btn" 
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <h4 className="faq-item__q">{faq.q}</h4>
                <span className="faq-item__icon">{isOpen ? "-" : "+"}</span>
              </button>
              <div className="faq-item__a-wrapper" style={{ height: isOpen ? 'auto' : 0, overflow: 'hidden' }}>
                <p className="faq-item__a">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
