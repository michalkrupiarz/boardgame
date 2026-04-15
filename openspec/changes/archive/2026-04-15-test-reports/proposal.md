## Why

Currently, test results are only visible in the CLI output. Developers must manually run tests to see results, making it harder to share test status, review historical results, or analyze failures after the fact. Viewable HTML reports would improve the development workflow.

## What Changes

- Configure Vitest to generate HTML coverage reports
- Add `npm run test:unit` script to run unit tests
- Add `npm run test:report` script to generate and open combined test reports
- Update test scripts to generate JUnit XML output for CI integration
- Create a test report dashboard combining both unit and E2E test results

## Capabilities

### New Capabilities
- `test-reporting`: HTML test reports for both unit and E2E tests with coverage data

### Modified Capabilities
- None

## Impact

- `package.json`: New npm scripts for test reporting
- `vitest.config.ts`: Coverage reporter configuration (new file)
- `playwright.config.ts`: Enhanced reporting options
