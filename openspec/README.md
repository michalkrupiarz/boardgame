# OpenSpec Local Lifecycle (Propose → Explore → Apply)

This repository uses a purely local OpenSpec workflow (no external tooling). The steps below show how you can exercise the lifecycle using the artifacts in openspec/changes.

How to use:
- Propose: Create a new proposal artifact under openspec/changes with a unique id, e.g., 02-center-tile-open-spec.md. You can base it on the template at openspec/open_spec_template.md.
- Explore: Create a corresponding exploration artifact openspec/changes/02-center-tile-open-spec-explore.md outlining findings and refinements.
- Apply: Create an apply artifact openspec/changes/02-center-tile-open-spec-apply.md describing what would be implemented and how to validate it.
- Archive: Optionally, create an openspec/changes/02-center-tile-open-spec-archive.md to summarize the final state and outcomes.

Example workflow (Windows PowerShell):
- New artifacts:
  - Copy template and create 02-center-tile-open-spec.md
  - Add: git add openspec/changes/02-center-tile-open-spec.md; git commit -m "OpenSpec: propose center tile clarification"
- Exploration:
  - Create openspec/changes/02-center-tile-open-spec-explore.md; commit
- Apply:
  - Create openspec/changes/02-center-tile-open-spec-apply.md; commit
- Archive:
  - Create openspec/changes/02-center-tile-open-spec-archive.md; commit

Notes:
- This workflow is intended for local governance and documentation. It does not push to any remote.
- The canonical rules document lives at docs/rules.md; ensure proposals stay aligned with those rules.
