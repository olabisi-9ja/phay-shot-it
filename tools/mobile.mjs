/** Mobile viewport QA. node tools/mobile.mjs [url] */
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
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
});
const page = await browser.newPage();
const issues = [];
page.on("pageerror", (e) => issues.push(e.message));
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

for (const stop of [0, 0.09, 0.2, 0.32, 0.45, 0.6, 0.75, 0.88, 1.0]) {
  await page.evaluate((s) => {
    window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * s, behavior: "instant" });
  }, stop);
  await new Promise((r) => setTimeout(r, 1100));
  const name = `mob-${String(Math.round(stop * 100)).padStart(3, "0")}.png`;
  await page.screenshot({ path: join(outDir, name) });
  console.log("✓", name);
}
console.log("pageerrors:", issues.length ? issues.join(" | ") : "none");
await browser.close();
