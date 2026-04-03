# Spec: Population

## Overview
Cities will track a `population` metric that natively grows over time as surplus food is stored. The cost scales via the Fibonacci sequence, and growing population consumes 80% of currently stockpiled food.

## Requirements

### Requirement: Population State Tracking
Cities must track their current population level, starting at 1.

#### Scenario: Starting a new game
- **GIVEN** a freshly generated game state
- **WHEN** the player views their city
- **THEN** the population is equal to 1

### Requirement: Fibonacci Growth Milestones
Population increases when total stored food hits consecutive Fibonacci sequence values (2, 3, 5, 8...).

#### Scenario: City reaches the initial growth milestone
- **GIVEN** a city with population 1
- **WHEN** the city's food reaches or exceeds 2
- **THEN** the population increases to 2
- **AND** the threshold for the next growth updates to 3

#### Scenario: City reaches subsequent growth milestones
- **GIVEN** a city with population 3
- **WHEN** the city's food reaches or exceeds 5
- **THEN** the population increases to 4
- **AND** the threshold for the next growth updates to 8

### Requirement: Food Consumption on Growth
Growing the city population consumes the majority of stored food, representing the cost of supporting a larger city.

#### Scenario: Consuming food for growth
- **GIVEN** a city with exactly 5 food ready to grow from pop 3 to 4
- **WHEN** the growth occurs at the end of the turn
- **THEN** it consumes 80% of stored food (rounded down), removing 4 food
- **AND** the city is left with 1 food

#### Scenario: Fractional food consumption rounding
- **GIVEN** a city with exactly 3 food ready to grow from pop 2 to 3
- **WHEN** the growth occurs
- **THEN** it consumes `floor(3 * 0.8) = floor(2.4) = 2` food
- **AND** the city is left with 1 food

### Requirement: Map Visuals
The current population must be visually indicated on the city tile.

#### Scenario: Observing the city on the map
- **GIVEN** a city with a population of X
- **WHEN** the player views the map
- **THEN** they see the number X displayed directly on the city icon
