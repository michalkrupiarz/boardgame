# Proposal: Add E2E Tests with Playwright

## Why
Currently, the project only has unit tests for game logic. End-to-End (E2E) testing is needed to verify that the UI components correctly interact with the state and that core gameplay flows—like assigning citizens to tiles—are functional from a user's perspective.

## What Changes
1. **Tooling**: Install and configure `@playwright/test`.
2. **Infrastructure**: Add `playwright.config.ts` and update `package.json` with test scripts.
3. **Test Suite**: Create a dedicated `tests/` directory and implement a `citizen-assignment.spec.ts` test.
4. **Reporting**: Configure Playwright to generate a single, unified HTML report for all tests.

## Impact
- **Developer Workflow**: New command `npm run test:e2e` for verification.
- **CI/CD**: The unified report ensures clear visibility into test results.
- **Reliability**: Catches regression bugs in the UI/UX layer that unit tests might miss.
