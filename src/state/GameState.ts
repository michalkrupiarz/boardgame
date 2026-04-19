// src/state/GameState.ts

export type TerrainType = 'Plains' | 'Forest' | 'Mountains' | 'Desert';

export type ResourceType = 
    | 'iron' | 'stone' | 'wheat' | 'coal' | 'copper' | 'wine'
    | 'salt' | 'silver' | 'gems' | 'uranium' | 'goldore';

export type ImprovementType = 'Farm' | 'Mine' | 'Quarry' | 'Pasture' | 'Plantation' | 'Well';

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

export const resourceBonuses: Record<ResourceType, TerrainModifiers> = {
    iron: { gold: 0, production: 2, food: 0, culture: 0, science: 0 },
    wheat: { gold: 0, production: 0, food: 2, culture: 0, science: 0 },
    stone: { gold: 1, production: 1, food: 0, culture: 0, science: 0 },
    coal: { gold: 1, production: 2, food: 0, culture: 0, science: 0 },
    copper: { gold: 2, production: 1, food: 0, culture: 0, science: 0 },
    wine: { gold: 1, production: 0, food: 1, culture: 0, science: 0 },
    salt: { gold: 0, production: 0, food: 2, culture: 1, science: 0 },
    silver: { gold: 2, production: 1, food: 0, culture: 0, science: 0 },
    gems: { gold: 2, production: 0, food: 0, culture: 0, science: 1 },
    uranium: { gold: 0, production: 1, food: 0, culture: 0, science: 3 },
    goldore: { gold: 3, production: 0, food: 0, culture: 0, science: 0 },
};

export const improvementBonuses: Record<ImprovementType, TerrainModifiers> = {
    Farm: { gold: 0, production: 0, food: 2, culture: 0, science: 0 },
    Mine: { gold: 0, production: 2, food: 0, culture: 0, science: 0 },
    Quarry: { gold: 1, production: 1, food: 0, culture: 0, science: 0 },
    Pasture: { gold: 0, production: 1, food: 1, culture: 0, science: 0 },
    Plantation: { gold: 2, production: 0, food: 0, culture: 0, science: 0 },
    Well: { gold: 2, production: 0, food: 1, culture: 0, science: 0 },
};

export const validImprovementTerrains: Record<ImprovementType, TerrainType[]> = {
    Farm: ['Plains', 'Desert'],
    Mine: ['Mountains', 'Forest'],
    Quarry: ['Mountains'],
    Pasture: ['Plains'],
    Plantation: ['Forest', 'Desert'],
    Well: ['Desert'],
};

export const improvementCosts: Record<ImprovementType, number> = {
    Farm: 10,
    Mine: 15,
    Quarry: 15,
    Pasture: 10,
    Plantation: 12,
    Well: 10,
};

export interface Tile {
    id: string;
    q: number; // Hex coordinates (axial)
    r: number; // Hex coordinates (axial)
    terrain: TerrainType;
    isExplored: boolean;
    resource?: ResourceType;
    improvement?: ImprovementType;
}

export interface Building {
    id: string;
    name: string;
    cost: number;
    bonuses: Partial<TerrainModifiers>;
    upkeep?: number;
    percentageBonus?: Partial<Record<keyof Resources, number>>;
}

export const AVAILABLE_BUILDINGS: Building[] = [
    { id: 'granary', name: 'Granary', cost: 200, bonuses: { food: 0 }, percentageBonus: { food: 0.2 } },
    { id: 'cemetery', name: 'Cemetery', cost: 100, bonuses: { culture: 1 } },
    { id: 'obelisk', name: 'Obelisk', cost: 100, bonuses: { culture: 1 } },
    { id: 'market', name: 'Market', cost: 300, bonuses: {}, percentageBonus: { gold: 0.2 } },
    { id: 'library', name: 'Library', cost: 400, bonuses: {}, percentageBonus: { science: 0.2 }, upkeep: 1 },
    { id: 'guardhouse', name: 'Guardhouse', cost: 500, bonuses: {}, percentageBonus: { production: 0.05, science: 0.05, gold: 0.05 }, upkeep: 2 },
];

export interface City {
    name: string;
    population: number;
    buildings: string[]; // Building IDs
    resources: Resources;
    workedTileIds: string[]; // IDs of tiles currently worked by citizens
    lockedTileIds: string[]; // IDs of tiles manually locked by the player
    claimedTileIds: string[]; // IDs of tiles claimed via culture
    targetClaimTileId?: string; // Tile currently targeted for cultural acquisition
    autoExpand: boolean; // Auto-claim adjacent tiles when culture available
}

export interface GameState {
    turn: number;
    city: City;
    map: Tile[];
}

