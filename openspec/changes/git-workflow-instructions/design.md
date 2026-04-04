# Design: Git Workflow Instructions

## Context
The project currently has no documented Git branching or commit strategy for the AI or participants using the OpenSpec workflow. This can lead to messy commit histories.

## Goals / Non-Goals
**Goals:**
- Update `openspec/config.yaml` to include a clear Git strategy.
- Ensure all major workflow steps (proposal, exploration, application, archiving) are distinct Git events.
- Enforce feature branching for every independent change proposal.

## Approach
We will append a `Git Workflow` section to the `context` string in `openspec/config.yaml`.

The instructions to be added:
```yaml
Git Workflow:
  1. Branching: Each proposal MUST be developed on its own dedicated feature branch (e.g., `git checkout -b feature/change-name`).
  2. Commit Granularity: Every major step in the OpenSpec lifecycle must have its own commit.
     - Proposal creation (`/opsx-propose`): Commit artifact generation.
     - Exploration phase (`/opsx-explore`): Commit significant insights or design updates.
     - Implementation phase (`/opsx-apply`): Commit codebase modifications.
     - Archival phase (`/opsx-archive`): Finalize and merge into `main`.
  3. Merging: Upon successful archival, the feature branch must be merged into the `main` branch.
```

## Decisions
- Using `main` as the default target branch for merges, as the current repository uses it.
- Explicitly calling out the four core commands to ensure the AI understands the commit triggers.
