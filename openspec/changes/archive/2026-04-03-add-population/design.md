# Design: City Population Mechanics

## Context
We are introducing a population mechanic driven by food storage. City population dictates scale, starting at 1 and growing when the stored food stack reaches progressive Fibonacci sequence milestones. Scaling consumes 80% (rounded down) of the food pile.

## Goals / Non-Goals
**Goals:**
- Extend the `GameState` and `City` interfaces to support a `population` integer.
- Integrate a Fibonacci threshold check at the end of every turn to automatically increment population if growth criteria are met.
- Properly calculate and deduct the 80% food consumption penalty when a city grows.

**Non-Goals:**
- UI visualizations of population are not part of this core mechanic design, we will just expose the state so the existing UI can render it.
- Population does not currently provide any direct gameplay bonuses in this specific change (that can be added later).

## Approach

### 1. State changes (`src/state/GameState.ts`)
- Add `population: number` to the `City` interface.
- Update `getInitialState()` to initialize `city.population` to `1`.

### 2. Logic additions
- Introduce a helper function `getFoodThresholdForNextPopulation(currentPopulation: number): number`.
  - The Fibonacci thresholds are 2, 3, 5, 8, 13, 21, etc.
  - Population 1 -> 2 requires 2 food.
  - Population 2 -> 3 requires 3 food.
  - Population 3 -> 4 requires 5 food.
- This helper will iteratively compute the required Fibonacci number corresponding to `currentPopulation`.

### 3. Turn Progression Updates
- Keep `calculateTurnYield` mostly the same.
- In `nextTurn(state: GameState)`, after adding yields to current resources:
  - Check if `state.city.resources.food >= getFoodThresholdForNextPopulation(state.city.population)`.
  - If it is:
      - Increment `population` by 1.
      - Calculate consumed food: `Math.floor(state.city.resources.food * 0.8)`.
      - Deduct this amount from `food`.
  - *Note: To handle massive food influxes, we could use a `while` loop, but for a turn-based board game, typically one population growth event per turn per city is standard. We will implement it as a `while` loop in case food yields are extremely high.*

## Decisions
- The 80% consumption rule inherently means cities don't drop to 0 food upon growth. `Math.floor` prevents fractional numbers, as resources currently seem strictly integral.
- We put the logic in `nextTurn` right after applying terrain yields, so growth happens exactly when sufficient food is accumulated.
- For the Map UI, population will be passed as a prop from `HexMap` (or parent) to the `HexTile` that acts as the city. An `<text>` SVG node will render over the city icon.

## Risks / Trade-offs
- Since growth happens at the turn step, the user might not realize *why* their food suddenly disappeared unless the UI communicates the growth event effectively. We will document the mechanic clearly in the rules so players know what to expect.
