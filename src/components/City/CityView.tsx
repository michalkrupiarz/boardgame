import { AVAILABLE_BUILDINGS, getTileYieldSum } from '../../state/GameState';
import type { GameState } from '../../state/GameState';

interface CitySidePanelProps {
    state: GameState;
    onBuild: (buildingId: string) => void;
    onToggleWorker?: (tileId: string) => void;
}

function getBuildingDescription(building: typeof AVAILABLE_BUILDINGS[0]): string {
    const parts: string[] = [];
    
    if (building.bonuses.culture) parts.push(`+${building.bonuses.culture} Culture`);
    if (building.bonuses.food) parts.push(`+${building.bonuses.food} Food`);
    
    if (building.percentageBonus) {
        if (building.percentageBonus.gold) parts.push(`+${Math.round(building.percentageBonus.gold * 100)}% Gold`);
        if (building.percentageBonus.production) parts.push(`+${Math.round(building.percentageBonus.production * 100)}% Production`);
        if (building.percentageBonus.science) parts.push(`+${Math.round(building.percentageBonus.science * 100)}% Science`);
        if (building.percentageBonus.food) parts.push(`+${Math.round(building.percentageBonus.food * 100)}% Food (pop growth)`);
    }
    
    if (building.upkeep) parts.push(`-${building.upkeep} Gold upkeep`);
    
    return parts.join(', ') || 'No bonuses';
}

export const CitySidePanel: React.FC<CitySidePanelProps> = ({ state, onBuild }) => {
    return (
        <>
            {/* Left Panel: Built Infrastructure */}
            <div style={{
                position: 'absolute',
                top: '100px',
                left: '20px',
                width: '280px',
                maxHeight: 'calc(100vh - 160px)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.4)' }}>
                    <h3 style={{ marginTop: 0 }}>Built Infrastructure</h3>
                    {state.city.buildings.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No buildings constructed yet.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {state.city.buildings.map((id, index) => {
                                const b = AVAILABLE_BUILDINGS.find(b => b.id === id);
                                return (
                                    <li key={index} style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                        <div style={{ fontWeight: '600' }}>{b?.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                            {b ? getBuildingDescription(b) : ''}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', flex: 1, overflowY: 'auto' }}>
                    <h3 style={{ marginTop: 0 }}>Citizen Assignment</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '15px' }}>
                        Click tiles on the map to assign/unassign citizens.
                    </p>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <p>Population: <strong style={{ color: 'white' }}>{state.city.population}</strong></p>
                        <p>Citizens working: <strong style={{ color: 'white' }}>{state.city.workedTileIds.filter(id => id !== '0,0').length}</strong></p>
                        <p>Available: <strong style={{ color: 'white' }}>{state.city.population - state.city.workedTileIds.filter(id => id !== '0,0').length}</strong></p>
                    </div>
                    <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--text-secondary)' }}>Yield Breakdown</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                        {state.city.workedTileIds.map(tileId => {
                            const tile = state.map.find(t => t.id === tileId);
                            if (!tile) return null;
                            const yieldSum = getTileYieldSum(tile);
                            return (
                                <div key={tileId} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                    <span>{tile.terrain}{tile.resource ? ` (${tile.resource})` : ''}{tile.improvement ? ` [${tile.improvement}]` : ''}</span>
                                    <span className="text-food">+{yieldSum}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Right Panel: Available Buildings */}
            <div style={{
                position: 'absolute',
                top: '100px',
                right: '20px',
                width: '320px',
                maxHeight: 'calc(100vh - 160px)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', flex: 1, overflowY: 'auto' }}>
                    <h3 style={{ marginTop: 0 }}>Available Buildings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        {AVAILABLE_BUILDINGS.map(building => {
                            const canBuild = state.city.resources.production >= building.cost;
                            return (
                                <div key={building.id} style={{ 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                                    opacity: canBuild ? 1 : 0.5
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{building.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            <span className="text-production">{building.cost} Prod</span>
                                            {building.upkeep && <span> | <span className="text-gold">-{building.upkeep} Gold/turn</span></span>}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#a855f7', marginTop: '4px' }}>
                                            {getBuildingDescription(building)}
                                        </div>
                                    </div>
                                    <button 
                                        disabled={!canBuild}
                                        onClick={() => onBuild(building.id)}
                                        style={{
                                            background: canBuild ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                            border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px',
                                            cursor: canBuild ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        Build
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
