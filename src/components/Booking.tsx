"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/lib/site";

const BOOKING_TYPES = [
  "Convocation",
  "Portrait",
  "Event",
  "Brand",
  "Lifestyle",
  "Other",
];

const PACKAGES = [
  "Essentials (₦50k)",
  "Signature (₦70k)",
  "Legacy (₦100k)",
  "Bespoke / Custom",
];

export default function Booking() {
  const rootRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    type: "Convocation",
    date: "",
    location: "",
    package: "Signature (₦70k)",
  });

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".booking__form > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".booking__form", start: "top 85%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Phay, I'd like to book a shoot!
    
Name: ${formData.name}
WhatsApp: ${formData.whatsapp}
Type: ${formData.type}
Date: ${formData.date}
Location: ${formData.location}
Package: ${formData.package}`;

    window.open(`${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="sec sec--light booking" id="book" ref={rootRef} aria-label="Book a shoot">
      <div className="sec__head">
        <span className="u-kicker">13 - BOOKING</span>
        <span className="u-mono">SECURE YOUR DATE</span>
      </div>

      <div className="booking__grid">
        <div className="booking__info">
          <h2 className="booking__title">
            Let&apos;s capture <br /> <span className="serif-i">something together.</span>
          </h2>
          <p className="booking__desc">
            Fill out the details below to start your enquiry. Clicking submit will send 
            a structured message directly to Phay on WhatsApp.
          </p>
          <div className="booking__note u-mono">
            <p>50% DEPOSIT REQUIRED TO SECURE DATE</p>
            <p>LAGOS - ILORIN - NIGERIA</p>
          </div>
        </div>

        <form className="booking__form" onSubmit={handleWhatsAppSubmit}>
          <div className="form-group">
            <label className="u-mono">NAME</label>
            <input 
              type="text" 
              required 
              placeholder="Your full name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="u-mono">WHATSAPP NUMBER</label>
              <input 
                type="tel" 
                required 
                placeholder="080 0000 0000"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="u-mono">SHOOT TYPE</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                {BOOKING_TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="u-mono">PREFERRED DATE</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="u-mono">LOCATION</label>
              <input 
                type="text" 
                placeholder="e.g. Lagos, Ilorin"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="u-mono">PACKAGE</label>
            <select 
              value={formData.package}
              onChange={e => setFormData({...formData, package: e.target.value})}
            >
              {PACKAGES.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
            </select>
          </div>

          <button type="submit" className="booking__submit-btn u-mono" data-cursor="SEND">
            SEND ENQUIRY VIA WHATSAPP
          </button>
        </form>
      </div>
    </section>
  );
}
