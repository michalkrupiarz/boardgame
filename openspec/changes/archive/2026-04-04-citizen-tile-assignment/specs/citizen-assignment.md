# Spec: Citizen Tile Assignment

## Overview
Cities must track which tiles are actively being worked by their population. Each population point provides one citizen to work a map tile. The city center is worked for free.

## Requirements

### Requirement: Population Limit
A city cannot work more tiles than its current population (excluding the city center).

#### Scenario: Assigning a citizen within limits
- **GIVEN** a city with population 2 and 0 workers assigned
- **WHEN** the player assigns a citizen to a Plains tile
- **THEN** the worker count becomes 1
- **AND** the tile is marked as "worked" and "locked"

#### Scenario: Assigning a citizen at the limit
- **GIVEN** a city with population 1 and 1 worker assigned to a Plains tile
- **WHEN** the player tries to manually assign a citizen to a Forest tile
- **THEN** the worker is moved from the Plains tile to the Forest tile
- **AND** the Plains tile is no longer "worked"

### Requirement: Manual vs Auto (Locked)
Manual assignment "locks" a citizen to a tile, preventing the auto-allocation algorithm from moving them.

#### Scenario: Automatic grow-up
- **GIVEN** a city grows from population 1 to 2
- **WHEN** the growth occurs
- **THEN** the auto-assignment algorithm finds the highest-yield unworked tile in the cultural radius
- **AND** assigns the new citizen to it (not locked)

#### Scenario: Auto-allocation results in no moves for locked tiles
- **GIVEN** a city has a locked citizen on a Desert tile (yield: 2G, 1C)
- **WHEN** the auto-allocation algorithm is triggered
- **THEN** it must not move the citizen from the Desert tile, even if better tiles (e.g., Mountains) are available

### Requirement: Map Visuals
Tiles worked by citizens must be visually distinguished.

#### Scenario: Observing the map
- **GIVEN** a tile is being worked by a citizen
- **WHEN** the player views the map
- **THEN** they see an SVG icon of a "human head" in the upper right corner of the hexagon
- **AND** the icon is visually distinct (e.g., color or opacity) if the tile is "locked"
