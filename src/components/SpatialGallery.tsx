"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { PHOTOS, type Photo as PhotoType } from "@/lib/catalog";
import { prefersReducedMotion } from "@/lib/motion";
import Photo from "@/components/Photo";
import { useLightbox } from "@/components/Lightbox";

type Tile = {
  photo: PhotoType;
  x: number; // % of plane width
  y: number; // % of plane height
  w: number; // % of plane width
  depth: 1 | 2 | 3;
};

/**
 * Composition of the archive plane - an intentional scatter (Playbook §09),
 * hand-tuned so frames breathe and never collide.
 */
const TILES: Tile[] = [
  { photo: PHOTOS.p01,  x: 27, y: 0.5, w: 12, depth: 3 },
  { photo: PHOTOS.p03,  x: 13, y: 8,   w: 13, depth: 2 },
  { photo: PHOTOS.p10,  x: 40, y: 8,   w: 24, depth: 1 },
  { photo: PHOTOS.p18,  x: 70, y: 4,   w: 9,  depth: 2 },
  { photo: PHOTOS.p22,  x: 80, y: 12,  w: 13, depth: 3 },
  { photo: PHOTOS.p14,  x: 14, y: 42,  w: 21, depth: 1 },
  { photo: PHOTOS.p16,  x: 33, y: 41,  w: 13, depth: 3 },
  { photo: PHOTOS.p05,  x: 66, y: 42,  w: 13, depth: 2 },
  { photo: PHOTOS.p08,  x: 52, y: 52,  w: 12, depth: 2 },
  { photo: PHOTOS.p12,  x: 38, y: 70,  w: 20, depth: 2 },
  { photo: PHOTOS.p25,  x: 13, y: 74,  w: 19, depth: 1 },
  { photo: PHOTOS.p20,  x: 63, y: 76,  w: 13, depth: 3 },
];

/**
 * The Archive - a room of frames hanging at different depths.
 * Drag to wander; scroll for parallax; click a frame to hold it.
 */
export default function SpatialGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const { open } = useLightbox();

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const plane = planeRef.current;
    if (!root || !plane) return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = prefersReducedMotion();

    if (isMobile) return; // CSS grid takes over
    if (reduced) return; // static plane, still drag-optional below

    const ctx = gsap.context(() => {
      // depth parallax on scroll - nearer frames travel faster
      plane.querySelectorAll<HTMLElement>(".gal__tile").forEach((tile) => {
        const depth = Number(tile.dataset.depth ?? 1);
        gsap.fromTo(
          tile,
          { y: depth * 52 },
          {
            y: depth * -52,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector(".gal__viewport"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          }
        );
      });

      // entrance: frames surface from the paper
      gsap.fromTo(
        plane.querySelectorAll(".gal__tile .frame"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: { each: 0.06, from: "random" },
          scrollTrigger: { trigger: root.querySelector(".gal__viewport"), start: "top 74%" },
        }
      );
    }, root);

    // --- drag the plane (with inertia) ---
    const viewport = root.querySelector<HTMLElement>(".gal__viewport");
    if (!viewport) return () => ctx.revert();

    let dragging = false;
    let moved = 0;
    let px = 0;
    let py = 0;
    let vx = 0;
    let vy = 0;
    let lastX = 0;
    let lastY = 0;

    const xTo = gsap.quickTo(plane, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(plane, "y", { duration: 0.55, ease: "power3.out" });
    const pos = { x: 0, y: 0 };

    const bounds = () => {
      const vb = viewport.getBoundingClientRect();
      return {
        x: Math.max(0, (plane.offsetWidth - vb.width) / 2),
        y: Math.max(0, (plane.offsetHeight - vb.height) / 2),
      };
    };

    const clampPos = () => {
      const b = bounds();
      pos.x = Math.min(b.x, Math.max(-b.x, pos.x));
      pos.y = Math.min(b.y, Math.max(-b.y, pos.y));
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      px = e.clientX;
      py = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      vx = 0;
      vy = 0;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      moved += Math.abs(dx) + Math.abs(dy);
      vx = e.clientX - lastX;
      vy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      pos.x += dx;
      pos.y += dy;
      clampPos();
      xTo(pos.x);
      yTo(pos.y);
      px = e.clientX;
      py = e.clientY;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      // inertia
      pos.x += vx * 16;
      pos.y += vy * 12;
      clampPos();
      gsap.to(plane, { x: pos.x, y: pos.y, duration: 1.1, ease: "expo.out" });
    };
    const suppressClick = (e: MouseEvent) => {
      if (moved > 8) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", suppressClick, true);

    return () => {
      ctx.revert();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", suppressClick, true);
    };
  }, []);

  const photos = TILES.map((t) => t.photo);

  return (
    <section className="sec sec--light2 gal" id="archive" ref={rootRef} aria-label="The archive - spatial gallery">
      <div className="sec__head">
        <span className="u-kicker">08 - SPATIAL ARCHIVE</span>
        <span className="u-mono">A ROOM, NOT A GRID</span>
      </div>

      <div className="gal__viewport" data-cursor="DRAG">
        <div className="gal__ghost" aria-hidden="true">ARCHIVE</div>
        <div className="gal__plane" ref={planeRef}>
          {TILES.map((tile, i) => (
            <button
              key={tile.photo.id}
              className="gal__tile"
              data-depth={tile.depth}
              data-cursor="VIEW"
              style={{
                left: `${tile.x}%`,
                top: `${tile.y}%`,
                width: `${tile.w}%`,
              }}
              onClick={() => open(photos, i, "THE ARCHIVE")}
              aria-label={`View photograph: ${tile.photo.title}`}
            >
              <span className="frame">
                <Photo
                  photo={tile.photo}
                  sizes="(max-width: 900px) 50vw, 24vw"
                />
              </span>
              <span className="fig">FIG. {String(i + 1).padStart(2, "0")} - {tile.photo.title}</span>
            </button>
          ))}
        </div>
        <div className="gal__hud u-mono">
          <span>DRAG TO WANDER</span>
          <span aria-hidden="true">·</span>
          <span>{TILES.length} FRAMES HUNG</span>
        </div>
        <span className="gal__dot u-mono">DEPTH 1-3</span>
      </div>
    </section>
  );
}
