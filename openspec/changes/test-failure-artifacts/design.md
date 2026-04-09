# Design: Test Failure Artifacts

## Context
Our current Playwright configuration is optimized for minimal disk usage, only capturing traces on the first retry. However, for complex UI failures (like SVG interactions), having a video of the interaction and a screenshot of the final failure state is essential for triage.

## Goals
- Capture screenshots of the page state at the moment of failure.
- Record video of the test execution, focused on retries.

## Non-Goals
- Adding heavy third-party reporting tools.
- Recording successful test runs (to save disk space).

## Decisions

### 1. Enable Screenshots on Failure
We will set `screenshot: 'only-on-failure'` in the `use` configuration. This ensures that every time a test fails, a high-resolution image of the viewport is saved.

### 2. Enable Video on Retry
We will set `video: 'on-first-retry'`. This balances the need for visual evidence with disk space management. Video will only be recorded when Playwright initiates a retry, ensuring we don't bloat the `test-results` folder for stable tests.

## Risks / Trade-offs
- **CI Performance**: Recording video can slightly increase test duration.
- **Artifact Management**: The `test-results/` directory will grow larger; we should ensure it's ignored by Git (already true).
