/**
 * PHAY SHOT IT — photographic catalog.
 * Single source of truth: every frame, its EXIF, its collection memberships.
 * Filenames are descriptive on purpose (image SEO).
 */

export type Frame = {
  id: string;
  /** base filename under /public/images (without -{w}w.webp suffix) */
  src: string;
  /** available rendered widths, ascending */
  widths: number[];
  /** intrinsic (largest) dimensions */
  w: number;
  h: number;
  title: string;
  location: string;
  coords: string;
  date: string;
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  film: string;
  alt: string;
  tone: "dark" | "light";
};

const F = (f: Frame) => f;

export const PHOTOS = {
  heroRain: F({
    id: "hero-rain",
    src: "lagos-rain-neon-nocturne",
    widths: [800, 1376],
    w: 1376,
    h: 768,
    title: "SHE ASKED THE RAIN TO WAIT",
    location: "OJUELEGBA, LAGOS",
    coords: '6°31′N 3°22′E',
    date: "12.06.2026",
    camera: "NIKON FM2",
    lens: "35MM",
    aperture: "f/1.4",
    shutter: "1/250",
    iso: "800",
    film: "CINESTILL 800T",
    alt: "A woman standing in torrential night rain on a neon-lit Lagos street, face lifted to the light, yellow buses and umbrellas dissolving behind her.",
    tone: "dark",
  }),
  shrine: F({
    id: "shrine",
    src: "lagos-shrine-concert-hands",
    widths: [800, 1376],
    w: 1376,
    h: 768,
    title: "EVERYBODY BECOMES ONE BODY",
    location: "NEW AFRIKA SHRINE, LAGOS",
    coords: '6°37′N 3°21′E',
    date: "27.02.2026",
    camera: "NIKON FM2",
    lens: "24MM",
    aperture: "f/2",
    shutter: "1/60",
    iso: "1600",
    film: "PORTRA 800",
    alt: "A concert crowd at night with hundreds of hands raised into golden haze and beams of amber stage light.",
    tone: "dark",
  }),
  craftsman: F({
    id: "craftsman",
    src: "lagos-elder-craftsman-bw",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "SIXTY YEARS IN TWO HANDS",
    location: "MUSHIN, LAGOS",
    coords: '6°32′N 3°20′E',
    date: "03.11.2025",
    camera: "HASSELBLAD 500C/M",
    lens: "80MM",
    aperture: "f/2.8",
    shutter: "1/125",
    iso: "400",
    film: "ILFORD HP5",
    alt: "Black and white portrait of an elderly Nigerian craftsman seated by his workshop window, hands clasped beneath his chin.",
    tone: "dark",
  }),
  adaeze: F({
    id: "adaeze",
    src: "lagos-rooftop-golden-portrait",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "GOLDEN HOUR, FLOOR NINE",
    location: "YABA, LAGOS",
    coords: '6°30′N 3°23′E',
    date: "18.01.2026",
    camera: "NIKON FM2",
    lens: "85MM",
    aperture: "f/1.4",
    shutter: "1/500",
    iso: "100",
    film: "PORTRA 400",
    alt: "Young Nigerian woman with long braids turning toward the camera at golden hour on a Lagos rooftop, warm flare behind her.",
    tone: "light",
  }),
  studioRed: F({
    id: "studio-red",
    src: "lagos-studio-red-portrait",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "RED IS A FULL SENTENCE",
    location: "STUDIO, IKEJA, LAGOS",
    coords: '6°35′N 3°21′E',
    date: "09.03.2026",
    camera: "HASSELBLAD 500C/M",
    lens: "120MM",
    aperture: "f/8",
    shutter: "1/125",
    iso: "100",
    film: "EKTAR 100",
    alt: "Studio portrait of a confident woman with short natural hair against a saturated crimson backdrop, hard light, crisp shadow.",
    tone: "light",
  }),
  trumpeter: F({
    id: "trumpeter",
    src: "lagos-trumpeter-blue-portrait",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "BLUE NOTE, THIRD SET",
    location: "FREEDOM PARK, LAGOS",
    coords: '6°26′N 3°24′E',
    date: "14.02.2026",
    camera: "NIKON FM2",
    lens: "85MM",
    aperture: "f/1.8",
    shutter: "1/160",
    iso: "1600",
    film: "CINESTILL 800T",
    alt: "A jazz trumpeter mid-note under deep blue stage light, brass catching a warm rim of light through haze.",
    tone: "dark",
  }),
  fisherman: F({
    id: "fisherman",
    src: "lagos-fisherman-mist-portrait",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "THE LAKE REMEMBERS HIM",
    location: "MAKOKO, LAGOS",
    coords: '6°29′N 3°23′E',
    date: "21.09.2025",
    camera: "NIKON FM2",
    lens: "50MM",
    aperture: "f/2.8",
    shutter: "1/125",
    iso: "200",
    film: "PORTRA 160",
    alt: "Elderly fisherman standing beside a weathered wooden boat in thick dawn mist, quiet dignified gaze.",
    tone: "light",
  }),
  lagoon: F({
    id: "lagoon",
    src: "lagos-lagoon-dawn-boats",
    widths: [800, 1264],
    w: 1264,
    h: 848,
    title: "BEFORE THE CITY WAKES",
    location: "LAGOS LAGOON",
    coords: '6°27′N 3°24′E',
    date: "04.06.2026",
    camera: "NIKON FM2",
    lens: "50MM",
    aperture: "f/5.6",
    shutter: "1/250",
    iso: "100",
    film: "PORTRA 160",
    alt: "Wooden fishing boats resting on a glassy lagoon at dawn under a pale pastel sky, one figure poling in the mist.",
    tone: "light",
  }),
  tokyo: F({
    id: "tokyo",
    src: "tokyo-rain-neon-alley",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "THE ALLEY KEEPS THE CHANGE",
    location: "SHINJUKU, TOKYO",
    coords: '35°41′N 139°42′E',
    date: "17.04.2026",
    camera: "LEICA M6",
    lens: "35MM",
    aperture: "f/1.4",
    shutter: "1/60",
    iso: "800",
    film: "CINESTILL 800T",
    alt: "A narrow Tokyo alley at night in the rain, pink and cyan neon reflections rippling on wet asphalt, one figure with a clear umbrella.",
    tone: "dark",
  }),
  paris: F({
    id: "paris",
    src: "paris-dawn-rooftops-mist",
    widths: [800, 1264],
    w: 1264,
    h: 848,
    title: "ZINC, BEFORE THE NOISE",
    location: "18E ARR., PARIS",
    coords: '48°53′N 2°20′E',
    date: "02.10.2025",
    camera: "LEICA M6",
    lens: "90MM",
    aperture: "f/4",
    shutter: "1/250",
    iso: "200",
    film: "PRO 400H",
    alt: "Paris zinc rooftops at dawn seen through soft golden mist, chimneys and mansard roofs compressed by a long lens.",
    tone: "light",
  }),
  spiral: F({
    id: "spiral",
    src: "los-angeles-white-arcade",
    widths: [800, 1600, 2200],
    w: 2200,
    h: 1467,
    title: "WHITE ON WHITE ON HIGHER",
    location: "LOS ANGELES, CA",
    coords: '34°04′N 118°28′W',
    date: "08.08.2025",
    camera: "CANON A-1",
    lens: "50MM",
    aperture: "f/8",
    shutter: "1/500",
    iso: "100",
    film: "PORTRA 160",
    alt: "Worm's-eye view of a curving white modern building with stacked tiled balconies dissolving into an overexposed sky.",
    tone: "light",
  }),
  neonBar: F({
    id: "neon-bar",
    src: "lagos-neon-bar-silhouette",
    widths: [500],
    w: 500,
    h: 333,
    title: "ONE MAN, ONE SMOKE, ONE LIGHT",
    location: "ISOLO, LAGOS",
    coords: '6°31′N 3°18′E',
    date: "12.06.2026",
    camera: "NIKON FM2",
    lens: "35MM",
    aperture: "f/1.4",
    shutter: "1/30",
    iso: "3200",
    film: "CINESTILL 800T",
    alt: "Silhouette of a man exhaling slow smoke against magenta and cyan neon in a dark bar.",
    tone: "dark",
  }),
  bokeh: F({
    id: "bokeh",
    src: "kyiv-rain-bokeh-window",
    widths: [500],
    w: 500,
    h: 333,
    title: "THE CITY, UNFOCUSED",
    location: "KIYV / THROUGH GLASS",
    coords: '50°27′N 30°31′E',
    date: "28.11.2025",
    camera: "LEICA M6",
    lens: "50MM",
    aperture: "f/1.2",
    shutter: "1/125",
    iso: "400",
    film: "PORTRA 400",
    alt: "Rain drops on a night window in focus, the city behind dissolved into warm and cool bokeh discs.",
    tone: "dark",
  }),
  sahara: F({
    id: "sahara",
    src: "sahara-dune-lone-figure",
    widths: [500],
    w: 500,
    h: 750,
    title: "A MAN, MEASURING THE DUNE",
    location: "ERG CHIGAGA, SAHARA",
    coords: '29°50′N 6°20′W',
    date: "19.05.2025",
    camera: "CANON A-1",
    lens: "200MM",
    aperture: "f/8",
    shutter: "1/1000",
    iso: "100",
    film: "KODAK GOLD",
    alt: "A lone robed figure walking the knife-edge ridge of a vast sand dune under a clear sky.",
    tone: "light",
  }),
  handsDetail: F({
    id: "hands-detail",
    src: "lagos-shrine-hands-detail",
    widths: [516],
    w: 516,
    h: 445,
    title: "VOTING WITH BOTH HANDS",
    location: "NEW AFRIKA SHRINE, LAGOS",
    coords: '6°37′N 3°21′E',
    date: "27.02.2026",
    camera: "NIKON FM2",
    lens: "24MM",
    aperture: "f/2",
    shutter: "1/60",
    iso: "1600",
    film: "PORTRA 800",
    alt: "Detail crop of raised hands cutting through golden concert haze.",
    tone: "dark",
  }),
  shrineMono: F({
    id: "shrine-mono",
    src: "lagos-shrine-concert-mono",
    widths: [800, 1376],
    w: 1376,
    h: 768,
    title: "EVERYBODY, IN SILVER",
    location: "NEW AFRIKA SHRINE, LAGOS",
    coords: '6°37′N 3°21′E',
    date: "27.02.2026",
    camera: "NIKON FM2",
    lens: "24MM",
    aperture: "f/2",
    shutter: "1/60",
    iso: "1600",
    film: "ILFORD HP5",
    alt: "Black and white grade of the concert crowd, hands raised into beams of stage light.",
    tone: "dark",
  }),
  rainReflections: F({
    id: "rain-reflections",
    src: "lagos-rain-reflections-mono",
    widths: [716],
    w: 716,
    h: 307,
    title: "THE STREET, TWICE",
    location: "OJUELEGBA, LAGOS",
    coords: '6°31′N 3°22′E',
    date: "12.06.2026",
    camera: "NIKON FM2",
    lens: "35MM",
    aperture: "f/1.4",
    shutter: "1/250",
    iso: "800",
    film: "ILFORD HP5",
    alt: "Black and white detail of neon reflections rippling in rain water on asphalt.",
    tone: "dark",
  }),
  tokyoMono: F({
    id: "tokyo-mono",
    src: "tokyo-rain-alley-mono",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "TOKYO WITHOUT ITS NEON",
    location: "SHINJUKU, TOKYO",
    coords: '35°41′N 139°42′E',
    date: "17.04.2026",
    camera: "LEICA M6",
    lens: "35MM",
    aperture: "f/1.4",
    shutter: "1/60",
    iso: "800",
    film: "ILFORD HP5",
    alt: "Black and white grade of the rain-soaked Tokyo alley, umbrella figure walking away.",
    tone: "dark",
  }),
  trumpeterMono: F({
    id: "trumpeter-mono",
    src: "lagos-trumpeter-mono",
    widths: [700, 928],
    w: 928,
    h: 1152,
    title: "THE NOTE, UNCOLOURED",
    location: "FREEDOM PARK, LAGOS",
    coords: '6°26′N 3°24′E',
    date: "14.02.2026",
    camera: "NIKON FM2",
    lens: "85MM",
    aperture: "f/1.8",
    shutter: "1/160",
    iso: "1600",
    film: "ILFORD HP5",
    alt: "Black and white grade of the jazz trumpeter in stage light and haze.",
    tone: "dark",
  }),
  craftsmanHands: F({
    id: "craftsman-hands",
    src: "lagos-craftsman-hands-detail",
    widths: [390],
    w: 390,
    h: 271,
    title: "TOOLS, RESTING",
    location: "MUSHIN, LAGOS",
    coords: '6°32′N 3°20′E',
    date: "03.11.2025",
    camera: "HASSELBLAD 500C/M",
    lens: "120MM",
    aperture: "f/4",
    shutter: "1/60",
    iso: "400",
    film: "ILFORD HP5",
    alt: "Detail of an elderly craftsman's clasped hands resting beneath his chin.",
    tone: "dark",
  }),
  lagoonWide: F({
    id: "lagoon-wide",
    src: "lagos-lagoon-panoramic",
    widths: [1200, 1264],
    w: 1264,
    h: 369,
    title: "SIXTY-FIVE MILLIMETRES OF QUIET",
    location: "LAGOS LAGOON",
    coords: '6°27′N 3°24′E',
    date: "04.06.2026",
    camera: "XPAN",
    lens: "45MM",
    aperture: "f/5.6",
    shutter: "1/250",
    iso: "100",
    film: "PORTRA 160",
    alt: "Panoramic crop of fishing boats on the dawn lagoon, widescreen composition.",
    tone: "light",
  }),
} satisfies Record<string, Frame>;

