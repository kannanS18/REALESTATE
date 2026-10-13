import fs from 'fs';
import { chromium } from 'playwright';

async function generateFavicons() {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/tamil/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe',
    headless: true
  });
  
  const page = await browser.newPage({ viewport: { width: 256, height: 256 } });
  const svg = fs.readFileSync('public/favicon.svg', 'utf8');
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:center;height:100vh;">${svg}</body></html>`);
  
  const svgEl = page.locator('svg');
  await svgEl.screenshot({ path: 'public/favicon.png', omitBackground: true });
  await svgEl.screenshot({ path: 'public/apple-touch-icon.png' });
  await svgEl.screenshot({ path: 'public/favicon-32x32.png' });
  fs.copyFileSync('public/favicon.png', 'public/favicon.ico');
  
  console.log('✓ Successfully generated favicon.png, favicon.ico, and apple-touch-icon.png in public/');
  await browser.close();
}

generateFavicons();
