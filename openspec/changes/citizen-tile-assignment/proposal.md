# Proposal: Citizen Tile Assignment

## Why
Currently, all tiles within a city's cultural radius are automatically harvested every turn. As the game grows, we need more depth in resource management. This change introduces a worker-allocation mechanic where only tiles "worked" by citizens provide resources. This forces the player to strategically choose which tiles to work based on their population size, while also providing an automated system for ease of use.

## What Changes
1. **Worked Tiles Mechanic**: Every city will track `workedTileIds`. The number of worked tiles is limited by the city's `population`.
2. **Free City Center**: The city center tile (coord 0,0) is always worked for free and does not consume a population point.
3. **Manual & Automatic Assignment**: 
    - **Manual**: Players can choose specific tiles to work. Manually assigned citizens are "locked" to those tiles.
    - **Automatic**: When population increases or tiles are claimed, the game automatically assigns free citizens to the highest-yield tiles that are not already locked.
4. **Yield Calculation**: Resources harvested at the end of the turn will only come from worked tiles (and the city center).

## Impact
- **GameState**: New state fields for tracked worked/locked tiles. Total resource yields will change based on active workers.
- **Rules**: The rulebook must be updated to reflect that resources only come from worked tiles.
- **UI**: Map tiles will need a visual indicator to show which are being worked.
