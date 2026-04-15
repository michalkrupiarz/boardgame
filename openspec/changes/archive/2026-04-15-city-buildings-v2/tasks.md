## 1. Update Building Interface

- [x] 1.1 Add `upkeep` field to Building interface (optional gold cost per turn)
- [x] 1.2 Add `percentageBonus` field to Building interface (optional yield multipliers)

## 2. Update AVAILABLE_BUILDINGS

- [x] 2.1 Remove old buildings (Farm, Mine, Market, Library, Monument)
- [x] 2.2 Add Granary: 200 prod cost, 20% food retention
- [x] 2.3 Add Cemetery: 100 prod cost, +1 culture
- [x] 2.4 Add Obelisk: 100 prod cost, +1 culture
- [x] 2.5 Add Market: 300 prod cost, 20% gold bonus
- [x] 2.6 Add Library: 400 prod cost, 20% science bonus, 1 gold upkeep
- [x] 2.7 Add Guardhouse: 500 prod cost, 5% prod/sci/gold bonus, 2 gold upkeep

## 3. Update calculateTurnYield

- [x] 3.1 Add logic to apply percentage bonuses to base yields
- [x] 3.2 Add logic to calculate total upkeep cost
- [x] 3.3 Ensure flat bonuses (culture) are added correctly

## 4. Update nextTurn for Granary

- [x] 4.1 Modify population growth to check for Granary
- [x] 4.2 Apply 20% food retention when Granary is present

## 5. Update UI Components

- [x] 5.1 Update CityView to show new buildings
- [x] 5.2 Update any building name references in UI

## 6. Update Tests

- [x] 6.1 Update existing unit tests that reference old buildings
- [x] 6.2 Add new unit tests for percentage bonuses
- [x] 6.3 Add unit test for Granary food retention

## 7. Verify

- [x] 7.1 Run unit tests
- [x] 7.2 Run E2E tests
- [x] 7.3 Run lint
- [x] 7.4 Build the app
