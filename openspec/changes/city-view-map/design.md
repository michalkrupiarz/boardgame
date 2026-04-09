## Context

The original approach embedded the HexMap inside the City View modal, which caused the map to be squeezed and tiles to overlap due to space constraints. The new approach uses overlay side panels that don't interfere with the main map display.

## Goals / Non-Goals

**Goals:**
- Display city management tools without obscuring the map
- Provide quick access to Infrastructure and Buildings panels
- Enable citizen assignment directly on the map
- Maintain full map visibility for strategic planning

**Non-Goals:**
- Embedding map within city panels (causes crowding)
- Multiple view modes (map vs city)
- Complex panel resizing/dragging

## Decisions

### Decision 1: Side Panels vs Modal
**Chosen:** Side panels overlay

**Rationale:** 
- Map remains fully visible and interactive
- No modal to open/close - just toggle panels
- Less intrusive to gameplay flow
- Easier to quickly check resources while panning map

### Decision 2: Panel Layout
**Chosen:** Left panel (Infrastructure + Citizen Info), Right panel (Buildings)

**Rationale:**
- Symmetrical layout
- Natural reading order (left to right for building)
- Infrastructure/Status on left (informational)
- Actions on right (building)

### Decision 3: Panel Positioning
**Chosen:** Fixed position with glass effect background

**Rationale:**
- Consistent placement
- Glass effect doesn't fully block map tiles underneath
- Sufficient contrast for readability

## Layout

```
+---------------------------+
|  [HUD: Resources, Turn]   |
+---+                   +---+
| L |                   | R |
| E |                   | I |
| F |    MAIN MAP       | G |
| T |    (full view)    | H |
|   |                   | T |
| P |                   |   |
| A |                   | P |
| N |                   | A |
| E |                   | N |
| L |                   | E |
+---+                   +---+
```

Left Panel (280px): Built Infrastructure + Citizen Assignment Info
Right Panel (300px): Available Buildings with Build buttons
