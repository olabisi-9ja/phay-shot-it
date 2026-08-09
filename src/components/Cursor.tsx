"use client";

import { useEffect, useRef } from "react";

/**
 * Function-communicating cursor (Playbook §20).
 * Elements opt in with data-cursor="VIEW" | "DRAG" | "NEXT" | "×" | "READ" ...
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let visible = false;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        x = tx;
        y = ty;
        visible = true;
        el.style.opacity = "1";
      }
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const holder = t.closest<HTMLElement>("[data-cursor]");
      const label = labelRef.current;
      if (holder && label) {
        label.textContent = holder.dataset.cursor ?? "";
        el.classList.add("has-label");
      } else {
        el.classList.remove("has-label");
      }
    };

    const down = () => el.classList.add("is-pressed");
    const up = () => el.classList.remove("is-pressed");
    const enter = () => {
      visible = true;
      el.style.opacity = "1";
    };
    const leave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);
    // update label on scroll as the element under mouse might change
    window.addEventListener("scroll", () => {
      const target = document.elementFromPoint(tx, ty);
      if (target) {
        const holder = target.closest<HTMLElement>("[data-cursor]");
        const label = labelRef.current;
        if (holder && label) {
          label.textContent = holder.dataset.cursor ?? "";
          el.classList.add("has-label");
        } else {
          el.classList.remove("has-label");
        }
      }
    }, { passive: true });

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  );
}