const RESOURCES: ResourceType[] = [
    'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'iron', // 45% common
    'wheat', 'wheat', 'wheat', 
    'stone', 'stone',
    'coal', 'coal', 'copper', 'wine', // 25% uncommon
    'salt', 'silver', // 15% rare
    'gems', 'uranium', // 10% very rare
    'goldore', // 5% ultra rare
];

export function generateInitialMap(size: number): Tile[] {
    const tiles: Tile[] = [];
    const terrains: TerrainType[] = ['Plains', 'Forest', 'Mountains', 'Desert'];

    // Generate a hexagonal grid (axial coordinates)
    const radius = Math.floor(size / 2);
    for (let q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius);
        const r2 = Math.min(radius, -q + radius);
        for (let r = r1; r <= r2; r++) {
            const terrain = terrains[Math.floor(Math.random() * terrains.length)];
            const isCenter = q === 0 && r === 0;
            
            // 12% chance to have a resource, but not on center tile
            let resource: ResourceType | undefined;
            if (!isCenter && Math.random() < 0.12) {
                const idx = Math.floor(Math.random() * RESOURCES.length);
                resource = RESOURCES[idx];
            }
            
            tiles.push({
                id: `${q},${r}`,
                q,
                r,
                terrain: isCenter ? 'Plains' : terrain,
                isExplored: true,
                resource
            });
        }
    }
    return tiles;
}

export function getInitialState(mapSize: number = 7): GameState {
    const map = generateInitialMap(mapSize);
    const claimedTileIds = ['0,0'];
    
    map.forEach(tile => {
        if (getDistance(tile.q, tile.r) === 1) {
            claimedTileIds.push(tile.id);
        }
    });

    const targetClaimTileId = getBestClaimableTileId(map, claimedTileIds);

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
            claimedTileIds,
            targetClaimTileId,
            autoExpand: false
        },
        map
    };
}

const STORAGE_KEY = 'cityBuilder_save';

export function saveGameState(state: GameState): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

export function loadGameState(): GameState | null {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved) as GameState;
        }
    } catch (e) {
        console.error('Failed to load game:', e);
    }
    return null;
}

export function clearSavedGame(): void {
    localStorage.removeItem(STORAGE_KEY);
}

