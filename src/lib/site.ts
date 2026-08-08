export const SITE = {
  name: "PHAY SHOT IT",
  legalName: "Phay Shot It Photography",
  tagline: "Don't just drip — capture every moment.",
  description:
    "Phay Shot It is the work of Phay — a photographer based in Lagos & Ilorin, Nigeria. Portraits, convocation, brand shoots, events & lifestyle: every moment captured with intent.",
  whatsapp: "0805 316 5862",
  whatsappUrl: "https://wa.me/2348053165862",
  instagram: "@heisphay",
  instagramUrl: "https://instagram.com/heisphay",
  tiktok: "@heisphay",
  tiktokUrl: "https://tiktok.com/@heisphay",
  city: "LAGOS & ILORIN, NIGERIA",
  coords: "6°27′N 3°24′E",
  founded: "2024",
  volume: "RATE CARD — 2026",
} as const;

/** Sections registered in the side progress rail. Order = page order. */
export const RAIL_STOPS = [
  { id: "enter", label: "ENTER", index: "01" },
  { id: "intro", label: "INTRO", index: "02" },
  { id: "peak", label: "PEAK", index: "03" },
  { id: "work", label: "WORK", index: "04" },
  { id: "archive", label: "ARCHIVE", index: "05" },
  { id: "story", label: "STORY", index: "06" },
  { id: "map", label: "MAP", index: "07" },
  { id: "about", label: "ABOUT", index: "08" },
  { id: "pricing", label: "PRICING", index: "09" },
  { id: "artist", label: "ARTIST", index: "10" },
] as const;
