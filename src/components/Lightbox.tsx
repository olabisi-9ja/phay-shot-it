"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { largestSrc, type Photo } from "@/lib/catalog";
import { startScroll, stopScroll } from "@/components/SmoothScroll";
import { shutterClick } from "@/lib/ambience";

type LightboxState = { photos: Photo[]; index: number; heading?: string } | null;

type LightboxApi = {
  open: (photos: Photo[], index: number, heading?: string) => void;
};

const LightboxContext = createContext<LightboxApi>({ open: () => undefined });

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((photos: Photo[], index: number, heading?: string) => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setState({ photos, index, heading });
    stopScroll();
  }, []);

  const close = useCallback(() => {
    setState(null);
    startScroll();
    restoreFocusRef.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setState((s) => {
      if (!s) return s;
      shutterClick();
      return { ...s, index: (s.index + dir + s.photos.length) % s.photos.length };
    });
  }, []);

  useEffect(() => {
    if (!state) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, close, step]);

  // preload neighbours
  useEffect(() => {
    if (!state) return;
    const { photos, index } = state;
    [-1, 1].forEach((d) => {
      const n = photos[(index + d + photos.length) % photos.length];
      if (n) {
        const img = new Image();
        img.src = largestSrc(n);
      }
    });
  }, [state]);

  const photo = state?.photos[state.index];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <div
        className={`lb${state ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={state ? `${state.heading ?? "Photograph"} — ${photo?.title ?? ""}` : undefined}
        aria-hidden={!state}
      >
        {state && photo && (
          <>
            <div className="lb__head">
              <span>{state.heading ?? "ARCHIVE"}</span>
              <span>
                {String(state.index + 1).padStart(2, "0")} / {String(state.photos.length).padStart(2, "0")}
              </span>
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div className="lb__stage" onClick={close}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={largestSrc(photo)}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                key={photo.id}
                data-cursor="×"
              />
            </div>
            <div className="lb__cap">
              <span className="exif">{photo.date}</span>
            </div>
            {state.photos.length > 1 && (
              <>
                <button className="lb__nav lb__nav--prev" onClick={() => step(-1)} aria-label="Previous photograph">
                  ←
                </button>
                <button className="lb__nav lb__nav--next" onClick={() => step(1)} aria-label="Next photograph">
                  →
                </button>
              </>
            )}
            <button
              ref={closeRef}
              className="col__close u-mono"
              style={{ position: "absolute", top: 14, right: "var(--gutter)" }}
              onClick={close}
              aria-label="Close viewer"
              data-cursor="×"
            >
              CLOSE{" "}
              <span className="x" aria-hidden="true">
                ×
              </span>
            </button>
          </>
        )}
      </div>
    </LightboxContext.Provider>
  );
}
