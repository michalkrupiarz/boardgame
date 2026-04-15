# Spec: Tile Culture Claiming

## Overview

Players claim individual tiles using accumulated culture points, instead of unlocking entire radius rings. This provides strategic control over territorial expansion.

## ADDED Requirements

### Requirement: Tile Claiming
Tiles SHALL be claimed individually by spending accumulated culture.

#### Scenario: Claim a tile
- **GIVEN** player has accumulated at least 10 culture
- **WHEN** player clicks a claimable tile adjacent to their territory
- **THEN** the tile is claimed
- **AND** culture is deducted (10 per tile)
- **AND** the tile becomes claimable for citizen assignment

#### Scenario: Cannot claim without enough culture
- **GIVEN** player has less than 10 culture
- **WHEN** player clicks a claimable tile
- **THEN** the tile is NOT claimed
- **AND** an error message is shown

#### Scenario: Cannot claim non-adjacent tiles
- **GIVEN** a tile is not adjacent to any claimed tile
- **WHEN** player clicks that tile
- **THEN** the tile is NOT claimed

### Requirement: Claim Cost
The cost to claim a tile SHALL be based on distance from city center.

#### Scenario: First ring tiles
- **GIVEN** a tile is at distance 1 from city center
- **WHEN** the tile is claimed
- **THEN** the cost is 10 culture

#### Scenario: Outer ring tiles
- **GIVEN** a tile is at distance 2 or greater from city center
- **WHEN** the tile is claimed
- **THEN** the cost is (distance * 10) culture

### Requirement: Claimed Tile Persistence
Claimed tiles SHALL remain claimed regardless of culture fluctuations.

#### Scenario: Culture drops after claiming
- **GIVEN** player claimed a tile with 50 culture (leaving 40)
- **WHEN** culture drops below 10 due to spending
- **THEN** the claimed tile remains claimed
- **AND** it continues to contribute to yields

### Requirement: Auto-Expand Mode
Players SHALL have the option to enable automatic claiming of adjacent tiles.

#### Scenario: Auto-expand enabled
- **GIVEN** auto-expand is enabled
- **AND** player has at least 10 culture
- **AND** there are unclaimed adjacent tiles
- **WHEN** a turn ends
- **THEN** the best adjacent tile is automatically claimed
- **AND** culture is deducted

#### Scenario: Auto-expand disabled (default)
- **GIVEN** auto-expand is disabled
- **WHEN** a turn ends
- **THEN** no tiles are automatically claimed

### Requirement: Tile Visual States
Tiles SHALL have distinct visual states indicating their claim status.

#### Scenario: Claimed tile
- **WHEN** a tile has been claimed
- **THEN** it renders at full opacity
- **AND** a claim indicator is shown (e.g., border highlight)

#### Scenario: Claimable tile
- **WHEN** a tile is adjacent to claimed territory
- **AND** the tile has not been claimed
- **THEN** it renders with a distinct style (dashed border, glow, etc.)
- **AND** it is clickable

#### Scenario: Unavailable tile
- **WHEN** a tile is not adjacent to claimed territory
- **THEN** it renders dimmed
- **AND** it is not clickable for claiming
