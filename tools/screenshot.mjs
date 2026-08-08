/**
 * Visual QA harness (dev-only, not part of the app).
 * Renders the site in headless Chromium and captures full-page
 * sectional screenshots into tools/shot/.
 *
 *   node tools/screenshot.mjs [url] [scrollStops...]
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
// fractional scroll stops through the document
const stops = process.argv.length > 3
  ? process.argv.slice(3).map(Number)
  : [0, 0.06, 0.14, 0.24, 0.34, 0.44, 0.54, 0.64, 0.74, 0.84, 0.94, 1.0];

const browser = await puppeteer.launch({
  args: [...chromium.args, "--disable-gpu", "--font-render-hinting=none"],
  executablePath: await chromium.executablePath(),
  headless: true,
  env: { ...process.env, LD_LIBRARY_PATH: "/tmp/nss-stub" },
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
page.setDefaultTimeout(60000);

const consoleMessages = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") consoleMessages.push(`[${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => consoleMessages.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => consoleMessages.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`));

await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

// let the loader finish and fonts settle
await new Promise((r) => setTimeout(r, 4200));

for (const stop of stops) {
  await page.evaluate((s) => {
    const html = document.documentElement;
    // neutralize smooth scroll for deterministic captures
    window.scrollTo({ top: (html.scrollHeight - innerHeight) * s, behavior: "instant" });
  }, stop);
  await new Promise((r) => setTimeout(r, 1400));
  const name = `shot-${String(Math.round(stop * 100)).padStart(3, "0")}.png`;
  await page.screenshot({ path: join(outDir, name) });
  console.log("✓", name);
}

const metrics = await page.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  innerHeight,
  title: document.title,
}));
console.log("page:", JSON.stringify(metrics));
console.log("console issues:", consoleMessages.length ? consoleMessages.join("\n") : "none");

await browser.close();
