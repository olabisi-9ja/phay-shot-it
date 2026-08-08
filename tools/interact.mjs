/**
 * Interaction QA: drives the real browser through overlays and hover states.
 *   node tools/interact.mjs [url]
 */
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "tools", "shot");
mkdirSync(outDir, { recursive: true });

const url = process.argv[2] ?? "http://localhost:3000";

const browser = await puppeteer.launch({
  args: [...chromium.args, "--disable-gpu"],
  executablePath: await chromium.executablePath(),
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: "/tmp/nss-stub" },
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
const issues = [];
page.on("console", (m) => {
  if (m.type() === "error") issues.push(`[console.error] ${m.text()}`);
});
page.on("pageerror", (e) => issues.push(`[pageerror] ${e.message}`));

await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4500));

const shot = async (name) => {
  await page.screenshot({ path: join(outDir, name) });
  console.log("✓", name);
};

// 1. menu overlay
await page.click(".nav__index");
await new Promise((r) => setTimeout(r, 1200));
await page.hover(".menu__item .word"); // first item preview
await new Promise((r) => setTimeout(r, 600));
await shot("ix-menu.png");
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 900));

// 2. collections row hover → preview
const row = await page.$$(".cols__row");
const bb = await row[2].boundingBox();
await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
await new Promise((r) => setTimeout(r, 900));
await shot("ix-collections-hover.png");

// 3. open collection overlay (shelf 03 NOCTURNE), click inside strip
await page.evaluate(() => {
  const rows = document.querySelectorAll(".cols__row");
  rows[2]?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 800));
// native scrollIntoView may be fighting lenis; click via DOM
await page.evaluate(() => {
  const rows = document.querySelectorAll(".cols__row");
  rows[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 1400));
await shot("ix-collection-overlay.png");
// next frame via arrow key
await page.keyboard.press("ArrowRight");
await new Promise((r) => setTimeout(r, 900));
await shot("ix-collection-frame2.png");
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 800));

// 4. scroll to gallery, click a tile → lightbox
await page.evaluate(() => {
  document.getElementById("archive")?.scrollIntoView();
  window.scrollBy(0, innerHeight * 0.6);
});
await new Promise((r) => setTimeout(r, 1600));
await page.evaluate(() => {
  const tiles = document.querySelectorAll(".gal__tile");
  tiles[6].dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 1100));
await shot("ix-lightbox.png");
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 700));

// 5. map hover card
await page.evaluate(() => {
  document.getElementById("map")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1400));
await page.evaluate(() => {
  const nodes = document.querySelectorAll(".map__node");
  nodes[0].dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 700));
await shot("ix-map-hover.png");

// 6. journal accordion
await page.evaluate(() => {
  document.getElementById("journal")?.scrollIntoView();
});
await new Promise((r) => setTimeout(r, 1000));
await page.evaluate(() => {
  document.querySelector(".journal__row")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 900));
await shot("ix-journal-open.png");

// 7. loader capture on fresh load
await page.goto(url, { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 450));
await shot("ix-loader.png");

console.log("issues:", issues.length ? issues.join("\n") : "none");
await browser.close();
