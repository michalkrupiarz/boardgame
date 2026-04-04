## 1. Setup & Infrastructure

- [ ] 1.1 Install Playwright using `npm install --save-dev @playwright/test`.
- [ ] 1.2 Run Playwright initialization (`npx playwright install`).
- [ ] 1.3 Create `playwright.config.ts` with local server settings (baseURL: http://localhost:5173).
- [ ] 1.4 Update `package.json` with scripts: `test:e2e` and `test:e2e-report`.
- [ ] 1.5 Update `openspec/config.yaml` with the unified report requirement (already done).

## 2. Test Suite Implementation

- [ ] 2.1 Create `tests/citizen-assignment.spec.ts`.
- [ ] 2.2 Implement test flow: Navigate -> Next Turn -> Verify Worker SVG.
- [ ] 2.3 Implement test flow: Open Tile Info -> Assign Citizen -> Verify SVG Appearance.
- [ ] 2.4 Implement test flow: Unassign Citizen -> Verify SVG Removal.

## 3. Execution & Reporting

- [ ] 3.1 Run tests and generate the HTML report.
- [ ] 3.2 Verify the report contains status for all tests in a single view.
