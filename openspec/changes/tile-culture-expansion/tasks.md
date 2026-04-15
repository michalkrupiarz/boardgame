## 1. State Model Changes

- [ ] 1.1 Add `claimedTileIds: string[]` to GameState interface
- [ ] 1.2 Add `autoExpand: boolean` to GameState interface
- [ ] 1.3 Add `claimTile(state, tileId)` function
- [ ] 1.4 Add `getClaimCost(distance)` function (distance * 10, min 10)
- [ ] 1.5 Add `getClaimableTiles(state)` helper function
- [ ] 1.6 Add `isAdjacentToClaimed(tile, claimedTileIds)` helper
- [ ] 1.7 Update `calculateTurnYield` to check `claimedTileIds` instead of radius
- [ ] 1.8 Update `nextTurn` to handle auto-expansion

## 2. UI - Visual States

- [ ] 2.1 Update HexTile to show claimed/claimable/unavailable states
- [ ] 2.2 Add claimable visual style (dashed border, glow)
- [ ] 2.3 Add unavailable visual style (dimmed)
- [ ] 2.4 Update TileInfoPanel to show claim status

## 3. UI - Interaction

- [ ] 3.1 Add click handler to claimable tiles
- [ ] 3.2 Add auto-expand toggle button in HUD
- [ ] 3.3 Show claim cost on hover over claimable tiles
- [ ] 3.4 Show error when attempting to claim without enough culture

## 4. Migration

- [ ] 4.1 Migrate existing saves: auto-claim all tiles within current radius 1

## 5. Testing

- [ ] 5.1 Add E2E test: Claim a tile manually
- [ ] 5.2 Add E2E test: Cannot claim without enough culture
- [ ] 5.3 Add E2E test: Auto-expand claims tiles
- [ ] 5.4 Add E2E test: Cannot claim non-adjacent tiles
