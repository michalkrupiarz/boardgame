## Context

The `GameState.ts` file contains 26 exported functions with varying test coverage. Currently 28 tests exist, but functions like `generateInitialMap`, `getCurrentRadius`, `getClaimableTiles`, `toggleAutoExpand`, and `getTileYieldSum` lack direct tests.

## Goals / Non-Goals

**Goals:**
- Achieve comprehensive test coverage for all exported functions in `GameState.ts`
- Ensure tests are deterministic and reliable
- Follow existing test patterns and conventions

**Non-Goals:**
- Testing React components (E2E tests cover UI)
- Testing random terrain generation behavior (it's intentionally random for variety)
- Adding integration tests

## Decisions

1. **Use deterministic test setup**: For functions that depend on `generateInitialMap` with random terrain, create state with fixed map sizes and manually set terrain where needed.

2. **Follow existing test patterns**: Use the existing `describe/it/expect` structure from `GameState.test.ts`.

3. **Test pure functions directly**: Functions like `getCurrentRadius`, `getClaimCost`, `getTileYieldSum` can be tested with simple input/output assertions.

## Risks / Trade-offs

- [Risk] Random terrain could cause flaky tests → [Mitigation] Use deterministic assertions that don't depend on specific terrain values
- [Risk] Adding tests increases maintenance burden → [Mitigation] Tests prevent regressions, net positive
