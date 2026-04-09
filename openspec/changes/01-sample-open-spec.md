# OpenSpec Change: Center Tile Yield Clarification

This sample demonstrates how to use the OpenSpec lifecycle on a small, self-contained rule clarification.

## Change Title
- Center Tile Yield Clarification (Center tile yields extended bonuses)

## Context
- Project: City Builder (Board Game)
- Status: Local OpenSpec workflow via config.yaml (spec-driven)
- Rules reference: docs/rules.md
- Goal: Clarify how yields from the city center tile are applied each turn.

## Goals
- Add explicit language that the city center tile contributes its terrain yields every turn, and discuss any center-specific bonuses.
- Keep changes aligned with existing terrain bonuses and population rules.

## Non-goals
- Do not alter any underlying math for terrain yields or population growth in this artifact.

## Proposal
- Propose updating docs/rules.md to explicitly state: "The City Center tile is always worked for free and contributes its terrain yields every turn, regardless of population or radius." and clarifying how this interacts with radius-based harvesting.

## Impact on Rules
- Potential update to Section 5 (The Map & Tiles) and Section 8 (Population) to reflect center-tile behavior explicitly.

## Acceptance Criteria
- Documentation updated with clear language about center tile yields.
- No code changes are required for this artifact; this is a rule clarification.

## Artifacts to Produce
- OpenSpec doc updated (docs/rules.md referenced)
- If accepted, a follow-up update to code/docs should be created in a separate artifact.

## Lifecycle
- /opsx-propose: Draft this proposal artifact.
- /opsx-explore: Review and refine wording; confirm consistency with current code and tests.
- /opsx-apply: Implement the doc change in docs/rules.md (no code changes required in this artifact).
- /opsx-archive: Archive after review.
