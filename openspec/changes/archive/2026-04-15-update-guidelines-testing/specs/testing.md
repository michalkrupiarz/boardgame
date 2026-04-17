# Testing Specification

## ADDED Requirements

### Requirement: Mandatory E2E Testing
Every functional change must be accompanied by end-to-end tests to verify player-facing mechanics.

#### Scenario: Ambiguity Handling
- **GIVEN** a developer is unsure what to test
- **WHEN** creating a proposal
- **THEN** they must provide a list of 2-3 candidate E2E scenarios for stakeholder decision

### Requirement: Onboarding Documentation
The project's `README.md` must contain clear instructions for running E2E tests and viewing reports.

#### Scenario: Running E2E Tests
- **GIVEN** a new developer joins the project
- **WHEN** reading `README.md`
- **THEN** they should find the command `npm run test:e2e` for execution
