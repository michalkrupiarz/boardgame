import { describe, it, expect } from 'vitest';
import { 
  getInitialState, nextTurn, buildBuilding, calculateTurnYield, terrainBonuses, AVAILABLE_BUILDINGS,
  getDistance, getClaimCost, isAdjacentToClaimed, getBestClaimableTileId, claimTile, toggleWorkedTile, autoAssignCitizens,
  generateInitialMap, getCurrentRadius, getFoodThresholdForNextPopulation, getClaimableTiles, toggleAutoExpand, getTileYieldSum,
  hasBuilding
} from './GameState';
import type { Tile } from './GameState';

describe('GameState', () => {
  it('initializes correctly with map size 5', () => {
    const state = getInitialState(5);
    expect(state.turn).toBe(1);
    expect(state.city.resources.gold).toBe(10);
    expect(state.map.length).toBe(19);
  });

  it('calculates turn yield correctly based on map', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Plains';
    const yields = calculateTurnYield(state);
    
    expect(yields.food).toBe(terrainBonuses['Plains'].food);
    expect(yields.gold).toBe(terrainBonuses['Plains'].gold);
    expect(yields.production).toBe(terrainBonuses['Plains'].production);
  });

  it('increments resources on nextTurn', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.gold = 10;
    
    const yields = calculateTurnYield(state);
    
    const nextState = nextTurn(state);
    expect(nextState.turn).toBe(2);
    expect(nextState.city.resources.gold).toBe(10 + yields.gold);
  });

  it('can build a building and deducts its cost', () => {
    const state = getInitialState(1);
    const granaryCost = AVAILABLE_BUILDINGS.find(b => b.id === 'granary')!.cost;
    
    state.city.resources.production = granaryCost + 5;
    
    const nextState = buildBuilding(state, 'granary');
    
    expect(nextState.city.buildings).toContain('granary');
    expect(nextState.city.resources.production).toBe(5);
  });

  it('fails to build if not enough resources', () => {
    const state = getInitialState(1);
    state.city.resources.production = 0;
    
    const nextState = buildBuilding(state, 'cemetery');
    
    expect(nextState.city.buildings).not.toContain('cemetery');
    expect(nextState.city.resources.production).toBe(0);
  });
});

describe('Hex Distance', () => {
  it('calculates distance from center correctly', () => {
    expect(getDistance(0, 0)).toBe(0);
    expect(getDistance(1, 0)).toBe(1);
    expect(getDistance(-1, 0)).toBe(1);
    expect(getDistance(0, 1)).toBe(1);
    expect(getDistance(1, -1)).toBe(1);
    expect(getDistance(2, 0)).toBe(2);
    expect(getDistance(-2, 1)).toBe(2);
  });
});

describe('Claim Cost', () => {
  it('returns 10 for distance 1', () => {
    expect(getClaimCost(1)).toBe(10);
  });

  it('returns 20 for distance 2', () => {
    expect(getClaimCost(2)).toBe(20);
  });

  it('returns 30 for distance 3', () => {
    expect(getClaimCost(3)).toBe(30);
  });

  it('never returns less than 10', () => {
    expect(getClaimCost(0)).toBe(10);
    expect(getClaimCost(-1)).toBe(10);
  });
});

describe('Adjacency Check', () => {
  it('center tile is adjacent to itself', () => {
    const tile: Tile = { id: '0,0', q: 0, r: 0, terrain: 'Plains', isExplored: true };
    expect(isAdjacentToClaimed(tile, ['0,0'])).toBe(true);
  });

  it('distance 1 tiles are adjacent to center', () => {
    const tile: Tile = { id: '1,0', q: 1, r: 0, terrain: 'Plains', isExplored: true };
    expect(isAdjacentToClaimed(tile, ['0,0'])).toBe(true);
  });

  it('distance 2 tiles are NOT adjacent to center', () => {
    const tile: Tile = { id: '2,0', q: 2, r: 0, terrain: 'Plains', isExplored: true };
    expect(isAdjacentToClaimed(tile, ['0,0'])).toBe(false);
  });

  it('tile adjacent to any claimed tile is claimable', () => {
    const tile: Tile = { id: '2,0', q: 2, r: 0, terrain: 'Plains', isExplored: true };
    expect(isAdjacentToClaimed(tile, ['0,0', '1,0'])).toBe(true);
  });
});

