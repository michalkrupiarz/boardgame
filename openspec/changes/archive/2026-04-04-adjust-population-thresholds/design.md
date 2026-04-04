# Design: Adjust Population Thresholds

## Context
The current population growth thresholds follow the Fibonacci sequence starting at 2 (Pop 1 → 2). The user wants the first threshold to be 8, while maintaining the progression: 8, 13, 21, etc.

## Approach
Currently, `getFoodThresholdForNextPopulation` uses a simple loop to calculate the next Fibonacci number. To shift it, I'll adjust the starting values of `a` and `b`.

### 1. Loop Shifting
Original:
- `a=1, b=1`
- `i=0`: `temp=2, a=1, b=2`. (Threshold 2)
- `i=1`: `temp=3, a=2, b=3`. (Threshold 3)

Goal (Shift to 8):
- `a=3, b=5`
- `i=0`: `temp=8, a=5, b=8`. (Threshold 8)
- `i=1`: `temp=13, a=8, b=13`. (Threshold 13)

### 2. Rulebook Update
Update `docs/rules.md` to reflect the new starting threshold.

### 3. Verification
Verify that `getInitialState` doesn't need additional food to start.

## Risks
- **Slow Growth**: Slower growth may make buildings more important.
- **Resource Stagnation**: If the player doesn't focus on food, the early game may feel too slow.
