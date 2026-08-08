"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PHOTOS } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

const PHOTO = PHOTOS.heroRain;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // scroll: the frame recedes as the intro approaches
      gsap.to(".hero__media", {
        yPercent: 16,
        scale: 1.07,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero__content", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "62% top",
          scrub: true,
        },
      });
      // ambient life: the photograph keeps breathing
      gsap.to(".hero__img", {
        scale: 1.09,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 4,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="enter" ref={rootRef} aria-label="Opening frame">
      <link
        rel="preload"
        as="image"
        href={`/images/${PHOTO.src}-1376w.webp`}
        imageSrcSet={`/images/${PHOTO.src}-800w.webp 800w, /images/${PHOTO.src}-1376w.webp 1376w`}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <div className="hero__media" aria-hidden="false">
        <Photo
          photo={PHOTO}
          sizes="100vw"
          className="hero__img"
          eager
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__frame" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <div className="hero__content">
        <div className="hero__top u-mono rev-fade">
          <span>{PHOTO.title}</span>
          <span>{PHOTO.location} — {PHOTO.coords}</span>
        </div>

        <div className="hero__bottom">
          <div>
            <p className="hero__pretitle u-mono">01 — OPENING FRAME / {PHOTO.date}</p>
            <h1 className="hero__title">
              <span className="row"><span className="inner say">I photograph</span></span>
              <span className="row"><span className="inner what">WHAT</span></span>
              <span className="row"><span className="inner remains">remains.</span></span>
            </h1>
          </div>
        </div>
      </div>

      <div className="hero__cue u-mono" aria-hidden="true">
        <span>SCROLL TO ENTER</span>
        <span className="line" />
      </div>
    </section>
  );
}
