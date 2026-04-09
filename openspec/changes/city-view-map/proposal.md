## Why

Currently, players must exit the City View to manage citizen assignments on the map. This interrupts the planning workflow and makes it harder to coordinate building construction with citizen placement. Integrating the map directly into the City View will create a seamless city management experience.

## What Changes

- **New integrated map panel** within City View showing the hexagonal map
- **Clickable tile selection** in City View to assign/unassign citizens
- **Visual feedback** showing worked tiles, locked citizens, and available citizens
- **Radius indicator** showing current cultural expansion boundaries
- **Tile yield preview** on hover in City View map panel

## Capabilities

### New Capabilities
- `city-view-map`: Integrated map display within City View enabling citizen assignment without leaving the city management screen.

### Modified Capabilities
- (none)

## Impact

- **UI Components**: `CityView.tsx` will include the HexMap component
- **User Flow**: Players can manage buildings AND citizen assignments in one view
- **State Management**: May need additional UI state for City View-specific map interactions
