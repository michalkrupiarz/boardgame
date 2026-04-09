import { useState } from 'react';
import { getInitialState, nextTurn, buildBuilding, calculateTurnYield, toggleWorkedTile } from './state/GameState';
import type { GameState } from './state/GameState';
import { HexMap } from './components/Map/HexMap';
import { TileInfoPanel } from './components/Map/TileInfoPanel';
import { CitySidePanel } from './components/City/CityView';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => getInitialState(11));
  const [selectedTileId, setSelectedTileId] = useState<string | undefined>();
  const [showCityPanels, setShowCityPanels] = useState(false);

  const selectedTile = gameState.map.find(t => t.id === selectedTileId) || null;

  const handleNextTurn = () => {
    setGameState(prev => nextTurn(prev));
  };

  const currentYields = calculateTurnYield(gameState);

  return (
    <div className="app-container">
      <div className="map-layer">
        <HexMap 
          tiles={gameState.map} 
          culture={gameState.city.resources.culture}
          population={gameState.city.population}
          workedTileIds={gameState.city.workedTileIds}
          lockedTileIds={gameState.city.lockedTileIds}
          onTileClick={(tile) => setSelectedTileId(tile.id)} 
          selectedTileId={selectedTileId} 
        />
      </div>

      <div className="ui-layer">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
          <div className="glass-panel" style={{ display: 'flex', gap: '20px', padding: '10px 20px', alignItems: 'center' }}>
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
            culture={gameState.city.resources.culture}
            isWorked={gameState.city.workedTileIds.includes(selectedTile.id)}
            isLocked={gameState.city.lockedTileIds.includes(selectedTile.id)}
            canAssign={gameState.city.workedTileIds.length < gameState.city.population}
            onToggleWorker={() => setGameState(prev => toggleWorkedTile(prev, selectedTile.id))}
            onClose={() => setSelectedTileId(undefined)} 
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
