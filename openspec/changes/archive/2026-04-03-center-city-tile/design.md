## Context
The city must be placed geographically at (0,0) and grow bounds exponentially based on total Culture scaling. 

## Goals / Non-Goals
**Goals:**
- Provide math to convert flat `Culture` score into bounded `Radius`.
- Render hex-map visuals allowing visual tracking of borders.

**Non-Goals:**
- Allowing players to arbitrarily change center city location.

## Decisions
- Mathematical checks via `Math.max` for cube coordinate differences (axial $q,r$) will define distance mapping accurately without needing graph pathing.
- The map SVG overlay will use CSS opacity bindings `<g opacity={claimed ? 1 : 0.4}>` to handle fog-of-war.

## Risks / Trade-offs
- A potential performance hit looping bounds on very massive maps (100x100) on each turn, but trivial given our 15x15 constraints.
