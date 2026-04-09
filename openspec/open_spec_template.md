# OpenSpec Template

This template is used to craft a specification-driven change for the City Builder project. Use it as a starting point for any /opsx- lifecycle (propose, explore, apply, archive).

## Change Title
- <Short title for the proposed change>

## Context
- Project: City Builder
- Status: Local/OpenSpec workflow enabled via config.yaml (schema: spec-driven)
- Relevant rules: docs/rules.md
- Example context (from repo):
```
Short Description: A turn-based strategy board game focused on municipal growth and resource management. Players develop their city by managing a dynamic economy—balancing gold, production, food, culture, and science. The game features an expansive hexagonal map for exploration and resource harvesting, paired with an immersive city dashboard where players can strategically allocate their production yields to construct new infrastructure and maximize their turn-over-turn advantages.
```

## Goals
- State the primary objective of the change.
- Ensure alignment with existing rules and tech stack.
- Provide demonstrable test coverage and documentation updates if required.

## Non-goals
- Clarify what this change does not touch or intend to change.

## Proposal
- A concise summary of the change:
- Why this change is needed:
- What will be added/modified:
- Any dependencies or risks:

## Impact on Rules
- List any rule implications or required updates to docs/rules.md.
- If no rule changes are needed, state that clearly.

## Acceptance Criteria
- Criterion 1: The change compiles and passes unit tests.
- Criterion 2: The change does not break existing gameplay mechanics.
- Criterion 3: Documentation references are updated if applicable.
- Criterion 4: Any new tests cover the new behavior.

## Artifacts to Produce
- Code changes (diffs)
- Tests (unit + integration)
- Documentation updates (docs/rules.md or relevant docs)

## Lifecycle
- /opsx-propose: Draft a proposal artifact.
- /opsx-explore: Refine proposal with analysis and notes.
- /opsx-apply: Implement changes and update tests/docs.
- /opsx-archive: Finalize and merge into main.
