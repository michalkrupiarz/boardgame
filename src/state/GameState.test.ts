import { describe, it, expect } from 'vitest';
import { 
  getInitialState, nextTurn, buildBuilding, calculateTurnYield, terrainBonuses, AVAILABLE_BUILDINGS,
  getDistance, getClaimCost, isAdjacentToClaimed, getBestClaimableTileId, claimTile, toggleWorkedTile, autoAssignCitizens
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
    const farmCost = AVAILABLE_BUILDINGS.find(b => b.id === 'farm')!.cost;
    
    state.city.resources.production = farmCost + 5;
    
    const nextState = buildBuilding(state, 'farm');
    
    expect(nextState.city.buildings).toContain('farm');
    expect(nextState.city.resources.production).toBe(5);
  });

  it('fails to build if not enough resources', () => {
    const state = getInitialState(1);
    state.city.resources.production = 0;
    
    const nextState = buildBuilding(state, 'farm');
    
    expect(nextState.city.buildings).not.toContain('farm');
    expect(nextState.city.resources.production).toBe(0);
  });

  it('buildings increase turn yields', () => {
    const state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    
    const initialYields = calculateTurnYield(state);
    
    state.city.buildings = ['library'];
    
    const newYields = calculateTurnYield(state);
    expect(newYields.science).toBe(initialYields.science + 2);
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
