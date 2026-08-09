export const SITE = {
  name: "PHAY SHOT IT",
  legalName: "Phay Shot It Photography",
  tagline: "Don't just drip - capture every moment.",
  description:
    "Phay Shot It is the work of Phay - a photographer based in Lagos & Ilorin, Nigeria. Portraits, convocation, brand shoots, events & lifestyle: every moment captured with intent.",
  whatsapp: "0805 316 5862",
  whatsappUrl: "https://wa.me/2348053165862",
  instagram: "@heisphay",
  instagramUrl: "https://instagram.com/heisphay",
  tiktok: "@heisphay",
  tiktokUrl: "https://tiktok.com/@heisphay",
  city: "LAGOS & ILORIN, NIGERIA",
  coords: "6°27′N 3°24′E",
  founded: "2024",
  volume: "RATE CARD - 2026",
} as const;

/** Sections registered in the side progress rail. Order = page order. */
export const RAIL_STOPS = [
  { id: "enter", label: "ENTER", index: "01" },
  { id: "intro", label: "THE IDEA", index: "02" },
  { id: "peak", label: "SIGNATURE", index: "03" },
  { id: "story", label: "STORY", index: "04" },
  { id: "services", label: "SERVICES", index: "05" },
  { id: "artist", label: "ARTIST", index: "06" },
  { id: "work", label: "ARCHIVE", index: "07" },
  { id: "archive", label: "SPATIAL", index: "08" },
  { id: "map", label: "MAP", index: "09" },
  { id: "testimonials", label: "PROOFS", index: "10" },
  { id: "pricing", label: "PRICING", index: "11" },
  { id: "faq", label: "FAQ", index: "12" },
  { id: "book", label: "BOOK", index: "13" },
] as const;
