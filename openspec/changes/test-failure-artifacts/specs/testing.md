# Testing Specification

## ADDED Requirements

### Requirement: Automatic Failure Visuals
The E2E testing framework must automatically capture a screenshot of the page when a test fails.

#### Scenario: Visual Capture on Failure
- **GIVEN** a Playwright test starts
- **WHEN** the test fails
- **THEN** a screenshot should be saved in the `test-results/` directory

### Requirement: Automated Video Capture on Retry
The E2E testing framework must record a video of the interaction when a test is retried due to failure.

#### Scenario: Video Recording on Retry
- **GIVEN** a Playwright test fails its initial run
- **WHEN** the test is retried
- **THEN** a video recording of the retry attempt should be saved in the `test-results/` directory
