# Spec: Adjust Population Thresholds

## Overview
Population growth thresholds must follow the Fibonacci sequence, starting at 8 for the first population transition (Pop 1 → Pop 2).

## Requirements

### Requirement: Starting Threshold
The first threshold for growth must be 8.

#### Scenario: Starting the game
- **GIVEN** a city with population 1
- **WHEN** the next turn is processed and food is harvested
- **THEN** the threshold for growth to population 2 must be 8.

### Requirement: Progression
Thresholds must follow the Fibonacci sequence: 8, 13, 21, 34, 55, etc.

#### Scenario: Growth to Pop 3
- **GIVEN** a city with population 2
- **WHEN** growth is calculated
- **THEN** the threshold must be 13.

### Requirement: Storage
Stored food must still be consumed at 80% upon growth.

#### Scenario: Consuming food
- **GIVEN** a city with population 1 and 8 food
- **WHEN** the turn ends and the city grows
- **THEN** the new population is 2
- **AND** 8 * 0.8 = 6.4 (floor 6) food is consumed, leaving 2 food.
