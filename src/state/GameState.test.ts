import { describe, it, expect } from 'vitest';
import { getInitialState, nextTurn, buildBuilding, calculateTurnYield, terrainBonuses, AVAILABLE_BUILDINGS } from './GameState';

describe('GameState', () => {
  it('initializes correctly with map size 5', () => {
    const state = getInitialState(5);
    expect(state.turn).toBe(1);
    expect(state.city.resources.gold).toBe(10);
    // A hexagon of radius 2 (size 5) has 19 tiles
    expect(state.map.length).toBe(19);
  });

  it('calculates turn yield correctly based on map', () => {
    const state = getInitialState(1); // radius 0, so 1 tile
    state.map[0].terrain = 'Plains';
    const yields = calculateTurnYield(state);
    
    expect(yields.food).toBe(terrainBonuses['Plains'].food);
    expect(yields.gold).toBe(terrainBonuses['Plains'].gold);
    expect(yields.production).toBe(terrainBonuses['Plains'].production);
  });

  it('increments resources on nextTurn', () => {
    let state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    state.city.resources.gold = 10;
    
    const yields = calculateTurnYield(state);
    
    const nextState = nextTurn(state);
    expect(nextState.turn).toBe(2);
    expect(nextState.city.resources.gold).toBe(10 + yields.gold);
  });

  it('can build a building and deducts its cost', () => {
    let state = getInitialState(1);
    const farmCost = AVAILABLE_BUILDINGS.find(b => b.id === 'farm')!.cost;
    
    state.city.resources.production = farmCost + 5;
    
    const nextState = buildBuilding(state, 'farm');
    
    expect(nextState.city.buildings).toContain('farm');
    expect(nextState.city.resources.production).toBe(5); // Deducted 20
  });

  it('fails to build if not enough resources', () => {
    let state = getInitialState(1);
    state.city.resources.production = 0; // Not enough cost
    
    const nextState = buildBuilding(state, 'farm');
    
    expect(nextState.city.buildings).not.toContain('farm');
    expect(nextState.city.resources.production).toBe(0);
  });

  it('buildings increase turn yields', () => {
    // 1 desert tile
    let state = getInitialState(1);
    state.map[0].terrain = 'Desert';
    
    const initialYields = calculateTurnYield(state);
    
    // Add library
    state.city.buildings = ['library']; // +2 science
    
    const newYields = calculateTurnYield(state);
    expect(newYields.science).toBe(initialYields.science + 2);
  });
});
