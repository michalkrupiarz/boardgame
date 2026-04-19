import { terrainBonuses, resourceBonuses, improvementBonuses, validImprovementTerrains, improvementCosts } from '../../state/GameState';
import type { Tile, ResourceType, ImprovementType } from '../../state/GameState';

const RESOURCE_NAMES: Record<ResourceType, string> = {
    iron: 'Iron',
    wheat: 'Wheat',
    stone: 'Stone',
    coal: 'Coal',
    copper: 'Copper',
    wine: 'Wine',
    salt: 'Salt',
    silver: 'Silver',
    gems: 'Gems',
    uranium: 'Uranium',
    goldore: 'Gold Ore',
};

const IMPROVEMENT_NAMES: Record<ImprovementType, string> = {
    Farm: 'Farm',
    Mine: 'Mine',
    Quarry: 'Quarry',
    Pasture: 'Pasture',
    Plantation: 'Plantation',
    Well: 'Well',
};

const VALID_IMPROVEMENTS: ImprovementType[] = ['Farm', 'Mine', 'Quarry', 'Pasture', 'Plantation', 'Well'];

interface TileInfoPanelProps {
    tile: Tile | null;
    isClaimed: boolean;
    isClaimable?: boolean;
    isTargetClaim?: boolean;
    claimCost?: number;
    isWorked?: boolean;
    isLocked?: boolean;
    canAssign?: boolean;
    production?: number;
    onSelectAsTarget?: () => void;
    onToggleWorker?: () => void;
    onBuildImprovement?: (improvement: ImprovementType) => void;
    onClose: () => void;
}

export const TileInfoPanel: React.FC<TileInfoPanelProps> = ({ 
    tile, isClaimed, isClaimable, isTargetClaim, claimCost, isWorked, isLocked, canAssign, production = 0, onSelectAsTarget, onToggleWorker, onBuildImprovement, onClose 
}) => {
    if (!tile) return null;

    const bonuses = terrainBonuses[tile.terrain];
    const resource = tile.resource;
    const resBonuses = resource ? resourceBonuses[resource] : null;
    const improvement = tile.improvement;
    const impBonuses = improvement ? improvementBonuses[improvement] : null;

    const getAvailableImprovements = (): ImprovementType[] => {
        if (improvement || !isWorked) return [];
        return VALID_IMPROVEMENTS.filter(imp => 
            validImprovementTerrains[imp].includes(tile.terrain) && 
            improvementCosts[imp] <= production
        );
    };

    const availableImprovements = getAvailableImprovements();

    const getStatusDisplay = () => {
        if (isClaimed) return { text: '✓ Claimed Territory', color: '#4ade80' };
        if (isTargetClaim) return { text: `Target: Next (${claimCost} Cult)`, color: '#ec4899' };
        if (isClaimable) return { text: `Claimable (${claimCost} Cult)`, color: '#facc15' };
        return { text: '✕ Outside Territory', color: '#f87171' };
    };

    const status = getStatusDisplay();

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
                {resource && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                        {RESOURCE_NAMES[resource]}
                    </span>
                )}
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
                color: status.color,
                fontWeight: 600
            }}>
                {status.text}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Food</span>
                    <span className="text-food">+{bonuses.food}{resBonuses ? ` +${resBonuses.food}` : ''}{impBonuses ? ` +${impBonuses.food}` : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Production</span>
                    <span className="text-production">+{bonuses.production}{resBonuses ? ` +${resBonuses.production}` : ''}{impBonuses ? ` +${impBonuses.production}` : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Gold</span>
                    <span className="text-gold">+{bonuses.gold}{resBonuses ? ` +${resBonuses.gold}` : ''}{impBonuses ? ` +${impBonuses.gold}` : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Science</span>
                    <span className="text-science">+{bonuses.science}{resBonuses ? ` +${resBonuses.science}` : ''}{impBonuses ? ` +${impBonuses.science}` : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Culture</span>
                    <span className="text-culture">+{bonuses.culture}{resBonuses ? ` +${resBonuses.culture}` : ''}{impBonuses ? ` +${impBonuses.culture}` : ''}</span>
                </div>
            </div>

            {isClaimable && !isTargetClaim && (
                <div style={{ marginTop: '15px' }}>
                    <button 
                        className="glass-panel"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontWeight: '600', 
                            color: 'white', 
                            background: '#ec4899',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={onSelectAsTarget}
                    >
                        Set as Target
                    </button>
                </div>
            )}

            {isClaimed && (tile.q !== 0 || tile.r !== 0) && (
                <div style={{ marginTop: '20px' }}>
                    <button 
                        className="glass-panel"
                        data-testid="toggle-worker-button"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            fontWeight: '600', 
                            color: 'white', 
                            background: isWorked ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                            border: isWorked ? '1px solid white' : '1px solid rgba(255,255,255,0.2)',
                            transition: 'all 0.2s'
                        }}
                        disabled={!isWorked && !canAssign}
                        onClick={onToggleWorker}
                    >
                        {isWorked ? 'Remove Citizen' : 'Assign Citizen'}
                    </button>
                    {!isWorked && !canAssign && (
                        <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '5px', textAlign: 'center' }}>
                            Population limit reached!
                        </p>
                    )}
                    {isWorked && isLocked && (
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px', textAlign: 'center' }}>
                            (Locked: Manual assignment)
                        </p>
                    )}
                </div>
            )}

            {improvement && (
                <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ color: '#4ade80', fontWeight: 600 }}>{IMPROVEMENT_NAMES[improvement]}</span>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginLeft: '8px' }}>Built</span>
                </div>
            )}

            {availableImprovements.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Build Improvement:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {availableImprovements.map(imp => (
                            <button
                                key={imp}
                                onClick={() => onBuildImprovement?.(imp)}
                                style={{
                                    padding: '6px 10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {IMPROVEMENT_NAMES[imp]} ({improvementCosts[imp]} Prod)
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
