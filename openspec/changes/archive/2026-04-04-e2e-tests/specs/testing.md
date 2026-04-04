# Spec: E2E Tests with Playwright

## Overview
Cities must track which tiles are actively being worked by their population. Each population point provides one citizen to work a map tile. The city center is worked for free.

## Requirements

### Requirement: Population Limit
A city cannot work more tiles than its current population (excluding the city center).

#### Scenario: Assigning a citizen within limits
- **GIVEN** a city with population 2 and 0 workers assigned
- **WHEN** the player assigns a citizen to a Plains tile
- **THEN** the worker count becomes 1
- **AND** the tile is marked as "worked" and "locked"

#### Scenario: Assigning a citizen at the limit
- **GIVEN** a city with population 1 and 1 worker assigned to a Plains tile
- **WHEN** the player tries to manually assign a citizen to a Forest tile
- **THEN** the worker is moved from the Plains tile to the Forest tile
- **AND** the Plains tile is no longer "worked"

---

### Requirement: Testing Framework
Playwright must be installed and configured correctly.

#### Scenario: Running Playwright
- **GIVEN** `@playwright/test` is installed
- **WHEN** `npm run test:e2e` is executed
- **THEN** it must automatically connect to the local Vite dev server
- **AND** it must run the tests in headless mode.

### Requirement: Unified Reporting
One unified report must be generated for all tests.

#### Scenario: Generating report
- **GIVEN** Playwright tests have run
- **WHEN** the report is generated
- **THEN** it must be an HTML file located in `playwright-report/`
- **AND** it must contain results for all test suites.
