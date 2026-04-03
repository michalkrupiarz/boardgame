## Why
Currently, the SVG city icon is inadvertently mapped toward the topmost edge of the `0,0` hexagon tile piece due to uncalibrated internal path anchoring. Centering the city icon geometrically inside the tile ensures a more polished, premium aesthetic and prevents visuals from awkwardly clipping out of hexagon bounds.

## What Changes
- Reconfigure the `<path>` translation metrics inside `HexTile.tsx` bounding the city icon perfectly within the horizontal and vertical origins of the tile.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

## Impact
Scope is isolated exclusively to the `isCity` rendering path in `HexTile.tsx`. No logic changes.