export type PhotoId = keyof typeof PHOTOS;
export type Photo = (typeof PHOTOS)[PhotoId];

export const srcSetFor = (p: Photo) =>
  p.widths.map((w) => `/images/${p.src}-${w}w.webp ${w}w`).join(", ");
export const largestSrc = (p: Photo) => `/images/${p.src}-${p.widths[p.widths.length - 1]}w.webp`;

/* ——— collections ——— */

export type Collection = {
  id: string;
  index: string;
  name: string;
  line: string;
  years: string;
  photos: Photo[];
};

const pick = (...ids: PhotoId[]) => ids.map((id) => PHOTOS[id]);

export const COLLECTIONS: Collection[] = [
  {
    id: "portraits",
    index: "01",
    name: "PORTRAITS",
    line: "People, before they perform.",
    years: "2024 — 2026",
    photos: pick("craftsman", "adaeze", "studioRed", "trumpeter", "fisherman"),
  },
  {
    id: "places",
    index: "02",
    name: "PLACES",
    line: "Cities when they think nobody is looking.",
    years: "2025 — 2026",
    photos: pick("lagoon", "spiral", "tokyo", "paris", "sahara"),
  },
  {
    id: "nocturne",
    index: "03",
    name: "NOCTURNE",
    line: "Everything the dark refuses to hide.",
    years: "2025 — 2026",
    photos: pick("heroRain", "neonBar", "tokyoMono", "trumpeterMono", "bokeh", "rainReflections"),
  },
  {
    id: "motion",
    index: "04",
    name: "MOTION",
    line: "What a still camera knows about speed.",
    years: "2026",
    photos: pick("shrine", "handsDetail", "shrineMono"),
  },
];