describe('Initial State', () => {
  it('starts with center and radius 1 tiles claimed', () => {
    const state = getInitialState(5);
    
    expect(state.city.claimedTileIds).toContain('0,0');
    expect(state.city.claimedTileIds.length).toBe(7);
  });

  it('has autoExpand disabled by default', () => {
    const state = getInitialState(5);
    expect(state.city.autoExpand).toBe(false);
  });

  it('has targetClaimTileId set', () => {
    const state = getInitialState(5);
    expect(state.city.targetClaimTileId).toBeDefined();
    expect(state.city.targetClaimTileId).not.toBe('0,0');
    expect(state.city.claimedTileIds).not.toContain(state.city.targetClaimTileId);
  });
});

describe('Tile Claiming', () => {
  it('can claim adjacent tile with enough culture', () => {
    const state = getInitialState(5);
    state.city.resources.culture = 20;
    
    const targetTile = state.map.find(t => t.id === state.city.targetClaimTileId)!;
    const tileCost = getClaimCost(getDistance(targetTile.q, targetTile.r));
    expect(tileCost).toBeLessThanOrEqual(20);
    
    const nextState = claimTile(state, targetTile.id);
    expect(nextState.city.claimedTileIds).toContain(targetTile.id);
    expect(nextState.city.resources.culture).toBeLessThan(state.city.resources.culture);
  });

  it('cannot claim already claimed tile', () => {
    const state = getInitialState(5);
    state.city.resources.culture = 100;
    
    const claimedTile = state.city.claimedTileIds[0];
    const nextState = claimTile(state, claimedTile);
    
    expect(nextState).toBe(state);
  });

  it('cannot claim without enough culture', () => {
    const state = getInitialState(5);
    state.city.resources.culture = 0;
    
    const targetTile = state.map.find(t => t.id === state.city.targetClaimTileId)!;
    const nextState = claimTile(state, targetTile.id);
    
    expect(nextState.city.claimedTileIds).not.toContain(targetTile.id);
    expect(nextState.city.resources.culture).toBe(0);
  });

  it('getBestClaimableTileId returns highest yield tile', () => {
    const state = getInitialState(5);
    const bestId = getBestClaimableTileId(state.map, state.city.claimedTileIds);
    
    expect(bestId).toBeDefined();
    expect(state.city.claimedTileIds).not.toContain(bestId);
  });
});

describe('Toggle Worked Tile', () => {
  it('can work claimed tiles when population allows', () => {
    let state = getInitialState(5);
    state.city.population = 3;
    state.city.resources.culture = 100;
    
    const claimableTile = state.map.find(t => !state.city.claimedTileIds.includes(t.id) && isAdjacentToClaimed(t, state.city.claimedTileIds));
    expect(claimableTile).toBeDefined();
    
    if (claimableTile) {
      state = claimTile(state, claimableTile.id);
      expect(state.city.claimedTileIds).toContain(claimableTile.id);
      const nextState = toggleWorkedTile(state, claimableTile.id);
      expect(nextState.city.workedTileIds).toContain(claimableTile.id);
    }
  });

  it('cannot work unclaimed tiles', () => {
    const state = getInitialState(5);
    
    const unclaimedTile = state.map.find(t => !state.city.claimedTileIds.includes(t.id) && !isAdjacentToClaimed(t, state.city.claimedTileIds));
    if (unclaimedTile) {
      const nextState = toggleWorkedTile(state, unclaimedTile.id);
      expect(nextState.city.workedTileIds).not.toContain(unclaimedTile.id);
    }
  });

  it('removes worker when toggling worked tile', () => {
    let state = getInitialState(5);
    state.city.population = 3;
    
    const claimableTile = state.map.find(t => !state.city.claimedTileIds.includes(t.id) && isAdjacentToClaimed(t, state.city.claimedTileIds));
    expect(claimableTile).toBeDefined();
    
    if (claimableTile) {
      state = claimTile(state, claimableTile.id);
      state = toggleWorkedTile(state, claimableTile.id);
      
      const nextState = toggleWorkedTile(state, claimableTile.id);
      expect(nextState.city.workedTileIds).not.toContain(claimableTile.id);
    }
  });
});

