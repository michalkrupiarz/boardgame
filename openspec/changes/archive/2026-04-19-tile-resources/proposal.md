## Why

Currently, tiles have fixed terrain types that provide static bonuses. Players have no control over what resources appear on tiles. Adding a resource system to tiles allows players to strategically develop specific resource deposits, creating more meaningful tile selection and city planning choices.

## What Changes

- Add optional `resource` field to Tile interface
- Each tile can have at most one resource type (or none)
- Resources provide unique bonuses with rarity tiers:
  - **Common (45%)**: Iron (+2 Prod), Wheat (+2 Food), Stone (+1 Prod +1 Gold)
  - **Uncommon (25%)**: Coal (+2 Prod +1 Gold), Copper (+1 Prod +2 Gold), Wine (+1 Food +1 Gold)
  - **Rare (15%)**: Salt (+2 Food +1 Cult), Silver (+2 Gold +1 Prod)
  - **Very Rare (10%)**: Gems (+2 Gold +1 Sci), Uranium (+3 Sci +1 Prod)
  - **Ultra Rare (5%)**: Gold Ore (+3 Gold)
- Resources are immutable once placed
- Better resources are rarer (more bonuses = more rare)
- ~10-15% of tiles have resources
- Update tile generation to include resources with rarity weights
- Update HUD/UI to show resource indicators

## Capabilities

### New Capabilities
- `tile-resources`: Resource deposits on tiles with unique yield bonuses and rarity tiers

### Modified Capabilities
- `map-generation`: Include resource placement with rarity weights in initial map generation

## Impact

- `src/state/GameState.ts` - Updated Tile interface with optional resource field
- `src/state/GameState.ts` - Updated resource bonuses mapping with rarity
- UI components to display resource indicators on tiles