/* ——— the story (pinned scrollytelling sequence) ——— */

export type StoryFrame = {
  photo: Photo;
  step: string;
  time: string;
  line: string;
};

export const STORY = {
  title: "LAGOS, AFTER MIDNIGHT",
  kicker: "A STORY IN FOUR FRAMES",
  date: "12 — 13.06.2026",
  frames: <StoryFrame[]>[
    {
      photo: PHOTOS.heroRain,
      step: "WIDE",
      time: "00:47",
      line: "The rain arrives before the quiet ever does.",
    },
    {
      photo: PHOTOS.neonBar,
      step: "MEDIUM",
      time: "01:36",
      line: "Inside, everyone is waiting for a song they know.",
    },
    {
      photo: PHOTOS.bokeh,
      step: "DETAIL",
      time: "02:58",
      line: "The city loses focus. It looks better that way.",
    },
    {
      photo: PHOTOS.shrine,
      step: "AIR",
      time: "04:12",
      line: "Lagos never sleeps. But around four, it dreams.",
    },
  ],
};

/* ——— field map ——— */

export type MapNode = {
  id: string;
  city: string;
  coords: string;
  years: string;
  /** position, % of map plane (equirectangular-ish) */
  x: number;
  y: number;
  photo: Photo;
  photos: Photo[];
};

