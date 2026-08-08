"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE, RAIL_STOPS } from "@/lib/site";
import { bus, EVENTS } from "@/lib/bus";
import { toggleAmbience } from "@/lib/ambience";
import { scrollToTarget, stopScroll, startScroll } from "@/components/SmoothScroll";
import { PHOTOS } from "@/lib/catalog";
import Photo from "@/components/Photo";

const MENU_ITEMS = [
  { label: "WORK", target: "#work", note: "five shelves", thumb: PHOTOS.p12 },
  { label: "ARCHIVE", target: "#archive", note: "a room of frames", thumb: PHOTOS.p10 },
  { label: "STORY", target: "#story", note: "lagos & ilorin", thumb: PHOTOS.p01 },
  { label: "MAP", target: "#map", note: "where the frames live", thumb: PHOTOS.p14 },
  { label: "ABOUT", target: "#about", note: "the photographer", thumb: PHOTOS.p22 },
  { label: "PRICING", target: "#pricing", note: "packages from ₦50k", thumb: PHOTOS.p03 },
  { label: "ARTIST", target: "#artist", note: "the man behind the lens", thumb: PHOTOS.artist },
  { label: "CONTACT", target: "#contact", note: "let's capture something", thumb: PHOTOS.p02 },
];

function LagosClock() {
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
    <span className="nav__clock u-mono" suppressHydrationWarning>
      LAGOS - {time || "00:00:00"} GMT+1
    </span>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [activeThumb, setActiveThumb] = useState<(typeof MENU_ITEMS)[number] | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = 0;
    let off: (() => void) | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;
      if (y > 140 && y > lastY + 4) nav.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 140) nav.classList.remove("is-hidden");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    off = () => window.removeEventListener("scroll", onScroll);
    return off;
  }, []);

  // entrance after loader
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const show = () => gsap.fromTo(nav, { yPercent: -120 }, { yPercent: 0, duration: 0.9, ease: "expo.out", delay: 0.75, clearProps: "transform" });
    if (document.documentElement.classList.contains("is-loaded")) show();
    const off = bus.on(EVENTS.loaded, show);
    return () => {
      off();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      stopScroll();
      firstItemRef.current?.focus();
      document.body.style.setProperty("overflow", "hidden");
    } else {
      startScroll();
      document.body.style.removeProperty("overflow");
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (target: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToTarget(target), 350);
  };

  return (
    <>
      <header className="nav" ref={navRef}>
        <a href="#enter" className="nav__brand" onClick={(e) => { e.preventDefault(); scrollToTarget(0); }} data-cursor="TOP">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3 L15 12 M21 12 L12 15 M12 21 L9 12 M3 12 L12 9" />
          </svg>
          PHAY
        </a>
        <LagosClock />
        <div className="nav__right">
          <button
            className={`nav__sound u-mono${soundOn ? " is-on" : ""}`}
            onClick={() => setSoundOn(toggleAmbience())}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
          >
            SND
            <span className="nav__sound-bars" aria-hidden="true">
              <i /><i /><i />
            </span>
            {soundOn ? "ON" : "OFF"}
          </button>
          <button
            className="nav__index u-mono"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            data-cursor={menuOpen ? "×" : "MENU"}
          >
            {menuOpen ? "CLOSE" : "INDEX"}
            <span className="dots" aria-hidden="true">
              <i /><i /><i /><i />
            </span>
          </button>
        </div>
      </header>

      <nav id="site-menu" className={`menu${menuOpen ? " is-open" : ""}`} aria-label="Site index" aria-hidden={!menuOpen}>
        <div className={`menu__thumb${activeThumb ? " is-on" : ""}`} aria-hidden="true">
          {activeThumb && <Photo photo={activeThumb.thumb} sizes="260px" />}
        </div>
        <ul className="menu__list" role="list">
          {MENU_ITEMS.map((item, i) => (
            <li key={item.label}>
              <button
                ref={i === 0 ? firstItemRef : undefined}
                className="menu__item"
                onClick={() => go(item.target)}
                onMouseEnter={() => setActiveThumb(item)}
                onMouseLeave={() => setActiveThumb(null)}
                onFocus={() => setActiveThumb(item)}
                onBlur={() => setActiveThumb(null)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className="idx u-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="word">{item.label}</span>
                <span className="serif-i">{item.note}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="menu__foot u-mono">
          <span>WhatsApp: {SITE.whatsapp}</span>
          <span>{SITE.instagram}</span>
          <span>
            {SITE.city}
          </span>
        </div>
      </nav>
      <a
        href={`https://wa.me/2348053165862?text=${encodeURIComponent("Hi Phay, I'd like to book a shoot.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-book u-mono"
      >
        BOOK A SHOOT
      </a>
    </>
  );
}

export function ProgressRail() {
  const [active, setActive] = useState<string>("enter");
  useEffect(() => {
    const targets = RAIL_STOPS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="rail" aria-label="Section progress">
      {RAIL_STOPS.map((stop) => (
        <button
          key={stop.id}
          className={`rail__item${active === stop.id ? " is-active" : ""}`}
          onClick={() => scrollToTarget(`#${stop.id}`)}
          aria-label={`Go to ${stop.label}`}
          aria-current={active === stop.id ? "true" : undefined}
        >
          <span className="lbl">
            {stop.index} - {stop.label}
          </span>
          <span className="tick" aria-hidden="true" />
        </button>
      ))}
    </aside>
  );
}
