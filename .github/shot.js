// Screenshots of the 3 TV screens (1920x1080), served from the commit itself so they show exactly that data.json.
const { chromium } = require('playwright');
const out = process.argv[2];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const [i, name] of [[1, 'overall'], [2, 'master'], [3, 'geos']]) {
    await page.goto(`http://localhost:8000/index.html?s=${i}#${i}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${out}/tv_${i}_${name}.png` });
  }
  await browser.close();
})();
