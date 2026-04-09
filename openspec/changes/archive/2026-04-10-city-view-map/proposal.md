## Why

Previously, managing city infrastructure required toggling between different views, disrupting the planning workflow. The new side panel approach allows players to access city management tools directly from the main map view without obscuring it.

## What Changes

- **Side panels** overlay on left (Infrastructure + Citizen Info) and right (Available Buildings)
- **Main map remains visible** at all times - no modal blocking
- **Toggle button** to show/hide city panels
- **Citizen assignment** done directly on the map (no embedded map in panels)
- **Building construction** accessible from side panel without leaving map

## Capabilities

### New Capabilities
- `city-side-panels`: Overlay panels that display city management tools while keeping the map visible.

### Modified Capabilities
- (none)

## Impact

- **UI Components**: `CityView.tsx` renamed to `CitySidePanel`, App.tsx updated for side panel toggle
- **User Flow**: Players manage city and view map simultaneously
- **State Management**: Simplified - no need to pass map state to CityView
