# Spec: Game Rules File

## Overview

A canonical `docs/rules.md` file must exist as the single, player-facing source of truth for all game rules — written as if for a published board game. The AI must propose candidate rules to a human reviewer after every implementation run, and only write approved rules into the file.

## Requirements

### Requirement: Canonical Player-Facing Rules File

A file at `docs/rules.md` must exist, structured as a publishable rulebook with numbered sections and rules.

#### Scenario: Rules file is present and readable by a player
- **GIVEN** the project has been set up
- **WHEN** a player or developer opens `docs/rules.md`
- **THEN** they find rules written in plain, player-facing language (not code or dev jargon)

#### Scenario: Rule is added via the review pass
- **GIVEN** the AI has completed an `/opsx:apply` run
- **WHEN** the reviewer approves a candidate rule
- **THEN** the rule is added to the correct section of `docs/rules.md` in rulebook tone

#### Scenario: Rule is modified
- **GIVEN** an existing game mechanic changes
- **WHEN** the change is implemented and reviewed
- **THEN** the corresponding rule in `docs/rules.md` is updated or replaced

#### Scenario: Rule is removed
- **GIVEN** a game mechanic is removed
- **WHEN** the change is implemented and reviewed
- **THEN** the corresponding rule is removed from `docs/rules.md`

---

### Requirement: AI-Driven Rules Review Pass

After every `/opsx:apply` run, the AI must perform a post-implementation rules review pass.

#### Scenario: Implementation introduced player-visible changes
- **GIVEN** an `/opsx:apply` run has completed
- **WHEN** the AI reviews the changes made
- **THEN** it identifies candidates using the rule heuristic: *"Does this change what a player can or cannot do, or what the outcome of an action is?"*
- **AND** it presents each candidate in numbered, player-friendly language for reviewer approval

#### Scenario: Reviewer approves rules
- **GIVEN** the AI has presented candidate rules
- **WHEN** the reviewer responds with which numbers to keep
- **THEN** only approved rules are written into `docs/rules.md`
- **AND** rejected rules are discarded without being written

#### Scenario: Reviewer rejects all rules
- **GIVEN** the AI has presented candidate rules
- **WHEN** the reviewer responds with "none"
- **THEN** `docs/rules.md` is not modified

#### Scenario: No rules emerged from the implementation
- **GIVEN** an `/opsx:apply` run has completed
- **WHEN** the AI finds no player-visible changes in its review
- **THEN** it explicitly states "No new rules detected in this change" rather than silently skipping

#### Scenario: AI proposes an implementation detail as a rule (false positive)
- **GIVEN** the AI presents a candidate rule
- **WHEN** the reviewer determines it is an implementation detail (not player-visible)
- **THEN** the reviewer rejects it and it is not written to `docs/rules.md`

---

### Requirement: OpenSpec Config References Rules File and Review Heuristic

`openspec/config.yaml` must instruct the AI to read `docs/rules.md` and perform the rules review pass.

#### Scenario: AI generates any artifact
- **GIVEN** the AI is generating a proposal, design, spec, or tasks artifact
- **WHEN** it reads the project context from `openspec/config.yaml`
- **THEN** it reads `docs/rules.md` and respects established rules in its output

#### Scenario: AI completes an apply run
- **GIVEN** `openspec/config.yaml` contains the rules review instruction
- **WHEN** the AI finishes all tasks in `/opsx:apply`
- **THEN** it performs the rules review pass as the final step, before reporting completion
