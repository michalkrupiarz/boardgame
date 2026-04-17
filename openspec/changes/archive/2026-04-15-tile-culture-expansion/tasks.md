## 1. State Model Changes

- [x] 1.1 Add `claimedTileIds: string[]` to GameState interface
- [x] 1.2 Add `autoExpand: boolean` to GameState interface
- [x] 1.3 Add `claimTile(state, tileId)` function
- [x] 1.4 Add `getClaimCost(distance)` function (distance * 10, min 10)
- [x] 1.5 Add `getClaimableTiles(state)` helper function
- [x] 1.6 Add `isAdjacentToClaimed(tile, claimedTileIds)` helper
- [x] 1.7 Update `calculateTurnYield` to check `claimedTileIds` instead of radius
- [x] 1.8 Update `nextTurn` to handle auto-expansion

## 2. UI - Visual States

- [x] 2.1 Update HexTile to show claimed/claimable/unavailable states
- [x] 2.2 Add claimable visual style (dashed border)
- [x] 2.3 Add unavailable visual style (dimmed)
- [x] 2.4 Update TileInfoPanel to show claim status

## 3. UI - Interaction

- [x] 3.1 Add click handler to claimable tiles
- [x] 3.2 Add auto-expand toggle button in HUD
- [x] 3.3 Show claim cost in TileInfoPanel
- [x] 3.4 Show error when attempting to claim without enough culture

## 4. Testing

- [x] 4.1 Basic E2E tests for side panels and buildings
- [ ] 4.2 Add E2E test: Claim a tile manually
- [ ] 4.3 Add E2E test: Auto-expand claims tiles
