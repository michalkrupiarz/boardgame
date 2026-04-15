# Unit Test Coverage for GameState

## ADDED Requirements

### Requirement: generateInitialMap produces valid hexagonal grid
The system SHALL generate a hexagonal grid of tiles with correct axial coordinates when `generateInitialMap(size)` is called.

#### Scenario: Generates correct tile count for size 1
- **WHEN** `generateInitialMap(1)` is called
- **THEN** it returns exactly 1 tile at coordinates (0, 0)

#### Scenario: Generates correct tile count for size 3
- **WHEN** `generateInitialMap(3)` is called
- **THEN** it returns exactly 7 tiles (radius 1 hexagonal grid)

#### Scenario: Generates correct tile count for size 5
- **WHEN** `generateInitialMap(5)` is called
- **THEN** it returns exactly 19 tiles (radius 2 hexagonal grid)

#### Scenario: Center tile is always Plains terrain
- **WHEN** `generateInitialMap(size)` is called with any size
- **THEN** the tile at (0, 0) has terrain 'Plains'

### Requirement: getCurrentRadius returns correct radius based on culture
The system SHALL return the appropriate visibility radius based on accumulated culture.

#### Scenario: Returns radius 1 for culture less than 50
- **WHEN** `getCurrentRadius(0)` is called
- **THEN** it returns 1

#### Scenario: Returns radius 2 for culture between 50 and 149
- **WHEN** `getCurrentRadius(50)` is called
- **THEN** it returns 2

#### Scenario: Returns radius 3 for culture between 150 and 349
- **WHEN** `getCurrentRadius(150)` is called
- **THEN** it returns 3

#### Scenario: Returns radius 4 for culture 350 or more
- **WHEN** `getCurrentRadius(350)` is called
- **THEN** it returns 4

### Requirement: getClaimableTiles returns correct adjacent tiles
The system SHALL return only unclaimed tiles that are adjacent to claimed tiles.

#### Scenario: Returns empty array when all tiles claimed
- **WHEN** `getClaimableTiles(map, ['0,0', '1,0', '0,1', '-1,0', '0,-1', '1,-1', '-1,1'])` is called
- **THEN** it returns an empty array

#### Scenario: Returns adjacent unclaimed tiles
- **WHEN** `getClaimableTiles` is called with a map where only center is claimed
- **THEN** it returns the 6 tiles at distance 1

### Requirement: toggleAutoExpand toggles auto-expand state
The system SHALL toggle the autoExpand boolean in the city state.

#### Scenario: Toggles autoExpand from false to true
- **WHEN** `toggleAutoExpand(state)` is called with `autoExpand: false`
- **THEN** the returned state has `autoExpand: true`

#### Scenario: Toggles autoExpand from true to false
- **WHEN** `toggleAutoExpand(state)` is called with `autoExpand: true`
- **THEN** the returned state has `autoExpand: false`

### Requirement: getTileYieldSum calculates correct sum
The system SHALL return the sum of all yields for a tile.

#### Scenario: Returns correct sum for Plains terrain
- **WHEN** `getTileYieldSum({ terrain: 'Plains' })` is called
- **THEN** it returns 4 (1 gold + 1 prod + 2 food + 0 culture + 0 science)

#### Scenario: Returns correct sum for Mountains terrain
- **WHEN** `getTileYieldSum({ terrain: 'Mountains' })` is called
- **THEN** it returns 4 (0 gold + 3 prod + 0 food + 0 culture + 1 science)

### Requirement: getFoodThresholdForNextPopulation follows exponential growth
The system SHALL return the food threshold required for the next population level.

#### Scenario: Returns 10 for population 1
- **WHEN** `getFoodThresholdForNextPopulation(1)` is called
- **THEN** it returns 10

#### Scenario: Returns 20 for population 2
- **WHEN** `getFoodThresholdForNextPopulation(2)` is called
- **THEN** it returns 20

#### Scenario: Growth follows exponential pattern
- **WHEN** `getFoodThresholdForNextPopulation(3)` is called
- **THEN** it returns 30 (10 * 3)
