"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PHOTOS } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about__statement",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about__statement", start: "top 84%" },
        }
      );
      gsap.fromTo(
        ".about__copy, .about__facts",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".about__copy", start: "top 86%" },
        }
      );
      // the portrait drifts slower than the page - it is being carried
      gsap.fromTo(
        ".about__portrait img",
        { yPercent: -8 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".about__portrait", start: "top bottom", end: "bottom top", scrub: 0.5 },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--light about" id="about" ref={rootRef} aria-label="About the photographer">
      <div className="sec__head">
        <span className="u-kicker">08 - THE PHOTOGRAPHER</span>
        <span className="u-mono">HUMAN, NOT A FEED</span>
      </div>

      <div className="about__grid">
        <div>
          <h2 className="about__statement">
            I am interested in <b>the moments</b> between moments - the breath before the
            greeting, the style before the stage.
          </h2>
          <div className="about__copy">
            <p>
              Phay is a photographer born and based in Nigeria, working between Lagos and Ilorin.
              His lens moves between convocation milestones and lifestyle sessions, between
              traditional ceremonies and street-style culture.
            </p>
            <p>
              He photographs with intention, treats every shoot as a collaboration, and believes
              a photograph should capture more than a face - it should hold a feeling. Most of
              everything here was made in Nigeria. All of it was made on purpose.
            </p>
          </div>
          <ul className="about__facts" role="list">
            <li><span>BASE</span><b>LAGOS & ILORIN, NG</b></li>
            <li><span>SHOOTS</span><b>PORTRAITS · CONVOCATION · EVENTS</b></li>
            <li><span>STYLE</span><b>LIFESTYLE · BRAND · CULTURE</b></li>
            <li><span>AVAILABLE</span><b>WORLDWIDE - DM TO BOOK</b></li>
            <li><span>ACTIVE</span><b>2024 - PRESENT</b></li>
          </ul>
        </div>

        <div className="about__media">
          <figure className="about__portrait">
            <Photo photo={PHOTOS.p01} sizes="(max-width: 900px) 92vw, 44vw" />
          </figure>
          <figure className="about__polaroid" aria-label="Detail - the style">
            <Photo photo={PHOTOS.p10} sizes="200px" />
            <figcaption>STREET STYLE, ILORIN</figcaption>
          </figure>
          <p className="about__cap">PORTRAIT - TRADITIONAL AGBADA - ILORIN, NIGERIA</p>
        </div>
      </div>
    </section>
  );
}
