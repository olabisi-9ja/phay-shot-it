"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { MAP_NODES, type MapNode } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";
import { useLightbox } from "@/components/Lightbox";

/**
 * Field map — geography as navigation (Playbook §12).
 * An abstract graticule, five cities, and the route a life on film takes.
 * Hover a pip to preview; open its archive with a click.
 */
export default function FieldMap() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<MapNode | null>(null);
  const { open } = useLightbox();

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map__node",
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.8)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".map__plane", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".map__routes path",
        { strokeDashoffset: 600, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2.4,
          ease: "power2.inOut",
          stagger: 0.25,
          scrollTrigger: { trigger: ".map__plane", start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // route through the journey in time order: LA → Lagos → Sahara → Paris → Tokyo
  const routeOrder = ["los-angeles", "lagos", "sahara", "paris", "tokyo"];
  const nodeById = Object.fromEntries(MAP_NODES.map((n) => [n.id, n]));
  const routePts = routeOrder.map((id) => nodeById[id]).filter(Boolean);

  const routePath = routePts
    .map((n, i) => {
      if (i === 0) return `M ${n.x} ${n.y}`;
      const prev = routePts[i - 1];
      const cx = (prev.x + n.x) / 2;
      const cy = Math.min(prev.y, n.y) - 10;
      return `Q ${cx} ${cy} ${n.x} ${n.y}`;
    })
    .join(" ");

  return (
    <section className="sec sec--light map" id="map" ref={rootRef} aria-label="Field map">
      <div className="sec__head">
        <span className="u-kicker">07 — FIELD MAP</span>
        <span className="u-mono">WHERE THE NEGATIVES LIVE</span>
      </div>

      <div className="map__plane">
        <svg
          className="map__routes"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={routePath} vectorEffect="non-scaling-stroke" strokeWidth="1" />
        </svg>

        <span className="map__note u-mono" aria-hidden="true">
          NOT TO SCALE — ONLY TO MEMORY
        </span>

        {MAP_NODES.map((node) => (
          <button
            key={node.id}
            className={`map__node${active?.id === node.id ? " is-active" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setActive(node)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(node)}
            onBlur={() => setActive(null)}
            onClick={() => open(node.photos, 0, `${node.city} — ARCHIVE`)}
            data-cursor="OPEN"
            aria-label={`${node.city} — ${node.photos.length} photographs, ${node.years}. Open archive.`}
          >
            <span className="map__pip" aria-hidden="true" />
            <span className="map__label">{node.city}</span>
          </button>
        ))}

        {active && (
          <div
            className="map__card"
            style={{
              left: `${Math.min(Math.max(active.x, 12), 66)}%`,
              top: active.y > 44 ? `${active.y - 4}%` : `${active.y + 4}%`,
              transform: active.y > 44 ? "translateY(-100%)" : "none",
            }}
            aria-hidden="true"
          >
            <Photo photo={active.photo} sizes="300px" />
            <div className="body">
              <span className="city">{active.city}</span>
              <span className="u-mono">
                {String(active.photos.length).padStart(2, "0")} PRINT{active.photos.length > 1 ? "S" : ""} — {active.years}
              </span>
              <span className="u-mono">{active.coords}</span>
              <span className="go">OPEN ARCHIVE →</span>
            </div>
          </div>
        )}
      </div>

      <div className="map__legend u-mono">
        <span>HOME BASE — LAGOS</span>
        <span>ROUTE TAKEN 2025 → 2026</span>
        <span>NEXT ─── UNDEVELOPED</span>
      </div>
    </section>
  );
}
