## Why
Currently, the city only exists as a UI dashboard concept. Placing the city directly onto the map establishes a geographic origin. Furthermore, tying map harvesting explicitly to a "Cultural Radius" grounds the resource mechanics spatially—preventing wild snowballing by forcing players to invest in Culture before they can harvest distant tiles.

## What Changes
- **Center Placement**: Modify `GameState.ts` to identify `(q: 0, r: 0)` as the City Center.
- **Cultural Radius**: Introduce a dynamic harvesting radius. By default, it is Radius 1 (7 tiles). 
- **Expansion Thresholds**: The radius increases by 1 when the player accumulates specific Culture thresholds (e.g., 50 for Radius 2, 150 for Radius 3).
- **Yield Logic**: Modify the "Next Turn" resource accumulation to ONLY harvest from tiles that fall within the current cultural radius.
- **Visuals**: Enhance `HexTile.tsx` to display a city icon at `0,0`, and visually dim or obscure tiles falling outside the current active radius.

## Capabilities

### New Capabilities
- `center-city-placement`: The mechanism locking the core city geographically to the center grid tile.
- `cultural-expansion`: The logic calculating valid harvesting borders around the city using accumulated Culture thresholds.

### Modified Capabilities
- None

## Impact
Affects core state initialization, turn accumulation loops (`GameState.ts`), and the visual mapping layer (`HexMap.tsx`).
