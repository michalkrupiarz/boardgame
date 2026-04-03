# Design: Game Rules File

## Context

Currently, game rules exist only implicitly in code and developer knowledge. There is no single document that describes the rules of the game. The project's `openspec/config.yaml` also lacks a pointer to any canonical rules source, so the AI tooling cannot reliably factor rules into generated artifacts.

## Goals / Non-Goals

**Goals:**
- Create `docs/rules.md` as the canonical, player-facing rulebook — written as if the game were published.
- Update `openspec/config.yaml` to reference this file so the AI includes it as context when generating artifacts.
- Establish a **Rules Review Pass** at the end of every `/opsx:apply` run, where the AI proposes any newly emerged rules for human approval before writing them into `docs/rules.md`.

**Non-Goals:**
- Enforcing rules in game logic code (separate concern).
- Migrating existing code behavior to align with rules (separate concern).
- Auto-generating rules without human review.

## Approach

### 1. Create `docs/rules.md`

A new Markdown file at `docs/rules.md` is the canonical rules document. It is written for players — tone and language as if published in a board game box — not for developers.

**Structure:**
```
# [Game Name] — Rules

## 1. Overview
## 2. Turn Structure
## 3. Resources
## 4. The Map & Tiles
## 5. Cultural Expansion
## 6. Building & Infrastructure
## 7. Victory Conditions
## 8. Edge Cases & Clarifications
```

Each rule is written in plain, imperative language (e.g., "On your turn, you may…", "A tile becomes available when…"). Rules are numbered within each section for easy reference (e.g., Rule 4.2).

### 2. Update `openspec/config.yaml`

The `context` block in `config.yaml` is updated to:
- Point to `docs/rules.md` as the canonical rules file.
- Instruct the AI to always read `docs/rules.md` before generating any artifact.
- Define the **Rules Review Pass** behaviour (see below).

### 3. Rules Review Pass (post-apply)

At the end of every `/opsx:apply` run, after all tasks are complete, the AI performs a rules review pass:

1. **Looks back** at all code/logic changes made during the run.
2. **Applies the rule heuristic**: *"Does this change affect what a player can or cannot do, or what the outcome of an action is? If yes, it's a candidate rule."*
3. **Filters out implementation details** — internal state, variable names, UI wiring that doesn't change player experience.
4. **Presents a numbered list** of proposed rules in player-friendly language to the reviewer.
5. **Awaits approval**: the reviewer replies with which numbers to keep (e.g., "1, 3" or "all" or "none").
6. **Writes only approved rules** into `docs/rules.md` in the appropriate section, using rulebook tone.

**Example exchange:**
```
AI: Rules Review — 2 candidate rules emerged from this change:

  1. "On your turn, you may spend 2 Culture to unlock
      an adjacent tile for harvesting."

  2. "Unlocked tiles are immediately available to
      all players on the following turn."

  Which would you like to add to rules.md? (e.g. "1", "1 2", "all", "none")
```

## Decisions

- **Player-facing tone**: `rules.md` reads like a published rulebook, not a dev doc. The AI must translate implementation intent into player language.
- **Option B (post-implementation review)**: The rules review happens after all tasks complete — not mid-task — to avoid interrupting implementation flow.
- **Human always approves**: The AI never writes to `rules.md` unilaterally. Every addition requires explicit reviewer confirmation.
- **Heuristic lives in `config.yaml`**: The rule detection heuristic is an instruction in the config context so it applies consistently across all changes.
- **Location `docs/rules.md`**: Keeps rules separate from source code, clearly findable, diffs well in version control.

## Risks / Trade-offs

- The AI's rule detection will never be perfect — it may miss subtle rules or over-propose trivial ones. The review step is the safety net.
- The rulebook tone requires the AI to make language judgements; the reviewer should feel empowered to edit proposed wording before accepting.
- If a change produces no player-visible rules, the review pass should say so clearly ("No new rules detected in this change") rather than silence.
