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
      // the portrait drifts slower than the page — it is being carried
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
    <section className="sec sec--light about" id="about" ref={rootRef} aria-label="About the artist">
      <div className="sec__head">
        <span className="u-kicker">08 — THE ARTIST</span>
        <span className="u-mono">HUMAN, NOT A FEED</span>
      </div>

      <div className="about__grid">
        <div>
          <h2 className="about__statement">
            I am interested in <b>the moments</b> between moments — the breath before the
            greeting, the street after the rain.
          </h2>
          <div className="about__copy">
            <p>
              Phay is a photographer born in Lagos and working between Lagos and Ilorin,
              shooting almost exclusively on film. His archive moves between the Shrine at 2am
              and the lagoon at 5am, between a trumpet in Freedom Park and a street that only a
              length of footsteps crosses.
            </p>
            <p>
              He photographs slowly, prints in the dark, and believes a photograph should be
              an object with a history — its light, its coordinates, its exact second. Most of
              everything here was made within walking distance of a danfo stop. All of it was
              made on purpose.
            </p>
          </div>
          <ul className="about__facts" role="list">
            <li><span>BASE</span><b>LAGOS &amp; ILORIN, NG</b></li>
            <li><span>CARRIES</span><b>NIKON FM2 / HASSELBLAD 500C/M</b></li>
            <li><span>LIVES AT</span><b>35MM f/1.4</b></li>
            <li><span>STOCKS</span><b>PORTRA 400 · CINESTILL 800T · HP5</b></li>
            <li><span>EDUCATION</span><b>SELF · THE STREET · THE RAIN</b></li>
            <li><span>ACTIVE</span><b>2019 — PRESENT</b></li>
          </ul>
        </div>

        <div className="about__media">
          <figure className="about__portrait">
            <Photo photo={PHOTOS.adaeze} sizes="(max-width: 900px) 92vw, 44vw" />
          </figure>
          <figure className="about__polaroid" aria-label="Detail — the hands that hold the camera">
            <Photo photo={PHOTOS.craftsmanHands} sizes="200px" />
            <figcaption>THE HANDS, APPRENTICED</figcaption>
          </figure>
          <p className="about__cap">SELF-PORTRAIT — ROOFTOP, YABA — GOLDEN HOUR, FLOOR NINE</p>
        </div>
      </div>
    </section>
  );
}
