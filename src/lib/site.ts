export const SITE = {
  name: "PHAY SHOT IT",
  legalName: "Phay Shot It Photography",
  tagline: "I photograph what remains.",
  description:
    "Phay Shot It is the photographic world of Phay — a Lagos-born photographer working in film. Portraits, places, nocturnes and motion: an immersive archive of what remains.",
  email: "hello@phayshot.it",
  instagram: "@phay.shot.it",
  instagramUrl: "https://instagram.com/phay.shot.it",
  city: "LAGOS, NIGERIA",
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
  { id: "about", label: "ABOUT", index: "08" },
  { id: "journal", label: "NOTES", index: "09" },
] as const;
