# Proposal: Test Failure Artifacts

## Why
Currently, our Playwright E2E tests only generate a trace on the first retry. To improve debugging and provide immediate visual feedback for failed tests (especially in headless environments), we need to capture screenshots and video recordings when tests fail after retries.

## What Changes
- Update `playwright.config.ts` to enable automatic screenshot capture on failure.
- Update `playwright.config.ts` to enable video recording on test retries.

## Impact
- **DevEx**: Faster debugging of flaking or failing E2E tests through visual evidence.
- **Storage**: Increased disk usage in `test-results/` for failed runs (mitigated by only retaining on failure/retry).
- **Dependencies**: No new dependencies; utilizing existing Playwright capabilities.
