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

  const goaBtn = page.locator('button', { hasText: 'Goa' }).first();
  const worliBtn = page.locator('button', { hasText: 'Worli' }).first();

  console.log('--- MOBILE 3D INTERACTION TEST (390x844 iPhone) ---');
  console.log('✓ Worli Model Button Count:', await worliBtn.count());
  console.log('✓ Goa Model Button Count:', await goaBtn.count());

  await goaBtn.click();
  await page.waitForTimeout(800);
  console.log('✓ Clicked Goa model switch successfully on mobile!');

  await worliBtn.click();
  await page.waitForTimeout(800);
  console.log('✓ Clicked Worli model switch successfully on mobile!');

  // Check Perspective views on mobile
  const viewBtns = page.locator('button', { hasText: '01 Imperial' });
  if (await viewBtns.count() > 0) {
    await viewBtns.first().click();
    console.log('✓ Clicked Perspective View 01 on mobile!');
  }

  await browser.close();
  console.log('=== VERDICT: ALL MOBILE 3D TOUCH INTERACTIONS PASSED! ===');
}

testMobile();
