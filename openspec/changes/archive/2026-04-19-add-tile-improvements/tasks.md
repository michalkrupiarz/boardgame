## 1. Data Types

- [x] 1.1 Add ImprovementType enum to `src/state/GameState.ts` (Farm, Mine, Quarry, Pasture, Plantation, Well)
- [x] 1.2 Add improvementBonuses record mapping ImprovementType to TerrainModifiers
- [x] 1.3 Add validTerrains mapping (which improvements can be built on which terrain)
- [x] 1.4 Add improvementCosts record
- [x] 1.5 Add improvement field to Tile interface

## 2. Game Logic

- [x] 2.1 Create buildImprovement(state, tileId, improvementType) function in GameState.ts
- [x] 2.2 Update calculateTurnYield to include improvement bonuses
- [x] 2.3 Add validation: can only build on worked tiles
- [x] 2.4 Add validation: improvement must match valid terrain

## 3. UI

- [x] 3.1 Add improvement selector UI in tile/city view
- [x] 3.2 Show improvement on tile details panel
- [x] 3.3 Display improvement construction cost
- [x] 3.4 Disable build button if invalid terrain or insufficient Production

## 4. Testing

- [x] 4.1 Add unit tests for buildImprovement function
- [x] 4.2 Add unit tests for improvement yield stacking
- [x] 4.3 Test validation edge cases