export const MAP_NODES: MapNode[] = [
  {
    id: "lagos",
    city: "LAGOS",
    coords: '6°27′N 3°24′E',
    years: "2019 — NOW",
    x: 46.8,
    y: 60.5,
    photo: PHOTOS.heroRain,
    photos: pick("heroRain", "shrine", "neonBar", "trumpeter", "lagoon", "craftsman", "adaeze", "fisherman"),
  },
  {
    id: "sahara",
    city: "SAHARA",
    coords: '29°50′N 6°20′W',
    years: "2025",
    x: 44.0,
    y: 41.0,
    photo: PHOTOS.sahara,
    photos: pick("sahara"),
  },
  {
    id: "paris",
    city: "PARIS",
    coords: '48°51′N 2°21′E',
    years: "2025",
    x: 46.2,
    y: 24.5,
    photo: PHOTOS.paris,
    photos: pick("paris"),
  },
  {
    id: "los-angeles",
    city: "LOS ANGELES",
    coords: '34°03′N 118°15′W',
    years: "2025",
    x: 9.5,
    y: 38.5,
    photo: PHOTOS.spiral,
    photos: pick("spiral"),
  },
  {
    id: "tokyo",
    city: "TOKYO",
    coords: '35°40′N 139°41′E',
    years: "2026",
    x: 90.5,
    y: 37.0,
    photo: PHOTOS.tokyo,
    photos: pick("tokyo", "tokyoMono"),
  },
];