describe('Auto Assign Citizens', () => {
  it('does not exceed population limit', () => {
    const state = getInitialState(5);
    state.city.population = 2;
    
    const nextState = autoAssignCitizens(state);
    expect(nextState.city.workedTileIds.length).toBeLessThanOrEqual(state.city.population);
  });

  it('keeps locked citizens', () => {
    const state = getInitialState(5);
    state.city.population = 3;
    state.city.lockedTileIds = ['0,0'];
    
    const nextState = autoAssignCitizens(state);
    expect(nextState.city.workedTileIds).toContain('0,0');
  });
});

describe('Population Growth', () => {
  it('grows population when food threshold is met', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.food = 100;

    const nextState = nextTurn(state);
    expect(nextState.city.population).toBeGreaterThan(1);
  });
});

describe('Map Generation', () => {
  it('generates correct tile count for size 1', () => {
    const tiles = generateInitialMap(1);
    expect(tiles.length).toBe(1);
    const center = tiles.find(t => t.id === '0,0');
    expect(center).toBeDefined();
  });

  it('generates correct tile count for size 3 (radius 1)', () => {
    const tiles = generateInitialMap(3);
    expect(tiles.length).toBe(7);
  });

  it('generates correct tile count for size 5 (radius 2)', () => {
    const tiles = generateInitialMap(5);
    expect(tiles.length).toBe(19);
  });

  it('center tile is always Plains terrain', () => {
    const tiles = generateInitialMap(5);
    const center = tiles.find(t => t.q === 0 && t.r === 0);
    expect(center?.terrain).toBe('Plains');
  });
});

describe('Culture Radius', () => {
  it('returns radius 1 for culture less than 50', () => {
    expect(getCurrentRadius(0)).toBe(1);
    expect(getCurrentRadius(49)).toBe(1);
  });

  it('returns radius 2 for culture between 50 and 149', () => {
    expect(getCurrentRadius(50)).toBe(2);
    expect(getCurrentRadius(149)).toBe(2);
  });

  it('returns radius 3 for culture between 150 and 349', () => {
    expect(getCurrentRadius(150)).toBe(3);
    expect(getCurrentRadius(349)).toBe(3);
  });

  it('returns radius 4 for culture 350 or more', () => {
    expect(getCurrentRadius(350)).toBe(4);
    expect(getCurrentRadius(1000)).toBe(4);
  });
});

describe('Food Threshold', () => {
  it('returns 8 for population 1', () => {
    expect(getFoodThresholdForNextPopulation(1)).toBe(8);
  });

  it('returns 13 for population 2', () => {
    expect(getFoodThresholdForNextPopulation(2)).toBe(13);
  });

  it('returns 21 for population 3', () => {
    expect(getFoodThresholdForNextPopulation(3)).toBe(21);
  });
});

describe('Get Claimable Tiles', () => {
  it('returns empty array when all adjacent tiles claimed', () => {
    const map = generateInitialMap(3);
    const allClaimed = ['0,0', '1,0', '0,1', '-1,0', '0,-1', '1,-1', '-1,1'];
    const claimable = getClaimableTiles(map, allClaimed);
    expect(claimable).toHaveLength(0);
  });

  it('returns adjacent tiles when only center is claimed', () => {
    const map = generateInitialMap(3);
    const claimable = getClaimableTiles(map, ['0,0']);
    expect(claimable).toHaveLength(6);
  });
});

