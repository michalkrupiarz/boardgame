## 1. UI Layout Restructure

- [x] 1.1 Update CityView layout to three-column (Infrastructure | Map | Buildings)
- [x] 1.2 Add HexMap import to CityView.tsx
- [x] 1.3 Add toggleWorkedTile callback prop to CityViewProps

## 2. Map Integration in CityView

- [x] 2.1 Add HexMap component to CityView with appropriate props (tiles, culture, workedTileIds, lockedTileIds)
- [x] 2.2 Add onTileClick handler that calls toggleWorkedTile
- [x] 2.3 Use smaller hex size (30px) for City View map performance

## 3. Styling Adjustments

- [x] 3.1 Adjust map container height to fit within City View panel
- [x] 3.2 Ensure responsive layout (stack vertically on narrow screens)

## 4. Testing

- [x] 4.1 Add E2E test: Assign citizen from City View map
- [x] 4.2 Add E2E test: Unassign citizen from City View map
- [x] 4.3 Verify visual consistency with main map view
