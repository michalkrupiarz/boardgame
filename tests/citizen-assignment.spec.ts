import { test, expect } from '@playwright/test';

test.describe('Citizen Assignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show city center as initially worked', async ({ page }) => {
    const cityIcon = page.locator('g.hex-tile path[fill="var(--accent)"]');
    await expect(cityIcon).toBeVisible();
  });
});

test.describe('City Side Panels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show City side panels with Infrastructure and Buildings', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();
    
    await expect(page.getByRole('heading', { name: 'Built Infrastructure' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Citizen Assignment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Buildings' })).toBeVisible();
    await expect(page.getByText('Farm')).toBeVisible();
  });

  test('should build a building from side panel', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();
    
    await page.getByRole('button', { name: 'Close City' }).click();
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Next Turn' }).click();
    }
    
    await page.getByRole('button', { name: 'City View' }).click();
    await expect(page.getByRole('heading', { name: 'Available Buildings' })).toBeVisible();
    
    const buildButtons = page.getByRole('button', { name: 'Build' });
    await buildButtons.first().click({ force: true });
    
    const infraPanel = page.getByRole('heading', { name: 'Built Infrastructure' }).locator('..');
    await expect(infraPanel.locator('ul li').first()).toBeVisible();
  });
});
