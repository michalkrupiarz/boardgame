# Tile Resources Specification

## ADDED Requirements

### Requirement: Tile interface supports resources
The system SHALL include an optional resource field in the Tile interface.

#### Scenario: Tile can have no resource
- **WHEN** a tile is created without a resource
- **THEN** the tile's resource field is undefined

#### Scenario: Tile can have a resource
- **WHEN** a tile is created with a resource type
- **THEN** the tile's resource field contains that resource type

### Requirement: Resource types provide bonuses
Each resource type SHALL provide specific yield bonuses, with rarer resources having better bonuses.

#### Scenario: Iron (Common) provides +2 Production
- **WHEN** tile has Iron resource
- **THEN** production yield increases by 2

#### Scenario: Wheat (Common) provides +2 Food
- **WHEN** tile has Wheat resource
- **THEN** food yield increases by 2

#### Scenario: Stone (Common) provides +1 Production, +1 Gold
- **WHEN** tile has Stone resource
- **THEN** production yield increases by 1
- **THEN** gold yield increases by 1

#### Scenario: Coal (Uncommon) provides +2 Production, +1 Gold
- **WHEN** tile has Coal resource
- **THEN** production yield increases by 2
- **THEN** gold yield increases by 1

#### Scenario: Copper (Uncommon) provides +1 Production, +2 Gold
- **WHEN** tile has Copper resource
- **THEN** production yield increases by 1
- **THEN** gold yield increases by 2

#### Scenario: Wine (Uncommon) provides +1 Food, +1 Gold
- **WHEN** tile has Wine resource
- **THEN** food yield increases by 1
- **THEN** gold yield increases by 1

#### Scenario: Salt (Rare) provides +2 Food, +1 Culture
- **WHEN** tile has Salt resource
- **THEN** food yield increases by 2
- **THEN** culture yield increases by 1

#### Scenario: Silver (Rare) provides +2 Gold, +1 Production
- **WHEN** tile has Silver resource
- **THEN** gold yield increases by 2
- **THEN** production yield increases by 1

#### Scenario: Gems (Very Rare) provides +2 Gold, +1 Science
- **WHEN** tile has Gems resource
- **THEN** gold yield increases by 2
- **THEN** science yield increases by 1

#### Scenario: Uranium (Very Rare) provides +3 Science, +1 Production
- **WHEN** tile has Uranium resource
- **THEN** science yield increases by 3
- **THEN** production yield increases by 1

#### Scenario: Gold Ore (Ultra Rare) provides +3 Gold
- **WHEN** tile has Gold Ore resource
- **THEN** gold yield increases by 3

### Requirement: Resources stack with terrain bonuses
The system SHALL add resource bonuses to terrain bonuses.

#### Scenario: Resource bonuses add to terrain bonuses
- **WHEN** tile has Plains terrain and Iron resource
- **THEN** total production = terrain bonus (1) + resource bonus (2) = 3

### Requirement: Map generation includes resources with rarity
The system SHALL place resources on some tiles during map generation following rarity tiers.

#### Scenario: Not all tiles have resources
- **WHEN** map is generated
- **THEN** only 10-15% of tiles have resources
- **THEN** resources are distributed across different tiles

#### Scenario: Center tile has no resource
- **WHEN** center tile (0,0) is generated
- **THEN** the center tile does not have a resource

#### Scenario: Rarer resources appear less often
- **WHEN** map is generated
- **THEN** Common resources appear most frequently
- **THEN** Ultra Rare resources appear least frequently