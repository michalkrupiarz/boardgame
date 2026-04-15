// src/state/GameState.ts

export type TerrainType = 'Plains' | 'Forest' | 'Mountains' | 'Desert';

export interface Resources {
    gold: number;
    production: number;
    food: number;
    culture: number;
    science: number;
}

export interface TerrainModifiers {
    gold: number;
    production: number;
    food: number;
    culture: number;
    science: number;
}

export const terrainBonuses: Record<TerrainType, TerrainModifiers> = {
    Plains: { gold: 1, production: 1, food: 2, culture: 0, science: 0 },
    Forest: { gold: 0, production: 2, food: 1, culture: 0, science: 0 },
    Mountains: { gold: 0, production: 3, food: 0, culture: 0, science: 1 },
    Desert: { gold: 2, production: 0, food: 0, culture: 1, science: 2 },
};

export interface Tile {
    id: string;
    q: number; // Hex coordinates (axial)
    r: number; // Hex coordinates (axial)
    terrain: TerrainType;
    isExplored: boolean;
}

export interface Building {
    id: string;
    name: string;
    cost: number;
    bonuses: Partial<TerrainModifiers>;
}

export const AVAILABLE_BUILDINGS: Building[] = [
    { id: 'farm', name: 'Farm', cost: 20, bonuses: { food: 2 } },
    { id: 'mine', name: 'Mine', cost: 30, bonuses: { production: 2 } },
    { id: 'market', name: 'Market', cost: 40, bonuses: { gold: 3 } },
    { id: 'library', name: 'Library', cost: 50, bonuses: { science: 2 } },
    { id: 'monument', name: 'Monument', cost: 25, bonuses: { culture: 2 } },
];

export interface City {
    name: string;
    population: number;
    buildings: string[]; // Building IDs
    resources: Resources;
    workedTileIds: string[]; // IDs of tiles currently worked by citizens
    lockedTileIds: string[]; // IDs of tiles manually locked by the player
    claimedTileIds: string[]; // IDs of tiles claimed via culture
    autoExpand: boolean; // Auto-claim adjacent tiles when culture available
}

export interface GameState {
    turn: number;
    city: City;
    map: Tile[];
}

export function generateInitialMap(size: number): Tile[] {
    const tiles: Tile[] = [];
    const terrains: TerrainType[] = ['Plains', 'Forest', 'Mountains', 'Desert'];

    // Generate a hexagonal grid (axial coordinates)
        const radius = Math.floor(size / 2);
    for (let q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius);
        const r2 = Math.min(radius, -q + radius);
        for (let r = r1; r <= r2; r++) {
            // For determinism in tests, you might want to seed this, but random is okay for now
            const terrain = terrains[Math.floor(Math.random() * terrains.length)];
            const isCenter = q === 0 && r === 0;
            tiles.push({
                id: `${q},${r}`,
                q,
                r,
                terrain: isCenter ? 'Plains' : terrain,
                isExplored: true // Starts explored for simplicity
            });
        }
    }
    return tiles;
}

export function getInitialState(mapSize: number = 7): GameState {
    return {
        turn: 1,
        city: {
            name: 'Capital',
            population: 1,
            buildings: [],
            resources: {
                gold: 10,
                production: 10,
                food: 10,
                culture: 0,
                science: 0
            },
            workedTileIds: ['0,0'],
            lockedTileIds: [],
            claimedTileIds: ['0,0'], // City center starts claimed
            autoExpand: false
        },
        map: generateInitialMap(mapSize)
    };
}

export function getDistance(q: number, r: number, targetQ: number = 0, targetR: number = 0): number {
    return Math.max(Math.abs(q - targetQ), Math.abs(r - targetR), Math.abs(-q - r - (-targetQ - targetR)));
}

export function getCurrentRadius(culture: number): number {
    if (culture >= 350) return 4;
    if (culture >= 150) return 3;
    if (culture >= 50) return 2;
    return 1;
}

export function getClaimCost(distance: number): number {
    return Math.max(10, distance * 10);
}

