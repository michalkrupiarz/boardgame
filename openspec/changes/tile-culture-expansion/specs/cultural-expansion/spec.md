# Delta Spec: Cultural Expansion

## MODIFIED Requirements

### Requirement: Yield Calculation (Changed)
~~The geographic footprint is defined as mathematical `radius` around the center tile `(0,0)`.~~

**NEW:** Tiles contribute to yields only if they are claimed (in `claimedTileIds`).

~~At `Turn 1`, the radius defaults to `1`.~~

**NEW:** The city center `(0,0)` starts as claimed. Only adjacent tiles can be claimed.

~~- When calculating the radius, the system should reference accumulated `Culture`.~~
~~  - `Radius 2`: 50 Culture~~
~~  - `Radius 3`: 150 Culture~~
~~  - `Radius 4`: 350 Culture~~

**NEW:** Culture is spent to claim individual tiles (see tile-culture-claim spec).

#### Scenario: Tile yields based on claim status
- **GIVEN** a tile at distance 2 from city center
- **WHEN** the tile has NOT been claimed
- **THEN** it does NOT contribute to yield calculations

- **GIVEN** a tile at distance 2 from city center
- **WHEN** the tile HAS been claimed
- **THEN** it contributes to yield calculations (same as before)

### Requirement: UI - Tile Claimed Status (Changed)
~~The `TileInfoPanel` should denote if a tile is "Claimed" or "Out of Borders".~~

**NEW:** The UI should show:
- "Claimed" for tiles in `claimedTileIds`
- "Claimable" for tiles adjacent to claimed territory
- "Outside Territory" for tiles not adjacent to claimed territory

~~- Tiles outside the current `radius` should render visually dimmed or obscured in the SVG to differentiate them from productive tiles.~~

**NEW:** 
- Claimed tiles: full opacity with border highlight
- Claimable tiles: dashed border, interactive
- Outside territory: dimmed, non-interactive
