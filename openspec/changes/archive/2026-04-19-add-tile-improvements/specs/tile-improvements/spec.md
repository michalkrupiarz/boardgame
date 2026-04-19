## ADDED Requirements

### Requirement: Tile improvements can be built
Players SHALL be able to construct improvements on tiles they are working, spending Production points.

#### Scenario: Build Farm on Plains
- **GIVEN** a tile with terrain "Plains" that is being worked
- **AND** the city has at least 10 Production
- **WHEN** player selects "Build Farm" action
- **THEN** the tile's improvement field is set to "Farm"
- **AND** Production is deducted by 10

#### Scenario: Build Mine on Mountains
- **GIVEN** a tile with terrain "Mountains" that is being worked
- **AND** the city has at least 15 Production
- **WHEN** player selects "Build Mine" action
- **THEN** the tile's improvement field is set to "Mine"
- **AND** Production is deducted by 15

#### Scenario: Cannot build on unworked tile
- **GIVEN** a tile that is NOT being worked
- **WHEN** player attempts to build an improvement
- **THEN** the action is rejected

### Requirement: Improvement yields apply to turn calculation
Improvement bonuses SHALL be included in the per-turn yield calculation.

#### Scenario: Farm bonus applied
- **GIVEN** a worked tile with Farm improvement
- **WHEN** turn yield is calculated
- **THEN** the Farm bonus (+2 Food) is added to the total yield

#### Scenario: Multiple bonuses stack
- **GIVEN** a worked tile with Plains terrain, Iron resource, and Farm improvement
- **WHEN** turn yield is calculated
- **THEN** terrain yield + resource yield + improvement yield are all added

### Requirement: Improvement restricted by terrain
Only valid improvements can be built on appropriate terrain types.

#### Scenario: Mine requires Mountains or Forest
- **GIVEN** a tile with terrain "Plains"
- **WHEN** player attempts to build "Mine"
- **THEN** the action is rejected

#### Scenario: Farm requires Plains or Desert
- **GIVEN** a tile with terrain "Mountains"
- **WHEN** player attempts to build "Farm"
- **THEN** the action is rejected