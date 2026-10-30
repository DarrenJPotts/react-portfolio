import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('output', { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('.boot-loader.is-leaving', { timeout: 3000 }).catch(() => {});
await page.waitForSelector('.desktop-icon', { state: 'visible' });
await page.screenshot({ path: 'output/desktop.png', fullPage: true });
assert.equal(await page.locator('.desktop-icon').count(), 2);

await page.locator('.desktop-icon').first().click();
assert.equal(await page.locator('.project-window').count(), 1);
await page.getByRole('button', { name: 'Close project window' }).click();
await page.locator('.desktop-dock-pet').click();
assert.equal(await page.locator('.dog-photo-window img').getAttribute('src'), '/dog.png');
await page.getByRole('button', { name: 'Close dog photo' }).click();
await page.locator('.cv-icon').click();
assert.equal(await page.locator('.file-window').count(), 1);

for (const width of [375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
    `Horizontal overflow at ${width}px`,
  );
}

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: 'domcontentloaded' });
await page
  .getByRole('button', { name: 'Swipe up or tap to explore the portfolio' })
  .click();
assert.equal(await page.locator('.mobile-home').count(), 1);
await page.screenshot({ path: 'output/mobile-home-viewport.png' });
await page.screenshot({ path: 'output/mobile-home.png', fullPage: true });
await page.locator('.mobile-dock-pet').click();
assert.equal(
  await page.locator('.mobile-dog-window img').getAttribute('src'),
  '/dog.png',
);
await page.screenshot({ path: 'output/mobile-dog.png', fullPage: true });
assert.deepEqual(errors, []);
await browser.close();
console.log(
  'Passed: desktop projects, CV, dog photo, mobile unlock, and responsive overflow checks.',
);
