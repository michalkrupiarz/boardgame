# Design: Update Project Guidelines for E2E Testing

## Context
We have recently integrated Playwright for end-to-end testing. To ensure this practice continues, we are embedding testing requirements directly into the project's core configuration and documentation.

## Goals
- Formalize E2E testing as a requirement for all functional changes.
- Update `README.md` with clear, actionable testing commands.

## Decisions

### 1. Update `openspec/config.yaml`
We will add a new rule under the `context` or `rules` section. 
- **Rule**: "Every functional change MUST include E2E tests. If there is ambiguity about what to test, the developer must provide a list of candidate tests for stakeholder decision."

### 2. Update `README.md`
We will append a "Testing" section to the `README.md`.
- **Content**: Commands for running tests (`npm run test:e2e`) and viewing reports (`npm run test:e2e:report`).

## Risks / Trade-offs
- **Overhead**: Minor increase in proposal time.
- **Maintenance**: Documentation must be kept in sync if commands change (mitigated by referencing `package.json`).
