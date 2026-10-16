import { chromium } from 'playwright';
import { preview } from 'vite';
import path from 'path';

async function generateOgPreview() {
  console.log('Starting Vite preview server...');
  const server = await preview({
    preview: { port: 4174 },
    configFile: path.resolve('vite.config.js'),
  });

  console.log('Launching browser for OG capture...');
  const browser = await chromium.launch({
    executablePath: 'C:/Users/tamil/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe',
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2
  });

  await page.goto('http://localhost:4174/#home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Navigate to 3D Villa view to capture the flagship 3D studio and SOLIS brand
  const villaBtn = page.locator('button:has-text("3D Villa")').first();
  if (await villaBtn.isVisible()) {
    await villaBtn.click();
    await page.waitForTimeout(3000); // Wait for WebGL 3D model to render
  }

  console.log('Capturing og-preview.png...');
  await page.screenshot({ path: 'public/og-preview.png' });
  await page.screenshot({ path: 'dist/og-preview.png' });

  console.log('✓ Successfully saved 1200x630 og-preview.png with SOLIS brand!');
  await browser.close();
  await server.close();
  process.exit(0);
}

generateOgPreview().catch(err => {
  console.error(err);
  process.exit(1);
});
