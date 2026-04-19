## 1. Verification

- [ ] 1.1 Verify Tile interface has resource field in `src/state/GameState.ts`
- [ ] 1.2 Verify ResourceType enum is defined
- [ ] 1.3 Verify map generation assigns resources to tiles
- [ ] 1.4 Run typecheck to ensure no TypeScript errors

## 2. Optional: Add Resource None to Enum

- [ ] 2.1 Consider adding explicit `None` value to ResourceType for clearer null handling

The feature is already implemented in the codebase. The Tile interface includes:
- `resource?: ResourceType` (optional field at line 52)
- `ResourceType` enum defined at lines 5-7
- Resource generation in `generateInitialMap` at lines 114-119