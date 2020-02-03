import React, { useState } from 'react';

import Game from './containers/game';

const App = () => {
  const [gridSize, setGridSize] = useState({
    width: '',
    height: '',
  });
  const [gridNotSet, setGridNotSet] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  const changeGrid = (dim, size) => {
    if (!(['width', 'height'].includes(dim))) return;
    setGridSize(oldGridSize => ({
      ...oldGridSize,
      [dim]: size,
    }));
  };

  const loadGameScreen = () => {
    if (
      typeof gridSize.width === "number"
      && typeof gridSize.height === "number"
      && gridSize.width > 0
      && gridSize.height > 0
    ) {
      setGridNotSet(false);
      setGameOn(true);
    } else {
      setGridNotSet(true);
    }
  };

  const resetGame = () => {
    if (confirm("Are you sure you want to reset?")) setGameOn(false);
  }

  return (
    <>
      <h1>Game of Life</h1>
      <p>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life</a>
      </p>
      {gameOn ? (
        <>
          <Game gridSize={gridSize} />
          <p>
            <button onClick={resetGame}>
              Reset Game
            </button>
          </p>
        </>
      ) : (
        <div>
          <p>Enter grid size</p>
          {gridNotSet && (
            <p className="error">Please set the grid dimensions before continuing.</p>
          )}
          <p>
            <input
              type="number"
              placeholder="width"
              value={gridSize.width.toString()}
              onChange={(e) => changeGrid('width', parseInt(e.target.value))}
            />
             x 
            <input
              type="number"
              placeholder="height"
              value={gridSize.height.toString()}
              onChange={(e) => changeGrid('height', parseInt(e.target.value))}
            />
          </p>
          <p><button type="submit" onClick={loadGameScreen}>Go</button></p>
        </div>
      )}
    </>
  );
};

export default App;
