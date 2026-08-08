"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { SITE } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToTarget } from "@/components/SmoothScroll";

function Marquee() {
  const phrase = (
    <>
      BOOKINGS OPEN <b>●</b> LAGOS &amp; ILORIN <b>●</b> CONVOCATION · BRANDS · EVENTS <b>●</b>{" "}
      WHATSAPP — 0805 316 5862 <b>●</b>{" "}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((n) => (
          <span key={n}>
            {phrase}
            {phrase}
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}

function FooterClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Africa/Lagos",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="v mono" suppressHydrationWarning>
      {time || "00:00:00"} — GMT+1
    </span>
  );
}

/** The ending — designed to feel like one (Playbook §27). */
export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__mega span",
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer__mega", start: "top 88%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="sec sec--dark footer" id="contact" ref={rootRef} aria-label="Contact">
      <div className="sec__head">
        <span className="u-kicker">11 — CONTACT</span>
        <span className="u-mono">BOOKINGS OPEN — LET&apos;S MAKE MEMORIES LAST</span>
      </div>

      <h2 className="footer__mega">
        <span className="r1">LET&apos;S MAKE SOMETHING</span>
        <span className="r2">worth remembering.</span>
      </h2>

      <a className="footer__mail" href={`mailto:${SITE.email}`} data-cursor="WRITE">
        <span className="addr">{SITE.email}</span>
        <span className="go">WRITE →</span>
      </a>

      <div className="footer__grid">
        <div className="footer__cell">
          <p className="h">STUDIO</p>
          <p className="v">
            {SITE.city}
            <br />
            <span className="v mono">{SITE.coords}</span>
          </p>
        </div>
        <div className="footer__cell">
          <p className="h">LOCAL TIME</p>
          <FooterClock />
        </div>
        <div className="footer__cell">
          <p className="h">ELSEWHERE</p>
          <p className="v">
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram — {SITE.instagram}
            </a>
            <br />
            <a href={SITE.tiktokUrl} target="_blank" rel="noopener noreferrer">
              TikTok — {SITE.tiktok}
            </a>
            <br />
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp — {SITE.whatsapp}
            </a>
            <br />
            <a href={`mailto:${SITE.email}`}>Email — {SITE.email}</a>
          </p>
        </div>
        <div className="footer__cell">
          <p className="h">COLOPHON</p>
          <p className="v mono">
            FRAUNCES / ANTON / ARCHIVO
            <br />
            FILM, GRAIN &amp; INTENT
          </p>
        </div>
      </div>

      <Marquee />

      <div className="footer__thanks">
        <span className="serif-i">Thank you for looking.</span>
        <span className="u-mono">
          {SITE.city} — {SITE.coords} — {SITE.volume}
        </span>
      </div>

      <div className="footer__legal">
        <span>© 2026 {SITE.legalName.toUpperCase()}</span>
        <span>THE PHOTOGRAPHS ARE THE WORLD</span>
        <button className="footer__top-link u-mono" onClick={() => scrollToTarget(0)} data-cursor="TOP">
          BACK TO THE FIRST FRAME ↑
        </button>
      </div>
    </footer>
  );
}
