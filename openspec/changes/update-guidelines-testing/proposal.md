# Proposal: Update Project Guidelines for E2E Testing

## Why
As the project grows, we need to ensure that every functional change is verified not just by unit tests, but by robust end-to-end tests. Additionally, the project's onboarding documentation (`README.md`) needs to inform new developers and AI assistants on how to execute these tests to maintain high quality standards.

## What Changes
- **`openspec/config.yaml`**: Add a mandatory requirement for E2E testing of all changes. If the test plan is ambiguous, a list of candidate tests must be presented for decision.
- **`README.md`**: Add a dedicated section for "E2E Testing" instructions, including terminal commands for execution and report viewing.

## Impact
- **Maintenance**: Higher quality assurance for all new features.
- **Documentation**: Improved developer onboarding and AI alignment.
- **Workflow**: Slightly more overhead for proposal creation (offset by higher reliability).
