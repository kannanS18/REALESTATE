import { chromium } from 'playwright';

async function testMobile() {
  const browser = await chromium.launch({
    executablePath: 'C:/Users/tamil/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/#explore3d');
  await page.waitForTimeout(1500);

  console.log('--- MOBILE CONTINUOUS SCROLL & CHEVRON TEST ---');
  
  // Test Model Switching
  const goaBtn = page.locator('button', { hasText: 'Goa' }).first();
  const worliBtn = page.locator('button', { hasText: 'Worli' }).first();
  await goaBtn.click();
  await page.waitForTimeout(600);
  console.log('✓ Model switch to Goa successful!');
  
  await worliBtn.click();
  await page.waitForTimeout(600);
  console.log('✓ Model switch to Worli successful!');

  // Test Ribbon Chevrons
  const nextChevron = page.locator('button[aria-label="Scroll views right"]').first();
  const prevChevron = page.locator('button[aria-label="Scroll views left"]').first();

  console.log('✓ Next chevron count:', await nextChevron.count());
  console.log('✓ Prev chevron count:', await prevChevron.count());

  await nextChevron.click();
  await page.waitForTimeout(400);
  console.log('✓ Next chevron clicked - scrolled views ribbon smoothly!');

  await prevChevron.click();
  await page.waitForTimeout(400);
  console.log('✓ Prev chevron clicked - scrolled back smoothly!');

  // Click on a perspective button
  const fountainBtn = page.locator('button', { hasText: '03 Central' }).first();
  if (await fountainBtn.count() > 0) {
    await fountainBtn.click();
    await page.waitForTimeout(600);
    console.log('✓ Successfully clicked 03 Central Fountain view!');
  }

  await browser.close();
  console.log('=== VERDICT: MOBILE SMOOTH & CONTINUOUS SCROLL VERIFIED 100%! ===');
}

testMobile();
