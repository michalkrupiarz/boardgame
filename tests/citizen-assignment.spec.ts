import { test, expect } from '@playwright/test';

test.describe('Citizen Assignment', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the app
    await page.goto('/');
  });

  test('should show city center as initially worked', async ({ page }) => {
    // City center is at (0,0). In HexMap, it's rendered as a HexTile with isCity=true.
    // We expect the city icon to be present.
    const cityIcon = page.locator('g.hex-tile path[fill="var(--accent)"]');
    await expect(cityIcon).toBeVisible();
  });

  test('should allow assigning and removing a citizen', async ({ page }) => {
    // 1. Advance turn to gain population
    const nextTurnButton = page.getByRole('button', { name: 'Next Turn' });
    await nextTurnButton.click();
    await expect(page.locator('text=Turn 2')).toBeVisible();

    // 2. Find a tile that was auto-assigned a worker
    const workedTile = page.getByTestId('hex-tile').filter({ 
        has: page.getByTestId('worker-head'),
        hasNot: page.locator('path[fill="var(--accent)"]') 
    }).first();
    
    // Get the specific ID of this tile to make the locator stable
    const tileId = await workedTile.getAttribute('data-tile-id');
    const stableTile = page.locator(`g[data-tile-id="${tileId}"]`);

    // 3. Click the worked tile and remove the citizen
    await stableTile.locator('polygon').click({ force: true });
    await expect(page.locator('.glass-panel h3')).toBeVisible();
    
    const toggleButton = page.getByTestId('toggle-worker-button');
    await expect(toggleButton).toHaveText('Remove Citizen');
    await toggleButton.click({ force: true });

    // 4. Verify worker icon is gone (Wait for removal animation)
    await expect(stableTile.getByTestId('worker-head')).not.toBeVisible();
    
    // 5. Re-assign the citizen
    await expect(toggleButton).toHaveText('Assign Citizen');
    await toggleButton.click({ force: true });

    // 6. Verify worker icon is back
    await expect(stableTile.getByTestId('worker-head')).toBeVisible();
  });

  test('should respect population limits', async ({ page }) => {
    // Initially pop 1. City center is worked. Total workers = 1.
    // We need to find a tile that is CLAIMED (within radius) but UNWORKED.
    // Claimed tiles have opacity 1 in our CSS-in-JS.
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

  test('should assign citizen from City View map', async ({ page }) => {
    // 1. Open City View
    await page.getByRole('button', { name: 'City View' }).click();
    
    // 2. Verify City View is open with Citizen Assignment panel
    await expect(page.getByRole('heading', { name: 'Citizen Assignment' })).toBeVisible();
    
    // 3. Advance turns to gain population
    await page.getByRole('button', { name: 'Back to Map' }).click();
    const nextTurnButton = page.getByRole('button', { name: 'Next Turn' });
    await nextTurnButton.click();
    await nextTurnButton.click();
    
    // 4. Open City View again
    await page.getByRole('button', { name: 'City View' }).click();
    
    // 5. Find a worker icon on the City View map (should be visible due to auto-assignment)
    // The City View map is inside a different container
    const cityViewMap = page.locator('.glass-panel').filter({ has: page.getByRole('heading', { name: 'Citizen Assignment' }) });
    
    // Find an unworked tile in City View (opacity 1 but no worker)
    const unworkedTile = cityViewMap.locator('g.hex-tile[style*="opacity: 1"]')
        .filter({ hasNot: page.locator('path[fill="var(--accent)"]') })
        .filter({ hasNot: page.getByTestId('worker-head') })
        .first();
    
    const tileId = await unworkedTile.getAttribute('data-tile-id');
    
    // 6. Click to assign citizen
    await unworkedTile.locator('polygon').click({ force: true });
    
    // 7. Verify worker icon appears on the tile
    const workedTile = cityViewMap.locator(`g[data-tile-id="${tileId}"]`);
    await expect(workedTile.getByTestId('worker-head')).toBeVisible();
  });

  test('should unassign citizen from City View map', async ({ page }) => {
    // 1. Advance turns to gain population and auto-assign citizens
    const nextTurnButton = page.getByRole('button', { name: 'Next Turn' });
    await nextTurnButton.click();
    await nextTurnButton.click();
    
    // 2. Open City View
    await page.getByRole('button', { name: 'City View' }).click();
    
    // 3. Find the City View map container
    const cityViewMap = page.locator('.glass-panel').filter({ has: page.getByRole('heading', { name: 'Citizen Assignment' }) });
    
    // 4. Find a worked tile (not city center)
    const workedTile = cityViewMap.locator('g.hex-tile[style*="opacity: 1"]')
        .filter({ has: page.getByTestId('worker-head') })
        .filter({ hasNot: page.locator('path[fill="var(--accent)"]') })
        .first();
    
    const tileId = await workedTile.getAttribute('data-tile-id');
    
    // 5. Click to unassign citizen
    await workedTile.locator('polygon').click({ force: true });
    
    // 6. Verify worker icon is removed
    const tileAfter = cityViewMap.locator(`g[data-tile-id="${tileId}"]`);
    await expect(tileAfter.getByTestId('worker-head')).not.toBeVisible();
  });
});
