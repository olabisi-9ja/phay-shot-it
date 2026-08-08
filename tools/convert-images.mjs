/**
 * PHAY SHOT IT — asset pipeline
 * Converts master art (AI masters + licensed search frames) into the web-ready
 * responsive WebP set under /public/images. Master art stays out of git (see .gitignore).
 *
 *   node tools/convert-images.mjs
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ART = join(root, "art");
const OUT = join(root, "public", "images");
mkdirSync(OUT, { recursive: true });

/** @typedef {{src:string, out:string, widths:number[], greyscale?:boolean, contrast?:boolean, extract?:{l:number,t:number,w:number,h:number}, quality?:number}} Job */

/** @type {Job[]} */
const jobs = [
  // ——— masters ————————————————————————————————————————————————
  { src: "hero-rain-neon.png",               out: "lagos-rain-neon-nocturne",      widths: [800, 1600] },
  { src: "featured-concert-hands.png",       out: "lagos-shrine-concert-hands",    widths: [800, 1600] },
  { src: "portrait-elder-craftsman-bw.png",  out: "lagos-elder-craftsman-bw",      widths: [700, 1100] },
  { src: "portrait-adaeze-golden.png",       out: "lagos-rooftop-golden-portrait", widths: [700, 1100] },
  { src: "portrait-studio-red.png",          out: "lagos-studio-red-portrait",     widths: [700, 1100] },
  { src: "portrait-trumpeter-blue.png",      out: "lagos-trumpeter-blue-portrait", widths: [700, 1100] },
  { src: "portrait-fisherman-mist.png",      out: "lagos-fisherman-mist-portrait", widths: [700, 1100] },
  { src: "place-lagoon-dawn.png",            out: "lagos-lagoon-dawn-boats",       widths: [800, 1500] },
  { src: "place-tokyo-rain-alley.png",       out: "tokyo-rain-neon-alley",         widths: [700, 1100] },
  { src: "place-paris-dawn-rooftops.png",    out: "paris-dawn-rooftops-mist",      widths: [800, 1500] },
  { src: "kept/place-spiral-white-src.jpg",  out: "los-angeles-white-arcade",      widths: [800, 1600, 2200] },
  { src: "kept/night-neon-bar-src.jpg",      out: "lagos-neon-bar-silhouette",     widths: [500] },
  { src: "kept/night-bokeh-rain-src.jpg",    out: "kyiv-rain-bokeh-window",        widths: [500] },
  { src: "kept/place-sahara-figure-src.jpg", out: "sahara-dune-lone-figure",       widths: [500] },

  // ——— derived frames (alternate crops & grades — same negatives, new prints) ———
  {
    src: "featured-concert-hands.png", out: "lagos-shrine-hands-detail",
    extract: { l: 0.315, t: 0.40, w: 0.375, h: 0.58 }, widths: [800], quality: 80,
  },
  {
    src: "featured-concert-hands.png", out: "lagos-shrine-concert-mono",
    greyscale: true, contrast: true, widths: [800, 1600],
  },
  {
    src: "hero-rain-neon.png", out: "lagos-rain-reflections-mono",
    extract: { l: 0.24, t: 0.60, w: 0.52, h: 0.40 }, greyscale: true, contrast: true, widths: [900],
  },
  { src: "place-tokyo-rain-alley.png", out: "tokyo-rain-alley-mono", greyscale: true, contrast: true, widths: [700, 1100] },
  { src: "portrait-trumpeter-blue.png", out: "lagos-trumpeter-mono", greyscale: true, contrast: true, widths: [700, 1100] },
  {
    src: "portrait-elder-craftsman-bw.png", out: "lagos-craftsman-hands-detail",
    extract: { l: 0.295, t: 0.345, w: 0.42, h: 0.235 }, widths: [800],
  },
  {
    src: "place-lagoon-dawn.png", out: "lagos-lagoon-panoramic",
    extract: { l: 0, t: 0.315, w: 1, h: 0.435 }, widths: [1200, 2000],
  },
];

let produced = 0;

for (const job of jobs) {
  const srcPath = join(ART, job.src);
  if (!existsSync(srcPath)) {
    console.error(`✗ MISSING SOURCE: ${job.src}`);
    process.exitCode = 1;
    continue;
  }
  let img = sharp(srcPath);
  const meta = await img.metadata();
  const sw = meta.width ?? 0;
  const sh = meta.height ?? 0;

  if (job.extract) {
    img = img.extract({
      left: Math.round(job.extract.l * sw),
      top: Math.round(job.extract.t * sh),
      width: Math.round(job.extract.w * sw),
      height: Math.round(job.extract.h * sh),
    });
  }
  if (job.greyscale) img = img.grayscale();
  if (job.contrast) img = img.linear(1.08, -8);
  img = img.sharpen({ sigma: 0.55, m1: 0.5, m2: 0.7 });

  const cw = job.extract ? Math.round(job.extract.w * sw) : sw;

  for (const w of job.widths) {
    const target = Math.min(w, cw);
    const file = join(OUT, `${job.out}-${target}w.webp`);
    await img
      .clone()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: job.quality ?? 78, effort: 5 })
      .toFile(file);
    const o = await sharp(file).metadata();
    console.log(`✓ ${job.out}-${target}w.webp  ${o.width}×${o.height}`);
    produced++;
  }
}

// Open Graph card — 1200×630 crop of the hero, gently darkened for type legibility.
await sharp(join(ART, "hero-rain-neon.png"))
  .resize(1200, 630, { cover: true, position: "centre" })
  .modulate({ brightness: 0.86 })
  .jpeg({ quality: 84 })
  .toFile(join(root, "public", "og.jpg"));
console.log("✓ og.jpg 1200×630");

// Apple touch icon from the aperture mark.
const svgAperture = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#080808"/><g fill="none" stroke="#F1F1EF" stroke-width="2.6"><circle cx="32" cy="32" r="21"/><path d="M32 11 L41 32 M53 32 L32 41 M32 53 L23 32 M11 32 L32 23 M45.8 18.2 L32 32 M18.2 45.8 L32 32"/></g></svg>`;
await sharp(Buffer.from(svgAperture)).resize(180, 180).png().toFile(join(root, "public", "icon-180.png"));
console.log("✓ icon-180.png");

console.log(`\nDone — ${produced} responsive frames written to /public/images`);
