# Design: Citizen Tile Assignment

## Context
The game currently harvests resources from all tiles within a city's cultural radius. This is being changed so only tiles with a "citizen" assigned to them contribute. Every pop point provides one citizen.

## Goals / Non-Goals
**Goals:**
- **State**: Add `workedTileIds` (number matching population) and `lockedTileIds` (for manual overrides).
- **Yield**: Update `calculateTurnYield` so it only counts workers.
- **Auto-Assignment**: Maximize yield with an automated algorithm.
- **UI**: Add a "human head" symbol to tiles being worked.

**Non-Goals:**
- Complex "worker stacking" (max 1 citizen per tile).
- Buildings requiring specific tiles.

## Approach

### 1. State Structures
- **City**:
    - `workedTileIds: string[]` (current assignments).
    - `lockedTileIds: string[]` (manual assignments that cannot be re-assigned by the AI).

### 2. Logic Updates
- **calculateTurnYield(state)**:
    - Filter the map based on `state.city.workedTileIds` plus the city center tile (coord 0,0).
- **toggleWorkedTile(state, tileId)**:
    - If `tileId` is in `workedTileIds`:
        - Remove from both `workedTileIds` and `lockedTileIds`.
    - If `tileId` is NOT in `workedTileIds`:
        - If `workedTileIds.length < population`:
            - Add to both.
        - Else:
            - Find a tile in `workedTileIds` that is NOT in `lockedTileIds`. If found, swap it. If not, do nothing (all slots locked).
- **autoAssignCitizens(state)**:
    - Identify all possible candidates: Tiles within culture radius.
    - Identify already "locked" tiles.
    - Calculate top `population - lockedCount` free tiles based on total resource yield.
    - Update `workedTileIds`.

### 3. UI
- **HexTile.tsx**:
    - Props: `isWorked`, `isLocked`.
    - Render SVG `path`: A head-shaped icon in the upper right. Use different opacity/color for locked/unlocked status.

## Decisions
- **Manual Overrides**: If a citizen is assigned manually, it is "locked." This prevents the auto-assign algorithm from moving it.
- **The City Center**: The city center tile does not count towards the population limit and is always harvested.
- **Yield Tie-Breaking**: If two tiles have the same yield, prioritize based on Food > Production > Gold.

## Risks / Trade-offs
- **Complexity**: Players might find manual management tedious as cities grow large. We must ensure the auto-assign algorithm is "smart" enough that manual management is optional.
