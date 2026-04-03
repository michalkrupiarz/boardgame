# Proposal: Add City Population

## Why

Currently, cities do not have a concept of population. Adding population creates a meaningful sink for the "Food" resource, making agricultural strategy more relevant and adding a core metric of a city's scale. 

## What Changes

- **City Population Metric**: A new scalar value `population` will be added to cities, starting at `1`.
- **Population Growth System**: Population will grow when the city's stored `food` reaches specific Fibonacci sequence thresholds (2, 3, 5, 8, 13, 21, etc.).
- **Food Consumption on Growth**: Achieving a population increase will consume 80% (rounded down) of the city's currently stored `food` as the cost of growth.

## Impact

- `GameState`: The `City` interface will need a `population` field. Game state turn progression will explicitly check for population growth conditions and deduct food accordingly.
- `rules.md`: Game rules will be updated to reflect the new population mechanic.
- The UI (city dashboard) will need to be updated to display the current population and progress towards the next growth milestone.
- Map View: The `HexTile` component will display the current population as a simple number stacked on or near the city house icon.
