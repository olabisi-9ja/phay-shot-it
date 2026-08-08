"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { COLLECTIONS, type Collection } from "@/lib/catalog";
import { startScroll, stopScroll } from "@/components/SmoothScroll";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

/**
 * Collections - not cards: an index of shelves (Playbook §26.04).
 * Hovering a row previews its lead frame; clicking enters the shelf.
 */
export default function Collections() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [openCol, setOpenCol] = useState<Collection | null>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cols__row",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ".cols__list", start: "top 82%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec sec--light cols" id="work" ref={rootRef} aria-label="Collections">
      <div className="sec__head">
        <span className="u-kicker">04 - COLLECTIONS</span>
        <span className="u-mono">FIVE SHELVES - SELECTED, NOT EXHAUSTED</span>
      </div>

      <div className="cols__wrap">
        <ul className="cols__list" role="list">
          {COLLECTIONS.map((col) => (
            <li key={col.id}>
              <button
                className="cols__row"
                data-accent={col.id === "portraits"}
                data-cursor="ENTER"
                onMouseEnter={() => setActiveRow(col.id)}
                onMouseLeave={() => setActiveRow(null)}
                onFocus={() => setActiveRow(col.id)}
                onBlur={() => setActiveRow(null)}
                onClick={() => setOpenCol(col)}
                aria-haspopup="dialog"
              >
                <span className="cols__idx">{col.index}</span>
                <span className="cols__name">{col.name}</span>
                <span className="cols__line">{col.line}</span>
                <span className="cols__count">
                  <span>{String(col.photos.length).padStart(2, "0")} FRAMES</span>
                  <span>{col.years}</span>
                </span>
                <span className="cols__arrow" aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="cols__preview" aria-hidden="true">
          {COLLECTIONS.map((col, i) => (
            <Photo
              key={col.id}
              photo={col.photos[0]}
              sizes="340px"
              className={activeRow === col.id || (activeRow === null && i === 0) ? "is-on" : ""}
            />
          ))}
          <span className="tag u-mono">{activeRow ? "ENTER SHELF →" : "THE WORK - 5 SHELVES"}</span>
        </div>
      </div>

      <CollectionOverlay collection={openCol} onClose={() => setOpenCol(null)} />
    </section>
  );
}

function CollectionOverlay({
  collection,
  onClose,
}: {
  collection: Collection | null;
  onClose: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!collection) return;
    stopScroll();
    setPage(1);
    const id = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      startScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  // scrollspy for the counter
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !collection) return;
    const figs = Array.from(strip.querySelectorAll(".col__fig"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setPage(figs.indexOf(en.target as HTMLElement) + 1);
        });
      },
      { root: strip, threshold: 0.55 }
    );
    figs.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [collection]);

  // entrance choreography
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !collection || prefersReducedMotion()) return;
    gsap.fromTo(
      strip.querySelectorAll(".col__fig"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.25 }
    );
  }, [collection]);

  const step = (dir: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip || !collection) return;
    const figs = strip.querySelectorAll(".col__fig");
    const next = Math.min(Math.max(page - 1 + dir, 0), figs.length - 1);
    figs[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div
      className={`col${collection ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={collection ? `Collection: ${collection.name}` : undefined}
      aria-hidden={!collection}
    >
      {collection && (
        <>
          <div className="col__head">
            <span className="u-mono">SHELF {collection.index} - {collection.years}</span>
            <span className="col__title">{collection.name}</span>
            <button ref={closeRef} className="col__close u-mono" onClick={onClose} aria-label="Close collection" data-cursor="×">
              CLOSE{" "}
              <span className="x" aria-hidden="true">×</span>
            </button>
          </div>

          <div className="col__strip" ref={stripRef} data-lenis-prevent data-cursor="SCROLL">
            {collection.photos.map((p) => (
              <figure className="col__fig" key={p.id}>
                <Photo photo={p} sizes="(max-height: 760px) 80vw, 66vh" />
                <figcaption className="col__cap">
                  <span className="t">{p.title}</span>
                  <span className="m">
                    {p.location} - {p.lens} {p.aperture} {p.shutter} ISO {p.iso}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="col__foot">
            <button className="col__navbtn" onClick={() => step(-1)} aria-label="Previous frame">← PREV</button>
            <span className="u-mono">
              {String(page).padStart(2, "0")} / {String(collection.photos.length).padStart(2, "0")} - {collection.line}
            </span>
            <button className="col__navbtn" onClick={() => step(1)} aria-label="Next frame">NEXT →</button>
          </div>
        </>
      )}
    </div>
  );
}
