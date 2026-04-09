import { test, expect } from '@playwright/test';

test.describe('Citizen Assignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show city center as initially worked', async ({ page }) => {
    const cityIcon = page.locator('g.hex-tile path[fill="var(--accent)"]');
    await expect(cityIcon).toBeVisible();
  });

  test('should allow assigning and removing a citizen', async ({ page }) => {
    const nextTurnButton = page.getByRole('button', { name: 'Next Turn' });
    await nextTurnButton.click();
    await expect(page.locator('text=Turn 2')).toBeVisible();

    const workedTile = page.getByTestId('hex-tile').filter({ 
        has: page.getByTestId('worker-head'),
        hasNot: page.locator('path[fill="var(--accent)"]') 
    }).first();
    
    const tileId = await workedTile.getAttribute('data-tile-id');
    const stableTile = page.locator(`g[data-tile-id="${tileId}"]`);

    await stableTile.locator('polygon').click({ force: true });
    await expect(page.locator('.glass-panel h3')).toBeVisible();
    
    const toggleButton = page.getByTestId('toggle-worker-button');
    await expect(toggleButton).toHaveText('Remove Citizen');
    await toggleButton.click({ force: true });

    await expect(stableTile.getByTestId('worker-head')).not.toBeVisible();
    
    await expect(toggleButton).toHaveText('Assign Citizen');
    await toggleButton.click({ force: true });

    await expect(stableTile.getByTestId('worker-head')).toBeVisible();
  });

  test('should respect population limits', async ({ page }) => {
    const unworkedInRadius = page.locator('g.hex-tile[style*="opacity: 1"]')
        .filter({ hasNot: page.getByTestId('worker-head') })
        .filter({ hasNot: page.locator('path[fill="var(--accent)"]') })
        .first();

    await unworkedInRadius.click({ force: true });
    
    const toggleButton = page.getByTestId('toggle-worker-button');
    await expect(toggleButton).toHaveText('Assign Citizen');
    await expect(toggleButton).toBeDisabled();
    await expect(page.locator('text=Population limit reached!')).toBeVisible();
  });

  test('should show City side panels with Infrastructure and Buildings', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();
    
    await expect(page.getByRole('heading', { name: 'Built Infrastructure' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Citizen Assignment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Buildings' })).toBeVisible();
    await expect(page.getByText('Farm')).toBeVisible();
    await expect(page.getByText('Mine')).toBeVisible();
    await expect(page.getByText('Market')).toBeVisible();
  });

  test('should build a building from side panel', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();
    
    // Close and accumulate production (start with 10, gain ~4 per turn, need 20 for Farm)
    await page.getByRole('button', { name: 'Close City' }).click();
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Next Turn' }).click();
    }
    
    // Open city view
    await page.getByRole('button', { name: 'City View' }).click();
    
    // Wait for panel to be visible and find Build button by text
    await expect(page.getByRole('heading', { name: 'Available Buildings' })).toBeVisible();
    
    // Find the first enabled Build button (Farm is cheapest at 20)
    const buildButtons = page.getByRole('button', { name: 'Build' });
    const count = await buildButtons.count();
    
    // Click the first one (Farm should be enabled after enough turns)
    const firstButton = buildButtons.first();
    await firstButton.click({ force: true });
    
    // Verify something was built
    const infraPanel = page.getByRole('heading', { name: 'Built Infrastructure' }).locator('..');
    await expect(infraPanel.locator('ul li').first()).toBeVisible();
  });

  test('should toggle citizen by clicking tile when city panels open', async ({ page }) => {
    // Open city panels
    await page.getByRole('button', { name: 'City View' }).click();
    await expect(page.getByRole('heading', { name: 'Citizen Assignment' })).toBeVisible();
    
    // Find an unworked tile within radius (opacity 1, not city center, no worker)
    const unworkedTile = page.locator('g.hex-tile[style*="opacity: 1"]')
      .filter({ hasNot: page.locator('path[fill="var(--accent)"]') })
      .filter({ hasNot: page.getByTestId('worker-head') })
      .first();
    
    const tileId = await unworkedTile.getAttribute('data-tile-id');
    
    // Click to assign citizen
    await unworkedTile.locator('polygon').click({ force: true });
    
    // Verify worker icon appears
    const workedTile = page.locator(`g[data-tile-id="${tileId}"]`);
    await expect(workedTile.getByTestId('worker-head')).toBeVisible();
    
    // Click again to unassign
    await workedTile.locator('polygon').click({ force: true });
    await expect(workedTile.getByTestId('worker-head')).not.toBeVisible();
  });
});
