## Context

The current `AVAILABLE_BUILDINGS` array contains 5 basic buildings with simple flat bonuses. The game needs more strategic buildings with:
- Higher production costs reflecting their value
- Percentage-based bonuses that scale with the city
- Upkeep costs that create ongoing resource management decisions

## Goals / Non-Goals

**Goals:**
- Replace existing buildings with 6 new strategic buildings
- Support percentage-based yield modifiers
- Support upkeep costs that reduce resources each turn
- Keep the building system simple but meaningful

**Non-Goals:**
- Multiple buildings of the same type (stacking)
- Building prerequisites or tech trees
- Building destruction or upgrades

## Decisions

1. **Extend Building interface for new mechanics**
   - Add optional `upkeep` field to `Building` interface
   - Add optional `percentageBonus` field for multiplicative bonuses
   - Keep flat bonuses for simple cases (culture buildings)

2. **Calculate percentage bonuses after flat bonuses**
   - First sum all flat bonuses from buildings
   - Then apply percentage multipliers to base yields + flat bonuses
   - This gives percentage buildings more value as cities grow

3. **Granary special case: food retention on population growth**
   - Track if Granary is built
   - On population growth, only consume 80% of food instead of full threshold
   - This requires modifying `nextTurn` function

4. **Upkeep deducted after yield calculation**
   - Calculate base yields
   - Apply bonuses
   - Subtract upkeep costs
   - Result is net yield for the turn

## Risks / Trade-offs

- [Risk] Complex yield calculations may be harder to debug → [Mitigation] Add unit tests for each building type
- [Risk] Percentage bonuses may stack too powerfully → [Mitigation] Keep bonuses small (5-20%)
