## 1. Add Map Generation Tests

- [x] 1.1 Add test for `generateInitialMap` with size 1 (single center tile)
- [x] 1.2 Add test for `generateInitialMap` with size 3 (7 tiles, radius 1)
- [x] 1.3 Add test for `generateInitialMap` with size 5 (19 tiles, radius 2)
- [x] 1.4 Add test verifying center tile is always Plains terrain

## 2. Add Radius and Cost Tests

- [x] 2.1 Add tests for `getCurrentRadius` at all culture thresholds (0, 50, 150, 350)
- [x] 2.2 Add tests for `getFoodThresholdForNextPopulation` for populations 1, 2, 3

## 3. Add Tile Utility Tests

- [x] 3.1 Add tests for `getClaimableTiles` returning correct adjacent tiles
- [x] 3.2 Add tests for `toggleAutoExpand` toggling state correctly
- [x] 3.3 Add tests for `getTileYieldSum` for all terrain types

## 4. Verify and Run

- [x] 4.1 Run all tests to verify they pass
- [x] 4.2 Fix any failing tests
- [x] 4.3 Run lint to ensure code quality
