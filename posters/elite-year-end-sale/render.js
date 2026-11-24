// Render poster.html to PNG (1080x1350, 4:5).
// Usage: node render.js [scale] [output]
//   scale  : device scale factor (default 2 => 2160x2700)
//   output : output file (default aihaa-elite-year-end-sale.png)
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const scale = Number(process.argv[2] || 2);
  const out = path.resolve(__dirname, process.argv[3] || "aihaa-elite-year-end-sale.png");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
  await page.goto("file://" + path.join(__dirname, "poster.html"));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.locator("#poster").screenshot({ path: out });
  await browser.close();
  console.log("Saved", out);
})();
