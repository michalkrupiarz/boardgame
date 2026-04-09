# Spec: City Side Panels

## Overview

The City Side Panels provide overlay access to city management tools without obscuring the main map view.

## ADDED Requirements

### Requirement: Side Panel Display
The application SHALL display side panels when the City View toggle is active.

#### Scenario: Side panels appear on toggle
- **WHEN** player clicks "City View" button
- **THEN** left and right side panels appear over the map
- **AND** the main map remains visible and interactive

#### Scenario: Side panels hide on toggle
- **WHEN** player clicks "Close City" button (or toggles again)
- **THEN** side panels disappear
- **AND** only the main map and HUD remain visible

### Requirement: Left Panel Content
The left panel SHALL display city infrastructure and citizen information.

#### Scenario: Infrastructure display
- **WHEN** side panels are visible
- **THEN** "Built Infrastructure" section shows all constructed buildings
- **AND** "Citizen Assignment" section shows population stats

#### Scenario: Empty infrastructure
- **WHEN** no buildings have been constructed
- **THEN** "Built Infrastructure" displays "No buildings constructed yet."

### Requirement: Right Panel Content
The right panel SHALL display available buildings for construction.

#### Scenario: Buildings list visible
- **WHEN** side panels are visible
- **THEN** "Available Buildings" section shows all building types
- **AND** each building has a Build button
- **AND** Build buttons are disabled if insufficient production

### Requirement: Building Construction
Players SHALL be able to construct buildings from the side panel.

#### Scenario: Build a building
- **GIVEN** player has sufficient production
- **WHEN** they click "Build" on a building
- **THEN** the building is constructed
- **AND** it appears in the Infrastructure section
- **AND** production is deducted

### Requirement: Map Interaction
Citizen assignment SHALL be performed directly on the main map.

#### Scenario: Map remains interactive
- **WHEN** side panels are visible
- **THEN** the main map is still visible
- **AND** tiles can be clicked to assign/unassign citizens
