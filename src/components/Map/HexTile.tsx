import React from 'react';
import type { Tile, TerrainType } from '../../state/GameState';
import './HexMap.css';

interface HexTileProps {
    tile: Tile;
    size: number;
    isSelected: boolean;
    isClaimed: boolean;
    isCity: boolean;
    population?: number;
    isWorked?: boolean;
    isLocked?: boolean;
    onClick: (tile: Tile) => void;
}

// pointy top hexagon: width = sqrt(3)*size, height = 2*size
// Half widths and heights for polygon points
// w = sqrt(3)/2 * size, h = size

export const HexTile: React.FC<HexTileProps> = ({ 
    tile, size, isSelected, isClaimed, isCity, population, isWorked, isLocked, onClick 
}) => {
    // Axial to pixel coords (pointy top)
    const x = size * Math.sqrt(3) * (tile.q + tile.r / 2);
    const y = size * (3/2) * tile.r;

    // Hexagon polygon points relative to center (pointy top)
    // Top point at (0, -size), going clockwise
    const w = (Math.sqrt(3) / 2) * size; // half width
    const h = size; // half height
    const points = `0,${-size} ${w},${-h/2} ${w},${h/2} 0,${size} ${-w},${h/2} ${-w},${-h/2}`;

    // Worker icon scales with hex size
    const iconScale = size / 50;
    const headRadius = 5 * iconScale;
    const strokeWidth = 3 * iconScale;

    // Define CSS variable colors depending on terrain
    const getFillColor = (terrain: TerrainType) => {
        switch (terrain) {
            case 'Plains': return 'var(--color-plains)';
            case 'Forest': return 'var(--color-forest)';
            case 'Mountains': return 'var(--color-mountains)';
            case 'Desert': return 'var(--color-desert)';
        }
    };

    return (
        <g 
            transform={`translate(${x}, ${y})`} 
            className={`hex-tile ${isSelected ? 'selected' : ''}`}
            style={{ opacity: isClaimed ? 1 : 0.4 }}
            onClick={() => onClick(tile)}
            data-testid="hex-tile"
            data-tile-id={tile.id}
        >
            <polygon 
                points={points}
                fill={getFillColor(tile.terrain)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
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