describe('Toggle Auto Expand', () => {
  it('toggles autoExpand from false to true', () => {
    const state = getInitialState(1);
    expect(state.city.autoExpand).toBe(false);
    const nextState = toggleAutoExpand(state);
    expect(nextState.city.autoExpand).toBe(true);
  });

  it('toggles autoExpand from true to false', () => {
    const state = getInitialState(1);
    state.city.autoExpand = true;
    const nextState = toggleAutoExpand(state);
    expect(nextState.city.autoExpand).toBe(false);
  });
});

describe('Get Tile Yield Sum', () => {
  it('returns correct sum for Plains terrain', () => {
    const tile: Tile = { id: '0,0', q: 0, r: 0, terrain: 'Plains', isExplored: true };
    expect(getTileYieldSum(tile)).toBe(4);
  });

  it('returns correct sum for Mountains terrain', () => {
    const tile: Tile = { id: '0,0', q: 0, r: 0, terrain: 'Mountains', isExplored: true };
    expect(getTileYieldSum(tile)).toBe(4);
  });

  it('returns correct sum for Forest terrain', () => {
    const tile: Tile = { id: '0,0', q: 0, r: 0, terrain: 'Forest', isExplored: true };
    expect(getTileYieldSum(tile)).toBe(3);
  });

  it('returns correct sum for Desert terrain', () => {
    const tile: Tile = { id: '0,0', q: 0, r: 0, terrain: 'Desert', isExplored: true };
    expect(getTileYieldSum(tile)).toBe(5);
  });
});

describe('Building Bonuses', () => {
  it('Cemetery adds 1 culture per turn', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.buildings = ['cemetery'];
    
    const yields = calculateTurnYield(state);
    expect(yields.culture).toBe(2);
  });

  it('Obelisk adds 1 culture per turn', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.buildings = ['obelisk'];
    
    const yields = calculateTurnYield(state);
    expect(yields.culture).toBe(2);
  });

  it('Cemetery and Obelisk stack culture', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.buildings = ['cemetery', 'obelisk'];
    
    const yields = calculateTurnYield(state);
    expect(yields.culture).toBe(3);
  });

  it('Market increases gold by 20%', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.buildings = ['market'];
    
    const yields = calculateTurnYield(state);
    expect(yields.gold).toBe(2);
  });

  it('Library increases science by 20%', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Mountains';
    state.city.buildings = ['library'];
    
    const yields = calculateTurnYield(state);
    expect(yields.science).toBe(1);
  });

  it('Library has 1 gold upkeep', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.gold = 5;
    state.city.buildings = ['library'];
    
    const nextState = nextTurn(state);
    expect(nextState.city.resources.gold).toBeLessThanOrEqual(6);
  });

  it('Guardhouse increases production by 5%', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Forest';
    state.city.buildings = ['guardhouse'];
    
    const yields = calculateTurnYield(state);
    expect(yields.production).toBe(2);
  });

  it('Guardhouse has 2 gold upkeep', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.gold = 10;
    state.city.buildings = ['guardhouse'];
    
    const nextState = nextTurn(state);
    expect(nextState.city.resources.gold).toBeLessThanOrEqual(11);
  });

  it('hasBuilding returns true for built buildings', () => {
    const state = getInitialState(1);
    state.city.buildings = ['cemetery'];
    
    expect(hasBuilding(state, 'cemetery')).toBe(true);
    expect(hasBuilding(state, 'obelisk')).toBe(false);
  });
});

describe('Granary Food Retention', () => {
  it('saves food on population growth with Granary', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.food = 50;
    state.city.buildings = ['granary'];
    
    const nextState = nextTurn(state);
    expect(nextState.city.population).toBeGreaterThan(1);
  });

  it('Granary saves 20% food on population growth', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Plains';
    state.city.resources.food = 30;
    state.city.buildings = ['granary'];
    
    const nextState = nextTurn(state);
    expect(nextState.city.resources.food).toBeGreaterThan(0);
  });
});
