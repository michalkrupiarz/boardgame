# City Buildings V2 Specification

## ADDED Requirements

### Requirement: Granary building saves food on population growth
The system SHALL save 20% of food when upgrading population if the Granary is built.

#### Scenario: Granary saves 20% food on population growth
- **WHEN** city has Granary built and population grows
- **THEN** only 80% of food threshold is consumed instead of 100%

#### Scenario: Without Granary, full food is consumed
- **WHEN** city does not have Granary and population grows
- **THEN** 100% of food threshold is consumed

### Requirement: Cemetery provides culture bonus
The system SHALL increase culture yield by 1 per turn when Cemetery is built.

#### Scenario: Cemetery adds 1 culture per turn
- **WHEN** city has Cemetery built
- **THEN** culture yield per turn increases by 1

### Requirement: Obelisk provides culture bonus
The system SHALL increase culture yield by 1 per turn when Obelisk is built.

#### Scenario: Obelisk adds 1 culture per turn
- **WHEN** city has Obelisk built
- **THEN** culture yield per turn increases by 1

### Requirement: Market provides gold percentage bonus
The system SHALL increase gold yield by 20% when Market is built.

#### Scenario: Market increases gold by 20%
- **WHEN** city has Market built
- **THEN** gold yield per turn is multiplied by 1.20

### Requirement: Library provides science percentage bonus and upkeep
The system SHALL increase science yield by 20% when Library is built, but deduct 1 gold per turn.

#### Scenario: Library increases science by 20%
- **WHEN** city has Library built
- **THEN** science yield per turn is multiplied by 1.20

#### Scenario: Library has 1 gold upkeep
- **WHEN** city has Library built
- **THEN** 1 gold is deducted from city resources per turn

### Requirement: Guardhouse provides multiple percentage bonuses and upkeep
The system SHALL increase production, science, and gold by 5% when Guardhouse is built, but deduct 2 gold per turn.

#### Scenario: Guardhouse increases production by 5%
- **WHEN** city has Guardhouse built
- **THEN** production yield per turn is multiplied by 1.05

#### Scenario: Guardhouse increases science by 5%
- **WHEN** city has Guardhouse built
- **THEN** science yield per turn is multiplied by 1.05

#### Scenario: Guardhouse increases gold by 5%
- **WHEN** city has Guardhouse built
- **THEN** gold yield per turn is multiplied by 1.05

#### Scenario: Guardhouse has 2 gold upkeep
- **WHEN** city has Guardhouse built
- **THEN** 2 gold is deducted from city resources per turn

### Requirement: Building interface supports new fields
The system SHALL support upkeep and percentageBonus fields in the Building interface.

#### Scenario: Building can have upkeep cost
- **WHEN** Building has upkeep property defined
- **THEN** upkeep is deducted from resources each turn

#### Scenario: Building can have percentageBonus
- **WHEN** Building has percentageBonus property
- **THEN** the specified yield is multiplied by (1 + bonus)
