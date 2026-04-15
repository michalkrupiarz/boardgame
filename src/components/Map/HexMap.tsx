import { useRef } from 'react';
import { isAdjacentToClaimed } from '../../state/GameState';
import type { Tile } from '../../state/GameState';
import { HexTile } from './HexTile';

interface HexMapProps {
    tiles: Tile[];
    claimedTileIds: string[];
    targetClaimTileId?: string;
    showClaimable?: boolean;
    population?: number;
    workedTileIds?: string[];
    lockedTileIds?: string[];
    onTileClick: (tile: Tile) => void;
    onTargetSelect?: (tileId: string) => void;
    selectedTileId?: string;
    hexSize?: number;
}

export const HexMap: React.FC<HexMapProps> = ({ 
    tiles, claimedTileIds, targetClaimTileId, showClaimable, population, workedTileIds = [], lockedTileIds = [], onTileClick, onTargetSelect, selectedTileId, hexSize = 50
}) => {
    const size = hexSize;

    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    tiles.forEach(tile => {
        const x = size * Math.sqrt(3) * (tile.q + tile.r / 2);
        const y = size * (3/2) * tile.r;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    });

    const padding = size * 2;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    const viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;

    const svgRef = useRef<SVGSVGElement>(null);

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
                        const isClaimed = claimedTileIds.includes(tile.id);
                        const isClaimable = !isClaimed && isAdjacentToClaimed(tile, claimedTileIds);
                        const isTargetClaim = tile.id === targetClaimTileId;
                        const isCity = tile.q === 0 && tile.r === 0;

                        return (
                            <HexTile 
                                key={tile.id} 
                                tile={tile} 
                                size={size}
                                isSelected={tile.id === selectedTileId}
                                isClaimed={isClaimed}
                                isClaimable={isClaimable}
                                showClaimable={showClaimable}
                                isTargetClaim={isTargetClaim}
                                isCity={isCity}
                                population={isCity ? population : undefined}
                                isWorked={workedTileIds.includes(tile.id)}
                                isLocked={lockedTileIds.includes(tile.id)}
                                onClick={(t) => {
                                    if (showClaimable && isClaimable) {
                                        onTargetSelect?.(t.id);
                                    }
                                    onTileClick(t);
                                }}
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};
