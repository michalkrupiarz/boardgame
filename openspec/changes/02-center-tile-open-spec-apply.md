# OpenSpec Application: Center Tile Yield Clarification (02)

This artifact documents how to apply the Center Tile Yield Clarification change (02).

## Plan
- Update docs/rules.md to explicitly state: "The Center Tile is always worked for free and contributes its terrain yield each turn, regardless of radius or population."
- Include a concise example in the rules to illustrate the central tile’s contribution per turn.

## Implementation Notes
- This is a documentation-only change. No code changes are required.
- Ensure references to center tile yields in the surrounding text remain consistent.

## Validation
- Verify docs/rules.md contains the updated phrasing and example.
- If possible, add a lightweight textual check in the docs tests (if you have any) to ensure consistency.

## Rollback
- If the change is not accepted, revert the docs update in a separate artifact.

## Artifacts to Produce
- Updated docs/rules.md with explicit center tile yield language and example.

## Lifecycle
- /opsx-propose: This 02 artifact was proposed.
- /opsx-explore: This step refined the rationale and confirmed the need for a docs update.
- /opsx-apply: Implement the docs change.
- /opsx-archive: Archive after review.
