"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PHOTOS } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

/** The artist behind the lens - who Phay is. */
export default function Artist() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".artist__statement",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".artist__statement", start: "top 84%" },
        }
      );
      gsap.fromTo(
        ".artist__copy, .artist__services",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".artist__copy", start: "top 86%" },
        }
      );
      gsap.fromTo(
        ".artist__portrait img",
        { yPercent: -8 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".artist__portrait", start: "top bottom", end: "bottom top", scrub: 0.5 },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--light artist" id="artist" ref={rootRef} aria-label="The artist">
      <div className="sec__head">
        <span className="u-kicker">10 - THE ARTIST</span>
        <span className="u-mono">THE MAN BEHIND THE LENS</span>
      </div>

      <div className="artist__grid">
        <div>
          <h2 className="artist__statement">
            I don&apos;t just take photos - I <b>capture moments</b> that last forever.
          </h2>
          <div className="artist__copy">
            <p>
              Phay is a photographer based in Lagos and Ilorin, Nigeria. He specialises in
              portraits, convocation shoots, brand sessions, events and lifestyle photography -
              bringing intention, style and energy to every frame.
            </p>
            <p>
              Whether it&apos;s a convocation milestone, a group shoot with the squad, or a solo
              portrait that speaks volumes - Phay&apos;s lens makes it count. Every session is
              treated as a creative collaboration, not just a transaction.
            </p>
          </div>
          <div className="artist__services">
            <h3 className="u-mono" style={{ marginBottom: 16, letterSpacing: 2 }}>SERVICES</h3>
            <ul className="artist__services-list" role="list">
              <li>PORTRAITS</li>
              <li>CONVOCATION</li>
              <li>BRAND SHOOTS</li>
              <li>EVENTS</li>
              <li>LIFESTYLE</li>
            </ul>
          </div>
          <div className="artist__contact">
            <h3 className="u-mono" style={{ marginBottom: 16, letterSpacing: 2 }}>GET IN TOUCH</h3>
            <div className="artist__contact-links">
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cursor="CHAT">
                WhatsApp - {SITE.whatsapp}
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" data-cursor="FOLLOW">
                Instagram - {SITE.instagram}
              </a>
              <a href={SITE.tiktokUrl} target="_blank" rel="noopener noreferrer" data-cursor="FOLLOW">
                TikTok - {SITE.tiktok}
              </a>
            </div>
          </div>
        </div>

        <div className="artist__media">
          <figure className="artist__portrait">
            <Photo photo={PHOTOS.artist} sizes="(max-width: 900px) 92vw, 44vw" />
          </figure>
          <p className="artist__cap u-mono">PHAY - THE MAN BEHIND PHAY SHOT IT</p>
        </div>
      </div>
    </section>
  );
}
