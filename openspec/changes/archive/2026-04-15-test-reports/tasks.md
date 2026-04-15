## 1. Setup

- [x] 1.1 Add @vitest/coverage-v8 dependency for coverage reporting
- [x] 1.2 Create vitest.config.ts with HTML coverage reporter

## 2. Configure npm Scripts

- [x] 2.1 Add `test:unit` script to package.json (run vitest without coverage)
- [x] 2.2 Add `test:unit:report` script to package.json (run vitest with coverage report)
- [x] 2.3 Update playwright.config.ts to ensure reports are generated consistently

## 3. Add .gitignore Entries

- [x] 3.1 Add coverage/ to .gitignore
- [x] 3.2 Add playwright-report/ to .gitignore
- [x] 3.3 Add test-results/ to .gitignore

## 4. Verify

- [x] 4.1 Run `npm run test:unit` to verify unit tests work
- [x] 4.2 Run `npm run test:unit:report` to verify HTML report generation
- [x] 4.3 Run `npm run test:e2e` and verify playwright-report is created
- [x] 4.4 Verify lint passes
