# OpenSpec Agent Skills for City Builder

This document codifies the agent roles and capabilities inferred from the repository's OpenSpec configuration (config.yaml). It translates the spec-driven guidance into concrete agent skills you can rely on when proposing, exploring, and applying changes to the project.

## 1) Agents and Capabilities
- opsx-propose: Create artifact proposals (e.g., feature ideas, design proposals) guided by the project context and the canonical rules document. Outputs a proposal artifact suitable for review.
- opsx-explore: Analyze a given proposal, extract requirements, constraints, and refinements. Produce a refined design note or updated proposal content.
- opsx-apply: Implement changes described by a proposal or design. This includes coding changes, updating tests, and ensuring alignment with docs/rules.md. Outputs include committed changes and updated test results.
- opsx-archive: Finalize and merge an implemented change into main, ensuring traceability and a clean history.
- opsx-rule-review: Review code and logic changes for rule implications. Extract candidate rules and suggest updates to docs/rules.md with reviewer approval.
- opsx-git: Enforce and guide the repository workflow (branching, commits, PRs, and testing) to ensure consistent history and collaboration hygiene.
- opsx-test: Execute unit and end-to-end tests (Vitest and Playwright) to validate behavior after changes.

## 2) How the config.yaml maps to agent behavior
- schema: spec-driven
  - The workflow is driven by a specification that dictates how artifacts are produced and evaluated.
- context: |
  - Project context is provided to inform AI reasoning and ensure proposals align with the project’s scope and style.
- Rules File: docs/rules.md
  - The canonical rules document used to validate proposals and changes. Artifacts must be consistent with these rules.
- Rules Review Pass (process steps)
  - At the end of an /opsx:apply run, perform a review to identify candidate rules and update docs accordingly.
- Git Workflow
  - Guidance on feature branches, per-change commits, and PR-style workflows to keep history clean.
- Per-artifact rules (optional)
  - Placeholder for artifact-specific rules; can be enabled to enforce additional constraints per artifact type.

## 3) Not-needed content from config.yaml (moved to skills.md for reference)
- The config.yaml contains optional guidance and example block for per-artifact rules. This is not required for runtime execution but is useful as a reference for refining workflows.
- Extracted content (not required by runtime config):

```
# Per-artifact rules (optional)
# Add custom rules for specific artifacts.
# Example:
#   rules:
#     proposal:
#       - Keep proposals under 500 words
#       - Always include a "Non-goals" section
#     tasks:
#       - Break tasks into chunks of max 2 hours
```

This section can be used to discuss constraints in future iterations without hard-coding them into the runtime config.

## 4) Quick usage note
- Use this document as a reference when planning / proposing changes. If you need a quick deep-dive into a specific agent, search for the relevant section in this file and ensure alignment with docs/rules.md.
