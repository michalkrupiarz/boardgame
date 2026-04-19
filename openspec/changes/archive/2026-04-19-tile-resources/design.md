## Context

The game uses a hexagonal grid where each tile has a terrain type that determines base yields. Currently, terrain is randomly assigned and provides static bonuses. Resources would add a second dimension to tile yields.

## Goals / Non-Goals

**Goals:**
- Add resources to tiles that stack with terrain bonuses
- Each tile has at most one resource (or none)
- Resources have fixed bonuses that don't combine
- Simple resource visualization in UI
- Better resources = rarer

**Non-Goals:**
- Resource gathering buildings (out of scope)
- Resource trading (out of scope)
- Resource depletion (out of scope)

## Resource Rarity Tiers

| Tier | Chance | Resources |
|------|-------|----------|
| Common | 45% | Iron, Wheat, Stone |
| Uncommon | 25% | Coal, Copper, Wine |
| Rare | 15% | Salt, Silver |
| Very Rare | 10% | Gems, Uranium |
| Ultra Rare | 5% | Gold Ore |

## Decisions

1. **Resources are single-type per tile**
   - A tile can have any resource or nothing
   - No combining of multiple resources on one tile

2. **Resource placement on map generation**
   - Resources placed during map generation
   - ~10-15% of tiles have resources
   - Rarity affects chance of appearing

3. **Bonuses stack with terrain**
   - Base terrain yield + Resource bonus = Total yield
   - Example: Plains (1 prod) + Iron (2 prod) = 3 Production

4. **Resource interface**
   - Add `resource?: ResourceType` to Tile interface
   - ResourceType enum with all 11 resources

5. **Resource bonuses**
   - Iron: +2 Production
   - Wheat: +2 Food
   - Stone: +1 Production, +1 Gold
   - Coal: +2 Production, +1 Gold
   - Copper: +1 Production, +2 Gold
   - Wine: +1 Food, +1 Gold
   - Salt: +2 Food, +1 Culture
   - Silver: +2 Gold, +1 Production
   - Gems: +2 Gold, +1 Science
   - Uranium: +3 Science, +1 Production
   - Gold Ore: +3 Gold

## Risks / Trade-offs

- [Risk] Confusing UI with both terrain and resources → [Mitigation] Use icons/colors to distinguish
- [Risk] Overpowered tiles → [Mitigation] Rarer resources are harder to find, balances out