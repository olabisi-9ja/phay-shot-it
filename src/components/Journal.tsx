"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { JOURNAL } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";

/** Notes from the field — the photographer as a person, not a feed. */
export default function Journal() {
  const rootRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journal__item",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".journal__list", start: "top 84%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec journal" id="journal" ref={rootRef} aria-label="Journal">
      <div className="sec__head">
        <span className="u-kicker">10 — JOURNAL</span>
        <span className="u-mono">NOTES FROM THE FIELD</span>
      </div>

      <ul className="journal__list" role="list">
        {JOURNAL.map((entry) => {
          const isOpen = openId === entry.id;
          return (
            <li className={`journal__item${isOpen ? " is-open" : ""}`} key={entry.id}>
              <button
                className="journal__row"
                aria-expanded={isOpen}
                aria-controls={`journal-panel-${entry.id}`}
                data-cursor={isOpen ? "CLOSE" : "READ"}
                onClick={() => setOpenId(isOpen ? null : entry.id)}
              >
                <span className="journal__idx">{entry.index}</span>
                <span className="journal__title">{entry.title}</span>
                <span className="journal__meta">
                  <span className="tag">{entry.tag}</span>
                  <span>{entry.date}</span>
                  <span>{entry.read}</span>
                </span>
                <span className="journal__chev" aria-hidden="true">+</span>
              </button>
              <div
                className="journal__panel"
                id={`journal-panel-${entry.id}`}
                role="region"
                aria-label={entry.title}
              >
                <div className="journal__panel-in">
                  <div className="journal__panel-grid">
                    <Photo photo={entry.photo} sizes="240px" />
                    <div>
                      <p className="journal__excerpt">{entry.excerpt}</p>
                      <div className="journal__body">
                        {entry.body.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
