## 1. State Logic (`src/state/GameState.ts`)

- [x] 1.1 Update the `City` interface to include a `population: number` property.
- [x] 1.2 Update `getInitialState()` to initialize `city.population` to `1`.
- [x] 1.3 Add a helper function `getFoodThresholdForNextPopulation(currentPopulation: number): number` that returns the next cumulative Fibonacci value threshold for population growth (e.g. 2, 3, 5, 8, 13...).
- [x] 1.4 Update `nextTurn()` logic: After calculating new food yields, check if the city has reached the required food threshold. If so, increment population by 1 and deduct 80% (rounded down) of the current stored food.

## 2. Visualization Updates 

- [x] 2.1 Update `HexTileProps` in `src/components/Map/HexTile.tsx` to accept a `population?: number` prop.
- [x] 2.2 Update the `HexTile` component so that if `isCity` is true and `population` is provided, it overlays an SVG `<text>` element on the city icon showing the population number.
- [x] 2.3 Update the component that renders the map (e.g. `App.tsx` or `HexMap.tsx`) to pass `state.city.population` into the `HexTile` that represents the city (at `0,0`).
