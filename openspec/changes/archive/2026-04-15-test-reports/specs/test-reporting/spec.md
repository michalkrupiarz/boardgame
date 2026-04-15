# Test Reporting Capabilities

## ADDED Requirements

### Requirement: Unit tests generate HTML coverage report
The system SHALL generate an HTML coverage report when unit tests are run with the report flag.

#### Scenario: HTML report is generated after running unit tests
- **WHEN** `npm run test:unit:report` is executed
- **THEN** an HTML report is generated in `coverage/` directory
- **THEN** the report includes code coverage percentage
- **THEN** the report can be opened in a browser

### Requirement: Unit tests can run independently
The system SHALL provide a script to run unit tests without generating reports.

#### Scenario: Unit tests run in CLI mode
- **WHEN** `npm run test:unit` is executed
- **THEN** all unit tests run in the terminal
- **THEN** results are displayed in CLI format

### Requirement: E2E tests generate HTML report
The system SHALL generate an HTML report when E2E tests are run.

#### Scenario: E2E HTML report is generated
- **WHEN** `npm run test:e2e` is executed with report flag
- **THEN** an HTML report is generated in `playwright-report/` directory
- **THEN** the report includes test results with screenshots for failures

### Requirement: Test reports can be viewed via npm script
The system SHALL provide easy-to-use npm scripts to view generated reports.

#### Scenario: View unit test report
- **WHEN** `npm run test:unit:report` is executed
- **THEN** the HTML report is opened in the default browser

#### Scenario: View E2E test report
- **WHEN** `npm run test:e2e:report` is executed
- **THEN** the HTML report is opened in the default browser
