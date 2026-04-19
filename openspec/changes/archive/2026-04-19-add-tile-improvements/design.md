## Context

The game has terrain-based yields (Plains, Forest, Mountains, Desert) and resource bonuses. Players want to actively improve tiles for higher yields. This adds strategic depth - choosing where to invest Production.

## Goals / Non-Goals

**Goals:**
- Add tile improvement system that costs Production to build
- Improvements provide yield bonuses on top of terrain + resource bonuses
- Improvements are restricted by terrain type (e.g., Mine only on Mountains)

**Non-Goals:**
- Improvement removal/destruction
- Worker assignment to improvements (simpler: improvements always active on worked tiles)
- Multiple improvements per tile

## Decisions

**1. Improvement restricted by terrain**
Chose: Each improvement type has valid terrain(s)
Rationale: Thematic consistency - farms on plains, mines on mountains. Adds strategic decision-making.

| Improvement | Valid Terrains | Bonus |
|------------|---------------|-------|
| Farm | Plains, Desert | +2 Food |
| Mine | Mountains, Forest | +2 Production |
| Quarry | Mountains | +1 Production, +1 Gold |
| Pasture | Plains | +1 Food, +1 Production |
| Plantation | Forest, Desert | +2 Gold |
| Well | Desert | +2 Gold, +1 Food |

**2. One improvement per tile**
Chose: Each tile can have at most one improvement
Rationale: Simpler UI, prevents stacking complexity.

**3. Production cost system**
Chose: Flat Production cost per improvement type
Rationale: Simple to understand, comparable to building costs.

## Risks / Trade-offs

- [Risk] UI clutter → Mitigation: Show improvement in tile panel, not on hex itself
- [Risk] Balance issues → Mitigation: Start with conservative bonuses, adjust in future
- [Risk] Overpowered yields → Mitigation: Improvements stack additively with terrain + resource