export function isAdjacentToClaimed(tile: Tile, claimedTileIds: string[]): boolean {
    if (claimedTileIds.includes(tile.id)) return true;
    
    const directions = [
        { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
        { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
    ];
    
    for (const dir of directions) {
        const neighborId = `${tile.q + dir.q},${tile.r + dir.r}`;
        if (claimedTileIds.includes(neighborId)) {
            return true;
        }
    }
    return false;
}

export function getClaimableTiles(map: Tile[], claimedTileIds: string[]): Tile[] {
    return map.filter(tile => !claimedTileIds.includes(tile.id) && isAdjacentToClaimed(tile, claimedTileIds));
}

export function claimTile(state: GameState, tileId: string): GameState {
    const tile = state.map.find(t => t.id === tileId);
    if (!tile) return state;
    
    if (state.city.claimedTileIds.includes(tile.id)) return state;
    if (!isAdjacentToClaimed(tile, state.city.claimedTileIds)) return state;
    
    const cost = getClaimCost(getDistance(tile.q, tile.r));
    if (state.city.resources.culture < cost) return state;
    
    return {
        ...state,
        city: {
            ...state.city,
            claimedTileIds: [...state.city.claimedTileIds, tile.id],
            resources: {
                ...state.city.resources,
                culture: state.city.resources.culture - cost
            }
        }
    };
}

export function toggleAutoExpand(state: GameState): GameState {
    return {
        ...state,
        city: {
            ...state.city,
            autoExpand: !state.city.autoExpand
        }
    };
}

export function getTileYieldSum(tile: Tile): number {
    const bonuses = terrainBonuses[tile.terrain];
    return bonuses.gold + bonuses.production + bonuses.food + bonuses.culture + bonuses.science;
}

// Calculates the per-turn yield based on city buildings and mapped tile radius.
export function calculateTurnYield(state: GameState): Resources {
    const yieldResources: Resources = {
        gold: 0, production: 0, food: 0, culture: 0, science: 0
    };

    // Add map yields
    for (const tile of state.map) {
        const isCityCenter = tile.q === 0 && tile.r === 0;
        const isWorked = state.city.workedTileIds.includes(tile.id);
        
        // Only harvest if it's the city center OR a worked tile
        if (tile.isExplored && (isCityCenter || isWorked)) {
            const bonuses = terrainBonuses[tile.terrain];
            yieldResources.gold += bonuses.gold;
            yieldResources.production += bonuses.production;
            yieldResources.food += bonuses.food;
            yieldResources.culture += bonuses.culture;
            yieldResources.science += bonuses.science;
        }
    }

    // Add building yields
    for (const buildingId of state.city.buildings) {
        const building = AVAILABLE_BUILDINGS.find(b => b.id === buildingId);
        if (building) {
            yieldResources.gold += building.bonuses.gold || 0;
            yieldResources.production += building.bonuses.production || 0;
            yieldResources.food += building.bonuses.food || 0;
            yieldResources.culture += building.bonuses.culture || 0;
            yieldResources.science += building.bonuses.science || 0;
        }
    }

    return yieldResources;
}

export function getFoodThresholdForNextPopulation(currentPopulation: number): number {
    let a = 3;
    let b = 5;
    for (let i = 0; i < currentPopulation; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

export function nextTurn(state: GameState): GameState {
    const yields = calculateTurnYield(state);
    
    let newCulture = state.city.resources.culture + yields.culture;
    let newFood = state.city.resources.food + yields.food;
    let newPopulation = state.city.population;
    let threshold = getFoodThresholdForNextPopulation(newPopulation);

    while (newFood >= threshold) {
        newPopulation += 1;
        const consumed = Math.floor(newFood * 0.8);
        newFood -= consumed;
        threshold = getFoodThresholdForNextPopulation(newPopulation);
    }

    let newState: GameState = {
        ...state,
        turn: state.turn + 1,
        city: {
            ...state.city,
            population: newPopulation,
            resources: {
                gold: state.city.resources.gold + yields.gold,
                production: state.city.resources.production + yields.production,
                food: newFood,
                culture: newCulture,
                science: state.city.resources.science + yields.science,
            }
        }
    };

    if (newPopulation > state.city.population) {
        newState = autoAssignCitizens(newState);
    }

    if (state.city.autoExpand) {
        newState = autoClaimTiles(newState);
    }
    
    return newState;
}

function autoClaimTiles(state: GameState): GameState {
    let newState = state;
    
    while (true) {
        const claimable = getClaimableTiles(newState.map, newState.city.claimedTileIds);
        if (claimable.length === 0) break;
        
        const bestTile = claimable
            .sort((a, b) => getTileYieldSum(b) - getTileYieldSum(a))[0];
        
        const cost = getClaimCost(getDistance(bestTile.q, bestTile.r));
        if (newState.city.resources.culture < cost) break;
        
        newState = claimTile(newState, bestTile.id);
    }
    
    return newState;
}

export function buildBuilding(state: GameState, buildingId: string): GameState {
    const building = AVAILABLE_BUILDINGS.find(b => b.id === buildingId);
    if (!building) return state;

    if (state.city.resources.production >= building.cost) {
        return {
            ...state,
            city: {
                ...state.city,
                buildings: [...state.city.buildings, building.id],
                resources: {
                    ...state.city.resources,
                    production: state.city.resources.production - building.cost
                }
            }
        };
    }
    return state;
}

export function toggleWorkedTile(state: GameState, tileId: string): GameState {
    const tile = state.map.find(t => t.id === tileId);
    if (!tile) return state;

    if (tile.q === 0 && tile.r === 0) return state;

    if (!state.city.claimedTileIds.includes(tileId)) return state;

    const isAlreadyWorked = state.city.workedTileIds.includes(tileId);
    let newWorked = [...state.city.workedTileIds];
    let newLocked = [...state.city.lockedTileIds];

    if (isAlreadyWorked) {
        newWorked = newWorked.filter(id => id !== tileId);
        newLocked = newLocked.filter(id => id !== tileId);
    } else {
        if (newWorked.length < state.city.population) {
            newWorked.push(tileId);
            newLocked.push(tileId);
        } else {
            const unlockedTileId = newWorked.find(id => !newLocked.includes(id));
            if (unlockedTileId) {
                newWorked = newWorked.filter(id => id !== unlockedTileId);
                newWorked.push(tileId);
                newLocked.push(tileId);
            } else {
                return state;
            }
        }
    }

    return {
        ...state,
        city: {
            ...state.city,
            workedTileIds: newWorked,
            lockedTileIds: newLocked
        }
    };
}

export function autoAssignCitizens(state: GameState): GameState {
    const population = state.city.population;
    
    let newWorked = [...state.city.lockedTileIds];
    const availableSlots = population - newWorked.length;

    if (availableSlots <= 0) {
        return {
            ...state,
            city: {
                ...state.city,
                workedTileIds: newWorked
            }
        };
    }

    const candidates = state.map
        .filter(t => t.isExplored)
        .filter(t => state.city.claimedTileIds.includes(t.id))
        .filter(t => !(t.q === 0 && t.r === 0))
        .filter(t => !state.city.lockedTileIds.includes(t.id))
        .sort((a, b) => getTileYieldSum(b) - getTileYieldSum(a));

    const extraTiles = candidates.slice(0, availableSlots).map(t => t.id);
    newWorked = [...newWorked, ...extraTiles];

    return {
        ...state,
        city: {
            ...state.city,
            workedTileIds: newWorked
        }
    };
}
