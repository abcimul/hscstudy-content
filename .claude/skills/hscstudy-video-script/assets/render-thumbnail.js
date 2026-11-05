// Render an HSC Study thumbnail or Reels cover HTML to PNG.
// Usage:
//   node render-thumbnail.js <thumbnail.html> <out-dir>          → thumbnail-1280x720.png, thumbnail-2560x1440.png
//   node render-thumbnail.js <cover.html> <out-dir> --reel       → cover-1080x1920.png
//   add --guides (with --reel) to also write cover-safe-zones.png, a check image with the unsafe zones shaded
//   (keep it out of the video folder; it is only for checking).
// Needs Playwright with Chromium (preinstalled in Claude Code cloud sessions).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const reel = args.includes('--reel');
const guides = args.includes('--guides');
const [src, outDir = '.'] = args.filter((a) => !a.startsWith('--'));
if (!src) {
  console.error('usage: node render-thumbnail.js <file.html> <out-dir> [--reel [--guides]]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const W = reel ? 1080 : 1280;
const H = reel ? 1920 : 720;
const scales = reel ? [1] : [1, 2];
const name = reel ? 'cover' : 'thumbnail';

(async () => {
  const browser = await chromium.launch();
  for (const scale of scales) {
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
    await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll('.left, .fit')].some((el) => el.scrollWidth > el.clientWidth + 1),
    );
    if (overflow) console.warn('warning: the text column overflows; lower the .n font-size');
    if (reel) {
      // every text element must stay inside the safe area x 80–940, y 240–1500
      const outside = await page.evaluate(() =>
        [...document.querySelectorAll('.head *')]
          .filter((el) => el.childElementCount === 0 && el.textContent.trim())
          .map((el) => ({ t: el.textContent.trim(), r: el.getBoundingClientRect() }))
          .filter(({ r }) => r.left < 80 || r.right > 940 || r.top < 240 || r.bottom > 1500)
          .map(({ t, r }) => `${t} (${Math.round(r.left)},${Math.round(r.top)})–(${Math.round(r.right)},${Math.round(r.bottom)})`),
      );
      if (outside.length) console.warn('warning: text outside the Reels safe area:\n  ' + outside.join('\n  '));
    }
    const out = path.join(outDir, `${name}-${W * scale}x${H * scale}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
    console.log('wrote', out);
    if (reel && guides) {
      await page.evaluate(() => {
        const z = (css) => {
          const d = document.createElement('div');
          d.style.cssText = 'position:fixed;background:rgba(220,38,38,.35);z-index:99;' + css;
          document.body.appendChild(d);
        };
        z('left:0;top:0;width:1080px;height:220px');
        z('left:0;bottom:0;width:1080px;height:420px');
        z('right:0;top:220px;width:140px;height:1280px');
        const g = document.createElement('div');
        g.style.cssText = 'position:fixed;left:0;top:240px;width:1080px;height:1440px;outline:6px dashed #FBBF24;z-index:99';
        document.body.appendChild(g);
      });
      const gout = path.join(outDir, 'cover-safe-zones.png');
      await page.screenshot({ path: gout, clip: { x: 0, y: 0, width: W, height: H } });
      console.log('wrote', gout, '(red = covered by platform UI, dashed = 3:4 grid crop)');
    }
    await page.close();
  }
  await browser.close();
})();
