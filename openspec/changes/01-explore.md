# OpenSpec Exploration: Center Tile Yield Clarification

This document captures exploratory notes and refinements for the OpenSpec change defined in 01-sample-open-spec.md.

## Objectives explored
- Verify how center tile yields interact with radius-based harvesting.
- Ensure consistency with Section 5 (The Map & Tiles) and Section 8 (Population) of docs/rules.md.
- Determine whether the change should be purely documentation (no code changes) or require a small code adjustment.

## Findings
- The current rules already state center tile is worked for free and contributes yields; we need explicit wording to avoid ambiguity.
- No immediate code changes needed; this is a documentation clarity task.

## Recommendations
- Propose a minor wording update in docs/rules.md to clearly mention center tile per-turn yields and its free status.
- If needed in a future artifact, consider a small unit test for yield calculation that ensures center tile is included irrespective of radius.

## Artifacts for Apply
- A docs/rules.md wording update (center tile) in the next artifact.
