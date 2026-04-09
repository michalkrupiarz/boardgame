## Context

Currently, the City View (`CityView.tsx`) shows building infrastructure and a build menu, but players must close it and return to the main map view to manage citizen assignments. This creates a jarring workflow where players cannot coordinate building construction with citizen tile placement in one session.

The `HexMap` component already exists and renders the full hexagonal grid with all tile interactions (click to select, worked/locked indicators, radius highlighting). The same component can be reused within City View.

## Goals / Non-Goals

**Goals:**
- Display a scaled-down hexagonal map within City View
- Enable click-to-assign citizen functionality on tiles within cultural radius
- Show worked tiles, locked citizens, and visual indicators
- Provide a cohesive city management experience

**Non-Goals:**
- Full map navigation (pan/zoom) within City View - use a centered, bounded view
- Modifying map state (exploration, terrain) from City View
- Re-implementing existing HexMap - reuse the component

## Decisions

### Decision 1: Reuse HexMap vs Create City-Specific Map
**Chosen:** Reuse `HexMap` component with adapted props

**Rationale:** The existing `HexMap` already handles:
- Hex grid rendering with axial coordinates
- Radius-based visual styling
- Tile click handling
- Worker/locked indicators

Creating a separate map would duplicate rendering logic. Instead, pass a bounded set of tiles and handle clicks in CityView.

### Decision 2: Layout Approach
**Chosen:** Three-column layout (Infrastructure | Map | Buildings)

**Rationale:** Places the map as the central focus while keeping building management accessible. Mirrors the existing City View's left/right split but inserts the map as a middle column.

### Decision 3: Tile Interaction in City View
**Chosen:** Single-click to toggle citizen assignment (same as map view)

**Rationale:** Consistency with existing interaction pattern. Players shouldn't need to learn new mechanics.

### Decision 4: Map Bounds
**Chosen:** Show all tiles within current + 1 radius visually, but only allow interaction within current radius

**Rationale:** Shows upcoming expansion potential without allowing premature assignment. Dim tiles outside radius to indicate they're unavailable.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Performance: Large maps with many tiles | Use smaller hex size (30px vs 50px) for City View map |
| State sync: Clicking tile in City View must update App state | Pass `toggleWorkedTile` handler through props |
| Click propagation: Map layer clicks might interfere | Use `stopPropagation` or modal overlay isolation |
| Responsive: Narrow screens may have layout issues | Stack vertically on small screens, map above panels |
