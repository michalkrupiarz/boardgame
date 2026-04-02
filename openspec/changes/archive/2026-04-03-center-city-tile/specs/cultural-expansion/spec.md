# Cultural Expansion

## Requirements

The game requires map yields to be bottlenecked by the city's geographical footprint, which grows as the metropolis gathers more Culture.

- The geographic footprint is defined as mathematical `radius` around the center tile `(0,0)`.
- At `Turn 1`, the radius defaults to `1`.
- Turn yields should ONLY calculate bonuses from tiles whose distance to `(0,0)` is strictly less than or equal to the current `radius`.
- When calculating the radius, the system should reference accumulated `Culture`.
  - `Radius 2`: 50 Culture
  - `Radius 3`: 150 Culture
  - `Radius 4`: 350 Culture

## UI Requirements

- The `TileInfoPanel` should denote if a tile is "Claimed" or "Out of Borders".
- Tiles outside the current `radius` should render visually dimmed or obscured in the SVG to differentiate them from productive tiles.
