## Context
The SVG icon offset for the City currently relies on the parent's generic translation, pulling it towards the top edge of the tile piece.

## Goals
- Relocate the icon directly over the `(0,0)` origin point inside the polygon rendering group.

## Decisions
- The newly defined path uses relative integers centered perfectly around 0: `M-15,0 L0,-15 L15,0 L15,20 L-15,20 Z`. No additional grouping or arbitrary padding offsets are required.
