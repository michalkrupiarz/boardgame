import { useState } from 'react';
import { getInitialState, nextTurn, buildBuilding, calculateTurnYield, toggleWorkedTile, toggleAutoExpand, claimTile, isAdjacentToClaimed, getClaimCost, getDistance } from './state/GameState';
import type { GameState } from './state/GameState';
import { HexMap } from './components/Map/HexMap';
import { TileInfoPanel } from './components/Map/TileInfoPanel';
import { CitySidePanel } from './components/City/CityView';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => getInitialState(11));
  const [selectedTileId, setSelectedTileId] = useState<string | undefined>();
  const [claimingTileId, setClaimingTileId] = useState<string | undefined>();
  const [showCityPanels, setShowCityPanels] = useState(false);

  const selectedTile = gameState.map.find(t => t.id === selectedTileId) || null;

  const handleNextTurn = () => {
    setGameState(prev => nextTurn(prev));
  };

  const handleTileClick = (tile: { id: string; q: number; r: number }) => {
    if (showCityPanels) {
      const isClaimable = !gameState.city.claimedTileIds.includes(tile.id) && 
                          isAdjacentToClaimed(tile as any, gameState.city.claimedTileIds);
      if (isClaimable) {
        setClaimingTileId(tile.id);
      } else if (gameState.city.claimedTileIds.includes(tile.id)) {
        setGameState(prev => toggleWorkedTile(prev, tile.id));
      }
    } else {
      setSelectedTileId(tile.id);
    }
  };

  const handleClaim = () => {
    if (claimingTileId) {
      setGameState(prev => claimTile(prev, claimingTileId));
      setClaimingTileId(undefined);
    }
  };

  const claimingTile = claimingTileId ? gameState.map.find(t => t.id === claimingTileId) : null;

  const currentYields = calculateTurnYield(gameState);

  return (
    <div className="app-container">
      <div className="map-layer">
        <HexMap 
          tiles={gameState.map} 
          claimedTileIds={gameState.city.claimedTileIds}
          claimingTileId={claimingTileId}
          showClaimable={showCityPanels}
          population={gameState.city.population}
          workedTileIds={gameState.city.workedTileIds}
          lockedTileIds={gameState.city.lockedTileIds}
          onTileClick={handleTileClick}
          selectedTileId={selectedTileId} 
        />
      </div>

      <div className="ui-layer">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <div className="glass-panel" style={{ display: 'flex', gap: '20px', padding: '10px 20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontWeight: '600', marginRight: '10px' }}>Turn {gameState.turn}</div>
            
            <div className="glass-pill text-gold">
              <span>Gold: {gameState.city.resources.gold}</span>
              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(+{currentYields.gold})</span>
            </div>
            
            <div className="glass-pill text-production">
              <span>Prod: {gameState.city.resources.production}</span>
              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(+{currentYields.production})</span>
            </div>
            
            <div className="glass-pill text-food">
              <span>Food: {gameState.city.resources.food}</span>
              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(+{currentYields.food})</span>
            </div>
            
            <div className="glass-pill text-science">
              <span>Sci: {gameState.city.resources.science}</span>
              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(+{currentYields.science})</span>
            </div>
            
            <div className="glass-pill text-culture">
              <span>Cult: {gameState.city.resources.culture}</span>
              <span style={{ fontSize: '0.8em', opacity: 0.8 }}>(+{currentYields.culture})</span>
            </div>

            <button
              className="glass-pill"
              style={{ 
                padding: '4px 12px', 
                background: gameState.city.autoExpand ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={() => setGameState(prev => toggleAutoExpand(prev))}
              title="Auto-expand: Automatically claim tiles when culture is available"
            >
              Auto: {gameState.city.autoExpand ? 'ON' : 'OFF'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              className="glass-panel"
              style={{ padding: '0 20px', fontWeight: '600', color: 'white', background: showCityPanels ? 'var(--accent)' : 'var(--bg-panel)' }}
              onClick={() => setShowCityPanels(!showCityPanels)}
            >
              {showCityPanels ? 'Close City' : 'City View'}
            </button>
            <button 
              className="glass-panel"
              style={{ padding: '0 20px', fontWeight: '600', color: 'white', background: 'var(--accent)' }}
              onClick={handleNextTurn}
            >
              Next Turn
            </button>
          </div>
        </div>

        {selectedTile && !showCityPanels && (
          <TileInfoPanel 
            tile={selectedTile} 
            isClaimed={gameState.city.claimedTileIds.includes(selectedTile.id)}
            isClaimable={!gameState.city.claimedTileIds.includes(selectedTile.id) && isAdjacentToClaimed(selectedTile, gameState.city.claimedTileIds)}
            claimCost={getClaimCost(getDistance(selectedTile.q, selectedTile.r))}
            culture={gameState.city.resources.culture}
            isWorked={gameState.city.workedTileIds.includes(selectedTile.id)}
            isLocked={gameState.city.lockedTileIds.includes(selectedTile.id)}
            canAssign={gameState.city.claimedTileIds.includes(selectedTile.id) && gameState.city.workedTileIds.length < gameState.city.population}
            onClaim={() => setGameState(prev => claimTile(prev, selectedTile.id))}
            onToggleWorker={() => setGameState(prev => toggleWorkedTile(prev, selectedTile.id))}
            onClose={() => setSelectedTileId(undefined)} 
          />
        )}

        {claimingTile && (
          <TileInfoPanel 
            tile={claimingTile} 
            isClaimed={false}
            isClaimable={true}
            claimCost={getClaimCost(getDistance(claimingTile.q, claimingTile.r))}
            culture={gameState.city.resources.culture}
            isWorked={false}
            isLocked={false}
            canAssign={false}
            onClaim={handleClaim}
            onToggleWorker={() => {}}
            onClose={() => setClaimingTileId(undefined)} 
          />
        )}
      </div>

      {showCityPanels && (
        <CitySidePanel 
          state={gameState} 
          onBuild={(buildingId) => setGameState(prev => buildBuilding(prev, buildingId))}
        />
      )}
    </div>
  );
}

export default App;
