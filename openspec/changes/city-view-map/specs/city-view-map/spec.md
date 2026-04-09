# Spec: City View Map Integration

## Overview

The City View shall include an embedded hexagonal map displaying the surrounding tiles and enabling citizen assignment without leaving the city management screen.

## ADDED Requirements

### Requirement: City View Map Display
The City View SHALL display a hexagonal map showing tiles within and beyond the current cultural radius.

#### Scenario: Map visible in City View
- **WHEN** player opens City View
- **THEN** a hexagonal map is displayed as a central panel
- **AND** the map shows tiles at the current cultural radius and one level beyond

#### Scenario: Tile visual state in City View
- **WHEN** player views tiles in City View map
- **THEN** tiles within cultural radius are fully visible (opacity 1)
- **AND** tiles beyond cultural radius are dimmed (opacity 0.4)
- **AND** the city center tile displays the city icon

### Requirement: Citizen Assignment from City View
The City View map SHALL allow players to assign and unassign citizens by clicking tiles.

#### Scenario: Assign citizen to tile from City View
- **GIVEN** a city has available citizens (population > worked tiles)
- **WHEN** player clicks an unworked tile within cultural radius
- **THEN** a citizen is assigned to that tile
- **AND** the tile displays the worker icon

#### Scenario: Unassign citizen from tile in City View
- **GIVEN** a city has a worked tile that is not the city center
- **WHEN** player clicks the worked tile in City View
- **THEN** the citizen is unassigned from that tile
- **AND** the worker icon is removed from the tile

#### Scenario: Cannot assign to tiles outside radius
- **GIVEN** a tile is outside the current cultural radius
- **WHEN** player clicks that tile in City View
- **THEN** no citizen is assigned
- **AND** the tile remains in its dimmed visual state

### Requirement: Consistent Worker Indicators
Worker and lock indicators SHALL match those shown on the main map view.

#### Scenario: Worker icon visibility
- **WHEN** a tile is worked by a citizen in City View
- **THEN** the human head icon appears on that tile
- **AND** the icon uses the same styling as the main map

#### Scenario: Lock indicator visibility
- **WHEN** a tile has a locked citizen assigned
- **THEN** the lock indicator (accent circle) appears on the worker icon
- **AND** the worker icon uses a solid white color instead of semi-transparent
