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

// Derived for a hexagon fitting in 173.2 x 200 box
// pointy top: width = sqrt(3)*size, height = 2*size.  with size = 100
// w = 173.205, h = 200

export const HexTile: React.FC<HexTileProps> = ({ 
    tile, size, isSelected, isClaimed, isCity, population, isWorked, isLocked, onClick 
}) => {
    // Axial to pixel coords (pointy top)
    const x = size * Math.sqrt(3) * (tile.q + tile.r / 2);
    const y = size * (3/2) * tile.r;

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
                points="0,50 43.3,25 86.6,50 86.6,100 43.3,125 0,100" 
                fill={getFillColor(tile.terrain)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                transform="translate(-43.3, -75)" // center the polygon at x,y
            />
            {isCity && (
                <g>
                    <path 
                        d="M-15,0 L0,-15 L15,0 L15,20 L-15,20 Z" 
                        fill="var(--accent)" 
                        stroke="white" 
                        strokeWidth="2" 
                    />
                    {population !== undefined && (
                        <text 
                            x="0" 
                            y="14" 
                            fill="white" 
                            fontSize="14" 
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
                        d="M-8,10 Q0,-2 8,10" 
                        fill="none" 
                        stroke={isLocked ? "white" : "rgba(255,255,255,0.6)"} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                    />
                    {/* Head */}
                    <circle 
                        cx="0" 
                        cy="0" 
                        r="5" 
                        fill={isLocked ? "white" : "rgba(255,255,255,0.6)"} 
                    />
                    {/* Optional lock indicator */}
                    {isLocked && (
                        <circle cx="6" cy="6" r="3" fill="var(--accent)" stroke="white" strokeWidth="1" />
                    )}
                </g>
            )}
        </g>
    );
};
