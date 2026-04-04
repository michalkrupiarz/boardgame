# Design: E2E Tests with Playwright

## Context
The goal is to test the full gameplay cycle locally. Playwright will provide a multi-browser, high-performance testing framework that allows us to simulate clicking, drag-and-drop (if needed), and other real interaction scenarios.

## Goals / Non-Goals
**Goals:**
- **Unit Test Integration**: None (handled by Vitest).
- **Automation**: Simulate a user navigating, advancing the turn, and managing citizens.
- **Reporting**: Maintain a single, unified HTML report.
- **Vite Integration**: Automatically start the dev server before running tests.

**Non-Goals:**
- Comprehensive cross-browser tests (focus on Chromium for now).
- Visual regression testing (focus on functional correctness).

## Approach

### 1. Choice of Framework
We will use **Playwright** because it offers:
- **Fast Execution**: Parallelized tests by default.
- **Auto-Wait**: Reduces flaky tests by waiting for elements to be interactive.
- **Excellent Debugging**: UI Mode and Trace Viewer are built-in.
- **Single Report**: Playwright's default reporter can be configured to aggregate all results.

### 2. Configuration
- **playwright.config.ts**:
    - `webServer`: Point to `npm run dev` at `http://localhost:5173`.
    - `reporter`: Set to `[['html', { open: 'never' }]]` to generate a single HTML report.
    - `use`: `baseURL: 'http://localhost:5173'`.

### 3. Test Scenarios
- **Initialization**: Open page → Verify turn 1 → Verify starting gold (10).
- **Citizen Assignment**: Click 'Next Turn' → Click non-city tile → Click "Assign Citizen" → Verify SVG icon appears in `HexTile`.
- **Citizen Removal**: Click tile with citizen → Click "Remove Citizen" → Verify SVG icon is gone.

### 4. Reporting Automation
Add `test:e2e` and `test:e2e:report` scripts to `package.json`.

## Decisions
- **Manual vs. Automated Server**: Playwright's `webServer` is preferred as it handles server lifecycle automatically during CI.
- **Unified Reporting**: All test suites will be configured to output to the same `playwright-report/` directory.

## Risks / Trade-offs
- **Flakiness**: Map rendering might be slow. We must use specific selectors or wait for SVG elements to appear.
- **Port Conflicts**: If the dev server is already running, Playwright may need to be configured to reuse it (`reuseExistingServer: true`).
