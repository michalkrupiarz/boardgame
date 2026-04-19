## Why

The game currently supports terrain types (Plains, Forest, Mountains, Desert) that provide base yields, but lacks a data structure to represent additional resource deposits on tiles. This prevents future features like tile improvements, resource trading, and technology requirements. Adding a resource field to tile data now establishes the foundation for these mechanics.

## What Changes

- Add optional `resource` field to the `Tile` type containing resource type identifier
- Include resource field in tile initialization/generation logic
- Update tile rendering to optionally display resource indicators

## Capabilities

### New Capabilities
- `tile-resources`: Data structure for storing resource type on tiles (e.g., iron, wheat, coal). This enables future mechanics including resource harvesting, tile improvements, and technology requirements.

### Modified Capabilities
- None — this change only adds data structure, no existing requirements change.

## Impact

- **Tile Type**: `src/types/game.ts` — add resource field to Tile interface
- **Map Generation**: `src/utils/mapGeneration.ts` — optionally assign resources during tile creation
- **Tile Rendering**: `src/components/HexTile.tsx` — optional visual indicator for resources
