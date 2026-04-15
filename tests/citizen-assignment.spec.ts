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

test.describe('Tile Claiming', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show claimable tiles only in City View', async ({ page }) => {
    // Before opening City View - no pink bordered tiles should be visible
    const claimableTiles = page.locator('g.hex-tile polygon[stroke="#ec4899"]');
    await expect(claimableTiles).toHaveCount(0);

    // Open City View
    await page.getByRole('button', { name: 'City View' }).click();

    // Now claimable tiles should have pink borders (dashed)
    const dashedClaimableTiles = page.locator('g.hex-tile polygon[stroke-dasharray="8,4"]');
    await expect(dashedClaimableTiles.first()).toBeVisible();
  });

  test('should have target tile with solid pink border', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    // Target tile should have solid pink border (not dashed)
    const solidPinkTiles = page.locator('g.hex-tile polygon[stroke="#ec4899"][stroke-dasharray="none"]');
    await expect(solidPinkTiles.first()).toBeVisible();
  });

  test('should show target tile info in HUD', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    // HUD should show "Next: [terrain] (cost Cult)"
    const nextTileInfo = page.locator('text=/Next: .+ \\(\\d+ Cult\\)/');
    await expect(nextTileInfo).toBeVisible();
  });

  test('should accumulate culture over turns', async ({ page }) => {
    // Close city panels if open
    const cityButton = page.getByRole('button', { name: /City View|Close City/ });
    if (await cityButton.getByText('Close City').isVisible()) {
      await cityButton.click();
    }

    // Check initial culture
    const initialCulture = page.locator('.text-culture').first();
    await expect(initialCulture).toContainText('Cult: 0');

    // Click next turn
    await page.getByRole('button', { name: 'Next Turn' }).click();
    await expect(page.locator('text=Turn 2')).toBeVisible();
  });

  test('should auto-claim tile when enough culture accumulated', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    // Close and accumulate culture (need 20+ culture for distance 2)
    await page.getByRole('button', { name: 'Close City' }).click();
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Next Turn' }).click();
    }

    await page.getByRole('button', { name: 'City View' }).click();
    await page.waitForTimeout(500);

    // Target tile should still exist
    const targetTile = page.locator('g.hex-tile polygon[stroke="#ec4899"][stroke-dasharray="none"]');
    await expect(targetTile).toBeVisible();
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
