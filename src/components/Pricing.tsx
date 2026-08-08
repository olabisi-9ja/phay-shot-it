"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PRICING } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";

/** Pricing & services - clean rate card layout. */
export default function Pricing() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing__card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pricing__grid", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".pricing__bespoke",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pricing__bespoke", start: "top 88%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--dark pricing" id="pricing" ref={rootRef} aria-label="Pricing">
      <div className="sec__head">
        <span className="u-kicker">09 - PRICING</span>
        <span className="u-mono">PACKAGES START AT ₦50,000</span>
      </div>

      <div className="pricing__tagline">
        <p className="serif-i">Convocation Season - Limited Weekly Slots</p>
      </div>

      <div className="pricing__grid">
        {PRICING.map((pkg) => (
          <article
            key={pkg.index}
            className={`pricing__card${pkg.highlight ? " pricing__card--highlight" : ""}`}
          >
            <div className="pricing__card-head">
              <span className="pricing__idx u-mono">{pkg.index}</span>
              <h3 className="pricing__name">{pkg.name}</h3>
              <p className="pricing__tagline-sm serif-i">{pkg.tagline}</p>
            </div>
            <ul className="pricing__features" role="list">
              {pkg.features.map((f, i) => (
                <li key={i}>
                  {f.startsWith("Pre-shoot") || f.startsWith("Behind") || f.startsWith("Printed") ? (
                    <><span className="pricing__star">★</span> {f}</>
                  ) : (
                    f
                  )}
                </li>
              ))}
            </ul>
            <div className="pricing__price">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="u-mono">STARTING AT</span>
                <span className="pricing__amount">{pkg.price}</span>
              </div>
              <a
                href={`https://wa.me/2348053165862?text=${encodeURIComponent(`Hi Phay, I'd like to book the ${pkg.name} package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing__book-btn u-mono"
              >
                BOOK {pkg.name.toUpperCase()}
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="pricing__bespoke">
        <h3>BESPOKE COMMISSIONS</h3>
        <p>
          Brand, business & large-group event coverage. Custom pricing based on concept,
          location & deliverables. Available for graduation ceremonies & lifestyle sessions.
        </p>
        <p className="u-mono" style={{ opacity: 0.6 }}>
          PRICES VARY DEPENDING ON LOCATION AND SETUP
        </p>
      </div>

      <div className="pricing__terms u-mono">
        <p>Fully edited gallery delivered digitally - raw files available on request.</p>
        <p>50% deposit secures your date. Final gallery delivered upon full payment.</p>
        <p>One round of refinements included. Custom quotes available for bespoke commissions.</p>
        <p className="serif-i" style={{ marginTop: 16 }}>
          Returning & referred clients enjoy loyalty rewards - ask us how.
        </p>
      </div>
    </section>
  );
}
