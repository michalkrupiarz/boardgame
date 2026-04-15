## Why

The game state logic lacks comprehensive unit test coverage. With 26 exported functions in `GameState.ts`, only a subset are tested. Missing tests create risk of regressions when adding new features or refactoring existing logic.

## What Changes

- Add unit tests for untested functions in `GameState.ts`
- Ensure all pure functions have test coverage
- Tests should be deterministic (seed random terrain generation or mock it)

## Capabilities

### New Capabilities
- `unit-test-coverage`: Comprehensive unit tests for all game state functions including map generation, radius calculation, tile utilities, and state transitions

### Modified Capabilities
- None

## Impact

- File: `src/state/GameState.test.ts` - expanded with new test cases
- Dependencies: vitest (already configured)
