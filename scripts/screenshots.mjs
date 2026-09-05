// Screenshots of the built site for the README. Needs a preview server: `npm run preview` (port 4321).
// Uses playwright from this repo if installed, else from a sibling opentransit-web checkout.
const BASE = process.env.BASE_URL ?? 'http://localhost:4321/opentransit/';
let pw; try { pw = await import('playwright'); } catch { pw = await import('../../opentransit-web/node_modules/playwright/index.mjs'); }
const browser = await pw.chromium.launch();
const shots = [
  ['landing-desktop', BASE, { width: 1280, height: 800 }],
  ['landing-mobile', BASE, { width: 390, height: 844 }],
  ['docs-adding-a-city', BASE + 'docs/adding-a-city/', { width: 1280, height: 800 }],
];
const errors = [];
for (const [name, url, viewport] of shots) {
  const page = await browser.newPage({ viewport });
  page.on('console', (m) => m.type() === 'error' && errors.push(`${name}: ${m.text()}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `docs-screenshots/${name}.png`, fullPage: name.startsWith('landing') });
  await page.close();
}
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('screenshots written to docs-screenshots/');
