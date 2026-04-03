# City Builder — Rules

*A turn-based strategy game of municipal growth, resource management, and territorial expansion.*

---

## 1. Overview

City Builder is a turn-based strategy game in which players develop a fledgling settlement into a thriving metropolis. Each turn, your city harvests resources from the surrounding landscape. You spend those resources to construct buildings, grow your culture, and expand your influence across the hexagonal map.

The player who masters the balance between expansion, production, and prosperity wins the game.

---

## 2. Starting Conditions

**2.1** Each player begins the game with a city called **Capital**, placed on a Plains tile at the center of the map.

**2.2** Cities start with a **Population of 1** and the following resources:
- **Gold:** 10
- **Production:** 10
- **Food:** 10
- **Culture:** 0
- **Science:** 0

**2.3** The map is a hexagonal grid. All tiles are visible from the start of the game.

**2.4** The center tile is always **Plains**. All other tiles are assigned terrain randomly.

---

## 3. Turn Structure

**3.1** Players take turns. On each turn, a player may perform any of the following actions in any order:
- Construct a building (see Section 6)
- End their turn

**3.2** At the end of every turn, all resources are automatically harvested. Each tile within your city's cultural radius contributes its terrain yield to your resource pool (see Section 5).

**3.3** There is no limit to the number of actions a player may take in a single turn, provided they have sufficient resources.

---

## 4. Resources

There are five resources in the game:

| Resource | Description |
|----------|-------------|
| **Gold** | Currency used for trade and future mechanics |
| **Production** | Spent to construct buildings |
| **Food** | Sustains and grows your city's population |
| **Culture** | Expands your city's territorial radius |
| **Science** | Unlocks future technologies and advancements |

**4.1** Resources accumulate across turns — they are never lost at the end of a turn.

**4.2** Resources cannot go below zero. If a purchase would reduce a resource below zero, the action is not permitted.

---

## 5. The Map & Tiles

**5.1** The map is made up of hexagonal tiles arranged in an axial grid.

**5.2** Each tile has a terrain type that determines its resource yield per turn:

| Terrain | Gold | Production | Food | Culture | Science |
|---------|------|------------|------|---------|---------|
| Plains | 1 | 1 | 2 | 0 | 0 |
| Forest | 0 | 2 | 1 | 0 | 0 |
| Mountains | 0 | 3 | 0 | 0 | 1 |
| Desert | 2 | 0 | 0 | 1 | 2 |

**5.3** Only tiles that fall within your city's **cultural radius** contribute to your resource yield each turn.

**5.4** The cultural radius is measured in hex steps from your city center (the center tile at position 0, 0).

---

## 6. Cultural Expansion

**6.1** As your Culture resource grows, your city's territorial radius expands, allowing you to harvest resources from more tiles.

**6.2** The cultural radius thresholds are:

| Culture Accumulated | Radius (hex steps) |
|--------------------|--------------------|
| 0 – 49 | 1 |
| 50 – 149 | 2 |
| 150 – 349 | 3 |
| 350+ | 4 |

**6.3** Radius expansion is automatic — it takes effect immediately when the culture threshold is reached, including mid-turn accumulation.

**6.4** Radius expansion cannot be reversed.

---

## 7. Buildings & Infrastructure

**7.1** Players may construct buildings in their city by spending **Production**.

**7.2** Each building provides a permanent bonus to resource yield each turn:

| Building | Production Cost | Bonus per Turn |
|----------|----------------|----------------|
| Farm | 20 | +2 Food |
| Mine | 30 | +2 Production |
| Market | 40 | +3 Gold |
| Library | 50 | +2 Science |
| Monument | 25 | +2 Culture |

**7.3** Building bonuses are added to your city's yield at the end of every turn, in addition to terrain yields.

**7.4** Each building type may be constructed multiple times. Bonuses stack.

**7.5** A building cannot be constructed if the current Production total is less than its cost.

---

## 8. Population

**8.1** Every city has a Population metric that starts at 1.

**8.2** Population grows automatically at the end of the turn when the city accumulates enough stored Food.

**8.3** The Food required for population growth scales sequentially, requiring 2, 3, 5, 8, 13, etc., Food for each successive level.

**8.4** When a city's population grows, 80% (rounded down) of the city's currently stored Food is consumed as the cost of growth.

**8.5** If a substantial surplus of Food is generated in a single turn, it is possible for a city's population to grow multiple times at once.

---

## 9. Victory Conditions

*Victory conditions are yet to be defined. This section will be updated as the game develops.*

---

## 10. Edge Cases & Clarifications

**10.1** If a tile sits exactly on the boundary of the cultural radius (i.e., its distance equals the current radius), it **is** included in the harvest.

**10.2** Terrain yields and building bonuses are both applied each turn — they are additive.

**10.3** The center tile (city location) is always included in the harvest regardless of radius, as it is always at distance 0.
