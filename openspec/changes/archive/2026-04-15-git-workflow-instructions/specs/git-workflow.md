# Spec: Git Workflow Instructions

## Overview
Participants in the OpenSpec workflow must adhere to a standardized Git branching and commit strategy. This ensures clarity, isolation of changes, and a clean history.

## Requirements

### Requirement: Feature Branching
Every change proposal must be developed on its own dedicated branch.

#### Scenario: Starting a new change
- **GIVEN** a new OpenSpec change has been initialized
- **WHEN** the participant starts working on the change
- **THEN** they must create and switch to a new Git branch with a name derived from the change name (e.g., `feature/add-population`)

### Requirement: Phase-Specific Commits
The OpenSpec workflow phases (propose, explore, apply, archive) must be reflected as individual commits.

#### Scenario: Completing a workflow phase
- **GIVEN** a workflow step (like `/opsx-propose` or `/opsx-apply`) is completed
- **WHEN** the participant prepares to move to the next phase
- **THEN** they must commit all related artifact or codebase changes with a descriptive message (e.g., "Add proposals and artifacts for population mechanics")

### Requirement: Merging on Archive
Completed and archived changes must be merged back into the main branch.

#### Scenario: Archiving a change
- **GIVEN** the `/opsx-archive` command has been successfully executed
- **WHEN** the change is fully settled and the delta specs are synced
- **THEN** the feature branch must be merged into the `main` branch
- **AND** the feature branch should typically be deleted (optional but recommended)
