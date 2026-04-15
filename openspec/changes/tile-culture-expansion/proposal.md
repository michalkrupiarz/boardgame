## Why

The current radius-based cultural expansion is all-or-nothing - gaining culture suddenly unlocks entire rings of tiles at once. This feels unpredictable and removes player agency. Tile-by-tile expansion gives players strategic control over which tiles to claim next.

## What Changes

- **Replace radius thresholds with tile-based claiming** - Instead of unlocking entire rings, each tile requires culture points to claim
- **Manual or auto claiming** - Players can click tiles to claim them, or enable auto-expansion
- **Visual distinction** - Claimed tiles look different from radius-bound tiles
- **Claimed tiles persist** - Once claimed, a tile stays claimed even if total culture drops

## Capabilities

### New Capabilities
- `tile-culture-claim`: Individual tile claiming system where players spend accumulated culture to claim specific tiles adjacent to their territory.

### Modified Capabilities
- `cultural-expansion`: Replace radius-based thresholds with tile-based claiming mechanism

## Impact

- **GameState.ts**: Modify `getCurrentRadius` logic, add new `claimedTileIds` state
- **HexTile/HexMap**: Visual indicators for claimable vs claimed tiles
- **UI**: Click to claim tiles, toggle auto-expansion mode
