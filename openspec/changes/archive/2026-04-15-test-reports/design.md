## Context

The project currently uses Vitest for unit tests and Playwright for E2E tests. Test results are only visible in CLI output. There is no way to:
- View historical test results
- Share test reports with team members
- Analyze test coverage visually

## Goals / Non-Goals

**Goals:**
- Generate viewable HTML reports for unit tests with coverage
- Generate viewable HTML reports for E2E tests
- Provide easy-to-use npm scripts to run and view reports
- Enable CI integration with JUnit XML output

**Non-Goals:**
- Real-time test monitoring
- Multi-browser parallel report aggregation
- Automated regression detection

## Decisions

1. **Use Vitest HTML reporter for unit tests**
   - Vitest supports HTML coverage reports via `@vitest/coverage-v8`
   - Provides code coverage analysis alongside test results

2. **Use Playwright HTML reporter for E2E tests**
   - Playwright already configured with HTML reporter
   - Need to ensure reports are generated consistently

3. **Add npm scripts for easy access**
   - `npm run test:unit` - run unit tests only
   - `npm run test:unit:report` - generate and open HTML report for unit tests
   - `npm run test:e2e:report` - already exists, opens E2E report

## Risks / Trade-offs

- [Risk] Reports may become stale if not regenerated → [Mitigation] Document that reports should be regenerated before sharing
- [Risk] HTML reports may be large → [Mitigation] Add .gitignore entries for report directories
