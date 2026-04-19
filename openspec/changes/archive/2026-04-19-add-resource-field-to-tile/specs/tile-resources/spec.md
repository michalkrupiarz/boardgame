## ADDED Requirements

### Requirement: Tile resource field exists
The Tile type SHALL include an optional `resource` field of type `ResourceType | null` to represent resource deposits on individual hexagonal tiles.

#### Scenario: Tile with no resource
- **GIVEN** a tile that has no resource deposit
- **WHEN** the tile is created or initialized
- **THEN** the `resource` field SHALL be `null`

#### Scenario: Tile with resource
- **GIVEN** a tile that has a resource deposit (e.g., Iron)
- **WHEN** the tile is created with a resource type assigned
- **THEN** the `resource` field SHALL contain the corresponding `ResourceType` value

### Requirement: ResourceType enum defined
The system SHALL define a `ResourceType` enum containing at minimum: `Coal`, `Iron`, `Wheat`, `Furs`, `Meat`.

#### Scenario: ResourceType enum values
- **GIVEN** the `ResourceType` enum is defined
- **WHEN** a developer accesses the enum
- **THEN** they SHALL have access to all resource type values including `None` for explicit no-resource state

### Requirement: Resource field is optional in updates
The system SHALL allow tile updates without requiring the `resource` field to be specified.

#### Scenario: Updating tile without resource field
- **GIVEN** a tile update is performed without providing the `resource` field
- **WHEN** the update is processed
- **THEN** the existing `resource` value SHALL remain unchanged