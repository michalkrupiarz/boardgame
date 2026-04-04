import { useRef } from 'react';
import { getDistance, getCurrentRadius } from '../../state/GameState';
import type { Tile } from '../../state/GameState';
import { HexTile } from './HexTile';

interface HexMapProps {
    tiles: Tile[];
    culture: number;
    population?: number;
    workedTileIds?: string[];
    lockedTileIds?: string[];
    onTileClick: (tile: Tile) => void;
    selectedTileId?: string;
}

export const HexMap: React.FC<HexMapProps> = ({ 
    tiles, culture, population, workedTileIds = [], lockedTileIds = [], onTileClick, selectedTileId 
}) => {
    const size = 50; // Radius of a hex

    // We can compute bounds of the map to center the SVG
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    tiles.forEach(tile => {
        const x = size * Math.sqrt(3) * (tile.q + tile.r / 2);
        const y = size * (3/2) * tile.r;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    });

    // Add padding
    const padding = size * 2;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;

    // Pan state
    const svgRef = useRef<SVGSVGElement>(null);

    // Calculate bounded radius
    const currentRadius = getCurrentRadius(culture);

    return (
        <div className="map-container" style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'grab' }}>
            <svg 
                ref={svgRef}
                viewBox={viewBox} 
                className="hex-grid"
                style={{ width: '100%', height: '100%' }}
            >
                <g>
                    {tiles.map(tile => {
                        const isClaimed = getDistance(tile.q, tile.r) <= currentRadius;
                        const isCity = tile.q === 0 && tile.r === 0;

                        return (
                            <HexTile 
                                key={tile.id} 
                                tile={tile} 
                                size={size}
                                isSelected={tile.id === selectedTileId}
                                isClaimed={isClaimed}
                                isCity={isCity}
                                population={isCity ? population : undefined}
                                isWorked={workedTileIds.includes(tile.id)}
                                isLocked={lockedTileIds.includes(tile.id)}
                                onClick={onTileClick}
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};
