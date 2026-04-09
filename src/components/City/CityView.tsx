import { AVAILABLE_BUILDINGS } from '../../state/GameState';
import type { GameState, Tile } from '../../state/GameState';
import { HexMap } from '../Map/HexMap';

interface CityViewProps {
    state: GameState;
    onBuild: (buildingId: string) => void;
    onToggleWorker: (tileId: string) => void;
    onClose: () => void;
}

export const CityView: React.FC<CityViewProps> = ({ state, onBuild, onToggleWorker, onClose }) => {
    const handleTileClick = (tile: Tile) => {
        onToggleWorker(tile.id);
    };

    return (
        <div style={{
            position: 'absolute',
            inset: 0, // Cover entire screen
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(2, 6, 23, 0.8)', // Dark overlay
            zIndex: 100,
            backdropFilter: 'blur(8px)',
        }}>
            <div className="glass-panel" style={{ width: '80%', maxWidth: '900px', height: '80%', display: 'flex', flexDirection: 'column', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2>{state.city.name} - City View</h2>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
                            color: 'white', padding: '8px 16px', borderRadius: '8px'
                        }}
                    >Back to Map</button>
                </div>

                <div style={{ display: 'flex', gap: '20px', flex: 1, overflow: 'hidden' }}>
                    {/* Left: Built Structures and Status */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                        <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.3)' }}>
                            <h3>Built Infrastructure</h3>
                            {state.city.buildings.length === 0 ? (
                                <p style={{ color: 'var(--text-secondary)' }}>No buildings constructed yet.</p>
                            ) : (
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                    </div>

                    {/* Center: Map */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
                        <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', flex: 1, overflow: 'hidden' }}>
                            <h3>Citizen Assignment</h3>
                            <div style={{ height: 'calc(100% - 50px)', marginTop: '10px' }}>
                                <HexMap
                                    tiles={state.map}
                                    culture={state.city.resources.culture}
                                    population={state.city.population}
                                    workedTileIds={state.city.workedTileIds}
                                    lockedTileIds={state.city.lockedTileIds}
                                    onTileClick={handleTileClick}
                                    hexSize={30}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Build Menu */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', flex: 1, overflowY: 'auto' }}>
                            <h3>Available Buildings</h3>
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
                </div>
            </div>
        </div>
    );
};
