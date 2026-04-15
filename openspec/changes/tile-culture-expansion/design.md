## Context

Currently, cultural expansion uses radius-based thresholds (radius 1 at start, radius 2 at 50 culture, etc.). When culture crosses a threshold, all tiles in the new ring become claimable simultaneously. This creates:
- Unpredictable expansions when culture accumulates
- No strategic choice about which tiles to claim
- All-or-nothing behavior

## Goals / Non-Goals

**Goals:**
- Replace radius-based expansion with tile-by-tile claiming
- Allow players to choose which adjacent tiles to claim
- Optional auto-claim for adjacent tiles when culture is available
- Maintain consistent visual feedback for claimable vs claimed vs unclaimed tiles

**Non-Goals:**
- Complete removal of the concept of "radius" for UI purposes
- Allowing non-adjacent tile claiming (must be next to existing claimed territory)
- Refunding culture when tiles are abandoned

## Decisions

### Decision 1: Claiming Mechanic
**Chosen:** Each tile requires a fixed culture cost to claim

**Rationale:** Simple, predictable. Players know exactly what each claim costs.
- First ring (distance 1): 10 culture per tile
- Each additional ring: +10 culture per ring level

**Alternative:** Variable cost based on tile yield - rejected as overly complex.

### Decision 2: Adjacency Requirement
**Chosen:** Tiles must be adjacent to already-claimed tiles

**Rationale:** Prevents "jumping" across the map. Feels natural and historically inspired.
- City center (0,0) starts claimed
- Only tiles adjacent to claimed tiles are claimable

### Decision 3: Manual vs Auto Claiming
**Chosen:** Manual by default, auto-claim toggle option

**Rationale:** Gives player full control while offering convenience for those who prefer automation.
- Click claimable tile to claim it (if enough culture)
- Toggle "auto-expand" to automatically claim best adjacent tiles

### Decision 4: State Model
**Chosen:** Add `claimedTileIds: string[]` to GameState

**Rationale:** Simple array tracking. Replaces the need for radius calculation in yield.
- `calculateTurnYield` checks `claimedTileIds` instead of radius
- Existing `workedTileIds` remains separate (what tiles citizens work)
- `isClaimed` in HexTile derived from state, not calculated

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Breaking existing game saves | Migration: existing maps get all radius-1 tiles auto-claimed |
| Performance: checking adjacency on large maps | Pre-compute adjacency graph on map generation |
| UI clarity: showing claimable tiles | Distinct styling (e.g., dashed border) for claimable tiles |
