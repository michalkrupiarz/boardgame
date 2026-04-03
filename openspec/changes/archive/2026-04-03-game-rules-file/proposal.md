# Proposal: Game Rules File

## Why

The game has no central, authoritative source of truth for its rules. As the game grows, rules are scattered across code, comments, and mental models, making it hard to keep them consistent or share them with contributors and the AI tooling.

## What Changes

- **New file**: A dedicated `rules.md` (or `RULES.md`) file at the project root (or a well-known location like `docs/rules.md`) that documents all game rules in one place.
- **`openspec/config.yaml` update**: The project context in `config.yaml` will explicitly reference this rules file so that the AI always reads it when generating artifacts — ensuring any rule addition, removal, or edit is reflected project-wide.

## Non-Goals

- This change does not implement any new game rules; it consolidates existing and future rules.
- This change does not enforce rules in code (that is a separate concern).

## Impact

- `openspec/config.yaml`: Updated to reference the rules file in its context block.
- `docs/rules.md` (new): The canonical rules file.
