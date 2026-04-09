# OpenSpec Exploration: Center Tile Yield Clarification (02)

This document captures exploratory notes for the OpenSpec change proposed in 02-center-tile-open-spec.md.

## Objectives explored
- Confirm that the Center Tile (0,0) contributes its terrain yields every turn, regardless of population or radius.
- Validate interaction with radius-based harvesting and the rule that the Center Tile is worked for free.
- Consider edge cases (e.g., center tile with different terrain or future expansion).

## Findings
- The current game rules and code indicate the Center Tile is always included in yields, as it is the city center and treated as always worked for free.
- There is explicit wording in the rules that the center tile is included in harvest; no code changes are necessary to maintain behavior.

## Recommendations
- Proceed with a documentation update in docs/rules.md to make the Center Tile yield behavior explicit and unambiguous.
- If desired in the future, add a unit test to confirm center tile is included in yields independent of radius or population state.

## Artifacts for Apply
- Documentation update in docs/rules.md describing Center Tile yield behavior more clearly.
