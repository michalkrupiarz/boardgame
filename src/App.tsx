import { useState, useEffect, useCallback } from 'react';
import { getInitialState, nextTurn, buildBuilding, calculateTurnYield, toggleWorkedTile, isAdjacentToClaimed, getClaimCost, getDistance, saveGameState, loadGameState, clearSavedGame, checkVictory } from './state/GameState';
import type { GameState } from './state/GameState';
import { HexMap } from './components/Map/HexMap';
import { buildImprovement } from './state/GameState';
import { TileInfoPanel } from './components/Map/TileInfoPanel';
import { CitySidePanel } from './components/City/CityView';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    return saved || getInitialState(11);
  });
  const [selectedTileId, setSelectedTileId] = useState<string | undefined>();
  const [showCityPanels, setShowCityPanels] = useState(false);
  const [victory, setVictory] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const selectedTile = gameState.map.find(t => t.id === selectedTileId) || null;

  const handleNextTurn = () => {
    setGameState(prev => {
      const newState = nextTurn(prev);
      const conditions = checkVictory(newState);
      const newVictories = conditions.filter(c => c.achieved).map(c => c.description);
      if (newVictories.length > 0) {
        setVictory(prevVictory => {
          const combined = [...newVictories, ...prevVictory];
          return [...new Set(combined)];
        });
      }
      return newState;
    });
  };

  const handleTileClick = (tile: { id: string; q: number; r: number }) => {
    if (showCityPanels) {
      if (gameState.city.claimedTileIds.includes(tile.id)) {
        setGameState(prev => toggleWorkedTile(prev, tile.id));
      }
    } else {
      setSelectedTileId(tile.id);
    }
  };

  const handleTargetSelect = (tileId: string) => {
    setGameState(prev => ({
      ...prev,
      city: {
        ...prev.city,
        targetClaimTileId: tileId
      }
    }));
  };

  const currentYields = calculateTurnYield(gameState);
  const targetTile = gameState.city.targetClaimTileId ? 
    gameState.map.find(t => t.id === gameState.city.targetClaimTileId) : null;

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleReset = () => {
    if (confirm('Start new game? Current progress will be lost.')) {
      clearSavedGame();
      setGameState(getInitialState(11));
      setSelectedTileId(undefined);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    
    switch (e.key.toLowerCase()) {
      case ' ':
      case 'enter':
        e.preventDefault();
        handleNextTurn();
        break;
      case 'c':
        setShowCityPanels(p => !p);
        break;
      case 'r':
        handleReset();
        break;
      case 'escape':
        setSelectedTileId(undefined);
        break;
      case 's':
        saveGameState(gameState);
        break;
    }
  }, [gameState, showCityPanels]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app-container">
      <div className="map-layer">
        <HexMap 
          tiles={gameState.map} 
          claimedTileIds={gameState.city.claimedTileIds}
          targetClaimTileId={showCityPanels ? gameState.city.targetClaimTileId : undefined}
          showClaimable={showCityPanels}
          population={gameState.city.population}
          workedTileIds={gameState.city.workedTileIds}
          lockedTileIds={gameState.city.lockedTileIds}
          onTileClick={handleTileClick}
          onTargetSelect={handleTargetSelect}
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

            {victory.length > 0 && (
              <div className="glass-pill" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', border: '2px solid #fff' }}>
                <span style={{ fontWeight: 700 }}>🎉 VICTORY: {victory.join(', ')}</span>
              </div>
            )}

            {targetTile && (
              <div className="glass-pill text-culture" style={{ border: '2px solid #ec4899' }}>
                <span>Next: {targetTile.terrain} ({getClaimCost(getDistance(targetTile.q, targetTile.r))} Cult)</span>
              </div>
            )}
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
              style={{ padding: '0 20px', fontWeight: '600', color: 'white', background: '#dc2626' }}
              onClick={handleReset}
              title="Start new game"
            >
              Reset
            </button>
            <button 
              className="glass-panel"
              style={{ padding: '0 20px', fontWeight: '600', color: 'white', background: 'var(--accent)' }}
              onClick={handleNextTurn}
            >
              Next Turn
            </button>
            <button 
              className="glass-panel"
              style={{ padding: '0 20px', fontWeight: '600', color: 'white', background: 'var(--bg-panel)' }}
              onClick={() => setShowHelp(!showHelp)}
            >
              ?
            </button>
          </div>
        </div>

        {showHelp && (
          <div className="glass-panel" style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', padding: '20px', zIndex: 100, maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Keyboard Shortcuts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px', fontSize: '0.9rem' }}>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Space</code><span>Next Turn</span>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>C</code><span>Toggle City View</span>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>R</code><span>Reset Game</span>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>S</code><span>Save Game</span>
              <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Esc</code><span>Close Panel</span>
            </div>
            <button onClick={() => setShowHelp(false)} style={{ marginTop: '15px', background: 'var(--accent)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px' }}>Close</button>
          </div>
        )}

        {selectedTile && !showCityPanels && (
          <TileInfoPanel 
            tile={selectedTile} 
            isClaimed={gameState.city.claimedTileIds.includes(selectedTile.id)}
            isClaimable={!gameState.city.claimedTileIds.includes(selectedTile.id) && isAdjacentToClaimed(selectedTile, gameState.city.claimedTileIds)}
            isTargetClaim={selectedTile.id === gameState.city.targetClaimTileId}
            claimCost={getClaimCost(getDistance(selectedTile.q, selectedTile.r))}
            isWorked={gameState.city.workedTileIds.includes(selectedTile.id)}
            isLocked={gameState.city.lockedTileIds.includes(selectedTile.id)}
            canAssign={gameState.city.claimedTileIds.includes(selectedTile.id) && gameState.city.workedTileIds.length < gameState.city.population}
            production={gameState.city.resources.production}
            onSelectAsTarget={() => handleTargetSelect(selectedTile.id)}
            onToggleWorker={() => setGameState(prev => toggleWorkedTile(prev, selectedTile.id))}
            onBuildImprovement={(imp) => setGameState(prev => buildImprovement(prev, selectedTile.id, imp))}
            onClose={() => setSelectedTileId(undefined)} 
          />
        )}
      </div>

      {gameState.map.length > 50 && (
        <div className="glass-panel" style={{ position: 'absolute', bottom: '20px', left: '20px', width: '120px', height: '120px', zIndex: 50, overflow: 'hidden', padding: '4px' }}>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Map Preview</div>
          <svg viewBox="-15 -15 30 30" style={{ width: '100%', height: '100%' }}>
            {gameState.map.slice(0, 100).map(tile => (
              <circle key={tile.id} cx={tile.q * 2} cy={tile.r * 2} r={1.5} fill={gameState.city.claimedTileIds.includes(tile.id) ? '#4ade80' : 'rgba(255,255,255,0.1)'} />
            ))}
          </svg>
        </div>
      )}

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
