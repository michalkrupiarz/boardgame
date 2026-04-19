## 1. Define Resource Types

- [x] 1.1 Add ResourceType type definition (iron, stone, wheat, wine, gems, goldore)
- [x] 1.2 Add resourceBonuses mapping with yield values

## 2. Update Tile Interface

- [x] 2.1 Add optional `resource` field to Tile interface
- [x] 2.2 Update resourceBonuses lookup

## 3. Update Map Generation

- [x] 3.1 Modify generateInitialMap to place resources on ~10-15% of tiles
- [x] 3.2 Ensure center tile never has a resource
- [x] 3.3 Make resource placement deterministic

## 4. Update Yield Calculation

- [x] 4.1 Update calculateTurnYield to include resource bonuses
- [x] 4.2 Test stacking with terrain bonuses

## 5. Update UI

- [x] 5.1 Add resource indicator to tile display
- [x] 5.2 Show resource in tile info panel

## 6. Add Tests

- [x] 6.1 Add unit tests for resource bonuses
- [x] 6.2 Add unit tests for map generation with resources
- [x] 6.3 Update E2E tests if needed

## 7. Verify

- [x] 7.1 Run unit tests
- [x] 7.2 Run E2E tests
- [x] 7.3 Run lint
- [x] 7.4 Build the app