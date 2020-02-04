import React, { useState, useEffect } from 'react';

import Box from './box';

const css = {
  container: {
    border: '1px solid black',
    display: 'inline-flex',
    flexDirection: 'column',
  },
  row: {
    display: 'inline-flex',
  }
};

const Game = ({
  gridSize,
}) => {
  const [gridLife, setGridLife] = useState(null);
  const [designPhase, setDesignPhase] = useState(true);

  useEffect(() => {
    setGridLife(
      Array.apply(null, Array(gridSize.height)).map(x => (
        Array.apply(null, Array(gridSize.width)).map(() => false)
      ))
    );
  }, []);

  const populateBox = (x, y, val) => {
    setGridLife(grid => {
      grid[x][y] = val;
      return [...grid];
    });
  };

  return (
    <>
      <p>Grid is {gridSize.width} x {gridSize.height}</p>
      <div style={css.container}>
        {gridLife && gridLife.map((gridRows, i) => (
          <div style={css.row} key={i}>
            {gridRows.map((val, j) => (
              <Box
                key={`${i},${j}`}
                value={val}
                row={i}
                col={j}
                designPhase={designPhase}
                populateBox={populateBox}
              />
            ))}
          </div>
        ))}
      </div>
      {designPhase && (
        <div>
          <p><strong>Design Phase!</strong> Please click on cells to populate them, or click randomise, then start!</p>
          <p>
            <button>Randomise</button>
            <button>Start!</button>
          </p>
        </div>
      )}
    </>
  );
};

export default Game;
