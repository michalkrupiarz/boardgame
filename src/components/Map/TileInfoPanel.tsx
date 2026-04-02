import { terrainBonuses, getDistance, getCurrentRadius } from '../../state/GameState';
import type { Tile } from '../../state/GameState';

interface TileInfoPanelProps {
    tile: Tile | null;
    culture: number;
    onClose: () => void;
}

export const TileInfoPanel: React.FC<TileInfoPanelProps> = ({ tile, culture, onClose }) => {
    if (!tile) return null;

    const bonuses = terrainBonuses[tile.terrain];
    const isClaimed = getDistance(tile.q, tile.r) <= getCurrentRadius(culture);

    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '300px',
            padding: '20px',
        }} className="glass-panel animate-pulse-slow">
            <button 
                onClick={onClose}
                style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
            >
                ✕
            </button>
            <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                    display: 'inline-block', 
                    width: '16px', height: '16px', 
                    backgroundColor: `var(--color-${tile.terrain.toLowerCase()})`,
                    borderRadius: '4px'
                }}></span>
                {tile.terrain}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                Hex ID: {tile.q}, {tile.r}
            </p>

            <div style={{ 
                padding: '5px 10px', 
                borderRadius: '8px', 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                marginBottom: '15px',
                textAlign: 'center',
                color: isClaimed ? '#4ade80' : '#f87171',
                fontWeight: 600
            }}>
                {isClaimed ? '✓ Claimed Territory' : '✕ Out of Borders'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Food</span>
                    <span className="text-food">+{bonuses.food}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Production</span>
                    <span className="text-production">+{bonuses.production}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Gold</span>
                    <span className="text-gold">+{bonuses.gold}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Science</span>
                    <span className="text-science">+{bonuses.science}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Culture</span>
                    <span className="text-culture">+{bonuses.culture}</span>
                </div>
            </div>
        </div>
    );
};
