// Render a poster HTML file to PNG (1080x1350, 4:5).
// Usage: node render.js [html] [scale] [output]
//   html   : poster HTML file (default poster.html)
//   scale  : device scale factor (default 2 => 2160x2700)
//   output : output file (default <html name>.png, poster.html => aihaa-elite-year-end-sale.png)
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const html = process.argv[2] || "poster.html";
  const scale = Number(process.argv[3] || 2);
  const defOut = html === "poster.html" ? "aihaa-elite-year-end-sale.png" : html.replace(/\.html$/, ".png");
  const out = path.resolve(__dirname, process.argv[4] || defOut);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
  await page.goto("file://" + path.join(__dirname, html));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.locator("#poster").screenshot({ path: out });
  await browser.close();
  console.log("Saved", out);
})();
