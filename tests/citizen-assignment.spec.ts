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
    const claimedUnworkedTile = page.getByTestId('hex-tile')
        .filter({ hasNot: page.getByTestId('worker-head') })
        .filter({ hasNot: page.locator('path[fill="var(--accent)"]') })
        .filter({ has: page.locator('polygon[style*="opacity: 1"]') }) // Wait, opacity is on the <g>
        .first();
    
    // Actually, let's just use the style of the g itself
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
});
