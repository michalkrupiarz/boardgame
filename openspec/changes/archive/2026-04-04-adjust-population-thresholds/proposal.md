# Proposal: Adjust Population Thresholds

## Why
The current population growth thresholds (2, 3, 5, 8...) make initial expansion very fast. Increasing the starting threshold to 8 (while maintaining the Fibonacci progression: 8, 13, 21...) provides a more challenging early game and slows down the rapid population bloom.

## What Changes
1. **Threshold Calculation**: Update `getFoodThresholdForNextPopulation` to start the Fibonacci sequence at 8 for the first population point.
2. **Initial State**: Increase the starting food in `getInitialState` to ensure the player isn't immediately stalled if the change is too drastic (optional, based on balance). However, the user specifically asked for the thresholds themselves.

## Impact
- **Game Pace**: Slower early-game population growth.
- **Rulebook**: Update the rulebook to reflect the new starting threshold.
