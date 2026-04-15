## Why

The current building system is minimal with only 5 basic buildings. Expanding the building catalog with strategic buildings that provide bonuses and have upkeep costs will create more meaningful choices for players and improve the game's strategic depth.

## What Changes

- Remove existing buildings (Farm, Mine, Market, Library, Monument)
- Add new buildings with unique effects and upkeep costs:
  - **Granary** - Saves 20% food when upgrading to next population level, costs 200 production
  - **Cemetery** - Culture increased by 1 per turn, costs 100 production
  - **Obelisk** - Culture increased by 1 per turn, costs 100 production
  - **Market** - Income (gold) increased by 20%, costs 300 production
  - **Library** - Science increased by 20%, costs 400 production, 1 gold per turn upkeep
  - **Guardhouse** - Production, Science, and Income increased by 5%, costs 500 production, 2 gold per turn upkeep
- Update building interface to support upkeep costs
- Update turn yield calculations to account for percentage bonuses and upkeep

## Capabilities

### New Capabilities
- `city-buildings-v2`: Expanded building system with 6 new buildings, percentage-based bonuses, and upkeep costs

### Modified Capabilities
- `citizen-assignment`: Buildings now affect yields (no longer just science from Library)

## Impact

- `src/state/GameState.ts` - Updated `AVAILABLE_BUILDINGS` array and `Building` interface
- `src/state/GameState.ts` - Updated `calculateTurnYield` for percentage bonuses and upkeep
- `src/state/GameState.ts` - Updated `buildBuilding` if needed for new mechanics
