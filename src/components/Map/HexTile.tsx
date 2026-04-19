import React, { useState } from 'react';
import { terrainBonuses, resourceBonuses, improvementBonuses } from '../../state/GameState';
import type { Tile, TerrainType, ResourceType } from '../../state/GameState';
import './HexMap.css';

const RESOURCE_ICONS: Record<ResourceType, string> = {
    iron: '⛏️',
    wheat: '🌾',
    stone: '🪨',
    coal: '⚫',
    copper: '🥉',
    wine: '🍇',
    salt: '🧂',
    silver: '🥈',
    gems: '💎',
    uranium: '☢️',
    goldore: '🪙',
};

interface HexTileProps {
    tile: Tile;
    size: number;
    isSelected: boolean;
    isClaimed: boolean;
    isClaimable?: boolean;
    showClaimable?: boolean;
    isTargetClaim?: boolean;
    isCity: boolean;
    population?: number;
    isWorked?: boolean;
    isLocked?: boolean;
    onClick: (tile: Tile) => void;
}

export const HexTile: React.FC<HexTileProps> = ({ 
    tile, size, isSelected, isClaimed, isClaimable, showClaimable, isTargetClaim, isCity, population, isWorked, isLocked, onClick 
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const canBeClaimed = isClaimable && showClaimable;
    const x = size * Math.sqrt(3) * (tile.q + tile.r / 2);
    const y = size * (3/2) * tile.r;

    const w = (Math.sqrt(3) / 2) * size;
    const h = size;
    const points = `0,${-size} ${w},${-h/2} ${w},${h/2} 0,${size} ${-w},${h/2} ${-w},${-h/2}`;

    const iconScale = size / 50;
    const headRadius = 5 * iconScale;
    const strokeWidth = 3 * iconScale;

    const getYieldSummary = () => {
        const bonuses = terrainBonuses[tile.terrain];
        let summary = `Food: +${bonuses.food} Prod: +${bonuses.production} Gold: +${bonuses.gold}`;
        if (tile.resource) {
            const res = resourceBonuses[tile.resource];
            summary += ` (+${res.food + res.production + res.gold} from ${tile.resource})`;
        }
        if (tile.improvement) {
            const imp = improvementBonuses[tile.improvement];
            summary += ` (+${imp.food + imp.production + imp.gold} from ${tile.improvement})`;
        }
        return summary;
    };

    const getFillColor = (terrain: TerrainType) => {
        switch (terrain) {
            case 'Plains': return 'var(--color-plains)';
            case 'Forest': return 'var(--color-forest)';
            case 'Mountains': return 'var(--color-mountains)';
            case 'Desert': return 'var(--color-desert)';
        }
    };

    const getStrokeStyle = () => {
        if (isTargetClaim) return { stroke: '#ec4899', strokeWidth: 4, strokeDasharray: 'none' };
        if (canBeClaimed) return { stroke: '#ec4899', strokeWidth: 4, strokeDasharray: '8,4' };
        return { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2, strokeDasharray: 'none' };
    };

    const strokeStyle = getStrokeStyle();

    return (
        <g 
            transform={`translate(${x}, ${y})`} 
            className={`hex-tile ${isSelected ? 'selected' : ''}`}
            style={{ opacity: isClaimed ? 1 : 0.3 }}
            onClick={() => onClick(tile)}
            data-testid="hex-tile"
            data-tile-id={tile.id}
        >
            <defs>
                <pattern id={`stripe-${tile.id}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#ec4899" strokeWidth="4" />
                </pattern>
            </defs>
            <polygon 
                points={points}
                fill={isTargetClaim ? `url(#stripe-${tile.id})` : getFillColor(tile.terrain)}
                stroke={strokeStyle.stroke}
                strokeWidth={strokeStyle.strokeWidth}
                strokeDasharray={strokeStyle.strokeDasharray}
            />
            {showTooltip && (
                <g>
                    <rect 
                        x={-size * 0.8} 
                        y={-size * 1.9} 
                        width={size * 1.6} 
                        height={size * 0.7} 
                        rx={4} 
                        fill="rgba(0,0,0,0.9)" 
                        stroke="var(--accent)" 
                        strokeWidth={1}
                    />
                    <text 
                        x={0} 
                        y={-size * 1.5} 
                        textAnchor="middle" 
                        fill="white" 
                        fontSize={size * 0.2}
                    >
                        {getYieldSummary()}
                    </text>
                </g>
            )}
            <rect 
                x={-size} y={-size} width={size * 2} height={size * 2} 
                fill="transparent" 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            {isCity && (
                <g>
                    <path 
                        d={`M${-15 * iconScale},0 L0,${-15 * iconScale} L${15 * iconScale},0 L${15 * iconScale},${20 * iconScale} L${-15 * iconScale},${20 * iconScale} Z`}
                        fill="var(--accent)" 
                        stroke="white" 
                        strokeWidth={2 * iconScale}
                    />
                    {population !== undefined && (
                        <text 
                            x="0" 
                            y={14 * iconScale} 
                            fill="white" 
                            fontSize={14 * iconScale} 
                            fontWeight="bold" 
                            textAnchor="middle"
                            style={{ userSelect: 'none' }}
                        >
                            {population}
                        </text>
                    )}
                </g>
            )}
            {/* Resource indicator */}
            {tile.resource && (
                <g transform={`translate(${-w + 8}, ${-h/2 + 12})`}>
                    <text 
                        fontSize={10 * iconScale} 
                        fill="white"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={1}
                    >
                        {RESOURCE_ICONS[tile.resource]}
                    </text>
                </g>
            )}
            {/* Worker Icon (Human Head) in the middle of the tile */}
            {isWorked && !isCity && (
                <g 
                    transform="translate(0, 0)"
                    style={{ transition: 'all 0.3s' }}
                    data-testid="worker-head"
                >
                    {/* Torso */}
                    <path 
                        d={`M${-8 * iconScale},${10 * iconScale} Q0,${-2 * iconScale} ${8 * iconScale},${10 * iconScale}`}
                        fill="none" 
                        stroke={isLocked ? "white" : "rgba(255,255,255,0.6)"} 
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                    {/* Head */}
                    <circle 
                        cx="0" 
                        cy="0" 
                        r={headRadius}
                        fill={isLocked ? "white" : "rgba(255,255,255,0.6)"} 
                    />
                    {/* Optional lock indicator */}
                    {isLocked && (
                        <circle cx={6 * iconScale} cy={6 * iconScale} r={3 * iconScale} fill="var(--accent)" stroke="white" strokeWidth={iconScale} />
                    )}
                </g>
            )}
        </g>
    );
};
