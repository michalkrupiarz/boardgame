# OpenSpec Application: Center Tile Yield Clarification

This artifact documents how to apply the Center Tile Yield Clarification change.

## Plan
- Update docs/rules.md to explicitly state center tile yields are always included in harvest and are worked for free.
- No code changes are required for this artifact; changes are documentation-only.

## Implementation Notes
- The change will be implemented as a documentation update; care should be taken to ensure tests and builders reference the updated rule language.

## Validation
- Verify docs/rules.md reflect the new phrasing and that surrounding text remains coherent.

## Rollback
- If the change is not accepted, revert the docs change in a separate artifact.
