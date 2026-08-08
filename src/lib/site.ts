export const SITE = {
  name: "PHAY SHOT IT",
  legalName: "Phay Shot It Photography",
  tagline: "I photograph what remains.",
  description:
    "Phay Shot It is the photographic world of Phay — a photographer born in Lagos and working between Lagos and Ilorin, Nigeria. Portraits, places, nocturnes and motion: an immersive archive of what remains.",
  email: "hello@phayshot.it",
  instagram: "@heisphay",
  instagramUrl: "https://instagram.com/heisphay",
  tiktok: "@heisphay",
  tiktokUrl: "https://tiktok.com/@heisphay",
  whatsapp: "0805 316 5862",
  whatsappUrl: "https://wa.me/2348053165862",
  city: "LAGOS & ILORIN, NIGERIA",
  coords: '6°27′N 3°24′E',
  founded: "2019",
  volume: "VOL. II — MMXXVI",
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
  { id: "about", label: "ARTIST", index: "08" },
  { id: "pricing", label: "PRICING", index: "09" },
  { id: "journal", label: "NOTES", index: "10" },
] as const;
