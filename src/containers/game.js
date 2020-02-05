import React, { useState, useEffect, useRef } from 'react';

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

  const timeRef = useRef();
  const animationFrameRef = useRef();

  useEffect(() => {
    setGridLife(
      Array.apply(null, Array(gridSize.height)).map(x => (
        Array.apply(null, Array(gridSize.width)).map(() => false)
      ))
    );
  }, []);

  useEffect(() => {
    if (!designPhase) {
      animationFrameRef.current = requestAnimationFrame(tick)
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [designPhase]);

  const populateBox = (x, y, val) => {
    setGridLife(grid => {
      grid[x][y] = val;
      return [...grid];
    });
  };

  const validateAndPopulateBox = (x, y, currentVal, oldGrid) => {
    let liveNeighbours = 0;
    for (let i=x-1;i<=x+1;i++) {
      for (let j=y-1;j<=y+1;j++) {
        if (i === x && j === y) continue;

        let row = i;
        let col = j;

        if (row < 0) row = gridSize.height - 1;
        if (row > gridSize.height - 1) row = 0;

        if (col < 0) col = gridSize.width - 1;
        if (col > gridSize.width - 1) col = 0;
        
        if (oldGrid[row][col]) liveNeighbours++;
      }
    }
    if (currentVal && (liveNeighbours < 2 || liveNeighbours > 3)) {
      return false;
    }
    if (currentVal || (!currentVal && liveNeighbours === 3)) {
      return true;
    }
    return false;
  };

  const runNextWave = () => {
    setGridLife(grid => {
      const newGrid = grid.map((gridRow, x) => {
        return gridRow.map((gridCol, y) => validateAndPopulateBox(x, y, gridCol, grid));
      });
      return [...newGrid];
    });
  };

  const tick = (timestamp) => {
    const timeDelta = timestamp - (timeRef.current || 0);
    
    if (timeDelta > 200) {
      runNextWave();
      timeRef.current = timestamp;
    }
    animationFrameRef.current = requestAnimationFrame(tick);
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
          <p><strong>Design Phase!</strong> Please click on cells to populate them, then start!</p>
          <p>
            <button onClick={() => setDesignPhase(false)}>Start!</button>
          </p>
        </div>
      )}
    </>
  );
};

export default Game;
