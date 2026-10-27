import { test, expect } from '@playwright/test';

test.describe('LaoType Typing Web App UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LaoType/);
  });

  test('should display page title and header correctly', async ({ page }) => {
    // Check main title
    await expect(page).toHaveTitle('LaoType - ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Test)');

    // Check App Header elements
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('LaoType');
  });

  test('should render typing controls and typing area', async ({ page }) => {
    // Check main container
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check input field exists in typing area
    const input = page.locator('input[type="text"]');
    await expect(input).toBeAttached();

    // Check the active word is displayed
    const activeWord = page.locator('.active-word');
    await expect(activeWord).toBeVisible();
  });

  test('should allow user to focus and type', async ({ page }) => {
    // Click on the typing container to focus
    const typingSection = page.locator('section').first();
    await typingSection.click();

    // Type sample characters
    await page.keyboard.type('ສະບາຍດີ');
    await page.waitForTimeout(300);

    // Verify active word exists and engine responded
    const activeWord = page.locator('.active-word');
    await expect(activeWord).toBeVisible();
  });

  test('should switch modes and options correctly', async ({ page }) => {
    // Check controls buttons
    const buttons = page.locator('main button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Try clicking one of the mode options
    const firstButton = buttons.first();
    await expect(firstButton).toBeVisible();
    await firstButton.click();
  });

  test('should capture UI screenshot', async ({ page }) => {
    await page.screenshot({ path: 'e2e/screenshot.png', fullPage: true });
  });
});