/* ——— journal ——— */

export type JournalEntry = {
  id: string;
  index: string;
  title: string;
  tag: string;
  date: string;
  read: string;
  excerpt: string;
  body: string[];
  photo: Photo;
};

export const JOURNAL: JournalEntry[] = [
  {
    id: "why-i-shoot-at-night",
    index: "01",
    title: "WHY I SHOOT AT NIGHT",
    tag: "ESSAY",
    date: "04.08.2026",
    read: "4 MIN",
    excerpt: "Daylight is Lagos explaining itself. Midnight is Lagos telling the truth.",
    body: [
      "People ask why so much of my work happens after dark. The honest answer is that daylight in Lagos is a negotiation — the sun interrogates everything, flattens it, argues with it. At night the city stops defending itself. A man at a bar window stops being a type and becomes a person. Rain stops being weather and becomes light you can hold.",
      "There is also a discipline the dark teaches. With one stop of light and a fixed lens, you cannot spray and pray. You choose. You wait. You let the frame come to you the way a song comes to a trumpet player in the third set — tired, honest, and completely unavoidable.",
      "My rule: if a scene needs me to shout, it isn’t ready. The night taught me to whisper with a shutter.",
    ],
    photo: PHOTOS.heroRain,
  },
  {
    id: "the-35mm-i-always-carry",
    index: "02",
    title: "THE 35MM I ALWAYS CARRY",
    tag: "GEAR",
    date: "21.06.2026",
    read: "3 MIN",
    excerpt: "One lens, black tape on the logo, sixteen years older than most of my subjects.",
    body: [
      "My 35mm has survived two rainy seasons, one motorcycle accident, and a customs officer in three airports. The focus ring is loose in exactly the way my grip has learned to correct. We are calibrated to each other now.",
      "A 35 forces intimacy. You cannot snipe a portrait from across the street; you have to enter the scene, greet it, earn it. Most of the frames people call brave were just me standing closer than was comfortable, twice.",
      "If the house was burning I would save the negatives first. But the 35 would be in my hand already. It usually is.",
    ],
    photo: PHOTOS.craftsmanHands,
  },
  {
    id: "a-city-that-dreams-awake",
    index: "03",
    title: "A CITY THAT DREAMS AWAKE",
    tag: "FIELD NOTES",
    date: "30.04.2026",
    read: "5 MIN",
    excerpt: "Notes from four nights in Shinjuku, where the rain edits the light for you.",
    body: [
      "Tokyo was the first city that made me slow down without asking me to be quiet. The alleys do the composition for you — every wire, every sign, every umbrella is already placed. Your job is only to arrive at the correct hour and not blink.",
      "I shot seven rolls in four nights and printed eleven frames. That ratio used to embarrass me. Now I understand it as the city’s editing process, not mine. A good alley keeps the change.",
      "Lesson I carried home to Lagos: the background is never waiting politely. It is performing too. Focus past your subject sometimes and let the city have the frame.",
    ],
    photo: PHOTOS.bokeh,
  },
  {
    id: "what-the-rain-taught-me",
    index: "04",
    title: "WHAT THE RAIN TAUGHT ME",
    tag: "NOTES",
    date: "12.02.2026",
    read: "3 MIN",
    excerpt: "Every photograph in this archive survived weather. That is not a coincidence.",
    body: [
      "Rain is the cheapest cinematographer in the world. It doubles every light, softens every shadow, and makes strangers hold still under shelter long enough to become characters.",
      "I stopped checking forecasts years ago. If the sky opens, the shoot improves. Cameras can be replaced; ponchos are four hundred naira; a wet street at midnight is unrepeatable.",
      "The frame on this site’s first screen was made in a storm I was told to cancel. Everything I know about photography is in that decision.",
    ],
    photo: PHOTOS.rainReflections,
  },
];
