## 1. Setup & Infrastructure

- [x] 1.1 Install Playwright using `npm install --save-dev @playwright/test`.
- [x] 1.2 Run Playwright initialization (`npx playwright install`).
- [x] 1.3 Create `playwright.config.ts` with local server settings (baseURL: http://localhost:5173).
- [x] 1.4 Update `package.json` with scripts: `test:e2e` and `test:e2e-report`.
- [x] 1.5 Update `openspec/config.yaml` with the unified report requirement (already done).

## 2. Test Suite Implementation

- [x] 2.1 Create `tests/citizen-assignment.spec.ts`.
- [x] 2.2 Implement test flow: Navigate -> Next Turn -> Verify Worker SVG.
- [x] 2.3 Implement test flow: Open Tile Info -> Assign Citizen -> Verify SVG Appearance.
- [x] 2.4 Implement test flow: Unassign Citizen -> Verify SVG Removal.

## 3. Execution & Reporting

- [x] 3.1 Run tests and generate the HTML report.
- [x] 3.2 Verify the report contains status for all tests in a single view.