export function getBestClaimableTileId(map: Tile[], claimedTileIds: string[]): string | undefined {
    const claimable = map.filter(t => !claimedTileIds.includes(t.id) && isAdjacentToClaimed(t, claimedTileIds));
    if (claimable.length === 0) return undefined;
    claimable.sort((a, b) => getTileYieldSum(b) - getTileYieldSum(a));
    return claimable[0].id;
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

export function buildImprovement(state: GameState, tileId: string, improvementType: ImprovementType): GameState {
    const tile = state.map.find(t => t.id === tileId);
    if (!tile) return state;

    if (tile.improvement) return state;

    const isWorked = state.city.workedTileIds.includes(tileId);
    if (!isWorked) return state;

    const validTerrains = validImprovementTerrains[improvementType];
    if (!validTerrains.includes(tile.terrain)) return state;

    const cost = improvementCosts[improvementType];
    if (state.city.resources.production < cost) return state;

    return {
        ...state,
        map: state.map.map(t => 
            t.id === tileId 
                ? { ...t, improvement: improvementType }
                : t
        ),
        city: {
            ...state.city,
            resources: {
                ...state.city.resources,
                production: state.city.resources.production - cost
            }
        }
    };
}

export function canBuildImprovement(tile: Tile, improvementType: ImprovementType, production: number): { valid: boolean; reason?: string } {
    if (tile.improvement) {
        return { valid: false, reason: 'Tile already has an improvement' };
    }

    const isWorked = true;
    if (!isWorked) {
        return { valid: false, reason: 'Tile must be worked' };
    }

    const validTerrains = validImprovementTerrains[improvementType];
    if (!validTerrains.includes(tile.terrain)) {
        return { valid: false, reason: `Cannot build ${improvementType} on ${tile.terrain}` };
    }

    const cost = improvementCosts[improvementType];
    if (production < cost) {
        return { valid: false, reason: `Need ${cost} Production` };
    }

    return { valid: true };
}

export function getTileYieldSum(tile: Tile): number {
    const terrainBonus = terrainBonuses[tile.terrain];
    let sum = terrainBonus.gold + terrainBonus.production + terrainBonus.food + terrainBonus.culture + terrainBonus.science;
    if (tile.resource) {
        const resBonus = resourceBonuses[tile.resource];
        sum += resBonus.gold + resBonus.production + resBonus.food + resBonus.culture + resBonus.science;
    }
    if (tile.improvement) {
        const impBonus = improvementBonuses[tile.improvement];
        sum += impBonus.gold + impBonus.production + impBonus.food + impBonus.culture + impBonus.science;
    }
    return sum;
}

// Calculates the per-turn yield based on city buildings and mapped tile radius.
export function calculateTurnYield(state: GameState): Resources {
    const baseYields: Resources = {
        gold: 0, production: 0, food: 0, culture: 0, science: 0
    };

    // Add map yields with resource bonuses
    for (const tile of state.map) {
        const isCityCenter = tile.q === 0 && tile.r === 0;
        const isWorked = state.city.workedTileIds.includes(tile.id);
        
        if (tile.isExplored && (isCityCenter || isWorked)) {
            const terrainBonus = terrainBonuses[tile.terrain];
            baseYields.gold += terrainBonus.gold;
            baseYields.production += terrainBonus.production;
            baseYields.food += terrainBonus.food;
            baseYields.culture += terrainBonus.culture;
            baseYields.science += terrainBonus.science;
            
            // Add resource bonuses if present
            if (tile.resource) {
                const resBonus = resourceBonuses[tile.resource];
                baseYields.gold += resBonus.gold;
                baseYields.production += resBonus.production;
                baseYields.food += resBonus.food;
                baseYields.culture += resBonus.culture;
                baseYields.science += resBonus.science;
            }
            
            // Add improvement bonuses if present
            if (tile.improvement) {
                const impBonus = improvementBonuses[tile.improvement];
                baseYields.gold += impBonus.gold;
                baseYields.production += impBonus.production;
                baseYields.food += impBonus.food;
                baseYields.culture += impBonus.culture;
                baseYields.science += impBonus.science;
            }
        }
    }

    // Calculate flat bonuses from buildings
    const flatBonuses: Resources = {
        gold: 0, production: 0, food: 0, culture: 0, science: 0
    };
    const percentageBonuses: Resources = {
        gold: 1, production: 1, food: 1, culture: 1, science: 1
    };
    let totalUpkeep = 0;

    for (const buildingId of state.city.buildings) {
        const building = AVAILABLE_BUILDINGS.find(b => b.id === buildingId);
        if (building) {
            flatBonuses.gold += building.bonuses.gold || 0;
            flatBonuses.production += building.bonuses.production || 0;
            flatBonuses.food += building.bonuses.food || 0;
            flatBonuses.culture += building.bonuses.culture || 0;
            flatBonuses.science += building.bonuses.science || 0;
            
            if (building.percentageBonus) {
                if (building.percentageBonus.gold) {
                    percentageBonuses.gold += building.percentageBonus.gold;
                }
                if (building.percentageBonus.production) {
                    percentageBonuses.production += building.percentageBonus.production;
                }
                if (building.percentageBonus.food) {
                    percentageBonuses.food += building.percentageBonus.food;
                }
                if (building.percentageBonus.science) {
                    percentageBonuses.science += building.percentageBonus.science;
                }
            }
            
            totalUpkeep += building.upkeep || 0;
        }
    }

    // Apply flat bonuses then percentage bonuses
    const yieldResources: Resources = {
        gold: Math.floor((baseYields.gold + flatBonuses.gold) * percentageBonuses.gold),
        production: Math.floor((baseYields.production + flatBonuses.production) * percentageBonuses.production),
        food: Math.floor((baseYields.food + flatBonuses.food) * percentageBonuses.food),
        culture: baseYields.culture + flatBonuses.culture,
        science: Math.floor((baseYields.science + flatBonuses.science) * percentageBonuses.science),
    };

    // Deduct upkeep (affects gold)
    yieldResources.gold = Math.max(0, yieldResources.gold - totalUpkeep);

    return yieldResources;
}

export function hasBuilding(state: GameState, buildingId: string): boolean {
    return state.city.buildings.includes(buildingId);
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
    
    const newCulture = state.city.resources.culture + yields.culture;
    let newFood = state.city.resources.food + yields.food;
    let newPopulation = state.city.population;
    const hasGranary = hasBuilding(state, 'granary');
    const granaryRetention = hasGranary ? 0.8 : 1.0;

    while (newFood >= getFoodThresholdForNextPopulation(newPopulation)) {
        newPopulation += 1;
        const threshold = getFoodThresholdForNextPopulation(newPopulation - 1);
        const consumed = Math.floor(threshold * granaryRetention);
        newFood -= consumed;
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

    newState = processTargetClaim(newState);
    
    return newState;
}

function processTargetClaim(state: GameState): GameState {
    let newState = state;
    
    while (newState.city.targetClaimTileId) {
        const targetTile = newState.map.find(t => t.id === newState.city.targetClaimTileId);
        if (!targetTile) break;
        
        const cost = getClaimCost(getDistance(targetTile.q, targetTile.r));
        if (newState.city.resources.culture < cost) break;
        
        newState = claimTile(newState, targetTile.id);
        const newTargetId = getBestClaimableTileId(newState.map, newState.city.claimedTileIds);
        newState = {
            ...newState,
            city: {
                ...newState.city,
                targetClaimTileId: newTargetId
            }
        };
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
