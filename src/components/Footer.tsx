"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { SITE } from "@/lib/site";
import { PHOTOS } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToTarget } from "@/components/SmoothScroll";
import Photo from "@/components/Photo";

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
      {time || "00:00:00"} - GMT+1
    </span>
  );
}

/** Footer - split layout: portfolio image left, bold CTA + contacts right. */
export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__hero-img",
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer__split", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".footer__cta-heading span",
        { yPercent: 80, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".footer__cta-heading", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".footer__contact-row",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer__contacts", start: "top 90%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="sec sec--dark footer" id="contact" ref={rootRef} aria-label="Contact">
      {/* --- split hero: image + CTA --- */}
      <div className="footer__split">
        <div className="footer__hero-wrap">
          <div className="footer__hero-img">
            <Photo photo={PHOTOS.p02} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>

        <div className="footer__cta">
          <h2 className="footer__cta-heading">
            <span>LET&apos;S GET</span>
            <span>SHOOTING!</span>
          </h2>

          <div className="footer__contacts">
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer__contact-row" data-cursor="CHAT">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </span>
              <span className="footer__contact-label">WhatsApp</span>
            </a>

            <a href={`tel:+234${SITE.whatsapp.replace(/\s/g, "").slice(1)}`} className="footer__contact-row" data-cursor="CALL">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <span className="footer__contact-label">{SITE.whatsapp}</span>
            </a>

            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__contact-row" data-cursor="FOLLOW">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </span>
              <span className="footer__contact-label">{SITE.instagram}</span>
            </a>

            <a href={SITE.tiktokUrl} target="_blank" rel="noopener noreferrer" className="footer__contact-row" data-cursor="FOLLOW">
              <span className="footer__contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </span>
              <span className="footer__contact-label">{SITE.tiktok}</span>
            </a>
          </div>
        </div>
      </div>

      {/* --- bottom bar --- */}
      <div className="footer__bar">
        <span>© 2026 {SITE.legalName}</span>
        <span className="watermark" style={{ textAlign: "center" }}>
          Made with 💜 by <a href="https://olabisiadigun.xyz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>O L A B I S I</a>
        </span>
        <button className="footer__top-link u-mono" onClick={() => scrollToTarget(0)} data-cursor="TOP">
          BACK TO THE FIRST FRAME ↑
        </button>
      </div>
    </footer>
  );
}
