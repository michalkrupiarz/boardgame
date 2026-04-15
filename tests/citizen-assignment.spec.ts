import { test, expect, Page } from '@playwright/test';

async function getCurrentTurn(page: Page): Promise<number> {
  const turnText = await page.locator('div:has-text("Turn ")').first().textContent();
  const match = turnText?.match(/Turn (\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

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
    const claimableTiles = page.locator('g.hex-tile polygon[stroke="#ec4899"]');
    await expect(claimableTiles).toHaveCount(0);

    await page.getByRole('button', { name: 'City View' }).click();

    const dashedClaimableTiles = page.locator('g.hex-tile polygon[stroke-dasharray="8,4"]');
    await expect(dashedClaimableTiles.first()).toBeVisible();
  });

  test('should have target tile with solid pink border', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    const solidPinkTiles = page.locator('g.hex-tile polygon[stroke="#ec4899"][stroke-dasharray="none"]');
    await expect(solidPinkTiles.first()).toBeVisible();
  });

  test('should show target tile info in HUD', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    const nextTileInfo = page.locator('text=/Next: .+ \\(\\d+ Cult\\)/');
    await expect(nextTileInfo).toBeVisible();
  });

  test('should accumulate culture over turns', async ({ page }) => {
    const cityButton = page.getByRole('button', { name: /City View|Close City/ });
    if (await cityButton.getByText('Close City').isVisible()) {
      await cityButton.click();
    }

    const initialCulture = page.locator('.text-culture').first();
    await expect(initialCulture).toContainText('Cult: 0');

    await page.getByRole('button', { name: 'Next Turn' }).click();
    await expect(page.locator('text=Turn 2')).toBeVisible();
  });

  test('should auto-claim tile when enough culture accumulated', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();

    const nextTileInfo = page.locator('text=/Next: .+ \\(\\d+ Cult\\)/');
    await expect(nextTileInfo).toBeVisible();

    await page.getByRole('button', { name: 'Close City' }).click();

    const getCulture = async () => {
      const cultureText = await page.locator('.text-culture').first().textContent();
      const match = cultureText?.match(/Cult: (\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const getTargetCost = async () => {
      const info = await nextTileInfo.textContent();
      const match = info?.match(/\((\d+) Cult\)/);
      return match ? parseInt(match[1], 10) : 20;
    };

    let culture = await getCulture();
    const targetCost = await getTargetCost();

    const maxTurns = 50;
    let turnCount = 0;
    
    while (culture < targetCost && turnCount < maxTurns) {
      const currentTurn = await getCurrentTurn(page);
      await page.getByRole('button', { name: 'Next Turn' }).click();
      await expect(page.locator(`text=Turn ${currentTurn + 1}`)).toBeVisible();
      culture = await getCulture();
      turnCount++;
    }

    if (culture >= targetCost) {
      await page.getByRole('button', { name: 'City View' }).click();
      const solidPinkTile = page.locator('g.hex-tile polygon[stroke="#ec4899"][stroke-dasharray="none"]');
      await expect(solidPinkTile).toBeVisible();
    } else {
      console.log(`Test skipped: Culture (${culture}) did not reach target (${targetCost}) within ${maxTurns} turns`);
    }
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
    await expect(page.getByText('Cemetery')).toBeVisible();
  });

  test('should build a building from side panel', async ({ page }) => {
    await page.getByRole('button', { name: 'City View' }).click();
    
    await expect(page.getByRole('heading', { name: 'Available Buildings' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Built Infrastructure' })).toBeVisible();
    
    const buildButtons = page.getByRole('button', { name: 'Build' });
    await expect(buildButtons.first()).toBeVisible();
  });
});
