"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/lib/site";

const SERVICES = ["PORTRAITS", "CONVOCATION", "BRAND SHOOTS", "EVENTS", "LIFESTYLE"];

type Package = {
  id: string;
  num: string;
  name: string;
  blurb: string;
  price: string;
  featured?: boolean;
  inclusions: string[];
};

const PACKAGES: Package[] = [
  {
    id: "essentials",
    num: "01",
    name: "ESSENTIALS",
    blurb: "For a quick, polished solo portrait or single convocation moment.",
    price: "₦50,000",
    inclusions: [
      "4 professionally edited photos",
      "5 selected unedited photos",
      "Professional camera & lighting setup",
      "1 outfit",
      "1 location",
      "Same-day preview",
    ],
  },
  {
    id: "signature",
    num: "02",
    name: "SIGNATURE",
    blurb: "Ideal for a full convocation day or a considered lifestyle session.",
    price: "₦70,000",
    featured: true,
    inclusions: [
      "8 professionally edited photos",
      "10 selected unedited photos",
      "Professional camera & lighting setup",
      "2 outfits",
      "Flexible locations",
      "★ Pre-shoot styling consultation",
      "48-hour delivery",
    ],
  },
  {
    id: "legacy",
    num: "03",
    name: "LEGACY",
    blurb: "For families and milestone celebrations that deserve the full story.",
    price: "₦100,000",
    inclusions: [
      "12 professionally edited photos, cinematic colour grade",
      "10 selected unedited photos",
      "Professional camera & lighting setup",
      "3 outfits",
      "Multiple locations",
      "★ Behind-the-scenes highlight reel",
      "★ Printed photo set included",
      "Priority editing & delivery",
    ],
  },
];

const TERMS = [
  "Fully edited gallery delivered digitally — raw files available on request.",
  "50% deposit secures your date.",
  "Final gallery delivered upon full payment.",
  "One round of refinements included.",
  "Custom quotes available for bespoke commissions.",
  "Returning & referred clients enjoy loyalty rewards — ask us how.",
];

export default function Pricing() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".price__card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".price__cards", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".price__terms li",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".price__terms", start: "top 86%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--light2 price" id="pricing" ref={rootRef} aria-label="Pricing">
      <div className="sec__head">
        <span className="u-kicker">09 — PRICING</span>
        <span className="u-mono">RATE CARD — 2026</span>
      </div>

      <div className="price__intro">
        <h2 className="price__title">
          Pricing &amp; <span className="serif-i">services.</span>
        </h2>
        <p className="price__tag">
          Don&apos;t just drip — capture every moment. Let&apos;s make memories last forever.
        </p>
        <p className="price__services u-mono">{SERVICES.join("  •  ")}</p>
        <p className="price__slots u-mono">
          CONVOCATION SEASON — LIMITED WEEKLY SLOTS · PACKAGES START AT ₦50,000
        </p>
      </div>

      <div className="price__cards">
        {PACKAGES.map((p) => (
          <article className={`price__card${p.featured ? " is-featured" : ""}`} key={p.id}>
            <span className="price__num u-mono">{p.num}</span>
            <h3 className="price__name">{p.name}</h3>
            <p className="price__blurb">{p.blurb}</p>
            <ul className="price__incl" role="list">
              {p.inclusions.map((it, i) => (
                <li key={i} className={it.startsWith("★") ? "is-star" : ""}>
                  {it.replace("★ ", "")}
                </li>
              ))}
            </ul>
            <p className="price__from u-mono">STARTING AT</p>
            <p className="price__val">{p.price}</p>
          </article>
        ))}
      </div>

      <div className="price__bespoke">
        <h3 className="price__bespoke-title">BESPOKE COMMISSIONS</h3>
        <div>
          <p>
            Brand, business &amp; large-group event coverage. Custom pricing based on concept,
            location &amp; deliverables. Available for graduation ceremonies &amp; lifestyle sessions.
          </p>
          <p className="price__vary u-mono">PRICES VARY DEPENDING ON LOCATION AND SETUP</p>
        </div>
      </div>

      <div className="price__terms">
        <span className="u-kicker">TERMS &amp; CONDITIONS</span>
        <ul role="list">
          {TERMS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="price__contact">
        <span className="u-kicker">CONTACT US</span>
        <div className="price__contact-grid">
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cursor="WRITE">
            <span className="h">WHATSAPP</span>
            <span className="v">{SITE.whatsapp}</span>
          </a>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" data-cursor="WRITE">
            <span className="h">INSTAGRAM</span>
            <span className="v">{SITE.instagram}</span>
          </a>
          <a href={SITE.tiktokUrl} target="_blank" rel="noopener noreferrer" data-cursor="WRITE">
            <span className="h">TIKTOK</span>
            <span className="v">{SITE.tiktok}</span>
          </a>
          <a href={`mailto:${SITE.email}`} data-cursor="WRITE">
            <span className="h">EMAIL</span>
            <span className="v">{SITE.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
