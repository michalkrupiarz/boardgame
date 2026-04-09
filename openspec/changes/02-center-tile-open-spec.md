# OpenSpec Change: Center Tile Yield Clarification (02)

This proposal extends the earlier sample to formalize a lifecycle for a small rule clarification focused on the center tile yield behavior.

## Change Title
- Center Tile Yield Clarification (explicit center tile yield for every turn)

## Context
- Project: City Builder (Board Game)
- Status: Local OpenSpec workflow via config.yaml (spec-driven)
- Rules reference: docs/rules.md
- Goal: Ensure explicit, unambiguous language around how the city center tile contributes yields each turn.

## Goals
- Clarify that the City Center tile contributes its terrain yields each turn, and that it is worked for free.
- Ensure the rule text is consistent with the existing terrain yields and radius-based harvesting rules.

## Non-goals
- Do not change the actual math or mechanics of yielding; this is a documentation clarification.

## Proposal
- Update docs/rules.md to explicitly state: "The Center Tile is always worked for free and contributes its terrain yield each turn, regardless of radius or population."
- Clarify how center-tile yields interact with radius expansion (radius should not deprioritize center yields).

## Impact on Rules
- Potential updates to Section 5 (The Map & Tiles) and Section 8 (Population) for explicit center-tile language.
- If approved, include a short example showing center tile yields in a typical turn.

## Acceptance Criteria
- docs/rules.md contains explicit language about the center tile yield behavior.
- No changes required to code; this is a documentation-only artifact.
- A short example illustrating the center tile yields is included in the rules.

## Artifacts to Produce
- OpenSpec documentation change (docs/rules.md) referencing the updated wording.
- Optional: a small example snippet in docs showing a typical turn with center tile yield.

## Lifecycle
- /opsx-propose: Create this proposal artifact.
- /opsx-explore: Review, refine wording, confirm alignment with current code and tests.
- /opsx-apply: Implement the documentation update in docs/rules.md.
- /opsx-archive: Archive after approval.
