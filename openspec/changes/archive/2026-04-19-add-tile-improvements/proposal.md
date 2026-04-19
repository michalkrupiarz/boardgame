## Why

Players can harvest natural resources from tiles (via resources field), but cannot improve tiles to increase yields. Adding tile improvements (Farm, Mine, etc.) allows strategic player decisions on which tiles to enhance, adding depth to resource management beyond passive terrain yields.

## What Changes

- Add `improvement` field to Tile interface representing built structures on tiles
- Define ImprovementType enum (Farm, Mine, Quarry,Pasture, Plantation, Well)
- Add improvement construction cost and yield bonus system
- Add UI action to construct improvements on worked tiles

## Capabilities

### New Capabilities
- `tile-improvements`: Players can build improvements on tiles to increase yields. Farms on Plains increase food, Mines on Mountains increase production, etc.

### Modified Capabilities
- None

## Impact

- **Tile Type**: Add improvement field to Tile interface in `src/state/GameState.ts`
- **Improvement Data**: Add ImprovementType enum and improvementBonuses in `src/state/GameState.ts`
- **Yield Calculation**: Update `calculateTurnYield` to include improvement bonuses
- **UI**: Add improvement construction buttons in city/tile view