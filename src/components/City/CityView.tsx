import { AVAILABLE_BUILDINGS } from '../../state/GameState';
import type { GameState } from '../../state/GameState';

interface CitySidePanelProps {
    state: GameState;
    onBuild: (buildingId: string) => void;
    onToggleWorker?: (tileId: string) => void;
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
                                        {b?.name}
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
                </div>
            </div>

            {/* Right Panel: Available Buildings */}
            <div style={{
                position: 'absolute',
                top: '100px',
                right: '20px',
                width: '300px',
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
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            Cost: <span className="text-production">{building.cost} Prod</span>
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
