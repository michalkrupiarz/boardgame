## 1. State Logic (`src/state/GameState.ts`)

- [ ] 1.1 Update the `City` interface to include `workedTileIds: string[]` and `lockedTileIds: string[]`.
- [ ] 1.2 Update `getInitialState()` to initialize `workedTileIds` with the city center (coord `0,0`) or a starting worker.
- [ ] 1.3 Add a helper `getTileYieldSum(tile: Tile): number` to rank tiles for auto-assignment.
- [ ] 1.4 Update `calculateTurnYield()` to only harvest resources from `workedTileIds` and the city center.
- [ ] 1.5 Implement `toggleWorkedTile(state, tileId)` with manual locking logic.
- [ ] 1.6 Implement `autoAssignCitizens(state)` following the highest-yield strategy.

## 2. Visualization Updates (`src/components/Map/HexTile.tsx`)

- [ ] 2.1 Update `HexTileProps` to accept `isWorked: boolean` and `isLocked: boolean`.
- [ ] 2.2 Add an SVG `<path>` for a "human head" icon in the upper right corner of the tile.
- [ ] 2.3 Style the icon differently based on `isLocked`.

## 3. Map Integration (`src/components/Map/HexMap.tsx` and `App.tsx`)

- [ ] 3.1 Update `HexMap` to pass `isWorked` and `isLocked` props to `HexTile`.
- [ ] 3.2 Update `App.tsx` or `HexMap.tsx` to handle clicks that toggle worked status.
- [ ] 3.3 Ensure `autoAssignCitizens` is called when population grows (in `nextTurn`).
- [ ] 3.4 Add a way to manually trigger auto-assign (optional but recommended).
