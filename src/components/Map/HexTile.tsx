import React from 'react';
import type { Tile, TerrainType } from '../../state/GameState';
import './HexMap.css';

interface HexTileProps {
    tile: Tile;
    size: number;
    isSelected: boolean;
    isClaimed: boolean;
    isCity: boolean;
    onClick: (tile: Tile) => void;
}

// Derived for a hexagon fitting in 173.2 x 200 box
// pointy top: width = sqrt(3)*size, height = 2*size.  with size = 100
// w = 173.205, h = 200

export const HexTile: React.FC<HexTileProps> = ({ tile, size, isSelected, isClaimed, isCity, onClick }) => {
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
        >
            <polygon 
                points="0,50 43.3,25 86.6,50 86.6,100 43.3,125 0,100" 
                fill={getFillColor(tile.terrain)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                transform="translate(-43.3, -75)" // center the polygon at x,y
            />
            {isCity && (
                <path 
                    d="M-15,0 L0,-15 L15,0 L15,20 L-15,20 Z" 
                    fill="var(--accent)" 
                    stroke="white" 
                    strokeWidth="2" 
                />
            )}
            {/* Optional icon or details */}
        </g>
    );
};
