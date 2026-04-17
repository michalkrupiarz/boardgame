# Proposal: Git Workflow Instructions

## Why
To standardize how participants (AI and humans) interact with the Git repository during the OpenSpec workflow. This ensures that every change is isolated in its own branch and that every significant step in the process is captured as a distinct commit, improving traceability and repository health.

## What Changes
We will extend `openspec/config.yaml` to include a set of Git-related instructions in the project context. The new instructions will specify:
- Every new proposal must be started on its own Git branch (e.g., `feature/populaton-mechanics`).
- Each phase of the OpenSpec lifecycle (`/opsx-propose`, `/opsx-explore`, `/opsx-apply`, `/opsx-archive`) must result in a unique commit with a descriptive message.
- Upon completion of the `/opsx-archive` process, the character must merge the feature branch back into the main development branch (`main`).

## Impact
- **AI Behavior**: The AI will now consistently mention or perform branching and committing as part of its workflow guidance.
- **Project Structure**: No code impact, only procedural changes through documentation in the `config.yaml` file.
- **Traceability**: Enhanced commit history and better branch management across all contributors.
